// * Base
import cn from 'classnames';
import Navigation from './Navigation/Navigation';
// * Style
import baseStyles from '../../styles/base.module.css';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={cn([baseStyles.wrapper])}>
      <nav className={styles.navigation}>
        <Navigation />
      </nav>
    </div>
  );
};

export default Header;
