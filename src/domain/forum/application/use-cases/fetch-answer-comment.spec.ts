import { makeAnswerComment } from "@/test/factories/make-answer-comment.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository.js";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comment.js";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("fetch answer comments by answer id", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it("Should be able to fetch answer comments", async () => {
    inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("answer-1") }),
    );
    inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("answer-1") }),
    );
    inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("answer-1") }),
    );

    const { answerComments } = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });
    await expect(answerComments).toHaveLength(3);
  });

  it("Should be able to fetch paginated answer comments", async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId("answer-1") }),
      );
    }

    const { answerComments } = await sut.execute({
      answerId: "answer-1",
      page: 2,
    });
    await expect(answerComments).toHaveLength(2);
  });
});
