// Create Analytics SDK
// Queue events and send them sequentially with 1s delay; retry on every 5th attempt

class SDK {
  constructor() {
    this.queue = [];
    this.count = 1;
    this.sending = false;
    this.results = [];
  }

  logEvent(ev) {
    this.queue.push(ev);
  }

  wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.count % 5 === 0) {
          reject();
        } else {
          resolve();
        }
      }, 1000);
    });
  }

  async sendAnalytics() {
    if (this.queue.length === 0) {
      this.sending = false;
      return;
    }
    let event = this.queue.shift();
    try {
      await this.wait();
      this.results.push({ event, attempt: this.count, status: "success" });
      console.log(`Analytics sent ${event}`);
      this.count++;
    } catch (error) {
      this.results.push({ event, attempt: this.count, status: "retry" });
      console.log("-----------------------");
      console.log(`Failed to send ${event}`);
      console.log(`Retrying sending ${event}`);
      console.log("-----------------------");

      this.count++;
      this.queue.unshift(event);
    }
    await this.sendAnalytics();
  }

  send() {
    if (this.sending) {
      return;
    }
    this.sending = true;
    return this.sendAnalytics();
  }
}

// --- Tests ---

async function testSDK() {
  // Test 1: events 1-4 all succeed (no retries expected)
  {
    const sdk = new SDK(0);
    for (let i = 1; i <= 4; i++) sdk.logEvent(`event ${i}`);
    await sdk.send();
    const allSuccess = sdk.results.every((r) => r.status === "success");
    console.log(`[SDK] events 1-4 succeed: ${allSuccess ? "Success" : "Fail"}`);
  }

  // Test 2: 5th attempt triggers a retry
  {
    const sdk = new SDK(0);
    for (let i = 1; i <= 5; i++) sdk.logEvent(`event ${i}`);
    await sdk.send();
    const attempt5 = sdk.results.find((r) => r.attempt === 5);
    console.log(
      `[SDK] 5th attempt retries: ${attempt5?.status === "retry" ? "Success" : "Fail"}`,
    );
  }

  // Test 3: retried event eventually succeeds
  {
    const sdk = new SDK(0);
    for (let i = 1; i <= 5; i++) sdk.logEvent(`event ${i}`);
    await sdk.send();
    const ev5 = sdk.results.filter((r) => r.event === "event 5");
    const retried = ev5.some((r) => r.status === "retry");
    const succeeded = ev5.some((r) => r.status === "success");
    console.log(
      `[SDK] event 5 retries then succeeds: ${retried && succeeded ? "Success" : "Fail"}`,
    );
  }

  // Test 4: attempts 5 and 10 both retry across 10 events
  {
    const sdk = new SDK(0);
    for (let i = 1; i <= 10; i++) sdk.logEvent(`event ${i}`);
    await sdk.send();
    const retryAttempts = sdk.results
      .filter((r) => r.status === "retry")
      .map((r) => r.attempt);
    console.log(
      `[SDK] retries on attempts 5 and 10: ${retryAttempts.includes(5) && retryAttempts.includes(10) ? "Success" : "Fail"}`,
    );
  }

  // Test 5: events are sent in order
  {
    const sdk = new SDK(0);
    ["a", "b", "c"].forEach((e) => sdk.logEvent(e));
    await sdk.send();
    const order = sdk.results
      .filter((r) => r.status === "success")
      .map((r) => r.event);
    console.log(
      `[SDK] events sent in order: ${JSON.stringify(order) === '["a","b","c"]' ? "Success" : "Fail"}`,
    );
  }

  // Test 6: queue fully drained after send
  {
    const sdk = new SDK(0);
    for (let i = 1; i <= 6; i++) sdk.logEvent(`e${i}`);
    await sdk.send();
    console.log(
      `[SDK] queue fully drained: ${sdk.queue.length === 0 ? "Success" : "Fail"}`,
    );
  }
}

testSDK();
