import Start from "./Start";
let startHandlerMock = jest.fn();

describe("Testing <Start />", () => {
  beforeEach(() => {
    wrapper = shallow(
      <Start startHandler={startHandlerMock} disabled={false} />
    );
  });

  afterEach(cleanup);

  it("should render 2 nodes", () => {
    expect(wrapper.children()).toHaveLength(2);
  });

  it("should call the startHandler when button clicked", () => {
    expect(startHandlerMock.mock.calls.length).toBe(0);
    wrapper.find("button").invoke("onClick")();
    expect(startHandlerMock.mock.calls.length).toBe(1);
  });
});
