import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Init() {

  const navigate = useNavigate()

  const [collSize, setCollSize] = useState();
  const [startID, setStartID] = useState();
  const [writeID, setWriteID] = useState();

  const submit = () => {
    navigate(`/${collSize}/${startID}/${writeID}`)
  }
  
  return (
    <div>
      <h1>Welcome!</h1>
      <span>
        Number of collocations  
      </span>
      <input type="text" value={collSize} onChange={(e) => setCollSize(e.target.value)} />
      <br />
      <span>
        startID
      </span>
      <input type="text" value={startID} onChange={(e) => setStartID(e.target.value)} />
      <br />
      <span>
        writeID
      </span>
      <input type="text" value={writeID} onChange={(e) => setWriteID(e.target.value)} />
      <br />
      <br />
      <button onClick={() => submit()}>submit</button>
      
    </div>
  )
}