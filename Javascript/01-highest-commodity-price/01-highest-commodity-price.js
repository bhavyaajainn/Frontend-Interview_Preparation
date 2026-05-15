// Find Highest Commodity Price Under a Timestamp
// Asked in: Atlassian Frontend Interview

// Part 1: Base — highest price for a given timestamp
const Store = function () {
  this.store = new Map();

  this.add = (timeStamp, price) => {
    if (this.store.has(timeStamp)) {
      let currentPrice = this.store.get(timeStamp);
      if (currentPrice < price) {
        this.store.set(timeStamp, price);
      }
    } else {
      this.store.set(timeStamp, price);
    }
  };

  this.highestPrice = (timeStamp) => {
    return this.store.get(timeStamp);
  };
};

// Part 2: Followup — highest price up to a checkpoint
const StoreWithCheckpoint = function () {
  this.store = new Map();

  this.add = (timeStamp, price, checkpoint) => {
    if (this.store.has(timeStamp)) {
      let prices = this.store.get(timeStamp);
      this.store.set(timeStamp, [...prices, price]);
    } else {
      this.store.set(timeStamp, [price]);
    }
    if (checkpoint) {
      let prices = this.store.get(timeStamp);
      this.store.set(timeStamp, [...prices, checkpoint]);
    }
  };

  this.highestPrice = (timeStamp, checkpoint) => {
    let prices = this.store.get(timeStamp) ?? [];
    if (checkpoint) {
      let checkpointIndex = prices.findIndex((e) => e === checkpoint);
      prices = prices.slice(0, checkpointIndex);
    }
    let maxNum = -1;
    prices.forEach((element) => {
      if (element > maxNum) {
        maxNum = element;
      }
    });
    return maxNum;
  };
};

// --- Tests ---

function testStore() {
  const tests = [
    {
      label: "single timestamp, multiple prices",
      ops: [
        ["add", 1, 1],
        ["add", 1, 4],
        ["add", 1, 2],
      ],
      query: ["highestPrice", 1],
      expected: 4,
    },
    {
      label: "single entry",
      ops: [["add", 2, 10]],
      query: ["highestPrice", 2],
      expected: 10,
    },
    {
      label: "multiple timestamps, return correct one",
      ops: [
        ["add", 1, 5],
        ["add", 2, 100],
        ["add", 1, 3],
      ],
      query: ["highestPrice", 1],
      expected: 5,
    },
    {
      label: "prices added out of order",
      ops: [
        ["add", 3, 50],
        ["add", 3, 20],
        ["add", 3, 80],
        ["add", 3, 10],
      ],
      query: ["highestPrice", 3],
      expected: 80,
    },
  ];

  for (const { label, ops, query, expected } of tests) {
    const s = new Store();
    for (const [method, ...args] of ops) s[method](...args);
    const result = s[query[0]](...query.slice(1));
    const pass = result === expected;
    console.log(
      `[Store] ${label}: ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`,
    );
  }
}

function testStoreWithCheckpoint() {
  const tests = [
    {
      label: "checkpoint 'a' — max before it",
      ops: [
        ["add", 1, 1],
        ["add", 1, 4],
        ["add", 1, 2],
        ["add", 1, 3, "a"],
        ["add", 1, 6],
        ["add", 1, 7],
        ["add", 1, 8, "b"],
      ],
      query: ["highestPrice", 1, "a"],
      expected: 4,
    },
    {
      label: "checkpoint 'b' — max before it",
      ops: [
        ["add", 1, 1],
        ["add", 1, 4],
        ["add", 1, 2],
        ["add", 1, 3, "a"],
        ["add", 1, 6],
        ["add", 1, 7],
        ["add", 1, 8, "b"],
      ],
      query: ["highestPrice", 1, "b"],
      expected: 8,
    },
    {
      label: "no checkpoint — overall max",
      ops: [
        ["add", 1, 1],
        ["add", 1, 4],
        ["add", 1, 2],
        ["add", 1, 3, "a"],
        ["add", 1, 6],
        ["add", 1, 7],
        ["add", 1, 8, "b"],
      ],
      query: ["highestPrice", 1],
      expected: 8,
    },
  ];

  for (const { label, ops, query, expected } of tests) {
    const s = new StoreWithCheckpoint();
    for (const [method, ...args] of ops) s[method](...args);
    const result = s[query[0]](...query.slice(1));
    const pass = result === expected;
    console.log(
      `[StoreWithCheckpoint] ${label}: ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`,
    );
  }
}

testStore();
testStoreWithCheckpoint();
