import Question from "./Question";

const handleAnswerClickMock = jest.fn();

describe("Testing <Question />", () => {
  beforeEach(() => {
    wrapper = shallow(
      <Question
        text={"currentQuestion.text"}
        image={"currentQuestion.image"}
        answers={["a", "b", "c", "d"]}
        numberOfAnswers={4}
        answersHideStatus={[false, false, false, false]}
        clickHandler={handleAnswerClickMock}
      />
    );
  });

  afterEach(cleanup);

  it("should render 4 buttons 1 image and 1 div", () => {
    expect(wrapper.find("button")).toHaveLength(4);
    expect(wrapper.find("img")).toHaveLength(1);
    expect(wrapper.children().find("div")).toHaveLength(1);
  });

  it("should call the clickHandler when an answer is clicked", () => {
    expect(handleAnswerClickMock.mock.calls.length).toBe(0);
    wrapper
      .find("button")
      .first()
      .invoke("onClick")();
    expect(handleAnswerClickMock.mock.calls.length).toBe(1);
  });
});
