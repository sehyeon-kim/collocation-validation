const boxStyle = {border: "solid", borderWidth: "1px", width: "500px", marginBottom: "30px", paddingTop: "10px", paddingBottom: "10px", display: "flex", flexDirection: "column", borderRadius: "15px", backgroundColor: "#CAC4C4", paddingLeft: "10px"}
const optionStyle = {}
export default function Box({text, answers, setAnswers, errorID}) {

  const handleChange = (e) => {
    console.log(e)
    console.log(e.target.value)
    let cp = [...answers]
    let targetIndex = cp.findIndex(ele => ele.errorID === errorID)
    if (cp[targetIndex].errorText.trim() === text.trim()) {
      cp[targetIndex].errorScale = e.target.value
    }
    if (cp[targetIndex].freqText.trim() === text.trim()) {
      cp[targetIndex].freqScale = e.target.value
    }
    if (cp[targetIndex].tText.trim() === text.trim()) {
      cp[targetIndex].tScale = e.target.value
    }
    if (cp[targetIndex].miText.trim() === text.trim()) {
      cp[targetIndex].miScale = e.target.value
    }
    setAnswers(cp)
    console.log(answers)
  }
  
  return (
    <div style={boxStyle}>
      <div style={{marginBottom: "10px", alignSelf: "flex-start", paddingLeft: "10px", fontWeight: "bold" }}>{text}</div>
      <form style={{display:"flex",flexDirection:"row", justifyContent: "space-evenly"}}>
        <label>
          <input type="radio" defaultValue={1} name="optradio" onChange={(e) => handleChange(e)} />
        </label>
        <label>
          <input style={{marginLeft: "70px", marginRight: "70px"}} type="radio" defaultValue={2} name="optradio" onChange={(e) => handleChange(e)} />
        </label>
        <label>
          <input type="radio" defaultValue={3} name="optradio" onChange={(e) => handleChange(e)} />
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

