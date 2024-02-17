import { SetStateAction, memo, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { animated, useSpring } from 'react-spring';
import cn from 'classnames';
// * Style
import baseStyles from '../../../styles/base.module.css';
import styles from './Navigation.module.css';
//*Components
import Logo from '../../Logo/Logo';
//*Icons
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FaHouseCircleExclamation } from 'react-icons/fa6';
import AuthContext from '../../../authContext';

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
};

type NavigationPropsType = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const Navigation = ({ setOpen }: NavigationPropsType) => {
  const { isMobile, isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();

  const menuFirst: Array<DataPropsType> = t('list.menuFirst', {
    returnObjects: true,
  });

  const menuSecond: DataPropsType[] = t('list.menuSecond', {
    returnObjects: true,
  });

  const subMenu: DataPropsType[] = t('list.subMenu', { returnObjects: true });

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
            />
          ))}
        </div>
      </ul>
    </>
  );
};

const Item = memo(
  ({ path, text, subMenu, isMobile, isAuthenticated }: ItemPropsType) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const springProps = useSpring({
      opacity: isSubMenuOpen ? 1 : 0,
      height: isSubMenuOpen ? 'auto' : 0,
      transform: `scale(${isSubMenuOpen ? 1 : 0.8})`,
      config: { tension: 600, friction: 60 },
    });

    const handleMouseEnter = () => {
      setIsSubMenuOpen(true);
    };

    const handleMouseLeave = () => {
      setIsSubMenuOpen(false);
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (path === '#') {
        e.stopPropagation();
        setIsSubMenuOpen(!isSubMenuOpen);
      }
    };

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
        </Link>
        {path === '#' ? (
          isSubMenuOpen ? (
            <FaMinus className={styles.icon} />
          ) : (
            <FaPlus className={styles.icon} />
          )
        ) : null}

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
