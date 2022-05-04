import { useEffect, useState } from "react";
import config from "../config";
import Collocation from "./Collocation";
import { useNavigate, useParams } from "react-router-dom";


const boxStyle = {border: "solid", borderWidth: "1px", width: "500px", marginBottom: "30px", paddingTop: "10px", paddingBottom: "10px", display: "flex", flexDirection: "column", borderRadius: "15px", backgroundColor: "#CAC4C4", paddingLeft: "10px"}
const inputBoxStyle = {border: "0", outline: "0", background: "transparent", borderBottom: "1px solid black", marginBottom: "5px"}


export default function Validation() {


  const navigate = useNavigate()
  const params = useParams()

  const [content, setContent] = useState({
    errorID: 0,
    sentence: "I usually eat quick food.",
    error: "quick food",
    frequency: "fast food",
    tScore: "fast food",
    miScore: "fast food",
    phraseIndex: "14,15,16,17,18,20,21,22,23"
  })

  const [candArr, setCandArr] = useState([
    "quick food",
    "fast food"
  ])



  const next = () => {
    navigate(`/validation/${params.collSize}/${params.startID}/${params.writeCol}/0`)
  }
  
  return(
    <div style={{display: "flex", flexDirection: "column"}}>
      <div style={{alignSelf: "flex-start", fontSize: "20px", color: "red", marginBottom: "10px", marginLeft: "590px", fontStyle: "italic", marginTop: "20px"}}>Example Page</div>

      <div style={{alignSelf: "center", fontWeight: "bold", fontSize: "20px", marginBottom: "50px", margin: "20px"}}>How likely are you to use the following collocations as a native English speaker?</div>
      
      {
        <div>
    
          {
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style= {{paddingBottom: "20px"}}>
            { (content.phraseIndex) &&
              content.sentence.split("").map((word, i) => {
                if(content.phraseIndex.split(",").map((idx)=>parseInt(idx)).includes(i)){
                  return(<span key={i} style={{color: "blue", fontWeight: "bold",}}>{word}</span>)
                }
                else{
                  return(<span key={i} style={{color: "black", fontWeight: "bold"}}>{word}</span>) 
                }
              })
            }
            </div>
            { 
              candArr.map((cand, i) => {
                return (
                  <div key={i} style={boxStyle}>
                    <div style={{marginBottom: "10px", alignSelf: "flex-start", paddingLeft: "10px", fontWeight: "bold" }}>{cand}</div>
                    <form required="required" style={{display:"flex",flexDirection:"row", justifyContent: "space-evenly"}}>
                      <label>
                        {
                          (cand === "quick food") && <input type="radio" name="contact" defaultChecked/>
                        }
                        {
                          (cand === "fast food") && <input name="contact" type="radio"/>
                        }
                        
                      </label>
                      <label>
                        <input style={{marginLeft: "70px", marginRight: "70px"}} name="contact" type="radio"/>
                      </label>
                      <label>
                        {
                          (cand === "fast food") && <input name="contact" type="radio" defaultChecked/>
                        }
                        {
                          (cand === "quick food") && <input name="contact" type="radio"/>
                        }
                      </label>
                    </form>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-evenly"}}>
                    <span>Extremely unlikely</span>
                    <span style={{marginLeft: "10px", marginRight: "10px"}}>Somewhat likely</span>
                    <span>Extremely likely</span>

                    </div>
                  </div>
                )
              }
              )
            }
            <div style={boxStyle}>
              <div style={{marginBottom: "10px", alignSelf: "flex-start", paddingLeft: "10px", fontWeight: "bold", paddingBottom: "20px"}}> What other collocations are you likely to use?</div>
                <div style={{display: "flex", flexDirection: "column"}} >
                  <div style={{alignSelf: "flex-start", paddingLeft: "10px"}}>
                    <input style={inputBoxStyle} defaultValue=""/> 
                    <span>{content.error.split(' ')[1]}</span>
                  </div>
                </div>
            </div>
          </div>}
        </div>
      }

      
      <button style={{width: "100px", fontSize: "20px", alignSelf: "center", cursor: "pointer"}} onClick={() => next()}>Start</button>
    
       
       
    </div>
  )
}

