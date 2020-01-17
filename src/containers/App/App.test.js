import App from "./App";
import Start from "../../components/Messages/Start/Start";
import Questions from "../../components/Questions/Questions";

describe("Testing <App />", () => {
  beforeEach(done => {
    const mockSuccessResponse = { questions: [...finalQuestions] };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    wrapper = mount(<App />);
    done();
  });

  afterEach(cleanup);

  it("should render <Start>", () => {
    expect(wrapper.find(Start)).toHaveLength(1);
  });
});
