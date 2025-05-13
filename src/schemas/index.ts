import type { FormatAbiItem } from "abitype";
import { createAbiSchema } from "../transformer";

export const schema = createAbiSchema({
  signature:
    "event LogCollectRevenue(address indexed token, uint256 indexed amount)",
  fields: ({ transformer }) => ({
    amount: ({ value, item }) => {
      const token = transformer.transform(item.token).toToken();

      return transformer.transform(value).toDecimals(token);
    },
    token: ({ value }) => {
      return transformer.transform(value).toToken();
    },
  }),
});

export const schema2 = createAbiSchema({
  signature:
    "event LogSetVaultAuth(address indexed vaultAuth, bool indexed allowed, address indexed vault)",
  fields: ({ transformer }) => ({
    vault: ({ value }) => {
      return transformer.transform(value).toVault();
    },
    allowed: ({ value }) => {
      return value;
    },
    vaultAuth: ({ value }) => {
      return transformer.transform(value).toAddress();
    },
  }),
});

export const schema3 = createAbiSchema({
  signature:
    "event LogUpdateExchangePrices(address indexed token, uint256 indexed supplyExchangePrice, uint256 indexed borrowExchangePrice, uint256 borrowRate, uint256 utilization)",
  fields: ({ transformer }) => ({
    token: ({ value }) => {
      return transformer.transform(value).toToken();
    },
    supplyExchangePrice: ({ value, item }) => {
      return transformer
        .transform(value)
        .toDecimals(transformer.transform(item.token).toToken());
    },
    borrowExchangePrice: ({ value, item }) => {
      return transformer
        .transform(value)
        .toDecimals(transformer.transform(item.token).toToken());
    },
    borrowRate: ({ value }) => {
      return transformer.transform(value).toPercentage(100);
    },
    utilization: ({ value }) => {
      return transformer.transform(value).toPercentage(100);
    },
  }),
});

// type selam = FormatAbiItem<>;

export const schema4 = createAbiSchema({
  signature:
    "event LogUpdateUserSupplyConfigs((address user, address token, uint8 mode, uint256 expandPercent, uint256 expandDuration, uint256 baseWithdrawalLimit)[] userSupplyConfigs)",
  fields: ({ transformer }) => ({
    userSupplyConfigs: {
      user: ({ value }) => {
        return value;
      },
      mode: ({ value }) => {
        return value;
      },
      token: ({ value }) => {
        return transformer.transform(value).toToken();
      },
      expandPercent: ({ value }) => {
        return transformer.transform(value).toPercentage(100);
      },
      expandDuration: ({ value }) => {
        return value;
      },
      baseWithdrawalLimit: ({ value, item }) => {
        const token = transformer.transform(item.token).toToken();

        return transformer.transform(value).toDecimals(token);
      },
    },
  }),
});
