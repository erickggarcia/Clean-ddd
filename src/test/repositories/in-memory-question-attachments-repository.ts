import { QuestionsAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository.js";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment.js";

export class InMemoryQuestionAttachmentsRepository implements QuestionsAttachmentsRepository {
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter((questionAttachment) => {
      return questionAttachment.questionId.toString() === questionId;
    });
    return questionAttachments;
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter((questionAttachment) => {
      return questionAttachment.questionId.toString() !== questionId;
    });
    this.items = questionAttachments;
  }
}
