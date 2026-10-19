import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.js";
import { Answer } from "@/domain/forum/enterprises/entities/answer.js";
import { InMemoryAnswerAttachmentsRepository } from "./in-memory-answer-attachments-repository.js";

export class InMemoryAnswersRepository implements AnswersRepository {
  constructor(
    private readonly answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository,
  ) {}

  public items: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === answerId);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    );

    if (answerIndex >= 0) {
      this.items[answerIndex] = answer;
    }
  }

  async delete(answer: Answer): Promise<void> {
    const asnwerIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    );

    this.items.splice(asnwerIndex, 1);
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }
}
