import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log("Error fetching jokes:", error);
      });
  });
  return (
    <>
      {jokes.map((joke, index) => (
        <div key={joke.id}>
          <h3>
            Ques.
            {index + 1} - {joke.title}
          </h3>
          <p>
            Ans.
            {index + 1} - {joke.content}
          </p>
        </div>
      ))}
    </>
  );
}

export default App;
