import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository.js";
import { Question } from "@/domain/forum/enterprises/entities/question.js";

export class InMemoryQuestionsRepository implements QuestionsRepository {
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

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    );

    this.items.splice(questionIndex, 1);
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
