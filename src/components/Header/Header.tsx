import { getSession } from "@auth0/nextjs-auth0";
import NavBar from "../NavBar/NavBar";
import styles from "./Header.module.css";

const Header = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    user != undefined && (
      <header className={styles.navbar}>
        <p className={styles.welcome}>Welcome back, {user?.name}</p>
        <NavBar />
      </header>
    )
  );
};

export default Header;
