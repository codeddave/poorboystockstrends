import { FC } from "react";
import { BrowserRouter as Router /* Route, Switch  */ } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";

//import "./App.css";

const App: FC = () => {
  return (
    <Router>
      <div className="bg-blue px-20 text-white bg-blue-900 h-screen overflow-hidden">
        <Navbar />
      </div>
    </Router>
  );
};

export default App;
