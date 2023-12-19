import { useState, useEffect } from "react";
import "./App.css";
import facade from "./util/apiFacade";

function App() {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchData("recipes", "GET").then((data) => setDataFromServer(data));
  }, [isLoggedIn]);

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(
      loginCredentials.username,
      loginCredentials.password,
      setIsLoggedIn
    );
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <div>
        <h1>Login demo</h1>

        <form onChange={onChange}>
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button onClick={performLogin}>Login</button>
        </form>

        <div className="recipeContainer">
          {isLoggedIn ? (
            <div>
              <p>Du er logget ind, {facade.getUserRoles()}</p>
              <button onClick={() => facade.logout(setIsLoggedIn)}>
                Log out
              </button>
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
                      {recipe.recipeDirections
                        .split(". ")
                        .map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Log på for at være med i klubben, Mulle</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
