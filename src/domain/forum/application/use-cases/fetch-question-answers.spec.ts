import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers.js";
import { makeAnswer } from "@/test/factories/make-answer.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { InMemoryAnswerAttachmentsRepository } from "@/test/repositories/in-memory-answer-attachments-repository.js";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("fetch answers by question id", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("Should be able to fetch question answers", async () => {
    inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") }),
    );
    inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") }),
    );
    inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") }),
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.answers).toHaveLength(3);
  });

  it("Should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityId("question-1") }),
      );
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.answers).toHaveLength(2);
  });
});
