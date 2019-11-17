import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {}, // {[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: "success" "error"}
        quiz: [
            {
                question: 'Сколько веток метро в Санкт-Петербурге?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: '4', id: 1},
                    {text: '5', id: 2},
                    {text: '7', id: 3},
                    {text: '3', id: 4},
                ]
            },
            {
                question: 'Как называется площадь на которой находиться Эрмитаж?',
                rightAnswerId: 4,
                id: 2,
                answers: [
                    {text: 'Площаль Александра Невского', id: 1},
                    {text: 'Адрмиралтейская площадь', id: 2},
                    {text: 'Царская площадь', id: 3},
                    {text: 'Дворцовская площадь', id: 4},
                ]
            },
            {
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswerId: 3,
                id: 3,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1800', id: 4},
                ]
            }

        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
               results[question.id] = 'success' 
            }
            this.setState ({
                answerState: {[answerId]: 'success'},
                results
            })
            const timeout = window.setTimeout(() => {
            if (this.isQuizFinished()) {
                this.setState({
                    isFinished: true
                })
            } else {
                this.setState ({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })}
                window.clearTimeout(timeout)
            }, 1000)
        }
 
        else {
            results[question.id] = 'error'
            this.setState ({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }
    isQuizFinished () {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler = () => {
        this.setState ({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    render () {
        return (
            <div className = {classes.Quiz}> 
                
                <div className = {classes.QuizWrapper}>

                    <h1>Вопросы</h1>

                    {
                        this.state.isFinished 
                        ? 
                        <FinishedQuiz 
                            results = {this.state.results}
                            quiz = {this.state.quiz}
                            onRetry = {this.retryHandler}
                         />
                        :
                        <ActiveQuiz 
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick = {this.onAnswerClickHandler}
                        quizLength = {this.state.quiz.length}
                        answerNumber = {this.state.activeQuestion + 1}
                        state = {this.state.answerState} />
                    }
                    
                </div>
            </div>
        )
            
        
    }
}
export default Quiz