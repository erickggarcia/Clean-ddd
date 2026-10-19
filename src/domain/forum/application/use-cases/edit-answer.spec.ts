import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";
import { EditAnswerUseCase } from "./edit-answer.js";
import { makeAnswer } from "@/test/factories/make-answer.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";
import { InMemoryAnswerAttachmentsRepository } from "@/test/repositories/in-memory-answer-attachments-repository.js";
import { makeAnswerAttachment } from "@/test/factories/make-answer-attachment.js";

let sut: EditAnswerUseCase;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe("edit answer use case", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    );
  });

  it("should be able to edit a answer", async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
        content: "Original content",
      },
      new UniqueEntityId("answer-1"),
    );

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: answer.id,
        attachmentId: new UniqueEntityId("1"),
      }),
      makeAnswerAttachment({
        answerId: answer.id,
        attachmentId: new UniqueEntityId("2"),
      }),
    );

    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      authorId: "author-1",
      answerId: "answer-1",
      content: "updated content",
      attachmentsIds: ["1", "3"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "updated content",
    });

    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityId("3") }),
      ],
    );
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
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
