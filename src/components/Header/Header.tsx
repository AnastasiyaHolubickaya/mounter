import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface IComponentProps {}

const Header: React.FC<IComponentProps> = () => {
  return (
    <div className={styles.navigation}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/service">Service</Link>
      <Link to="/team">Team</Link>
    </div>
  );
};

export default Header;
