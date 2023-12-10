import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Login } from './components/Login/Login';
import { Navbar } from './components/Navbar/Navbar';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
