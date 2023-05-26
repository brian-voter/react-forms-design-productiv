import React, { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const QUOTE_API_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random";

/** Component for inspirational quote.
 *
 * State:
 * - quote: object of {text, author}
 *
 * App -> InspoQuote -> { TodoForm, EditableTodoList }
 */

function InspoQuote() {
  const [quote, setQuote] = useState(null);

  /**
   * Updates the quote state object
   * @param {Object} newQuote
   */
  function updateQuote(newQuote) {
    setQuote(newQuote);
  }

  /**
   * Makes an API get request to fetch random quote
   * @returns Object - {text, author}
   */
  async function getQuote() {
    const result = await axios.get(QUOTE_API_URL);

    return result.data.quote;
  }

  /**
   * Handles click for when user clicks button
   */
  async function handleClick(evt) {
    updateQuote(await getQuote());
  }

  return (
    <div>
      {quote && <i id="quote-text">{quote.text} -{quote.author}</i>}
      <button id="quote-btn" onClick={handleClick}>
        {quote ? "Nü quøte" : "Click here for an inspirational quøte!"}
      </button>
    </div>
  )
}

export default InspoQuote;