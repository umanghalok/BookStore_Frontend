import React, {useState} from 'react'
import {Routes, Route, Outlet, Navigate} from "react-router-dom";
import BookList from '../components/BookList/BookList.jsx';
import BookForm from '../components/BookForm/BookForm.jsx';
import BookDetail from '../components/BookDetail/BookDetail.jsx';
import BookUpdateForm from '../components/BookUpdate/BookUpdateForm.jsx';
import Header from '../components/Header/Header.jsx';
import Signup from '../components/Account/Signup.jsx';
import Login from '../components/Account/Login.jsx';


const PrivateRoute=({isAuthenticated,...props})=>{
  //show this only when the user is logged in.
  return isAuthenticated?
  <>
      <Header/>
      <Outlet/>
  </>
  :<Navigate replace to='/login'/>
  //when the user is not signed in, navigate to login page, or when there is a refresh take it back to login page
}

const Routers = () =>{
  const[isAuthenticated, isUserAuthenticated]=useState(false);
  return (
    <div>
        <Header isUserAuthenticated={isUserAuthenticated} 
        isAuthenticated={isAuthenticated}/>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>
          <Route path="/" element={<BookList />} />

          <Route path='/add' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/add" element={<BookForm />} />
          </Route>

          <Route path="/books/:id" element={<BookDetail />} />

          <Route path='/books/:id/update' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/books/:id/update" element={<BookUpdateForm />} />
          </Route>

          <Route path='/books/:id/delete' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/books/:id/delete" element={<BookList />} />
          </Route>

        </Routes>
    </div>
  )
}

export default Routers;