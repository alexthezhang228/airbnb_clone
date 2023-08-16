/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-03 15:29:08
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-16 21:03:01
 * @FilePath: /airbnb_clone/client/src/App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';


import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import {UserContextProvider} from './UserContext'
import Account from './pages/Account';
import Accommodations from './pages/Accommodations';
import AccommodationFormPage from './pages/AccommodationFormPage'
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';

axios.defaults.baseURL='http://127.0.0.1:4000'
axios.defaults.withCredentials=true
// In summary,it allows you to include cookies with cross-origin requests, 
// facilitating authentication and session management between your frontend and backend applications.

function App() {
  return (
    <BrowserRouter>
    <UserContextProvider>
      <Routes>  
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/account/' element={<Account/>} />
        <Route path='/account/accommodations/' element={<Accommodations/>}></Route>
        <Route path='/account/accommodations/new' element={<AccommodationFormPage/>}></Route>
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path='/account/accommodations/:id' element={<AccommodationFormPage/>}></Route>
        <Route path='/place/:id' element={<PlacePage/>}></Route>
      </Routes>

    </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
