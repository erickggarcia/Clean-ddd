import { AnswersRepository } from "../repositories/answers-repository.js";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("not allowed.");
    }

    await this.answersRepository.delete(answer);
  }
}
