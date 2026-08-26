import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.js";
import { CreateQuestionUseCase } from "./create-question.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("create question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("It should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "author-1",
      title: "New question",
      content: "New question content",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0]?.id).toEqual(question.id);
  });
});
