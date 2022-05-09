import { useEffect, useState } from "react";
import config from "../config";
import Collocation from "./Collocation";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Validation() {

  const params = useParams()

  const [collArr, setCollArr] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([])
  const [updated, setUpdated] = useState(false);
  const [writed, setWrited] = useState(false);
  // const [errorID, setErrorID] = useState();

  const navigate = useNavigate()

  const updateCollArr = (values) => {
    let cp = []
    values.map((v) => {
      cp.push({
        errorID: v[0],
        sentence: v[1],
        error: v[2],
        frequency: v[3],
        tScore: v[4],
        miScore: v[5],
        phraseIndex: v[6]
      })
    })
    setCollArr(cp)
    console.log(collArr)
  }

  const updateAnswers = (values) => {
    let cp = []
    values.map((v) => {
      cp.push({
        errorID: v[0],
        errorText: v[2],
        errorScale: 0,
        freqText: v[3],
        freqScale: 0,
        tText: v[4],
        tScale: 0,
        miText: v[5],
        miScale: 0,
        otherAnswers: []
      })
    })
    setAnswers(cp)
    
    setUpdated(true);
    console.log(answers)

  }

  function getColls() {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: `samplesheet!A${parseInt(params.startID)}:G${parseInt(params.startID)+parseInt(params.collSize-1)}`,
    }).then((response) => {
      var result = response.result;
      var numRows = result.values ? result.values.length : 0;
      console.log(`${numRows} rows retrieved.`);
      console.log(result)

      setCollArr([])
      setAnswers([])

      updateCollArr(result.values)
      updateAnswers(result.values)
    });
  }

  function initClientGet() {
    window.gapi.client.init({
      apiKey: config.apiKey,
      clientId: config.clientId,
      discoveryDocs: config.discoveryDocs,
      scope:"https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"
    })
    .then( () => {
      getColls()
    })
  }

  function initClientWrite(errorID) {
    window.gapi.client.init({
      apiKey: config.apiKey,
      clientId: config.clientId,
      discoveryDocs: config.discoveryDocs,
      scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"
    })
    .then( () => {
      writeCells(errorID)
    })
  }

  function writeCells(errorID) {
    console.log(errorID)
    const cp = [...answers]
    console.log(cp)
    var values = []
    
    let targetIndex = cp.findIndex(ele => ele.errorID === errorID)
    let ans = cp[targetIndex]

    values.push([
      ans.errorScale,
      ans.freqScale,
      ans.tScale,
      ans.miScale
    ])

    ans.otherAnswers.map(otherAns => values[0].push(otherAns.text + " " + `${ans.errorText.split(' ')[1]}`))

    console.log(values)
    
    var body = {
      values: values
    };

    window.gapi.client.sheets.spreadsheets.values.update({
       spreadsheetId: config.spreadsheetId,
       range: `samplesheet!${params.writeCol.split(",")[0]}${parseInt(errorID)+1}:${params.writeCol.split(",")[1]}${parseInt(errorID)+1}`,
       valueInputOption: "RAW",
       resource: body
    }).then(function(response){
      var result = response.result;
      console.log(result);
      console.log(`${result.updatedCells} cells updated.`);
      setWrited(true)
      if (index+1 >= collArr.length) {
        alert("Completed! Thank you!")
        navigate('/bye')
        // setErrorID(collArr[0].errorID)
        return
      }
      setIndex(index + 1)
      // navigate(`/validation/${params.collSize}/${params.startID}/${params.writeCol}/${index+1}`,{state:{content: collArr[index], answers: answers, setAnswers: setAnswers}})
    }, function(reason){
      console.log(reason.result)
    });
  }



  useEffect(() => {
    setIndex(parseInt(params.index))
    window.gapi.load('client:auth2', initClientGet);
  }, [])

  const isAnswered = (errorID) => {
    const cp = [...answers]
    let target = cp.find((v) => v.errorID === errorID)
    let optionAnswers = [target.errorScale, target.freqScale, target.tScale, target.miScale]
    console.log(optionAnswers)
    if (optionAnswers.includes(0)){
      return false
    }
    return true
  }

  const next = (content) => {
    if (!isAnswered(content.errorID)){
      alert("Some options are not selected.")
      return
    }
    writeCells(content.errorID)
    // if (index+1 >= collArr.length) {
    //   alert("Completed! Thank you!")
    //   navigate('/bye')
    //   // setErrorID(collArr[0].errorID)
    //   return
    // }
    // setErrorID(collArr[index+1].errorID)
    // if (writed) {
    // setIndex(index + 1)
    // navigate(`/validation/${params.collSize}/${params.startID}/${params.writeCol}/${index+1}`,{state:{content: collArr[index], answers: answers, setAnswers: setAnswers}})
    // }
  }
  
  return(
    <div style={{display: "flex", flexDirection: "column"}}>
      <div style={{alignSelf: "center", fontWeight: "bold", fontSize: "20px", marginBottom: "60px", margin: "20px"}}>How likely are you to use the following collocations as a native English speaker?</div>
      {
        (updated) &&
        <div >
          <Collocation content={collArr[index]} answers={answers} setAnswers={setAnswers} />
       </div>
      }

      {
        (updated) &&
        <>
        <div style={{marginBottom: "10px"}}>{index+1}/{collArr.length}</div>
        <button style={{width: "100px", fontSize: "20px", alignSelf: "center", cursor: "pointer"}}onClick={() => next(collArr[index])}>Next</button>
        </>
      }
       
       
    </div>
  )
    }