import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import {Store, wrapStore} from "./redux.js"



function reducer(state, action){
  return state;
}


function render(dispatch, getState){
  var store = {
    dispatch,
    getState
  };
  return function(action){
    ReactDOM.render(
      <App store={store}/>,
      document.getElementById('root')
    );
    return dispatch(action);
  }
}

var store = new Store({
  pizzas : [{
    url: "http://www.dopopoco.ro/images/produse/pizza_diavolo_small.png",
    title : "Pizza Diavolo",
    ingredients: "the fires of hell its self"
  },
  {
    url: "http://www.dopopoco.ro/images/produse/pizza_diavolo_small.png",
    title : "Pizza Diavolo",
    ingredients: "the fires of hell its self"
  },
  {
    url: "http://www.dopopoco.ro/images/produse/pizza_diavolo_small.png",
    title : "Pizza Diavolo",
    ingredients: "the fires of hell its self"
  }]
}, reducer);

store = wrapStore(store, [render]);

const cardStyle = {
  maxWidth : "300px",
  float : "left",
  margin: 10

};

const cardImage = {
  width : "100%"
};

const paddingMarginZero = {
  padding : "0",
  margin : "0",
  marginBottom : "10"
};



function PizzaCard({url, title, ingredients}){
  return (
    <div className="w3-card-2" style={cardStyle}>
      <img src={url} style={cardImage}/>
        <div className="w3-container">
        <h4>
          <b>{title}</b>
        </h4>
        <p>
          Ingrediente: {ingredients}
        </p>
      </div>
    </div>
  );
}

function App({store}){
  const pizzas = store.getState().pizzas;

  const pizzaComponents = pizzas.map(function(pizza){
    return (<PizzaCard title={pizza.title} url={pizza.url} ingredients={pizza.ingredients}/>);
  });


  return (
    <div className="App">
      <div className="w3-container" style={paddingMarginZero}>
        <h1 className="w3-teal" style={paddingMarginZero}>Pizza Scrapper</h1>
      </div>
      <div className="w3-container">
          {pizzaComponents}
      </div>
    </div>
  );
}

store.dispatch({ type : "_INIT_" });

export default App;
