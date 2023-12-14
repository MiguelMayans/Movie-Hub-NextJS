import styles from "./NavBar.module.css";
import Logout from "../LogoutButton/LogoutButton";
import Link from "next/link";

const NavBar = () => {
  return (
    <header>
      <ul className={styles.nav}>
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
        <Logout />
      </ul>
    </header>
  );
};

export default NavBar;
