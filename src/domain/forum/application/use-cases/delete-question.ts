import { QuestionsRepository } from "../repositories/questions-repository.js";

interface DeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  async execute({ authorId, questionId }: DeleteQuestionUseCaseRequest) {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("not allowed");
    }

    await this.questionsRepository.delete(question);
  }
}
