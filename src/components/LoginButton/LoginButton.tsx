import styles from "./LoginButton.module.css";

const LoginButton = () => {
  return (
    <button className={styles.btn}>
      <a href="/api/auth/login">Login</a>
    </button>
  );
};

export default LoginButton;
