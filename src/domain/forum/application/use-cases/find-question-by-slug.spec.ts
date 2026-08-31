import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.js";
import { FindQuestionBySlugUseCase } from "./find-question-by-slug.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Question } from "../../enterprises/entities/question.js";
import { makeQuestion } from "@/test/factories/make-question.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FindQuestionBySlugUseCase;

describe("find question by slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FindQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("Should be able to find a question", async () => {
    const newQuestion = makeQuestion({ title: "an example title" });
    inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({ slug: "an-example-title" });
    await expect(question.title).toEqual("an example title");
  });
});
