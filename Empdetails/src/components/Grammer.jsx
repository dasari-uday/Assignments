import React, { useState } from 'react';

function GrammerCheck() {
  const [text, setText] = useState('');
  const [apiErrors, setApiErrors] = useState([]);
  const [apiKey] = useState('YwrMOwt9bOGdBz6j'); // Replace with your actual API key
  const [showErrors, setShowErrors] = useState(false);

  const handleCheckText = async () => {
    try {
      // Make your API request to check grammar
      const apiUrl = `https://api.textgears.com/grammar?text=${text}&language=en-US&whitelist=&dictionary_id=&ai=1&key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const responseErrors = result.response.errors || [];

      setApiErrors(responseErrors);
      setShowErrors(true); // Show the errors after receiving the API response
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSuggestionClick = (error, suggestion) => {
    // Replace the error word with the suggestion
    setText((prevText) => prevText.replace(error, suggestion));
  };

  const renderTextWithErrors = () => {
    if (apiErrors.length === 0) {
      return text; // No errors, return the original text
    }

    let textWithErrors = text;

    apiErrors.forEach((error) => {
      textWithErrors = textWithErrors.replace(
        new RegExp(error.bad, 'g'),
        `<span style="text-decoration: underline; color: red;">${error.bad}</span>`
      );
    });

    return (
      <div
        style={{
          width: '100%',
          minHeight: '100px',
          border: '1px solid #ccc',
          padding: '5px',
          outline: 'none',
          whiteSpace: 'pre-wrap',
        }}
        dangerouslySetInnerHTML={{ __html: textWithErrors }}
      />
    );
  };

  return (
    <div className="App">
      <h1>Enter Your Text Here To check your GRAMMAR</h1>
      <textarea
        style={{ width: '400px', minHeight: '100px' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleCheckText}>Check Text</button>
      {showErrors && (
        <div
          style={{
            width: '400px',
            minHeight: '100px',
            border: '1px solid #ccc',
            padding: '5px',
            outline: 'none',
          }}
        >
          {renderTextWithErrors()}
        </div>
      )}
      {showErrors && (
        <div>
          {apiErrors.map((error, index) => (
            <div key={index} className="error-suggestion">
              <span onClick={() => handleSuggestionClick(error.bad, error.better[0])}>
                {error.bad}
              </span>
              <select>
                {error.better.map((suggestion, suggestionIndex) => (
                  <option key={suggestionIndex} value={suggestion}>
                    {suggestion}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GrammerCheck;
