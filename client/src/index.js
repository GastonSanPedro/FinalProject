import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './views/Profile';
import Landing from './views/LandingPage';
import SignIn from './views/SignIn';
import { ChakraProvider } from '@chakra-ui/react';
import SearchPage from './views/SearchPage';
import Feed from './views/Feed';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createRoot } from 'react-dom/client';
import AnyProfile from './views/AnyProfile';
import AdminProfile from './views/AdminProfile';
import axios from 'axios';
import Payments from './views/Payments';
import Settings from './views/Settings';
import Explore from './views/Explore';
import { PaymentSucess } from './views/PaymentSucess';
// const Dotenv = require('dotenv-webpack');

// require('dotenv').config();

// import dotenv from 'dotenv'
// dotenv.config();
//console.log(process.env.REACT_APP_API);
axios.defaults.baseURL = process.env.REACT_APP_API;
// axios.defaults.baseURL = 'http://localhost:3001';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<App/>}/> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminProfile />} />
            <Route path="/landing-page" element={<Landing />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/search-page" element={<SearchPage />}></Route>
            <Route path="/home" element={<Feed />}></Route>
            <Route exact path="/user/:email" element={<AnyProfile />} />
            <Route path="*" element={<Landing />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/success-payment" element={<PaymentSucess />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <Provider store={store}>
//   <React.StrictMode>
//     <ChakraProvider theme={theme}>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App/>}/>
//         <Route path="profile" element={<Profile/>}/>
//         <Route path="/landing-page" element={<Landing/>}></Route>
//         <Route path="/sign-in" element={<SignIn/>}></Route>
//         <Route path="/search-page" element={<SearchPage/>}></Route>
//         <Route path="/home" element={<Feed/>}></Route>
//       </Routes>
//     </BrowserRouter>

//     </ChakraProvider>
//   </React.StrictMode>
//   </Provider>
// );
