// * Base
import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo';
// * Data
import { list } from './Navigation.data';
// * Style
import styles from './Navigation.module.css';

type IProps = {
  path: string;
  text: string;
};

const Navigation = () => {
  return (
    <ul className={styles.navigationMenu}>
      <div className={styles.list}>
        {list[0].map((element, elIndex) => (
          <Item
            key={'list item -' + element + elIndex}
            path={element.path}
            text={element.text}
          />
        ))}
      </div>
      <li>
        <Logo />
      </li>
      <div className={styles.list}>
        {list[1].map((element, elIndex) => (
          <Item
            key={'list item -' + element + elIndex}
            path={element.path}
            text={element.text}
          />
        ))}
      </div>
    </ul>
  );
};

const Item = ({ path, text }: IProps) => {
  return (
    <li className={styles.item}>
      <Link to={path} className={styles.link}>
        {text}
      </Link>
    </li>
  );
};

export default Navigation;

// const Navigation = () => {
//   return (
//     <ul className={styles.navigation}>
//       {list.map((item, index) => (
//         <div key={'list wrapper' + index} className={styles.list}>
//           {item.map((element, elIndex) => (
//             <Item
//               key={'list item -' + element + elIndex}
//               path={element.path}
//               text={element.text}
//             />
//           ))}
//         </div>
//       ))}
//     </ul>
//   );

// };
