import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from './components/HomePage'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage/>} />
      </Routes>
    </div>
  );
};
export default App;
