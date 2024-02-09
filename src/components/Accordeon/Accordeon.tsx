import { memo, useState } from 'react';
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
  const [openItem, setOpenItem] = useState<number | null>(0);

  const handleToggle = (id: number) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === id ? null : id));
    console.log(id);
  };
  return (
    <div className={styles.group}>
      {items.map((item: itemsPropsType, index: number) => (
        <Item
          key={index}
          title={item.title}
          content={item.content}
          id={index}
          isOpen={openItem === index}
          onToggle={handleToggle}
          baseStyle={baseStyle}
        />
      ))}
    </div>
  );
};

const Item = ({
  id,
  title,
  content,
  isOpen,
  onToggle,
  baseStyle,
}: ItemProps) => {
  const handleClick = () => {
    onToggle(id);
  };

  const icons: iconsType = {
      0: <FaNetworkWired className={cn([baseStyles.icon, styles.icon_bg])} />,
      1: <FaCog className={cn([baseStyles.icon, styles.icon_bg])} />,
      2: <FaCogs className={cn([baseStyles.icon, styles.icon_bg])} />,
      3: <FaFingerprint className={cn([baseStyles.icon, styles.icon_bg])} />,
    },
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
};

export default memo(Accordeon);
