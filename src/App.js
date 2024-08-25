import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch('https://testbackend-4adp.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: parsedData.data })
      });

      const result = await res.json();
      if (result.is_success) {
        setResponse(result);
        setError('');
      } else {
        setError(result.error);
      }
    } catch (e) {
      setError('Invalid JSON input');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
        {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
        {selectedOptions.includes('highest_lowercase_alphabet') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</p>}
      </div>
    );
  };

  return (
    <div>
      <h1>JSON Input Form</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {response && (
        <div>
          <label>Filter response: </label>
          <select multiple={true} onChange={handleOptionChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
