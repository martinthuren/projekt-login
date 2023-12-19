import { useState, useEffect } from "react";
import "./App.css";
import facade from "./util/apiFacade";

function App() {
  const [dataFromServer, setDataFromServer] = useState([]);

  useEffect(() => {
    facade.fetchData("recipes", "GET").then((data) => setDataFromServer(data));
  }, []);

  const handleUpdate = (id) => {
    // Handle the update logic here using the recipe ID
    console.log(`Update recipe with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle the delete logic here using the recipe ID
    console.log(`Delete recipe with ID: ${id}`);
  };

  return (
    <>
      <div>
        <h1>Show all recipes</h1>
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
                <div className="buttonContainer">
                  <button onClick={() => handleUpdate(recipe.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(recipe.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
