import { Question } from "../../enterprises/entities/question.js";
import { QuestionRepository } from "../repositories/questions-repository.js";
import { CreateQuestionUseCase } from "./create-question.js";

test("It should be able to create a question", async () => {
  const fakeQuestionRepository: QuestionRepository = {
    create: async (question: Question) => {
      return;
    },
  };

  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionRepository,
  );

  const { question } = await createQuestionUseCase.execute({
    authorId: "author-1",
    title: "New question",
    content: "New question content",
  });

  await expect(question.id).toBeTruthy();
});
