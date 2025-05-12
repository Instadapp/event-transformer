import { describe, it, expect } from "vitest";
import { EventTransformer, resolveFieldTransformer } from "../src";
import { schema3 } from "../src/schemas";
import type { SimulationRaw } from "../src/types/dataset";

describe("Schema", async () => {
  const transformer = await EventTransformer.init(1);

  it("should correctly transform event data", () => {
    const event: SimulationRaw = {
      address: "0x52aa899454998be5b000ad077a46bbe360f4e497",
      topics: [
        "0x96c40bed7fc8d0ac41633a3bd47f254f0b0076e5df70975c51d23514bc49d3b8",
        "0x0000000000000000000000002260fac5e5542a773aa44fbcfedf7c193bc2c599",
        "0x000000000000000000000000000000000000000000000000000000ea4b97de05",
        "0x000000000000000000000000000000000000000000000000000000ecc5671fad",
      ],
      data: "0x00000000000000000000000000000000000000000000000000000000000000cf00000000000000000000000000000000000000000000000000000000000010bc",
    };

    const resolved = resolveFieldTransformer(schema3, transformer, event);

    expect(resolved.token.__type).toBe("token");

    expect(resolved.supplyExchangePrice).toBeDefined();
    expect(typeof resolved.supplyExchangePrice).toBe("string");

    expect(resolved.borrowExchangePrice).toBeDefined();
    expect(typeof resolved.borrowExchangePrice).toBe("string");
  });
});
