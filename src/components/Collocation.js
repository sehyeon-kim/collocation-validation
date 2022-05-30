import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Box from "./Box";
import InputBox from "./InputBox";


export default function Collocation({content, answers, setAnswers}) {

  const navigate = useNavigate()

  const [candArr, setCandArr] = useState([])
  const [oldContent, setOldContent] = useState({})

  function onlyUnique(value, index, self) {
    if (value){
    return self.indexOf(value.trim()) === index;
  } 
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


  useEffect(() => {
    if (oldContent) {
      let cp = [...candArr]
      cp.push(oldContent.error)
      cp.push(oldContent.frequency)
      cp.push(oldContent.tScore)
      cp.push(oldContent.miScore)
      let uniqueArr = cp.filter(onlyUnique)
      console.log(uniqueArr.slice(0,1))
      console.log(uniqueArr.slice(1))
      let resultArr = uniqueArr.slice(0,1).concat(shuffle(uniqueArr.slice(1)))
      setCandArr(resultArr)
    }
    
  }, [oldContent])

  useEffect(() => {
    console.log(content)
    setCandArr([])
    setOldContent(content)

    }, [content])
  
  return (
    <div>
      
      { (content) && (content == oldContent) && (candArr.length) &&
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style= {{marginBottom: "10px"}}>
        { (content.phraseIndex) &&
          content.sentence.split("").map((word, i) => {
            if(content.phraseIndex.split(",").map((idx)=>parseInt(idx)).includes(i)){
              return(<span key={i} style={{color: "blue", fontWeight: "bold",}}>{word}</span>)
            }
            else{
              return(<span key={i} style={{color: "black", fontWeight: "bold",}}>{word}</span>) 
            }
          })
        }
        </div>
        {
          candArr.map((cand, i) => 
            <Box key={i} errorID={content.errorID} text={cand} answers={answers} setAnswers={setAnswers} />)
        }
        <InputBox errorID={content.errorID} error = {content.error} answers={answers} setAnswers={setAnswers}/>
      </div>}
    </div>
  )
}