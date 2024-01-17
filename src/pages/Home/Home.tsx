import styles from './Home.module.css'

interface IComponentProps {}

const Home:React.FC<IComponentProps> = () => {
 

  return (
    <>
    <h1 className={styles.wrapper}>Home page</h1>
     
    </>
  )
}

export default Home;