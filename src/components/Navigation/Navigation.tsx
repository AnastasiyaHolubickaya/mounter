import { SetStateAction, memo, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
// * Style
import styles from './Navigation.module.css';
//*Components
import Logo from '../Logo/Logo';
import ItemNavigation from '../ItemNavivation/ItemNavigation';
import AuthContext from '../../authContext';

//* Type for the object representing the data of a navigation item
export type DataPropsType = {
  path: string;
  text: string;
};

//* Type for the props of the Navigation component
type NavigationPropsType = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const Navigation = ({ setOpen }: NavigationPropsType) => {
  // Destructuring the 'appState' from the context using the 'useContext' hook
  const { appState } = useContext(AuthContext);

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
  const handleOnClick = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <ul
        className={cn([!appState.isMobile ? styles.menu : styles.menu_mobile])}
        onClick={handleOnClick}
      >
        <div className={styles.list}>
          {menuFirst.map((element, elIndex) => (
            <ItemNavigation
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
            <ItemNavigation
              key={`list-item-${element.text}-${elIndex}`}
              path={element.path}
              text={element.text}
              subMenu={subMenu}
            />
          ))}
        </div>
      </ul>
    </>
  );
};

export default memo(Navigation);
