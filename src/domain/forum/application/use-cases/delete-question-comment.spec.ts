import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository.js";
import { DeleteQuestionsCommentUseCase } from "./delete-question-comment.js";
import { makeQuestionComment } from "@/test/factories/make-question-comment.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionsCommentUseCase;

describe("question comment use case", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionsCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment();
    await inMemoryQuestionCommentsRepository.create(questionComment);
    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId("author-1"),
    });
    await inMemoryQuestionCommentsRepository.create(questionComment);

    expect(async () => {
      await sut.execute({
        authorId: "author-2",
        questionCommentId: questionComment.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
