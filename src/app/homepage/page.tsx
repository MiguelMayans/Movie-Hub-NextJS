"use client";

import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import MovieContainer from "../../components/MovieContainer/MovieContainer";
import styles from "./page.module.css";
import AddMovieModal from "../../components/AddMovieModal/AddMovieModal";
import { useUser } from "@auth0/nextjs-auth0/client";
import { userContext } from "../../context/userContext";
import { getAllUsers, createNewUser } from "../../services/user.service";

export function useUserContext() {
  return useContext(userContext);
}

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

  const findLoggedUser = async () => {
    if (user) {
      const allUsers = await getAllUsers();
      const foundUser = await allUsers.find(
        (foundUser: any) => foundUser.email === user.email
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

  useEffect(() => {
    findLoggedUser();
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
