import { client, getHello } from "./client";

describe("Test", async () => {
  it("should do nothing", () => {
    const { data } = await client.query({ query: getHello });

    expect(data.getHello).toBe("hello");
  });
});
