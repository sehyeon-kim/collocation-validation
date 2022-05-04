import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Init() {

  const params = useParams()

  const [collSize, setCollSize] = useState();
  const [startID, setStartID] = useState();
  const [writeID, setWriteID] = useState();

  const submit = () => {
    useNavigate(`/${collSize}/${startID}/${writeID}`)
  }
  
  return (
    <div>
      <h1>Welcome!</h1>
      <input value={collSize} onChange={(e) => setCollSize(e.target.value)}>Number of collocations</input>
      <input value={startID} onChange={(e) => setStartID(e.target.value)}>startID</input>
      <input value={writeID} onChange={(e) => setWriteID(e.target.value)}>writeID</input>

      <button onClick={() => submit()}>submit</button>
    </div>
  )
}