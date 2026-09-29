import { Entity } from "@/core/entities/entity.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import type { Optional } from "@/core/types/optional.js";
import { Comment, CommentProps } from "./comment.js";

export interface QuestionCommentProps extends CommentProps {
  authorId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get authorId() {
    return this.props.authorId;
  }

  static create(
    props: Optional<QuestionCommentProps, "createdAt">,
    id?: UniqueEntityId,
  ) {
    const question = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return question;
  }
}
