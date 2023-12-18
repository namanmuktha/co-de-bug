import logo from "./logo.svg";
import "./App.css";
import "./pages/search";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Routes,
} from "react-router-dom";
import Search from "./pages/search";

function App() {
  return (
    <div className="App">
      <Search />
    </div>
  );
}

export default App;
