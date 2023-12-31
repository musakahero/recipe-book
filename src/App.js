import styles from './App.module.css';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Login } from './components/Login/Login';
import { Navbar } from './components/Navbar/Navbar';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import * as recipeService from './services/recipeService';
import * as authService from './services/authService';
import { AuthContext } from './contexts/AuthContext';
import { RecipeContext } from './contexts/RecipeContext';
import { Logout } from './components/Logout/Logout';
import { RecipeDetails } from './components/RecipeDetails/RecipeDetails';
import { Edit } from './components/Edit/Edit';
import { Delete } from './components/Delete/Delete';
import { MyProfile } from './components/My Profile/MyProfile';
import { Footer } from './components/Footer/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [auth, setAuth] = useLocalStorage('auth', {});

  useEffect(() => {
    recipeService.getAll()
      .then(result => {
        setRecipes(result)
      })
      .catch(err => { //Handle server down situation
        navigate('/nodata');
      })
  }, []);


  //Operation handlers
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
      //update Recipes state
      setRecipes(state => [...state, newRecipe]);
      navigate('/catalog');

    } catch (err) {
      alert(err.message);
    }
  }

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
      setRecipes(state => [...state.filter(x => x._id !== formValues._id), result]);
      navigate(`/catalog/${formValues._id}`);

    } catch (err) {
      alert(err.message);
    }
  }

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
      console.log(result);
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
    } catch (err) {
      alert(err.message);
    }
  }

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
  }

  const recipeContextObj = {
    recipes,
    setRecipes,
    onCreateSubmit,
    onEditSubmit,
  }


  return (
    <RecipeContext.Provider value={recipeContextObj}>
      <AuthContext.Provider value={authContextObj}>
        <div className={styles["App"]}>
          <Navbar />
          <main className={styles["main"]}>
            <Routes>
              {/* public routes */}
              <Route path='/' element={<Home />} />
              <Route path='/catalog' element={<Catalog recipes={recipes} />} />

              {/* authenticated-only routes */}
              {authContextObj.isAuthenticated() ?
                <>
                  <Route path='/create' element={<Create />} />
                  <Route path='/logout' element={<Logout />} />
                  <Route path='/catalog/:recipeId' element={<RecipeDetails />} />
                  <Route path='/edit/:recipeId' element={<Edit />} />
                  <Route path='/delete/:recipeId' element={<Delete />} />
                  <Route path='/profile/:userId' element={<MyProfile />} />
                </>
                // unathenticated-only routes
                : <>
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                </>}
              {/* Edge cases */}
              <Route path='*' element={<div><h1>404</h1><h2>Page not found</h2></div>} />
              <Route path='/nodata' element={<div><h1>Server error</h1><h2>The data is currently unavailable. We are sorry for the inconvenience!</h2></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthContext.Provider>
    </RecipeContext.Provider>
  );
}

export default App;
