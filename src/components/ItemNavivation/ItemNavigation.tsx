import { memo, useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import cn from 'classnames';
// * Style
import baseStyles from '../../styles/base.module.css';
import styles from './ItemNavigation.module.css';
//*Data
import { DataPropsType } from '../Navigation/Navigation';
//*Icons
import { FaHouseCircleExclamation, FaMinus, FaPlus } from 'react-icons/fa6';
import AuthContext from '../../authContext';

type ItemPropsType = {
  path: string;
  text: string;
  subMenu?: DataPropsType[];
};

const ItemNavigation = ({ path, text, subMenu }: ItemPropsType) => {
  // Accessing the authentication context
  const { appState, setAppState } = useContext(AuthContext);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Define spring animation properties
  const springProps = useSpring({
    opacity: isSubMenuOpen ? 1 : 0,
    height: isSubMenuOpen ? 'auto' : 0,
    transform: `scale(${isSubMenuOpen ? 1 : 0.8})`,
    config: { tension: 600, friction: 60 },
  });

  //*Handle mouse enter event to open the sub-menu.
  const handleMouseEnter = useCallback(() => {
    setIsSubMenuOpen(true);
  }, []);

  //*Handle mouse leave event to close the sub-menu.
  const handleMouseLeave = useCallback(() => {
    setIsSubMenuOpen(false);
  }, []);

  /**
   * Handle click event for item.
   * @param {React.MouseEvent<HTMLAnchorElement>} e - The click event.
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (path === '#') {
        e.stopPropagation();
        setIsSubMenuOpen(!isSubMenuOpen);
      }
      if (path === '/auth' && appState.isAuthenticated) {
        setAppState((prevState) => ({
          ...prevState,
          isAuthenticated: false,
        }));
      }
    },
    [
      path,
      setIsSubMenuOpen,
      isSubMenuOpen,
      appState.isAuthenticated,
      setAppState,
    ]
  );

  return (
    <li
      className={styles.item}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={path}
        className={cn([baseStyles.adaptive_font_nav, styles.link])}
        onClick={(e) => handleClick(e)}
      >
        {path === '/auth' ? (
          appState.isAuthenticated ? (
            <FaHouseCircleExclamation />
          ) : (
            text
          )
        ) : (
          text
        )}

        {path === '#' ? (
          isSubMenuOpen ? (
            <FaMinus className={cn([styles.icon, styles.icon_list])} />
          ) : (
            <FaPlus className={cn([styles.icon, styles.icon_list])} />
          )
        ) : null}
      </Link>

      {path === '#' && subMenu && isSubMenuOpen && (
        <animated.ul
          className={cn([
            styles.sub_menu,
            appState.isMobile && styles.sub_menu_mob,
            styles.show,
          ])}
          style={{ ...springProps }}
        >
          {subMenu.map((item, index) => (
            <li key={`list-item-${item.text}-${index}`}>
              <Link to={item.path} className={styles.link}>
                {item.text}
              </Link>
            </li>
          ))}
        </animated.ul>
      )}
    </li>
  );
};

export default memo(ItemNavigation);
