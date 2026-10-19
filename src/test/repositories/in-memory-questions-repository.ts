import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository.js";
import { Question } from "@/domain/forum/enterprises/entities/question.js";
import { InMemoryQuestionAttachmentsRepository } from "./in-memory-question-attachments-repository.js";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  constructor(
    private inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
  ) {}

  public items: Question[] = [];

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) return null;

    return question;
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    );

    this.items.splice(questionIndex, 1);
    this.inMemoryQuestionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    );
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    );

    if (questionIndex >= 0) {
      this.items[questionIndex] = question;
    }
  }
}
