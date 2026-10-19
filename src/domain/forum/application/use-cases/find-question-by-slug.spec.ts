import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.js";
import { FindQuestionBySlugUseCase } from "./find-question-by-slug.js";
import { makeQuestion } from "@/test/factories/make-question.js";
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository.js";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FindQuestionBySlugUseCase;

describe("find question by slug", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new FindQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("Should be able to find a question", async () => {
    const newQuestion = makeQuestion({ title: "an example title" });
    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({ slug: "an-example-title" });

    expect(result.isRight()).toBe(true);
    expect(result.value).toMatchObject({
      question: expect.objectContaining({ title: "an example title" }),
    });
  });
});
