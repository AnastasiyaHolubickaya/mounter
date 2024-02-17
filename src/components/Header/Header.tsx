import { memo, useContext, useState } from 'react';
import cn from 'classnames';
// * Styles
import styles from './Header.module.css';
//*Components
import Wrapper from '../Wrapper/Wrapper';
import Navigation from './Navigation/Navigation';
import Burger from '../Burger/Burger';
import Logo from '../Logo/Logo';
import AuthContext from '../../authContext';

const Header = () => {
  const { isScrollOn, isMobile } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn([styles.header, (isScrollOn || isMobile) && styles.fixed])}
    >
      <Wrapper>
        {isMobile && (
          <div className={styles.mobile_navigation}>
            <Logo />
            <Burger open={open} setOpen={setOpen} />
          </div>
        )}
        {isMobile && open && <Navigation setOpen={setOpen} />}
        {!isMobile && <Navigation setOpen={setOpen} />}
      </Wrapper>
    </header>
  );
};

export default memo(Header);
