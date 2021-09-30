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
import Stocks from "./pages/Stocks";

//import "./App.css";

const App: FC = () => {
  return (
    <Router>
      <div className="bg-blue  text-white bg-blue-900 flex flex-col h-full overflow-hidden min-h-screen">
        <Navbar />
        <MainLayOut>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/stocks" component={Stocks} />
            <Route exact path="/forex" component={Forex} />
          </Switch>
        </MainLayOut>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
