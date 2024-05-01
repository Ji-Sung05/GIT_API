import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState(null);
  const fetchAuth = async () => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` //만료일 24년 5월 8일
      }
    };
    const { data } = await axios.get('https://api.github.com/repos/Ji-Sung05/GIT_API/commits', config);
    //const { data } = await axios.get('https://api.github.com/repos/Chat-ITC/WITH_Client/commits', config);
    setTodos(data);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    setTimeout(()=> {
      fetchAuth();
    }, 5000)
  }, []);

  console.log(todos);
  return (
    <>
      {todos ? (
        <ul>
          {todos.map((commit, index) => (
            <li key={index}><a href={commit.html_url} aria-label="Link">{commit.sha} {commit.commit.message}</a></li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
