import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from './services/quiz_service';
import { QuizType } from './Types/quiz_types';
import QuestionCard from './Components/QuestionCard';


function App() {
 

  const [difficultyLevel, setDifficultyLevel] = useState('')
  const [totalQuestions, setTotalQuestions] = useState(0)
  let [quiz, setQuiz] = useState<QuizType[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)
  let [show,setshow]=useState(false);
  let [style,setstyle]=useState("");
  
  let handleQuestions = (e: any) => {
    setTotalQuestions(e.target.value)  
    

  }

  let handleDifficulty = (e: any) => {
    setDifficultyLevel(e.target.value)   
    console.log(difficultyLevel)
    
  }
  const fetchQuiz = () => {
    setshow(true)  
     
  }
  const fetchagain = () => {
    window.location.reload();
      
  }
  
  let handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    let currentQuestion: QuizType = quiz[currentStep];
    console.log("correct Answer: " + currentQuestion.correct_answer + "--user Selection:" + userAns)
    
    if (userAns === currentQuestion.correct_answer) {
      setstyle(currentQuestion.correct_answer)
      setScore(++score);
    }
    

    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep);
    else {  
      setShowResult(true);
    }
  }

  
  useEffect(() => {
    async function fetchData() {
      
      
      const questions: QuizType[] = await getQuizDetails(totalQuestions,difficultyLevel);
   
      setQuiz(questions)
    }
    fetchData();
  }, [totalQuestions, difficultyLevel, show]);
  if(showResult){
    return (
      <div className='quiz-container'>
      <h1>Quiz App</h1>
      
        <h2>Result</h2>
        <p className="result-text1">
          Your final score is 
            <b> {score}</b> out of <b>{quiz.length}</b>  
            <br/> 
            <button onClick={fetchagain} className='play'>Try Again</button>
        </p>
       
     
    </div>
    );
  } 
  
  if(show){
    if (!quiz.length)
    return <h3>Loading.. </h3>
    else
    return(
    <div className="App">
    <h1 className="result-title">Quiz App</h1>
      <p className="result-text">
        Your current score is 
          <b> {score}</b> out of <b>{quiz.length}</b>   
       
      </p>
    
    <QuestionCard
      option={quiz[currentStep].option}
      question={quiz[currentStep].question}
      callback={handleSubmit}
      colorr={style}
      num={totalQuestions}
      steps={currentStep}
    />
  </div>    );
  }

   
  return (

    
    <div className='quiz-container'>
    <h1 >Quiz Application</h1>
    <div >
        <h2>Test Your Knowledge</h2>
        <div >
            <label >Select a dificult level</label>
            <select name='difficulty-level' onChange={handleDifficulty} required>

            <option value='' >Select Level </option>
            <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </select>
        </div>
        <div >
            <label  >Select number of Questions</label>
            <select  name='questions' onChange={handleQuestions} required> 

              <option value=''  >Select Number </option>
              
                <option value= {5} >5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>
        </div>
        <div>
            <button onClick={fetchQuiz} className='play'>Play</button>
        </div>
    </div>
</div>
  
    
  );
 
  

}

export default App;
