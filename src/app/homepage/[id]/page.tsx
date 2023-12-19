"use client";

// import { useNavigate } from "react-router-dom";
import { useUserContext } from "../page";
import styles from "../[id]/page.module.css";
import { deleteMovie } from "../../../services/movies.service";
import { useUser } from "@auth0/nextjs-auth0/client";
import EditMovieModal from "../../../components/EditMovieModal/EditMovieModal";
import { useState } from "react";

const MovieDetail = ({ params }: { params: { id: string } }) => {
  const { currentUser } = useUserContext();

  const movieDetail = currentUser
    ? currentUser?.movies.find((movie) => {
        return movie.id.toString() === params.id;
      })
    : undefined;

  if (!movieDetail) return null;

  //   const navigate = useNavigate();

  const { name, posterImage, score } = movieDetail;

  const handleDeleteMovie = () => {
    if (!movieDetail || !currentUser) {
      //   navigate("/homepage");
      return;
    }

    deleteMovie(currentUser.id, movieDetail.id);
    // navigate("/homepage");
    location.reload();
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
