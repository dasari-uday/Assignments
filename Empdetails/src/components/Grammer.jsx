import React, { useState } from 'react';

const GrammarChecker = () => {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  const apiKey = 'YwrMOwt9bOGdBz6j'; 

  const performGrammarCheck = async () => {
    setIsChecking(true);

    try {
      const apiURL = `https://api.textgears.com/correct?text=${text}&key=apiKey`;
      const response = await fetch(apiURL);
   

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const result = await response.json();
      setSuggestions(result.suggestions);

      if (result.errors) {
        let correctedText = text;
        result.errors.forEach((error) => {
          correctedText = correctedText.replace(
            new RegExp(error.bad, 'g'),
            `<u>${error.bad}</u>`
          );
        });
        setText(correctedText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const replaceMistake = (suggestion, mistake) => {
    const updatedText = text.replace(new RegExp(mistake, 'g'), suggestion);
    setText(updatedText);
    setSuggestions([]);
  };

  return (
    <div>
      <h1>Grammar Checker</h1>
      <textarea
        rows="4"
        cols="100"
        value={text}
        spellCheck={false}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={performGrammarCheck} disabled={isChecking}>
        Check Grammar
      </button>
      <div>
        {suggestions && suggestions.length > 0 ? (
          <div>
            <h2>Suggestions:</h2>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => replaceMistake(suggestion.s, suggestion.bad)}
                >
                  {suggestion.s}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No grammar mistakes found!</p>
        )}
      </div>
    </div>
  );
};

export default GrammarChecker;
