// * Base
import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
// * Components
import App from './App';
import Loading from './components/Loading/Loading';
// * Pages
import Home from './pages/Home/Home';

// * Types
type ElementPropsType = {
  component: React.ReactNode;
};

//* Lasy Loading
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Gallery = lazy(() => import('./pages/Gallery/Gallery'));
const Service = lazy(() => import('./pages/Service/Service'));
const Registration = lazy(() => import('./pages/Registration/Registration'));
const Auth = lazy(() => import('./pages/Auth/Auth'));

const Element = ({ component }: ElementPropsType) => {
  return <Suspense fallback={<Loading />}>{component}</Suspense>;
};

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [],
      },
      {
        path: '/about',
        element: <Element component={<About />} />,
        children: [],
      },
      {
        path: '/contact',
        element: <Element component={<Contact />} />,
        children: [],
      },
      {
        path: '/gallery',
        element: <Element component={<Gallery />} />,
        children: [],
      },
      {
        path: '/service',
        element: <Element component={<Service />} />,
        children: [],
      },
      {
        path: '/auth',
        element: <Element component={<Auth />} />,
        children: [],
      },
      {
        path: '/registration',
        element: <Element component={<Registration />} />,
        children: [],
      },
    ],
  },
]);
