const assert = require("assert");

const addon = require("..");

describe("Extractors", () => {
  it("Single Argument", () => {
    assert.strictEqual(addon.extract_single_add_one(41), 42);
  });

  it("Kitchen Sink", () => {
    const symbol = Symbol("Test");

    assert.deepStrictEqual(
      addon.extract_values(
        true,
        42,
        undefined,
        "hello",
        new Date(0),
        symbol,
        100,
        "exists"
      ),
      [true, 42, "hello", new Date(0), symbol, 100, "exists"]
    );

    // Pass `null` and `undefined` for `None`
    assert.deepStrictEqual(
      addon.extract_values(
        true,
        42,
        undefined,
        "hello",
        new Date(0),
        symbol,
        null
      ),
      [true, 42, "hello", new Date(0), symbol, undefined, undefined]
    );
  });

  it("Buffers", () => {
    const test = (TypedArray) => {
      const buf = new ArrayBuffer(24);
      const view = new TypedArray(buf);

      view[0] = 8;
      view[1] = 16;
      view[2] = 18;

      assert.strictEqual(addon.extract_buffer_sum(view), 42);
    };

    test(Uint8Array);
    test(Uint16Array);
    test(Uint32Array);
    test(Int8Array);
    test(Int16Array);
    test(Int32Array);
    test(Float32Array);
    test(Float64Array);
  });

  it("JSON", () => {
    assert.strictEqual(addon.extract_json_sum([1, 2, 3, 4]), 10);
    assert.strictEqual(addon.extract_json_sum([8, 16, 18]), 42);
  });
});
