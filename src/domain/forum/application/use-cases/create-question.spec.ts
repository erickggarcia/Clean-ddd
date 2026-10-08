import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.js";
import { CreateQuestionUseCase } from "./create-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("create question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("It should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "author-1",
      title: "New question",
      content: "New question content",
      attachmentIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question,
    );
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2);
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityId("2") }),
    ]);
  });
});
