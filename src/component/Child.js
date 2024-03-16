import { useEffect, useState } from "react";
import axios from "axios";

const Child = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodo(response.data)
      })
      .catch(error=>{
        console.error('err data', error)
      })
  }, []);

  return (
    <div>
      <ul>
        {todo.map((val) => (
          <li key={val.id}>{val.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Child;
