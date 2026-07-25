import { AnswerQuestionUseCase } from './answer-question.js';
import { AnswerRepository } from '../repositories/answers-repository.js';
import { Answer } from '../entities/answer.js';

const fakeAnswerRepository: AnswerRepository = {
    create: async function (answer: Answer) : Promise<void> {
        return; 
    }
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
        questionId: 'question-1',
        instructorId: 'instructor-1',
        content: 'Nova resposta'
    })

    expect(answer.content).toEqual('Nova resposta')
})