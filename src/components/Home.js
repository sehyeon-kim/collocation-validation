import React, { useEffect, useState } from "react";
// importing Link from react-router-dom to navigate to
// different end points.
import { Link, useParams } from "react-router-dom";
import Auth from "./Auth"
 
const Home = () => {

  const params = useParams()

  const [authorized, setAuthorized] = useState(false);
  const [collSize, setCollSize] = useState();
  const [startID, setStartID] = useState();
  const [writeCol, setWriteCol] = useState();
  const [writeID, setWriteID] = useState();
  
  useEffect(() => {
    setCollSize(parseInt(params.collSize))
    setStartID(parseInt(params.startID))
    setWriteID(parseInt(params.writeID))
    if (writeID === 1){
      setWriteCol("H,P")
    }
    if (writeID === 2){
      setWriteCol("Q,Y")
    }
    if (writeID === 3){
      setWriteCol("Z,AH")
    }
  })

  return (
    
      (collSize && startID && writeCol) && 
      <div>
        <h1>Welcome!</h1>
        {
          (!authorized) &&
          <>
            <Auth setAuthorized={setAuthorized} authorized={authorized}/>
          </>
        }
        {
          (authorized) &&
          <>
            <div>You will validate {params.collSize} collocations </div>
            <br />
            <div>
            <div> <Link to= {`/example/${params.collSize}/${params.startID}/${writeCol}`}> Go to Example </Link> </div>
              
            </div>
          </>
        }
        
      </div>
  );
};

export default Home;
