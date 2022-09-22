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
import axios from 'axios'

// import dotenv from 'dotenv'
// dotenv.config();

//axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<App/>}/> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/landing-page" element={<Landing />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/search-page" element={<SearchPage />}></Route>
            <Route path="/home" element={<Feed />}></Route>
            <Route exact path="/user/:email" element={<AnyProfile />} />
            <Route path="*" element={<Landing />} />
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
