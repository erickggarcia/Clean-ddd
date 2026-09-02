import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";
import { DeleteAnswerUseCase } from "./delete-answer.js";
import { makeAnswer } from "@/test/factories/make-answer.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("delete answer use case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete an answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
        questionId: new UniqueEntityId("question-1"),
      },
      new UniqueEntityId("answer-1"),
    );

    inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({ authorId: "author-1", answerId: "answer-1" });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
        questionId: new UniqueEntityId("question-1"),
      },
      new UniqueEntityId("answer-1"),
    );

    inMemoryAnswersRepository.create(newAnswer);

    expect(inMemoryAnswersRepository.items).toHaveLength(1);
    expect(() => {
      return sut.execute({ authorId: "author-2", answerId: "answer-1" });
    }).rejects.toBeInstanceOf(Error);
  });
});
