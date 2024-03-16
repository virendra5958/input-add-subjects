import React,{useState, useEffect} from 'react';

const SubjectManagement = () => {

     const [sub, setSub]= useState([]);
     const [subName, setSubName]= useState('');
     const [studyHours, setstudyHours]= useState('');

     useEffect (()=>{
      const saveSub = JSON.parse(localStorage.getItem('sub'));
      if(saveSub){
     setSub(saveSub);
      }
     }, []);

     const addSub =()=>{
      if(subName && studyHours){
        const newSub ={name:subName, hours:parseInt(studyHours)};
        setSub([...sub, newSub]);
        localStorage.setItem('sub', JSON.stringify([... sub, newSub]));
        setSubName('');
        studyHours('');
      }else{
        alert('Please enter sub');
      }
     };
     const handleHours =(ind, val) =>{
      const updateSub = [...sub];
      updateSub[ind].hours += val;
      localStorage.setItem('sub', JSON.stringify(updateSub));
     };

  return (
    <div>
     <div>
      <input type="text" placeholder='Enter Sub' value={subName} onChange={(e) =>setSubName(e.target.value)} />
      <input type="number" placeholder='Enter Hours' value={studyHours} onChange={(e) =>setstudyHours(e.target.value)} />
      <button onClick={addSub}>Add Sub</button>
     </div>
     <div>
      {
        sub.map((sub, ind) =>(
         <div key ={ind}>
          <span>{sub.name}</span>
          <span>{sub.hours} Hours</span>
          <button onCanPlay={() => handleHours(index, 1)}>+</button>
          <button onCanPlay={() => handleHours(index, -1)}>-</button>
         </div>
        ))
      }
     </div>
      
    </div>
  );
}

export default Child;
