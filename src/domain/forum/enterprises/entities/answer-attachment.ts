import { Entity } from "@/core/entities/entity.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

interface AnswerAttachmentProps {
  answerId: string;
  attachmentId: string;
}

export class QuestionAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
    const questionAttachment = new QuestionAttachment(props, id);
    return questionAttachment;
  }
}
