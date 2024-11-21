import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);
  const [jobApplicationDetails, setJobApplicationDetails] = useState([]);
  const [jobApplicationName, setJobApplicationName] = useState('');
  const [leetCodeDetails, setLeetCodeDetails] = useState([]);
  const [leetCodeName, setLeetCodeName] = useState('');
  const [leetCodeLevel, setLeetCodeLevel] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/jobapplications/')
      .then(response => {
        setJobApplicationDetails(response.data);
      });

    axios.get('http://localhost:3000/api/leetcode/')
      .then(response => {
        setLeetCodeDetails(response.data);
      });


    axios.get('http://localhost:3000/api/points/')
      .then(response => {
        setPoints(response.data.points);
      });

  }, [jobApplicationDetails, leetCodeDetails, points]);

  const changeJobNameHandler = useCallback((e) => {
    setJobApplicationName(e.target.value);
  }, []);


  const changeLeetcodeNameHandler = useCallback((e) => {
    setLeetCodeName(e.target.value);
  }, []);

  const changeLeetcodeLevelHandler = useCallback((e) => {
    setLeetCodeLevel(e.target.value);
  }, []);


  const addJob = useCallback(() => {
    axios.post('http://localhost:3000/api/jobapplications/', {
      name: jobApplicationName
    })
  }, [jobApplicationName]);

  const addLeetcode = useCallback(() => {
    axios.post('http://localhost:3000/api/leetcode/', {
      name: leetCodeName,
      level: leetCodeLevel
    })
  }, [leetCodeName, leetCodeLevel]);

  return (
    <div>
      <h2>Points: {points}</h2>
      <h1>Job Applications</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobApplicationDetails.map((jobapp) => (
            <tr>
              <td key={jobapp.id}>{jobapp.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>LeetCode</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leetCodeDetails.map((leetcode) => (
            <tr>
              <td key={leetcode.id}>{leetcode.name}</td>
              <td key={leetcode.id}>{leetcode.level}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Add Job</h1>
      <input
        type="text"
        id="name"
        placeholder="Name"
        onChange={changeJobNameHandler}
        value={jobApplicationName}
      />
      <button onClick={addJob}>Add Job</button>

      <h1>Add LeetCode</h1>
      <input
        type="text"
        id="name"
        placeholder="Name"
        onChange={changeLeetcodeNameHandler}
        value={leetCodeName}
      />
      <div onChange={changeLeetcodeLevelHandler}>
        <input type="radio" value="EASY" name="level" /> Easy
        <input type="radio" value="MEDIUM" name="level" /> Medium
        <input type="radio" value="HARD" name="level" /> Hard
      </div>
      <button onClick={addLeetcode}>Add LeetCode</button>
    </div>
  );
}

export default App;
