//*Base
import { memo, useCallback, useEffect, useState } from 'react';
// * Styles
import styles from './Header.module.css';
//*Components
import Wrapper from '../Wrapper/Wrapper';
import Navigation from './Navigation/Navigation';
import Burger from '../Burger/Burger';
import Logo from '../Logo/Logo';

const Header = () => {
  // document.title = 'my title';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  const [open, setOpen] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 767);
  }, [setIsMobile]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <header className={styles.header}>
      <Wrapper>
        {isMobile && (
          <div className={styles.mobile_navigation}>
            <Logo />
            <Burger open={open} setOpen={setOpen} />
          </div>
        )}
        {isMobile && open && <Navigation isMobile={isMobile} />}
        {!isMobile && <Navigation isMobile={isMobile} />}
      </Wrapper>
    </header>
  );
};

export default memo(Header);
