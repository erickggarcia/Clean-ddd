import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository.js";
import { AnswerAttachment } from "@/domain/forum/enterprises/entities/answer-attachment.js";

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  public items: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    return this.items.filter((answerAttachment) => {
      return answerAttachment.answerId.toString() === answerId;
    });
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachments = this.items.filter((answerAttachment) => {
      return answerAttachment.answerId.toString() !== answerId;
    });
    this.items = answerAttachments;
  }
}
