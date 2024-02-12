import { memo, useState } from 'react';
import cn from 'classnames';
// * Styles
import styles from './Header.module.css';
//*Components
import Wrapper from '../Wrapper/Wrapper';
import Navigation from './Navigation/Navigation';
import Burger from '../Burger/Burger';
import Logo from '../Logo/Logo';

type propsType = {
  isScrollOn: boolean;
  isMobile: boolean;
};

const Header = ({ isScrollOn, isMobile }: propsType) => {
  // document.title = 'my title';

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
        {isMobile && open && (
          <Navigation isMobile={isMobile} setOpen={setOpen} />
        )}
        {!isMobile && <Navigation isMobile={isMobile} setOpen={setOpen} />}
      </Wrapper>
    </header>
  );
};

export default memo(Header);
