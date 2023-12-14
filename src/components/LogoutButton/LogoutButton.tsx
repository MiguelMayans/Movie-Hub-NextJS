import styles from "./LogoutButton.module.css";

const Logout = () => {
  return (
    <li>
      <a href="/api/auth/logout" className={styles.logout}>
        Log Out
      </a>
    </li>
  );
};

export default Logout;
