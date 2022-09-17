import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import theme from './theme';
import Feed from './views/Feed';
import Landing from './views/LandingPage';
import Profile from './views/Profile';
import SearchPage from './views/SearchPage';
import SignIn from './views/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/landing-page" element={<Landing />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/search-page" element={<SearchPage />}></Route>
            <Route path="/home" element={<Feed />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
