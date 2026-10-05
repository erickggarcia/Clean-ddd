import { AnswerQuestionUseCase } from "./answer-question.js";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";

let inMemoryAnswerQuestionsRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("answer question", () => {
  beforeEach(() => {
    inMemoryAnswerQuestionsRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerQuestionsRepository);
  });

  test("create an answer", async () => {
    const result = await sut.execute({
      questionId: "question-1",
      instructorId: "instructor-1",
      content: "Nova resposta",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.answer.content).toEqual("Nova resposta");
    expect(inMemoryAnswerQuestionsRepository.items[0]).toEqual(
      result.value?.answer,
    );
  });
});
