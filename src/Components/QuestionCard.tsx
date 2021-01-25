import React, { useState } from 'react';
import { questionPropsType } from './../Types/quiz_types'

const QuestionCard: React.FC<questionPropsType> = ({ question, option, callback ,num,steps,colorr}) => {

    let [selectedAns, setSelectedAns] = useState("");
   

    const handleSelection = (ev: any) => {
        setSelectedAns(ev.target.value);
      
    }

    return (
        <div className="question-container">
            <div className="question">
            <h4>{"QUESTION " + (steps+1) +"/" + num}</h4>
                <h2>{question}</h2>
            
            </div>

            <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
                className="question-form"
                >
                {
                    option.map((opt: string, ind: number) => {
                      
                        return (
                            <div key={ind}>
                                <label className="radio">
                                    <input type="radio"
                                       name="question"
                                       required
                                       checked={selectedAns === opt}
                                       onChange={handleSelection}
                                       value={opt}


                                    />
                                    {opt}
                                   
                                </label>
                            </div>
                        )
                    })
                }

             
                <input  type="submit" className="submit" value={!((steps+1)===num ) ? "NEXTQUESTION" : "SUBMIT"}/>
            </form>
        </div>
    )
}

export default QuestionCard;