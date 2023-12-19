"use client";

import { useUserContext } from "@/context/useUserContext";
import styles from "../[id]/page.module.css";
import { deleteMovie } from "../../../services/movies.service";
import EditMovieModal from "../../../components/EditMovieModal/EditMovieModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MovieDetail = ({ params }: { params: { id: string } }) => {
  const { currentUser } = useUserContext();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const movieDetail = currentUser
    ? currentUser?.movies.find((movie) => {
        return movie.id.toString() === params.id;
      })
    : undefined;

  if (!movieDetail) return null;

  const { name, posterImage, score } = movieDetail;

  const handleDeleteMovie = () => {
    if (!movieDetail || !currentUser) {
      router.push("/homepage");
      return;
    }

    deleteMovie(currentUser.id, movieDetail.id);
    router.push("/homepage");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className={styles.modalWrapper}>
        <section className={styles.modalWrapper__wrapper}>
          <article>
            <div className={styles.emptyMovieCard}>
              <img src={posterImage} alt={name} width={300} />
            </div>
          </article>
          <article className={styles.form}>
            <p className={styles.form__text}>Name</p>
            <p className={styles.form__text__movie}>{name}</p>

            <p className={styles.form__text}>Score</p>
            <p className={styles.form__text__movie}>{score} out of 10</p>

            <p className={styles.form__text}>Genre</p>
            <p className={styles.form__text__movie}>Action</p>
          </article>
        </section>
        <div className={styles.data}>
          <section className={styles.btn__wrapper}>
            <button className={styles.btn} onClick={handleOpenModal}>
              Edit Movie
            </button>
            <EditMovieModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              movieId={params.id}
            />
            <button className={styles.btn} onClick={handleDeleteMovie}>
              Delete Movie
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default MovieDetail;
