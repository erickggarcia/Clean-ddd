import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository.js";
import { CommentOnAnswerUseCase } from "./comment-on-answer.js";
import { makeQuestion } from "@/test/factories/make-question.js";
import { makeAnswer } from "@/test/factories/make-answer.js";
import { InMemoryAnswerAttachmentsRepository } from "@/test/repositories/in-memory-answer-attachments-repository.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("create answer comment", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerCommentsRepository,
      inMemoryAnswersRepository,
    );
  });

  it("It should be able to create an answer comment", async () => {
    const answer = makeAnswer();
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: "New answer comment",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerCommentsRepository.items[0]?.content).toEqual(
      "New answer comment",
    );
  });
});
