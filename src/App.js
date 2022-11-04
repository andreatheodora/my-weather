import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './views/Home';
import SavedCities from './views/SavedCities';
import Detail from './views/Detail';




const ariaLabel = { 'aria-label': 'description'};
function App() {


  return (
    <>
<Router>
  <Routes>
    <Route exact path='/' element={<Home/>}></Route>
    <Route exact path='/detail' element={<Detail/>}></Route>
    <Route exact path='/savedCities' element={<SavedCities/>}></Route>
  </Routes>
</Router>
    

    </>
  );
  
}

export default App;
