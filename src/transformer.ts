import { ofetch } from "ofetch";
import { decodeEventLog, getAddress, parseAbiItem, type AbiEvent } from "viem";
import BigNumber from "bignumber.js";
import lodashGet from "lodash/get";
import type {
  CreateAbiSchemaConfig,
  CreateAbiSchemaReturn,
  ExtractEvent,
} from "./types/transformer";
import type {
  ILendingTokensResponse,
  ITokenPrice,
  IVault,
  ISmartLendingToken,
  IDex,
  SupportedChainIds,
  SimulationRaw,
} from "./types/dataset";
import type { ILendingToken } from "./types/dataset/lending";

type ConstructorParams = {
  chainId: SupportedChainIds;
  dataset: Dataset;
};

type Dataset = {
  vaults: IVault[];
  tokens: ITokenPrice[];
  lendings: ILendingTokensResponse["data"];
  dexes: IDex[];
  smartLendings: ISmartLendingToken[];
};

export class EventTransformer {
  private chainId: SupportedChainIds;
  private dataset: Dataset;

  private constructor(params: ConstructorParams) {
    this.chainId = params.chainId;
    this.dataset = params.dataset;
  }

  public static async init(
    chainId: SupportedChainIds,
  ): Promise<EventTransformer> {
    const fetcher = ofetch.create({
      baseURL: "https://api.fluid.instad.app",
    });

    const [_vaults, _tokens, _lendings, _dexes, _smartLendings] =
      await Promise.allSettled([
        fetcher<IVault[]>(`/v2/${chainId}/vaults`),
        fetcher<ITokenPrice[]>(
          `https://blockquery.instadapp.io/${chainId}/tokens`,
        ),
        fetcher<ILendingTokensResponse>(`/v2/lending/${chainId}/tokens`),
        fetcher<IDex[]>(`/v2/${chainId}/dexes`),
        fetcher<ISmartLendingToken[]>(`/v2/smart-lending/${chainId}/tokens`),
      ]);

    const vaults = _vaults.status === "fulfilled" ? _vaults.value : [];
    const tokens = _tokens.status === "fulfilled" ? _tokens.value : [];
    const lendings =
      _lendings.status === "fulfilled" ? _lendings.value.data : [];
    const dexes = _dexes.status === "fulfilled" ? _dexes.value : [];
    const smartLendings =
      _smartLendings.status === "fulfilled" ? _smartLendings.value : [];

    const dataset: Dataset = {
      vaults,
      tokens,
      lendings,
      dexes,
      smartLendings,
    };

    return new EventTransformer({ chainId, dataset });
  }

  private isAddressEq(value: string, address: string) {
    return getAddress(value) === getAddress(address);
  }

  private withType<T, TypeName extends string>(
    obj: T,
    type: TypeName,
  ): T & { __type: TypeName } {
    return {
      ...obj,
      __type: type,
    };
  }

  public transform(value: any) {
    const { vaults, dexes, lendings, tokens, smartLendings } = this.dataset;

    return {
      toAddress: () => {
        return getAddress(value);
      },
      toVault: () => {
        const vault = vaults.find((vault) =>
          this.isAddressEq(vault.address, value),
        ) as IVault;

        if (!vault) throw new Error(`Vault not found: ${value}`);

        return this.withType(vault, "vault");
      },
      toLending: () => {
        const lending = lendings.find((lending) =>
          this.isAddressEq(lending.address, value),
        ) as ILendingToken;

        if (!lending) throw new Error(`Lending not found: ${value}`);

        return this.withType(lending, "lending");
      },
      toDex: () => {
        const dex = dexes.find((dex) =>
          this.isAddressEq(dex.address, value),
        ) as IDex;

        if (!dex) throw new Error(`Dex not found: ${value}`);

        return this.withType(dex, "dex");
      },
      toToken: () => {
        const token = tokens.find((token) =>
          this.isAddressEq(token.address, value),
        ) as ITokenPrice;

        if (!token) throw new Error(`Token not found: ${value}`);

        return this.withType(token, "token");
      },
      toSmartLending: () => {
        const smartLending = smartLendings.find((smartLending) =>
          this.isAddressEq(smartLending.address, value),
        ) as ISmartLendingToken;

        if (!smartLending) throw new Error(`SmartLending not found: ${value}`);

        return this.withType(smartLending, "smartLending");
      },
      toDecimals: (token: ITokenPrice) => {
        return new BigNumber(value)
          .div(new BigNumber(10).pow(token.decimals))
          .toFixed();
      },
      toPercentage: (divider: number) => {
        const formatter = Intl.NumberFormat("en", {
          style: "percent",
          maximumFractionDigits: 2,
        });

        return formatter.format(value / BigInt(divider));
      },
    };
  }
}

export function createAbiSchema<
  TSignature extends string,
  TEvent extends AbiEvent = ExtractEvent<TSignature>,
>(
  config: CreateAbiSchemaConfig<TSignature, TEvent>,
): CreateAbiSchemaReturn<TSignature, TEvent> {
  return config;
}

export function resolveFieldTransformer<
  TSignature extends string,
  TEvent extends AbiEvent = ExtractEvent<TSignature>,
>(
  fieldTransformer: CreateAbiSchemaReturn<TSignature, TEvent>,
  dataTransformer: EventTransformer,
  raw: SimulationRaw,
) {
  const parsedAbi = parseAbiItem(fieldTransformer.signature as string);

  const { args } = decodeEventLog({
    abi: [parsedAbi],
    data: raw.data,
    topics: raw.topics,
  });

  if (!args) {
    throw new Error("Failed to decode event log");
  }

  const context = {
    args,
  };

  const get = (path: string) => {
    return lodashGet(context.args, path);
  };

  const resolveFields = (schema: any, value: any, path = "", item?: any) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => {
        return resolveFields(schema, item, `${path}[${index}]`, item);
      });
    }

    if (typeof schema === "function") {
      return schema({ value, get, transform: dataTransformer, item });
    }

    if (typeof schema === "object") {
      const result: Record<string, any> = {};

      for (const [key, resolver] of Object.entries(schema)) {
        const fieldValue = value?.[key];
        const newPath = path ? `${path}.${key}` : key;

        result[key] = resolveFields(resolver, fieldValue, newPath, value);
      }

      return result;
    }

    return value;
  };

  const resolved = resolveFields(
    fieldTransformer.fields({ get, transformer: dataTransformer }),
    args,
  );

  return resolved;
}
