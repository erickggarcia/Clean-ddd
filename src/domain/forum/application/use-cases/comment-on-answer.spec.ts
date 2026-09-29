import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository.js";
import { CommentOnQuestionUseCase } from "./comment-on-question.js";
import { makeQuestion } from "@/test/factories/make-question.js";

let inMemoryQuestionsRepository: InMemoryAnswersRepository;
let inMemoryQuestionCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("create question comment", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryAnswersRepository();
    inMemoryQuestionCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionsRepository,
    );
  });

  it("It should be able to create a question comment", async () => {
    const question = makeQuestion();
    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: "New question comment",
    });

    expect(inMemoryQuestionCommentsRepository.items[0]?.content).toEqual(
      "New question comment",
    );
  });
});
