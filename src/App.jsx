import React from 'react';
import Body from './components/Body';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BingeCat from './components/BingeCat';
import Browse from './components/Browse';
import BasePage from './components/BasePage';
import MovieDetailsPage from './components/MovieDetailsPage';
import PawCursor from './components/UI/PawCursor';
import ScrollToTop from './components/UI/ScrollToTop';
import WatchListPage from './components/WatchListPage';
import Explorepage from './components/Explorepage';
import ForYouPage from './components/ForYouPage';

function App() {

 const router = createBrowserRouter([
  {
    path: '/BingeCat',
    element: (
      <>
        <ScrollToTop />
        <Body />
      </>
    ),
    children: [
      { path: '/BingeCat/', element: <BasePage /> },
      { path: 'contact', element: <h1>Contact</h1> },
      { path: 'cart', element: <h1>Cart</h1> },
      { path: 'movies', element: <Browse type={"movie"} /> },
      { path: 'series', element: <Browse type={"series"} /> },
      { path: 'movies/:id', element: <MovieDetailsPage /> },
      { path: 'series/:id', element: <MovieDetailsPage /> },
      { path: 'watchlist', element: <WatchListPage /> },
      { path: 'login', element: <h1>Login</h1> },
      { path: 'explore', element: <Explorepage /> },
      { path: 'for-you', element: <ForYouPage /> }
    ]
  },
 ]);

  return (
    <>
      <PawCursor />

      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App;