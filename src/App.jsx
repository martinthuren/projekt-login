import { useState, useEffect } from "react";
import "./App.css";
import facade from "./util/apiFacade";

function App() {
  const [dataFromServer, setDataFromServer] = useState([]);

  useEffect(() => {
    facade.fetchData("recipes", "GET").then((data) => setDataFromServer(data));
  }, []);

  return (
    <>
      <div>
        <h1>Login demo</h1>
        <div className="recipeContainer">
          <div className="recipes">
            {dataFromServer.map((recipe) => (
              <div className="recipeCard" key={recipe.id}>
                <p>{recipe.recipeName}</p>
                <div className="recipeImage">
                  <img src={recipe.recipeImg} alt={recipe.recipeName} />
                </div>
                <p>{recipe.recipeDescription}</p>
                <p>Type: {recipe.recipeType}</p>
                <p>Preparation Time: {recipe.recipePreptime} minutes</p>
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.recipeIngredients
                    .split(";")
                    .map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h3>Directions:</h3>
                <ol>
                  {recipe.recipeDirections.split(". ").map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
