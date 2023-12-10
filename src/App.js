import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Login } from './components/Login/Login';
import { Navbar } from './components/Navbar/Navbar';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import * as recipeService from './services/recipeService';
import * as authService from './services/authService';
// import { RecipeContext } from './contexts/RecipeContext';
import { AuthContext } from './contexts/AuthContext';


function App() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    recipeService.getAll()
      .then(result => {
        // console.log(result);
        setRecipes(result)
      })
  }, []);

  // const onLoginSubmit = async (data) => {
  //   console.log(object);
  // }

  const onCreateSubmit = async (formValues) => {
    const newRecipe = await recipeService.create(formValues);
    setRecipes(state => [...state, newRecipe]);
    navigate('/catalog');
  }

  const onEditSubmit = async (values) => {
    const result = await recipeService.edit(values._id, values);
    // TODO: null?
    setRecipes(state => state.map(x => x._id === values._id ? result : null));
  }

  const onLoginSubmit = async (formValues) => {
    try {
      const result = await authService.login(formValues);
      setAuth(result);
      navigate('/catalog');
      
    } catch (err) {
      console.log('ERROR PROBLEM');
    }

  }

  const onRegisterSubmit = async (formValues) => {
    console.log(formValues);
    const result = await authService.register(formValues);
    console.log(result);
  }

  return (

    <AuthContext.Provider value={{ onLoginSubmit }}>
      <div className="App">
        <Navbar />
        <main className='main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<Create onCreateSubmit={onCreateSubmit} />} />
            <Route path='*' element={<div><h1>404</h1><h2>Page not found</h2></div>} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
