import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "@/test/factories/make-question.js";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("fetch recent questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("Should be able to fetch recent questions", async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2026, 0, 20) }),
    );
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2026, 0, 18) }),
    );
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2026, 0, 22) }),
    );

    const { questions } = await sut.execute({ page: 1 });
    await expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2026, 0, 22) }),
      expect.objectContaining({ createdAt: new Date(2026, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2026, 0, 18) }),
    ]);
  });

  it("Should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionsRepository.create(makeQuestion());
    }

    const { questions } = await sut.execute({ page: 2 });
    await expect(questions).toHaveLength(2);
  });
});
