import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.js";
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository.js";
import { CommentOnQuestionUseCase } from "./comment-on-question.js";
import { makeQuestion } from "@/test/factories/make-question.js";
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("create question comment", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionsRepository,
    );
  });

  it("It should be able to create a question comment", async () => {
    const question = makeQuestion();
    await inMemoryQuestionsRepository.create(question);

    const result = await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: "New question comment",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionCommentsRepository.items[0]?.content).toEqual(
      "New question comment",
    );
  });
});
