import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "@/test/factories/make-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.js";
import { ChooseBestAnswerUseCase } from "./choose-best-answer.js";
import { makeAnswer } from "@/test/factories/make-answer.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseBestAnswerUseCase;

describe("choose best answer use case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new ChooseBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    );
  });

  it("should be able to choose the best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0]?.bestAnswerId).toEqual(
      answer.id,
    );
  });

  it("should not be able to choose the best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId("author-1"),
    });

    const answer = makeAnswer({
      questionId: question.id,
    });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        answerId: answer.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
