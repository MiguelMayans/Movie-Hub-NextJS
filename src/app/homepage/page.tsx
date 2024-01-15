"use client";

import { useEffect, useState } from "react";
import MovieContainer from "../../components/MovieContainer/MovieContainer";
import styles from "./page.module.css";
import AddMovieModal from "../../components/AddMovieModal/AddMovieModal";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAllUsers, createNewUser } from "../../services/user.service";
import { useUserContext } from "../../context/useUserContext";
import { UserType } from "../../context/userContext";

const Homepage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { setCurrentLoggedUser } = useUserContext();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const findLoggedUser = async () => {
      if (user) {
        const allUsers = await getAllUsers();
        const foundUser = await allUsers.find(
          (foundUser: UserType) => foundUser.email === user.email
        );

        if (!foundUser) {
          const newUser = {
            name: user.name,
            email: user.email,
          };
          const userCreated = await createNewUser(newUser);
          setCurrentLoggedUser(userCreated);
        } else {
          setCurrentLoggedUser(foundUser);
        }
      }
    };

    findLoggedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className={styles.btn_container}>
        <button onClick={handleOpenModal} className={styles.button}>
          Add Movie
        </button>
        <AddMovieModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </section>

      <main>
        <MovieContainer />
      </main>
    </>
  );
};

export default Homepage;
