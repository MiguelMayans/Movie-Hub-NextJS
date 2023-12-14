"use client";

import NavBar from "../NavBar/NavBar";
import styles from "./Header.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

const Header = () => {
  const { user } = useUser();

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
