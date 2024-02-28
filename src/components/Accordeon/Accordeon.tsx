import { memo, useCallback, useState } from 'react';
import cn from 'classnames';
//*Icons
import {
  FaPlus,
  FaMinus,
  FaFingerprint,
  FaNetworkWired,
  FaCogs,
  FaCog,
} from 'react-icons/fa';
// * Styles
import baseStyles from '../../styles/base.module.css';
import styles from './Accordeon.module.css';
//*Types
import { itemsPropsType } from '../Feature/Feature';

type AccordionProps = {
  items: itemsPropsType[];
  baseStyle: boolean;
};

type ItemProps = {
  title: string;
  content: string;
  id: number;
  isOpen: boolean;
  onToggle: (id: number) => void;
  baseStyle: boolean;
};

type iconsType = {
  [key: number]: React.ReactNode;
};

const Accordeon = ({ items, baseStyle }: AccordionProps) => {
  //* State to manage the open item in the accordion
  const [openItem, setOpenItem] = useState<number | null>(0);

  //* Function to handle toggling of accordion items
  const handleToggle = useCallback((id: number) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === id ? null : id));
  }, []);

  return (
    <div className={styles.group}>
      {items.map((item: itemsPropsType, index: number) => (
        <Item
          key={index}
          title={item.title}
          content={item.content}
          id={index}
          isOpen={openItem === index || (index === 0 && openItem === null)}
          onToggle={handleToggle}
          baseStyle={baseStyle}
        />
      ))}
    </div>
  );
};

//* Individual accordion item component
const Item = memo(
  ({ id, title, content, isOpen, onToggle, baseStyle }: ItemProps) => {
    //* Function to handle click on the accordion item
    const handleClick = useCallback(() => {
      onToggle(id);
    }, [id, onToggle]);

    //* Icons for each accordion item
    const icons: iconsType = {
        0: <FaNetworkWired className={cn([baseStyles.icon, styles.icon_bg])} />,
        1: <FaCog className={cn([baseStyles.icon, styles.icon_bg])} />,
        2: <FaCogs className={cn([baseStyles.icon, styles.icon_bg])} />,
        3: <FaFingerprint className={cn([baseStyles.icon, styles.icon_bg])} />,
      },
      //* Select the icon based on the id
      icon = (!baseStyle && icons[id]) || null;

    return (
      <>
        <div className={cn([styles.item, baseStyle && styles.base_item])}>
          {isOpen ? (
            <FaMinus className={cn([baseStyles.icon, styles.icon_sign])} />
          ) : (
            <FaPlus className={cn([baseStyles.icon, styles.icon_sign])} />
          )}
          <span
            className={cn([styles.title, isOpen && styles.open])}
            onClick={handleClick}
          >
            {title}
          </span>
          {icon}
        </div>
        {isOpen && <div className={styles.content}>{content}</div>}
      </>
    );
  }
);

export default memo(Accordeon);
