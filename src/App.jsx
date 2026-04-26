import React from 'react';
import Body from './components/Body';
import {store} from './store/store';
import { Provider } from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import BingeCat from './components/BingeCat';
import Browse from './components/Browse';
import BasePage from './components/BasePage';
import MovieDetailsPage from './components/MovieDetailsPage';
import PawCursor from './components/UI/PawCursor';



function App() {
 const router = createBrowserRouter([
  { path: '/BingeCat', element: <Body />,children: [
    {path: '/BingeCat/', element: <BasePage />},
    {path: 'contact', element: <h1>Contact</h1>},
    {path: 'cart', element: <h1>Cart</h1>},
    {path: 'movies', element: <Browse type = {"movie"}/>},
    {path: 'series', element: <Browse type = {"series"}/>},
    {path: 'movies/:id', element: <MovieDetailsPage/>},
    {path: 'series/:id', element: <MovieDetailsPage/>},
    {path: 'watchlist', element: <h1>Watchlist</h1>},
    {path: 'login', element: <h1>Login</h1>},
  ]
  },
 ]);
  return (
    <> 
    <PawCursor />
      <Provider store={store}>
        <RouterProvider router={router} ></RouterProvider>
      </Provider>
    </>
  )
}

export default App;