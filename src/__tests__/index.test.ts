import { Greeter } from ".."

describe("greet", () => {
  it("should return 'Hello, world!'", () => {
    expect(Greeter()).toBe("Hello, world!")
  })
})
