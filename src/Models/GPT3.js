import React, { useState,  useEffect } from 'react';
import { FormGroup, Input, InputGroupText, Button } from 'reactstrap';
import { Configuration, OpenAIApi } from 'openai';
import '../App.css';

const GPT3 = () => {
	const configuration = new Configuration({
  		apiKey: "CENSORED",
	});
	const openai = new OpenAIApi(configuration);

	const[option, setOption] = useState("Write an essay");
	const [prompt, setPrompt] = useState("");
	const [answer, setAnswer] = useState([]);
	let temperature = 0.0;
	let tokens = 0.0;
  let model = "text-davinci-003";

	const onSubmit = () => {
		if(option === "Write an essay") {
		  temperature = 1.0;
		  tokens = 2000;
		}
		if(option === "Write code") {
      model = "text-davinci-003";
		  temperature = 1.0;
		  tokens = 700;
		}
		if(option === "Answer mathematics problems") {
		  temperature = 0.0;
		  tokens = 20;
		}
		if(option === "Answer general knowledge / trivia questions") {
		  temperature = 0.0;
		  tokens = 100;
		}
		const response = openai.createCompletion({
		  model: model,
		  prompt: prompt,
		  temperature: temperature,
		  max_tokens: tokens,
		});

		response.then((result) => {
			console.log(result.data.choices[0]['text']);
      console.log(result);
      const temp = [...answer];
      const text = result.data.choices[0]['text'].replace("\n", "");
      const text2 = text.replace("\n", "");
      temp.push([prompt, text2]);  
			setAnswer(temp);
      setPrompt("");  
      document.getElementById("command").value = "";

      console.log(answer);
		});
	}

  const onClear = () => {
    setAnswer([]);
  }

  console.log(answer.length)

  useEffect(() => {
    console.log("yolo")
    if(answer.length > 0) {
      console.log("Hey")
      const element = document.getElementById("item-" + (answer.length - 1));
      console.log(element);
      element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }, [answer]);

	return (
    <div>
      <div className="App">
        <h1>GPT-3</h1>
        <FormGroup>
            <InputGroupText>
              What do you want &nbsp; <strong>GPT-3</strong> &nbsp; to do?
            </InputGroupText>
            <Input
              className="options"
              name="select"
              type="select"
              onChange = {(e) => setOption(e.target.value)}
            >
              <option>
                Write an essay 
              </option>
              <option>
                Write code
              </option>
              <option>
                Answer mathematics problems
              </option>
              <option>
                Answer general knowledge / trivia questions
              </option>
            </Input>
        </FormGroup>
        <FormGroup>
            <InputGroupText>
              Enter a prompt.
            </InputGroupText>
            <Input
            id="command"
              className ="prompt"
              name="text"
              type="text"
              onChange = {(e) => setPrompt(e.target.value)}
            />
        </FormGroup>
        <Button
          className="App"
          color="primary"
          size="lg"
          onClick={onSubmit}
        >
          Generate
        </Button>
        <Button
          className="App"
          color="danger"
          size="lg"
          onClick={onClear}
        >
          Clear all Outputs
        </Button>
      </div>
      <hr />
      <div style={{margin: "1%"}}>
        {answer.map((item, i) => {
          console.log(i);
          return(
          <div key={i} id={"item-" + i}>
            <h5>Prompt:</h5>
            <pre>{item[0]}</pre>
            <h5>Generated Output:</h5>
            <pre style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>{item[1]}</pre>
            <hr />
          </div>
          );
        })}
        </div>
      </div>
  );
}

export default GPT3;
