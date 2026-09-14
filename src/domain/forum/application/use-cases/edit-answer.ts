import { AnswersRepository } from "../repositories/answers-repository.js";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    answer.content = content;

    await this.answersRepository.save(answer);
  }
}
