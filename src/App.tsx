import { FC } from "react";
import {
  BrowserRouter as Router,
  Route /* Route, Switch  */,
  Switch,
} from "react-router-dom";
import { Footer, Navbar } from "./components";
import MainLayOut from "./components/MainAppLayout";
import Forex from "./pages/Forex";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stocks from "./pages/Stocks";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Crypto from "./pages/Crypto";

//import "./App.css";

const App: FC = () => {
  return (
    <Router>
      <ToastContainer />
      <div className="bg-blue  text-white bg-blue-900 flex flex-col h-full overflow-hidden min-h-screen relative ">
        <Navbar />
        <MainLayOut>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/stocks" component={Stocks} />
            <Route exact path="/forex" component={Forex} />
            <Route exact path="/crypto" component={Crypto} />
          </Switch>
        </MainLayOut>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
