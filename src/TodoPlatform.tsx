import "./style/main.scss";
import { Routes, Route } from "react-router-dom";
import Todolist from "./Components/Todolist";

const TodoPlatform = () => {
  return (
    <Routes>
      <Route path='/' element={<Todolist />} />
    </Routes>
  );
};

export default TodoPlatform;
