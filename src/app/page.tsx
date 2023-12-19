import styles from "./page.module.css";
import Link from "next/link";
import LoginButton from "@/components/LoginButton/LoginButton";

export default function Home() {
  return (
    <>
      <header>
        <section>
          <h1 className={styles.tittle}>IMMMMDb</h1>
          <h2 className={styles.subtittle}>
            Internet Miguel Mayans Modest Movie Database
          </h2>
        </section>
      </header>

      <main>
        <LoginButton />
        <article className={styles.signin}>
          <p>
            Don&apos;t have an account? <Link href={"/SignIn"}>Sign In</Link>
          </p>
        </article>
      </main>
    </>
  );
}
