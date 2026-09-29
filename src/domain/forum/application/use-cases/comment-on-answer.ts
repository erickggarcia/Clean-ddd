import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { AnswersCommentRepository } from "../repositories/answers-comment-repository.js";
import { AnswerComment } from "../../enterprises/entities/answer-comment.js";
import { AnswersRepository } from "../repositories/answers-repository.js";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersCommentRepository: AnswersCommentRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answersCommentRepository.create(answerComment);

    return {
      answerComment,
    };
  }
}
