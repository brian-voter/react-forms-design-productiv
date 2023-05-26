import React from "react";
import TodoApp from "./TodoApp";
import InspoQuote from "./InspoQuote";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const DEFAULT_LIST_STORAGE_KEY = 'todos'
/** Site application.
 *
 * App -> TodoApp
 **/

function App() {

  function checkAndGetLocalStorage(){
    const initialTodos = localStorage.getItem();
  }

  return (
      <main className="App">
        <header className="container-fluid pt-4 pb-1">
          <div className="container">
            <h1>Prøductïv</h1>
            <p className="lead">The best name in todo list management.</p>
            <InspoQuote id="inspo-quote"/>
          </div>
        </header>

        <section className="container mt-4">
          <TodoApp localStorageKey={DEFAULT_LIST_STORAGE_KEY}/>

          <Footer />
        </section>
      </main>
  );
}

export default App;
