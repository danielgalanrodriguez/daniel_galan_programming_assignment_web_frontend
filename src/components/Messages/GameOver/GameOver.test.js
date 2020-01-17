import GameOver from "./GameOver";

describe("Testing <GameOver />", () => {
  beforeEach(() => {
    wrapper = shallow(<GameOver />);
  });

  afterEach(cleanup);

  it("should render 4 headers", () => {
    expect(wrapper.find("h1")).toHaveLength(4);
  });
});
