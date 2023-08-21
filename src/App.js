import './App.css';
import { useState, useEffect } from 'react';
import { ImQuotesLeft } from 'react-icons/im';
import { BsTwitter } from 'react-icons/bs';

const url = "https://type.fit/api/quotes";

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);

  return `rgb(${red}, ${green}, ${blue})`;
};
  

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState(getRandomColor());

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error("Error Fetching", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const randomQuote = data[Math.floor(Math.random() * data.length)];
  
  const changeQuote = () => {
    setColor(getRandomColor());
  };

  return (
    <div className='background' style={{ backgroundColor: color,transition:"ease-in 1s" }}>
      <div className='quotesBox'>
        <div className='quotesContent'>
          <h2 style={{ fontFamily: 'monospace', margin: "10px",color:color,transition:"ease-in 1s" }}>
            <ImQuotesLeft size="30" />
            {randomQuote.text}
          </h2>
          <h4 className='author' style={{ fontFamily: 'cursive', marginTop: "20px", float: 'right',color:color,transition:"ease-in 1s" }}>{randomQuote.author}</h4>
        </div>
        <div className='buttons'>
          <a
            href='https://twitter.com'
            style={{
              marginRight: "10px",
              backgroundColor: color,
              transition:"ease-in 1s"
            }}
          >
            <BsTwitter color='black' />
          </a>
          <button
            onClick={changeQuote}
            style={{ backgroundColor: color }}
          >New Quote</button>
        </div>
      </div>
    </div>
  );
}

export default App;
