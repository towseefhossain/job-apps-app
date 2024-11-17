import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);
  const [details, setDetails] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    let data;

    axios.get('http://localhost:3000/api/jobapplications/')
      .then(response => {
        data = response.data;
        setDetails(data);
        console.log(data);
      });

    axios.get('http://localhost:3000/api/points/')
      .then(response => {
        setPoints(response.data.points);
      });

  }, [points, details]);

  const changeNameHandler = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const addJob = useCallback(() => {
    axios.post('http://localhost:3000/api/jobapplications/', {
      name: name
    })
      .then(response => {
        console.log(response);
        setDetails([...details, response.data]);
      });
  });

  return (
    <div>
      <h1>Job Applications</h1>
      <h2>Points: {points}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {details.map((jobapp) => (
            <tr key={jobapp.id}>
              <td>{jobapp.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Add Job</h1>
      <input
        type="text"
        id="name"
        placeholder="Name"
        onChange={changeNameHandler}
        value={name}
      />
      <button onClick={addJob}>Add Job</button>
    </div>
  );
}

export default App;
