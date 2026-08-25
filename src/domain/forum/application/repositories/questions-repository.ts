import { Question } from "../../enterprises/entities/question.js";

export interface QuestionRepository {
  create(question: Question): Promise<void>;
}
