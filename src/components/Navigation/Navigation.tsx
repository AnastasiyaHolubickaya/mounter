import {
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { animated, useSpring } from 'react-spring';
import cn from 'classnames';
// * Style
import baseStyles from '../../styles/base.module.css';
import styles from './Navigation.module.css';
//*Components
import Logo from '../Logo/Logo';
//*Icons
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FaHouseCircleExclamation } from 'react-icons/fa6';
import AuthContext from '../../authContext';

type DataPropsType = {
  path: string;
  text: string;
};

type ItemPropsType = {
  path: string;
  text: string;
  subMenu?: DataPropsType[];
  isMobile?: boolean;
  isAuthenticated?: boolean;
  setIsAuthenticated?: Dispatch<SetStateAction<boolean>>;
};

type NavigationPropsType = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

/**
 * Navigation component responsible for rendering the menu and handling interactions.
 * @param {NavigationPropsType} props - Props for the Navigation component.
 */
const Navigation = ({ setOpen }: NavigationPropsType) => {
  const { isMobile, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const { t } = useTranslation();

  //* Extract menu items from translation
  const menuFirst: Array<DataPropsType> = t('list.menuFirst', {
    returnObjects: true,
  });

  const menuSecond: DataPropsType[] = t('list.menuSecond', {
    returnObjects: true,
  });

  const subMenu: DataPropsType[] = t('list.subMenu', { returnObjects: true });

  //*Handle onClick event to close the menu.
  const handleOnClick = () => {
    setOpen(false);
  };

  return (
    <>
      <ul
        className={cn([!isMobile ? styles.menu : styles.menu_mobile])}
        onClick={handleOnClick}
      >
        <div className={styles.list}>
          {menuFirst.map((element, elIndex) => (
            <Item
              key={`list-item-${element.text}-${elIndex}`}
              path={element.path}
              text={element.text}
            />
          ))}
        </div>
        <li className={styles.logo}>
          <Logo />
        </li>
        <div className={styles.list}>
          {menuSecond.map((element, elIndex) => (
            <Item
              key={`list-item-${element.text}-${elIndex}`}
              path={element.path}
              text={element.text}
              subMenu={subMenu}
              isMobile={isMobile}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          ))}
        </div>
      </ul>
    </>
  );
};

/**
 * Item component represents a single item in the navigation menu.
 * @param {ItemPropsType} props - Props for the Item component.
 */
const Item = memo(
  ({
    path,
    text,
    subMenu,
    isMobile,
    isAuthenticated,
    setIsAuthenticated,
  }: ItemPropsType) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const springProps = useSpring({
      opacity: isSubMenuOpen ? 1 : 0,
      height: isSubMenuOpen ? 'auto' : 0,
      transform: `scale(${isSubMenuOpen ? 1 : 0.8})`,
      config: { tension: 600, friction: 60 },
    });

    //*Handle mouse enter event to open the sub-menu.
    const handleMouseEnter = () => {
      setIsSubMenuOpen(true);
    };

    //*Handle mouse leave event to close the sub-menu.
    const handleMouseLeave = () => {
      setIsSubMenuOpen(false);
    };

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
        if (path === '/auth' && isAuthenticated && setIsAuthenticated) {
          setIsAuthenticated(false);
        }
      },
      [
        path,
        setIsSubMenuOpen,
        isSubMenuOpen,
        isAuthenticated,
        setIsAuthenticated,
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
            isAuthenticated ? (
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
              isMobile && styles.sub_menu_mob,
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
  }
);

export default memo(Navigation);
