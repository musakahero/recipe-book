import styles from './App.module.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AuthContext } from './contexts/AuthContext';
import { RecipeContext } from './contexts/RecipeContext';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { MyProfile } from './components/My Profile/MyProfile';
import { Home } from './components/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { RecipeDetails } from './components/RecipeDetails/RecipeDetails';
import { Edit } from './components/Edit/Edit';
import { Delete } from './components/Delete/Delete';
import { Footer } from './components/Footer/Footer';
import * as authService from './services/authService';
import * as recipeService from './services/recipeService';


function App() {
  const navigate = useNavigate();
  const [allRecipes, setAllRecipes] = useState([]);
  const [auth, setAuth] = useLocalStorage('auth', {});

  useEffect(() => {
    recipeService.getAll()
      .then(result => {
        setAllRecipes(result);
      })
      .catch(err => { //Handle server down situation
        navigate('/nodata');
        setAuth({});
      });
  }, []);

  //Operation handlers
  //Auth handlers
  const onLoginSubmit = async (formValues) => {
    try {
      //post request
      const result = await authService.login(formValues);

      //update Auth state
      setAuth(result);
      navigate('/catalog');

    } catch (err) {
      alert(err.message);
    }
  };

  const onRegisterSubmit = async (formValues) => {
    const { repeat, ...registerData } = formValues;

    try {
      //repeat password validation
      if (repeat !== registerData.password) {
        throw Error('The two passwords must match.');
      };
      //post request
      const result = await authService.register(registerData);
      //update Auth state
      setAuth(result);
      navigate('/catalog');

    } catch (err) {
      alert(err.message);
    }
  };

  const onLogoutClick = async (token) => {
    try {
      //Authorized get request
      await authService.logout(token, true);
      //Reset the Auth state
      setAuth({});
      //clear local Storage
      localStorage.clear();
    } catch (err) {
      alert(err.message);
    }
  };
  //Recipe CRUD/Search handlers
  const onCreateSubmit = async (formValues) => {
    try {
      //validation - check if empty strings in mandatory fields only
      for (const field in formValues) {
        if (formValues[field] == false && field !== 'img') {
          throw Error('All mandatory fields must be filled.');
        }
      };

      //split ingredients and remove whitespaces 
      formValues.ingredients = formValues.ingredients.split(',')
        .map(x => x.trim())
        .filter(x => x != false);

      //post request
      const newRecipe = await recipeService.create(formValues, auth.accessToken);
      //update allRecipes state
      setAllRecipes(state => [...state, newRecipe]);
      navigate('/catalog');

    } catch (err) {
      alert(err.message);
    }
  };
  const onEditSubmit = async (formValues) => {
    try {
      //validation - check if empty strings in mandatory fields only
      for (const field in formValues) {
        if (formValues[field] == false && field !== 'img') {
          throw Error('All mandatory fields must be filled.');
        }
      };

      //split ingredients and remove whitespaces if string (array changes to string every time the field is edited)
      if (typeof (formValues.ingredients) === 'string') {
        formValues.ingredients = formValues.ingredients.split(',')
          .map(x => x.trim())
          .filter(x => x != false);
      }

      //put request
      const result = await recipeService.edit(formValues._id, formValues, auth.accessToken);

      //update Recipes state
      setAllRecipes(state => [...state.filter(x => x._id !== formValues._id), result]);
      navigate(`/catalog/${formValues._id}`);

    } catch (err) {
      alert(err.message);
    }
  };

  //Context objects
  const authContextObj = {
    onLoginSubmit,
    onRegisterSubmit,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    username: auth.username,
    isAuthenticated() {
      return !!auth.accessToken
    },
    onLogoutClick,
    setAuth
  };
  const recipeContextObj = {
    allRecipes,
    setAllRecipes,
    onCreateSubmit,
    onEditSubmit
  };


  return (
    <RecipeContext.Provider value={recipeContextObj}>
      <AuthContext.Provider value={authContextObj}>
        <div className={styles["App"]}>
        <Navbar />
          <main className={styles["main"]}>
            <Routes>
              {/* public routes */}
              <Route path='/' element={<Home />} />
              <Route path='/catalog' element={<Catalog allRecipes={allRecipes} />} />
              <Route path='/catalog/:recipeId' element={<RecipeDetails />} />
              {/* authenticated-only routes */}
              {authContextObj.isAuthenticated() ?
                <>
                  <Route path='/create' element={<Create />} />
                  <Route path='/logout' element={<Logout />} />
                  {/* authorized-user-only routes */}
                  <Route path='/edit/:recipeId' element={<Edit />} />
                  <Route path='/delete/:recipeId' element={<Delete />} />
                  <Route path='/profile/:param_userId' element={<MyProfile />} />
                </>
                // unauthenticated-only routes
                : <>
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                </>}
              {/* Edge cases */}
              <Route path='*' element={<div><h1>404</h1><h2>Page not found</h2></div>} />
              <Route path='/nodata' element={<div><h1>Server error</h1><h2>The data is currently unavailable. We are sorry for the inconvenience!</h2></div>} />
              <Route path='/unauthorized' element={<div><h1>Unauthorized</h1><h2>You do not have access to this page.</h2></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthContext.Provider>
    </RecipeContext.Provider>
  );
}

export default App;


