import Countdown from "./Countdown";

const setNeedResetMock = jest.fn();
const setNeedModificationMock = jest.fn();
const countdownEndHandler = jest.fn();
const createCountdownProps = () => {
  return {
    maxSeconds: 15,
    secondsToModify: 10,
    endHandler: countdownEndHandler,
    setNeedReset: setNeedResetMock,
    setNeedModification: setNeedModificationMock
  };
};
let props = createCountdownProps();

describe("Testing <Countdown />", () => {
  beforeEach(() => {
    wrapper = shallow(
      <Countdown {...props} needReset={false} needModification={false} />
    );
  });

  afterEach(cleanup);

  it("should render 2 nodes", () => {
    expect(wrapper.children()).toHaveLength(2);
  });
});
