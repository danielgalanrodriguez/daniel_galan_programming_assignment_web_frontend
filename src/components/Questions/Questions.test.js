import Questions from "./Questions";

let answerValues = { correct: 1, wrong: 0, unanswered: -1 };
let mockSetUserAnswers = jest.fn();
const generateRandomNumber = limit => {
  return Math.floor(Math.random() * limit);
};

describe("Testing <Questions />", () => {
  beforeEach(() => {
    wrapper = shallow(
      <Questions
        answerValues={answerValues}
        questions={finalQuestions}
        generateRandomNumber={generateRandomNumber}
        seUserAnswers={mockSetUserAnswers}
      />
    );
  });

  afterEach(cleanup);

  it("should render 5 nodes", () => {
    expect(wrapper.children()).toHaveLength(5);
  });

  it("should trigger time lifeline", () => {
    expect(wrapper.find(".disable-button")).toHaveLength(0);

    wrapper.find(".btn-more-time").invoke("onClick")();
    expect(wrapper.find(".disable-button")).toHaveLength(1);
  });

  it("should trigger 50/50 lifeline", () => {
    expect(wrapper.find(".disable-button")).toHaveLength(0);

    wrapper.find(".btn-50-50").invoke("onClick")();
    expect(wrapper.find(".disable-button")).toHaveLength(1);
  });
});
