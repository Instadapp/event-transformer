# Event Transformer Schema Creation Guide

## createAbiSchema Function

The `createAbiSchema` function is a utility for transforming Ethereum event logs into structured, type-safe data with automatic value conversions. It helps you define how raw event data should be parsed and transformed.

### Basic Structure

```typescript
createAbiSchema({
  signature: string,
  fields: ({ transformer }) => Record<string, FieldTransformer>
})
```

### Parameters

1. `signature`: Ethereum event signature string that defines:
   - Event name
   - Parameter types and names
   - Event structure and format

2. `fields`: A function that receives a transformer object and returns field definitions

### Field Transformers

Each field can use the following transformer methods:

- `toToken()`: Converts address to token object
- `toDecimals(token)`: Converts value to proper decimal representation
- `toPercentage(base)`: Converts value to percentage (usually with base 1e18)
- `toAddress()`: Formats address with checksum
- `toVault()`: Converts address to vault object

### Example Usage

```typescript
const schema = createAbiSchema({
  signature: "event LogUpdateExchangePrices(address token, uint256 supplyExchangePrice, uint256 borrowExchangePrice, uint256 borrowRate, uint256 utilization)",
  fields: ({ transformer }) => ({
    // Transform token address
    token: ({ value }) => {
      return transformer.transform(value).toToken();
    },
    // Transform price with token decimals
    supplyExchangePrice: ({ value, item }) => {
      return transformer
        .transform(value)
        .toDecimals(transformer.transform(item.token).toToken());
    },
    // Transform percentage values
    borrowRate: ({ value }) => {
      return transformer.transform(value).toPercentage(1e18);
    }
  })
});
```

### Field Transformer Context

Each field transformer receives an object with:

- `value`: The raw value from the event log
- `item`: Access to other fields in the event

### Common Patterns

1. Token Amount Transformation:
```typescript
amount: ({ value, item }) => {
  const token = transformer.transform(item.token).toToken();
  return transformer.transform(value).toDecimals(token);
}
```

2. Percentage Values:
```typescript
rate: ({ value }) => {
  return transformer.transform(value).toPercentage(1e18);
}
```

3. Address Formatting:
```typescript
account: ({ value }) => {
  return transformer.transform(value).toAddress();
}
```

### Testing Schemas

Test your schemas by:
1. Creating test events with known values
2. Using `resolveFieldTransformer` to process the event
3. Verifying the transformed output

```typescript
const event = {
  address: "0x...",
  topics: [...],
  data: "0x..."
};

const resolved = resolveFieldTransformer(schema, transformer, event);
expect(resolved.token.__type).toBe("token");
expect(typeof resolved.amount).toBe("string");
```

Remember to test edge cases and different value formats to ensure robust transformation.