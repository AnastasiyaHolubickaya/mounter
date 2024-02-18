import { Link, useLocation } from 'react-router-dom';
//*Styles
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div>
      {pathnames.length > 0 && (
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
          <span>/</span>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return (
              <li key={name} className={styles.item}>
                {isLast ? (
                  name
                ) : (
                  <Link to={routeTo} className={styles.link}>
                    {name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Breadcrumbs;
