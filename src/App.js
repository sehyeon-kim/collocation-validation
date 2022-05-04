import logo from './logo.svg';
import './App.css';
import Validation from './components/Validation';
import Example from './components/Example'
import Home from './components/Home'
import Bye from './components/Bye'
import Auth from './components/Auth'
import Box from './components/Box'
import Collocation from './components/Collocation';
import Init from './components/Init'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/:collSize/:startID/:writeID" element={<Home />} />
        <Route path="/example/:collSize/:startID/:writeCol" element={<Example />} />
        <Route path="/validation/:collSize/:startID/:writeCol/:index" element={<Validation />} />
        <Route path="/bye" element={<Bye />} />
        <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
