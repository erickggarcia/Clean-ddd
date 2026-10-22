import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { Question } from "../../enterprise/entities/question.js";

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>;
  findById(id: string): Promise<Question | null>;
  findManyRecent({ page }: PaginationParams): Promise<Question[]>;
  delete(question: Question): Promise<void>;
  create(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
}
