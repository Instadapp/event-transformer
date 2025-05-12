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
      return transformer.transform(value).toPercentage(1e18);
    },
    utilization: ({ value }) => {
      return transformer.transform(value).toPercentage(1e18);
    },
  }),
});
