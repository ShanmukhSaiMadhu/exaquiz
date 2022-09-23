import React, {useState, useEffect} from 'react';
import './App.css';
import Questions from './components/Questions';
import Start from './components/Start'
import data from './components/data.js'
import {nanoid} from 'nanoid'

function App() {
  const [satrted, setStarted] = useState(false)
  const [count, setCount] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [checked, setChecked] = useState(false)
  const [questions, setQuestions] = useState([])

  const shuffleArray = ((arr) => arr.sort(() => Math.random() - 0.5))

  useEffect(() => {
    async function getQuestion () {
      const res = await fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple&encode=base64')
      const data = await res.json()
      let q = []
      data.results.forEach(question => {
        q.push({id:nanoid(), question: question.question, correct: question.correct_answer, selected: null, checked: false, answers:shuffleArray([...question.incorrect_answers, question.correct_answer])})
      })
      setQuestions(q)
    }
    getQuestion()
  }, [count])

  function handleCheck() {
    let selected = true
    questions.forEach(question => {
      if(question.selected === null) {
        selected = false
        return
      }
    })

    if(!selected) {
      return
    }

    setQuestions(questions => questions.map(question => {
      return {...question, checked: true}
    }))

    setChecked(true)
    let correct = 0
    questions.forEach(question => {
      if(question.correct === question.selected) {
        correct += 1
      }
    })
    setCorrect(correct)
  }

  function handleClickAnswer(id, answer) {
    setQuestions(questions => questions.map(question => {
      return question.id === id ? {...question, selected: answer} : question
    }))
  }

  function handlPlayAgain() {
    setCount(count => count + 1)
    setChecked(false)
  }

  const questionElement = questions ? questions.map(question => {
    return (
      <Questions 
        key={question.id}
        q={question}
        handleClickAnswer = {handleClickAnswer}
        id={question.id}
      />
    )
  }) : []
 
  function start () {
    setStarted(x => !x)
  }

  return (
    <div className="App">
      <div className='content-container'>
        {
          satrted ? 
          <div className='question-main'>
            {questionElement}
            <div className='check-btn-container'>
              {checked && <span className='score'>You scored{correct}/5 correct answers</span>}
              <button className='check-answer' onClick={checked ? handlPlayAgain : handleCheck}>{checked ? 'Play Again' : 'Check Answers'}</button>
            </div>
          </div>
          :
          <Start start={start} />
        }
      </div>
    </div>
  );
}

export default App;
