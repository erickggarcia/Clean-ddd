import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers.js";
import { makeQuestionComment } from "@/test/factories/make-question-comment.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository.js";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments.js";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("fetch question comments by question id", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it("Should be able to fetch question comments", async () => {
    inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-1") }),
    );
    inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-1") }),
    );
    inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-1") }),
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.questionComments).toHaveLength(3);
  });

  it("Should be able to fetch paginated question comments", async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId("question-1") }),
      );
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.questionComments).toHaveLength(2);
  });
});
