const test = require("node:test");
const assert = require("node:assert/strict");
const { transformFinancialData } = require("../transformations/transformFinancialData");

test("transformFinancialData maps ERP user records to financial records", () => {
  const records = transformFinancialData([
    {
      username: "gl-account-101",
      company: { name: "Iksha Labs Demo" },
    },
  ]);

  assert.equal(records.length, 1);
  assert.equal(records[0].company, "Iksha Labs Demo");
  assert.equal(records[0].account, "gl-account-101");
  assert.equal(records[0].year, 2024);
  assert.equal(typeof records[0].amount, "number");
});
