import { InMemoryAnswerAttachmentsRepository } from "@/test/repositories/in-memory-answer-attachments-repository.js";
import { AnswerQuestionUseCase } from "./answer-question.js";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswerQuestionsRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("answer question", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswerQuestionsRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
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
