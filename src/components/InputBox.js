import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const boxStyle = {border: "solid", borderWidth: "1px", width: "500px", marginBottom: "30px", paddingTop: "10px", paddingBottom: "10px", display: "flex", flexDirection: "column", borderRadius: "15px", backgroundColor: "#CAC4C4", paddingLeft: "10px"}
const inputBoxStyle = {border: "0", outline: "0", background: "transparent", borderBottom: "1px solid black", marginBottom: "5px"}

export default function InputBox({error, answers, setAnswers, errorID}) {
  const [otherAnswers, setOtherAnswers] = useState([{uuid: uuidv4(), text: "", hasInput: "False"}])

  useEffect(() => {
    let cp = [...answers]
    let targetIndex = cp.findIndex(ele => ele.errorID === errorID)
    cp[targetIndex].otherAnswers = otherAnswers.filter(answer => answer.hasInput === "True")
    setAnswers(cp)
    console.log(answers)
  }, [otherAnswers])

  const updateOtherAnswer = (uuid, text) => {
    let cp = [...otherAnswers]
    let targetIndex = cp.findIndex((ele) => ele.uuid === uuid)
    cp[targetIndex].text = text
    if (cp[targetIndex].hasInput === "False") {
      cp[targetIndex].hasInput = "True"
      cp.push({uuid: uuidv4(), text: "", hasInput: "False"})
    }
    setOtherAnswers(cp)
  }

  const removeOtherAnswer = (uuid) => {
    let cp = [...otherAnswers]
    let targetIndex = cp.findIndex((ele) => ele.uuid === uuid)
    cp.splice(targetIndex, 1)
    setOtherAnswers(cp)
  }

  return (
    <div style={boxStyle}>
      <div style={{marginBottom: "10px", alignSelf: "flex-start", paddingLeft: "10px", fontWeight: "bold", paddingBottom: "20px"}}> What other collocations are you likely to use?</div>
        <div style={{display: "flex", flexDirection: "column"}} >
          {
            otherAnswers.map((answer, i) => {
              return (
              <div style={{alignSelf: "flex-start", paddingLeft: "10px"}} key={answer.uuid}>
                <input style={inputBoxStyle} value = {answer.text} onChange={(e) => updateOtherAnswer(answer.uuid, e.target.value)} /> 
                <span>{error.split(' ')[1]}</span>
                { (i !== otherAnswers.length -1) &&
                  <button style={{marginLeft: "10px"}} onClick={() => removeOtherAnswer(answer.uuid)}>x</button>
                }
              </div>
              )
            })
          }
        </div>
    </div>
  )
}