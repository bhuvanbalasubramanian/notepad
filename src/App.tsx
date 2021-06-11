import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [textIdArr, setTextIdArr] = useState<string[]>([]);
  const [textContent, setTextContent] = useState("");
  const [textId, setTextId] = useState("");

  useEffect(() => {
    let localKey = localStorage.getItem("TextIds");
    if (localKey == null) {
      const newId = uuidv4();
      textIdArr.push(newId);
      localStorage.setItem("TextIds", JSON.stringify([newId]));
      localStorage.setItem(newId, "");
      setTextIdArr(textIdArr);
    } else {
      if (textId == "") {
        let textIds = JSON.parse(localStorage.getItem("TextIds") || "{}");
        setTextIdArr(textIds);
        let value = localStorage.getItem(textIds[0])!;
        setTextId(textIdArr[0]);
        setTextContent(value);
      }
    }
  }, [textContent, textId, textContent, textIdArr]);

  const handleTextContent = (event: any) => {
    console.log(textIdArr);
    let value = event?.target.value;
    localStorage.setItem(textId, value);
    setTextContent(value);
  };

  const handleGetContent = (event: any) => {
    const id = event?.target.id;
    const content = localStorage.getItem(id)!;
    console.log(id);
    console.log(content);
    setTextId(id);
    setTextContent(content);
    console.log(textId);
    console.log(textContent);
  };

  const handleAdd = () => {
    const newId = uuidv4();
    textIdArr.push(newId);
    localStorage.setItem("TextIds", JSON.stringify(textIdArr));
    localStorage.setItem(newId, "");
    setTextIdArr(textIdArr);
    console.log(textIdArr);
  };

  return (
    <div className="App">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-25">
              <input type="button" value="Add" onClick={handleAdd} />
            </div>
          </div>
          <div className="row" id="text-content">
            <div className="col-25">
              <ul>
                {textIdArr.map((id: string) => {
                  return (
                    <li
                      className="select-notes"
                      key={id}
                      id={id}
                      onClick={handleGetContent}
                    >
                      {localStorage
                        .getItem(id)!
                        .substring(0, 10)
                        .concat("...")}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-75">
              <textarea
                placeholder="Your content.."
                onChange={handleTextContent}
                value={textContent || ""}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
