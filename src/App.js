import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';

const App = () => {
  return (
   <div>
   <div className="App">
    <h1>Welcome to the AI Hub!</h1>
    <span style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <NavLink to = "GPT3">
        <h3>GPT-3</h3>
      </NavLink>
      <h3> &nbsp; | &nbsp;</h3>
      <NavLink to = "Cohere">
        <h3>Cohere</h3>
      </NavLink>
    </span>
    </div>
    <div style={{margin: '10px'}}>
    <h5>Some Tips</h5>
    <ol>
      <li>Make sure your prompts are questions or commands.</li>
      <li>Prompts can be multiple sentences long. Be specific so that the artificial intelligence model can deliver the best output possible.</li>
      <li>When writing a new prompt, the artificial intelligence will have no memory of what it previously generated. Do not split up tasks that depend on each other into multiple prompts.</li>
      <li>Be patient! While smaller tasks, like answering trivia questions and mathematics problems, will be completed in a few seconds, it will take longer for code and essays to be generated. Ultimately, nothing should take more than 1 -2 minutes to generate.</li>
    </ol>
    <h5>Examples of prompts</h5>
    <ul>
      <li>GOOD: "Write a 500 word essay about Barrack Obama. Cite your sources at the end."</li>
      <li>BAD: "Barrack Obama essay with sources cited."</li>
      <li>GOOD: "What is 9 + 10 equal to?"</li>
      <li>BAD: "9 + 10" </li>
      <li>GOOD: "What is the powerhouse of the cell?"</li>
      <li>BAD: "Powerhouse of cell"</li>
    </ul>
    <h6 style = {{color: 'red'}}>Note that while the bad examples may yield a favorable output, there is no guarantee of that happening. Do not write prompts like you write Google search queries. Be specific of what exactly you want the AI to answer/generate.</h6>
    </div>
   </div>
  );
}

export default App;
