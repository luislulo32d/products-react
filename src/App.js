import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowProducts } from "./components/showProducts";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowProducts></ShowProducts>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
