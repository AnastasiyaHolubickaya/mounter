import { Link, Outlet } from 'react-router-dom';
//import styles from './Blog.module.css'
//*Components
import Banner from '../../components/Banner/Banner';

const Blog = () => {
  return (
    <>
      <Banner />
      <Link to="/blog/details">Blog details</Link>
      <Outlet />
    </>
  );
};

export default Blog;
