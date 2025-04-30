import './App.css';
import { Provider } from 'react-redux';
import store from './utils/store';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Head from './components/Head';
import Body from './components/Body';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import SearchPage from './components/SearchPage';
import Shorts from './components/Shorts';


const AppLayout = () => {
  return (
    <>
      <Head />
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,   // Wrap Head + page layout
    children: [
      {
        path: '/',
        element: <Body />,
        children: [
          {
            path: '/',
            element: <MainContainer />,
          },
          {
            path: 'watch',
            element: <WatchPage />,
          },
          {
            path: 'shorts',
            element: <Shorts />,
          },
          {
            path: 'search',
            element: <SearchPage />,
          },
          
          {
            path: 'search/:query',
            element: <MainContainer />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
