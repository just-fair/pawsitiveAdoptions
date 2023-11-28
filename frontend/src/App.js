import Home from './pages/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Adopt from './pages/Adopt';
import Admin from './pages/Admin';
import Donation from './pages/Donation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home/>}/>                    
            <Route path='/adopt' element={<Adopt/>}/>         
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/donation' element={<Donation/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
