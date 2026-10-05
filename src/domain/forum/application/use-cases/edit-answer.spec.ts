import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";
import { EditAnswerUseCase } from "./edit-answer.js";
import { makeAnswer } from "@/test/factories/make-answer.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

let sut: EditAnswerUseCase;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe("edit answer use case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
        content: "Original content",
      },
      new UniqueEntityId("answer-1"),
    );

    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      authorId: "author-1",
      answerId: "answer-1",
      content: "updated content",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "updated content",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
        content: "Original content",
      },
      new UniqueEntityId("answer-1"),
    );

    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      authorId: "author-2",
      answerId: "answer-1",
      content: "updated content",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
