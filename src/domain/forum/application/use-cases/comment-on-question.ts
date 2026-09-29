import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { QuestionsCommentRepository } from "../repositories/questions-coment-repository.js";
import { QuestionComment } from "../../enterprises/entities/question-comment.js";
import { QuestionsRepository } from "../repositories/questions-repository.js";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

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
      throw new Error("Question not found.");
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionsCommentRepository.create(questionComment);

    return {
      questionComment,
    };
  }
}
