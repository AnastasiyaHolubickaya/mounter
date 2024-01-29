// * Base
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
// * Style
import baseStyles from '../../../styles/base.module.css';
import styles from './Navigation.module.css';
//*Components
import Logo from '../../Logo/Logo';

type propsType = {
  path: string;
  text: string;
};

type navigationPropsType = {
  isMobile: boolean;
};

const Navigation = ({ isMobile }: navigationPropsType) => {
  const { t } = useTranslation();

  const menuFirst: Array<propsType> = t('list.menuFirst', {
    returnObjects: true,
  });
  const menuSecond: propsType[] = t('list.menuSecond', { returnObjects: true });

  return (
    <>
      <ul
        className={cn([!isMobile ? styles.navigationMenu : styles.MenuMobile])}
      >
        <div className={styles.list}>
          {menuFirst.map((element, elIndex) => (
            <Item
              key={'list item -' + element + elIndex}
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
              key={'list item -' + element + elIndex}
              path={element.path}
              text={element.text}
            />
          ))}
        </div>
      </ul>
    </>
  );
};

const Item = ({ path, text }: propsType) => {
  return (
    <li className={styles.item}>
      <Link
        to={path}
        className={cn([baseStyles.adaptive_font_nav, styles.link])}
      >
        {text}
      </Link>
    </li>
  );
};

export default Navigation;
