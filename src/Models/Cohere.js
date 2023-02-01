import React, { useState, useEffect } from 'react';
import { FormGroup, Input, InputGroupText, Button } from 'reactstrap';
import axios from 'axios';
import '../App.css';

const Cohere = () => {

  const[option, setOption] = useState("Write an essay");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState([]);
  let temperature = 0.0;
  let tokens = 0.0;
  const onSubmit = () => {
    if(option === "Write an essay") {
      temperature = 1.0;
      tokens = 2000;
    }
    if(option === "Write code") {
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
    const options = {
      method: 'POST',
      url: 'https://api.cohere.ai/generate',
      headers: {
        accept: 'application/json',
        'Cohere-Version': '2021-11-08',
        'content-type': 'application/json',
        authorization: 'CENSORED'
      },
      data: {
        model: 'command-xlarge-20221108', 
        prompt: prompt,
        max_tokens: tokens,
        temperature: temperature,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'}
      };

      axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        const temp = [...answer];
        const text = response.data.generations[0].text.replace("\n", "");
        const text2 = text.replace("\n", "");
        temp.push([prompt, text2]);
        setAnswer(temp);
        console.log(answer);
      })
      .catch(function (error) {
        console.error(error);
      });
    }

    const onClear = () => {
      setAnswer([]);
    }

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
      <h1 className="App">Cohere</h1>
      <FormGroup>
      <InputGroupText>
      What do you want &nbsp; <strong>Cohere</strong> &nbsp; to do?
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
      className ="prompt"
      name="text"
      type="text"
      onChange = {(e) => setPrompt(e.target.value)}
      />
      </FormGroup>
      <div className="App">
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
      {answer.map((item, i) => {
        console.log(i);
        return(
        <div key={i} id={"item-" + i} style={{"margin": "1%"}}>
          <h5>Prompt:</h5>
          <pre>{item[0]}</pre>
          <h5>Generated Output:</h5>
          <pre style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>{item[1]}</pre>
          <hr />
        </div>
        );
      })}
      </div>
      );
  }

  export default Cohere;
