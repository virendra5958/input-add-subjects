import React, { useState, useEffect } from 'react';
import Child from './component/Child';

const SubjectManagement = () => {
  // State variables for subjects, subject name, and study hours
  const [subjects, setSubjects] = useState([]); 
  const [subjectName, setSubjectName] = useState(''); 
  const [studyHours, setStudyHours] = useState(''); 

  // useEffect to load subjects from local storage on component mount
  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem('subjects'));
    if (savedSubjects) {
      setSubjects(savedSubjects);
    }
  }, []);

  // Function to add a new subject
  const addSubject = () => {
    if (subjectName && studyHours) { // Check if both subject name and study hours are entered
      const newSubject = { name: subjectName, hours: parseInt(studyHours) };
      setSubjects([...subjects, newSubject]);
      localStorage.setItem('subjects', JSON.stringify([...subjects, newSubject]));
      setSubjectName(''); 
      setStudyHours(''); 
    } else {
      alert('Please enter both subject name and study hours.'); // Alert if inputs are missing
    }
  };

  // Function to handle adjusting study hours for a subject
  const handleHours = (index, val) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].hours += val;
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  };

  return (
    <div>
      <Child />
      {/* Input fields for entering subject name and study hours */}
      <div>
        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter study hours"
          value={studyHours}
          onChange={(e) => setStudyHours(e.target.value)}
        />
        <button onClick={addSubject}>Add Subject</button> {/* Button to add subject */}
      </div>
      {/* Display added subjects and their study hours */}
      <div>
        {subjects.map((subject, index) => (
          <div key={index}>
            <span>{subject.name}</span>
            <span>{subject.hours} Hours</span>
            {/* Buttons to adjust study hours */}
            <button onClick={() => handleHours(index, 1)}>+</button> 
            <button onClick={() => handleHours(index, -1)}>-</button> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectManagement;
