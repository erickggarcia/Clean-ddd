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
    const { answer } = await sut.execute({
      questionId: "question-1",
      instructorId: "instructor-1",
      content: "Nova resposta",
    });

    expect(answer.content).toEqual("Nova resposta");
    expect(inMemoryAnswerQuestionsRepository.items[0]?.id).toEqual(answer.id);
  });
});
