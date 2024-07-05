import React, { useState } from 'react';
import axios from 'axios';

const OpenAIComponent = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const makeApiCall = async () => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    setIsLoading(true);

    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-003",
        prompt: "Translate the following English text to French: 'Hello, how are you?'",
        max_tokens: 60
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      setResult(response.data.choices[0].text);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={makeApiCall} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Make API Call'}
      </button>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default OpenAIComponent;