import React from 'react';;
import './App.css';
import ReactDOM from 'react-dom';


var state = {counter : 0};

function reducer(state, action){
  if (action.type === "INC"){
    return {
      counter : state.counter + 1
    };
  }else if (action.type === "DEC"){
    return {
      counter : state.counter - 1
    };
  }
  return state;
}

function handler(action){
  state = reducer(state, action);
  ReactDOM.render(
    <App state={state}/>,
    document.getElementById('root')
  );
}

function Hello({name, counter}){
  return(
    <div>
    <div>Hello {name} {counter}</div>
    <button onClick={()=>handler({type:"INC"})}>Click (inc)</button>
    <button onClick={()=>handler({type:"DEC"})}>Click (dec)</button>
    
    </div>
  );
}


function App({state}) {
  return (
    <div className="App">
      <Hello name="You" counter={state.counter}/> 
    </div>
  );
}

handler({type : "INIT"})

export default App;
