import { Link, Outlet } from 'react-router-dom';
import styles from './Blog.module.css'

interface IComponentProps {}

const Blog:React.FC<IComponentProps> = () => {
 

  return (
    <>
    <h1 className={styles.wrapper}>Blog page</h1>
    <Link to='/blog/details'>Blog details</Link>
    <Outlet/>
    </>
  )
}

export default Blog;