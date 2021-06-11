import React, { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [textId, setTextId] = useState<string[]>([]);
  const [textContent, setTextContent] = useState("");
  const [textName, setTextName] = useState("");

  useEffect(() => {
    let localKey = localStorage.getItem("TextIds");
    if (localKey == null) {
      const newId = uuidv4();
      localStorage.setItem("TextIds", JSON.stringify(newId));
      textId.push(newId);
    } else {
      let app_ids = JSON.parse(localStorage.getItem("TextIds") || "{}");
      textId.pop();
      textId.push(app_ids);
      let value = localStorage.getItem(textId[0])!;
      setTextContent(value);
      setTextName(value.substring(0, 10).concat("..."));
      console.log(textId[0]);
    }
  });

  const handleTextContent = (event: any) => {
    console.log(textId);
    let value = event?.target.value;
    localStorage.setItem(textId[0], value);
    setTextContent(value);
    setTextName(value.substring(0, 10).concat("..."));
  };

  return (
    <div className="App">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-25">
              <input type="button" value="Add" />
            </div>
            <div className="col-75"></div>
          </div>
          <div className="row">
            <div className="col-25">
              <div className="select-notes" id={textId[0]}>
                <span>{textName}</span>
              </div>
            </div>
            <div className="col-75">
              <textarea
                id="fname"
                name="firstname"
                placeholder="Your name.."
                onChange={handleTextContent}
                value={textContent}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
