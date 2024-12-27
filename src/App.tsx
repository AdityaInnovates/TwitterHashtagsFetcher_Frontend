import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"; // Assuming Home is your main component
import Records from "./Records"; // Import the new Records component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
  );
}
