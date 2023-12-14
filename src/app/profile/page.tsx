import Link from "next/link";
import styles from "./page.module.css";
import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";

const Profile = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    user && (
      <main>
        <section className={styles.profile}>
          <h2 className={styles.tittle}>My Profile</h2>
          <Image
            className={styles.img}
            src={user?.picture}
            alt={user?.picture}
            width={100}
            height={60}
          />
          <article className={styles.data__wrapper}>
            <section className={styles.data__tittle}>
              <h4>User</h4>
              <h4>Email</h4>
              <h4>Password</h4>
            </section>
            <section className={styles.data__data}>
              <h4>{user?.name}</h4>
              <h4>{user?.email}</h4>
              <h4>*********</h4>
            </section>
          </article>
          <section className={styles.data__btn}>
            <Link href={"/homepage"}>
              <button>Edit Profile</button>
            </Link>
            <Link href={"/homepage"}>
              <button>Go Back</button>
            </Link>
          </section>
        </section>
      </main>
    )
  );
};

export default Profile;
