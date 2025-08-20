import "./App.css";
import MainSection from "./Web/Components/MainSection.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
