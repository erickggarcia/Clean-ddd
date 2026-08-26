import { Question } from "../../enterprises/entities/question.js";

export interface QuestionsRepository {
  create(question: Question): Promise<void>;
}
