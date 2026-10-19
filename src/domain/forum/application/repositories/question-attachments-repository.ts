import { QuestionAttachment } from "../../enterprises/entities/question-attachment.js";

export interface QuestionsAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}
