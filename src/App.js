import React, { useState } from 'react';
import './App.css';

function App() {
  const [endPoint, setEndpoints] = useState('');
  const [container, setContainer] = useState([]);

  const fetchData = async () => {
    const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=${endPoint}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5d452d1ec3mshfdf7e164f9284dap19471djsn833f39322931',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data && data.d) {
        setContainer(data.d);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (e) => {
    setEndpoints(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await fetchData();
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input type='text' value={endPoint} onChange={onChangeHandler} />
        <button type='submit'>Submit</button>
      </form>

      <div className="items-container">
        {container.map((item, index) => (
          <div className="item" key={index}>
            {item.i && <img src={item.i.imageUrl} alt={item.l} />}
            <p>{item.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
