import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Either, left, right } from "@/core/either.js";
import { QuestionsCommentRepository } from "../repositories/questions-comment-repository.js";
import { QuestionComment } from "../../enterprises/entities/question-comment.js";
import { QuestionsRepository } from "../repositories/questions-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsCommentRepository: QuestionsCommentRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionsCommentRepository.create(questionComment);

    return right({
      questionComment,
    });
  }
}
