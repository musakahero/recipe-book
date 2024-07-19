// import { useContext } from "react"
// import { AuthContext } from "../contexts/AuthContext"
// import { useParams } from "react-router-dom";
// import { RecipeContext } from "../contexts/RecipeContext";

// const Nav = ({path}) => {
//     const {userId} = useContext(AuthContext);
//     const {recipes} = useContext(RecipeContext);
//     const {recipeId} = useParams();
    
//     const routingTable = {
//         public: {
//             home: '/',
//             catalog: '/catalog',
//             recipeDetails: '/catalog/:recipeId'
//         },
//         authenticated: {
//             create:'/create',
//             logout:'/logout',
//             edit: '/edit/:recipeId',
//             delete: '/delete/:recipeId',
//             profile: '/profile/:userId'
//         },
//         unauthenticated: {
//             register:'/register',
//             login:'/login',
//             unauthorized: '/unauthorized'
//         }
//     }
//     return <Nav />
// }



