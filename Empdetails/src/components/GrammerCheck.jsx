import React, { useState } from 'react';
 
function GrammerCheckj() {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);
  const [apiKey] = useState('YwrMOwt9bOGdBz6j'); // Replace with your actual API key
 
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
      console.log(response.data)
     
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
 
      const result = await response.json();
      const responseErrors = result.response.errors || [];
   
 
      setErrors(responseErrors);
     
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
 
  const handleSuggestionClick = (index, suggestion) => {
    const updatedText = text.split(' ');
    updatedText[index] = suggestion;
    setText(updatedText.join(' '));
   
  };
 
  const renderTextWithErrors = () => {
    const words = text.split(' ');
 
    return (
      <div>
        {words.map((word, index) => {
          const error = errors.find((error) => error.bad === word);
          return (
            <span key={index} className={error ? 'error' : ''}>
              {error ? (
                <div className="suggestion-dropdown">
                  {error.better.map((suggestion, i) => (
                    <div
                      key={i}
                      onClick={() => handleSuggestionClick(index, suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              ) : null}
              {word}
            </span>
          );
        })}
      </div>
    );
  };
 
  return (
    <div className="App">
      <h1>Enter Your Text Here To check your GRAMMAR</h1>
      <textarea
        style={{ width: '400px', height: '100px' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleCheckText}>Check Text</button>
      {renderTextWithErrors()}
    </div>
  );
}
 
export default GrammerCheckj;