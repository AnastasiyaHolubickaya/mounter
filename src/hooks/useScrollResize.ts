import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

// Define the type for the setAppState function
type SetAppStateProrsType = Dispatch<
  SetStateAction<{
    isScrollOn: boolean;
    isMobile: boolean;
    isAuthenticated: boolean;
  }>
>;

/**
 * Custom hook to handle scroll and resize events and update the app state accordingly.
 * @param {SetAppStatePropsType} setAppState - The function to update the app state.
 * @returns {Object} - Object containing functions to handle scroll and resize events.
 */

const useScrollAndResize = (setAppState: SetAppStateProrsType) => {
  // Callback function to handle scroll event
  const handleScroll = useCallback(() => {
    setAppState((prevState) => ({
      ...prevState,
      isScrollOn: window.scrollY > 100,
    }));
  }, [setAppState]);

  // Callback function to handle resize event
  const handleResize = useCallback(() => {
    setAppState((prevState) => ({
      ...prevState,
      isMobile: window.innerWidth < 767,
    }));
  }, [setAppState]);

  // Set up event listeners on component mount and remove them on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  return { handleScroll, handleResize };
};

export default useScrollAndResize;
