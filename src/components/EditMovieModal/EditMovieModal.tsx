import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./EditMovieModal.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserContext } from "../../context/useUserContext";
import { updateMovie } from "../../services/movies.service";
import { useRouter } from "next/navigation";

type AddMovieModalProps = {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
};

export type FormValues = {
  name: string;
  score: string;
  genre: string;
  posterImage: string;
};

const EditMovieModal: React.FC<AddMovieModalProps> = ({
  isOpen,
  onClose,
  movieId,
}) => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const { currentUser } = useUserContext();

  const { register, handleSubmit, reset, formState } = useForm<FormValues>();

  useEffect(() => {
    const handleCloseModal = () => {
      if (onClose) {
        onClose();
      }
      setIsModalOpen(false);
    };
    if (formState.isSubmitSuccessful) {
      reset({ name: "", score: "", posterImage: "", genre: "" });
      handleCloseModal();
      router.push("/homepage");
    }
  }, [formState, onClose, reset, router]);

  const movieDetail = currentUser
    ? currentUser?.movies.find((movie) => {
        return movie.id.toString() === movieId;
      })
    : undefined;

  if (!movieDetail) return null;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const userId = currentUser?.id;

    if (userId) await updateMovie(userId, movieDetail.id, data);
    console.log("data:", data);
  };

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <main className={styles.modalWrapper}>
        <article>
          <div className={styles.emptyMovieCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M50 0C40.111 0 30.444 2.93245 22.2215 8.42652C13.9991 13.9206 7.59043 21.7295 3.80605 30.8658C0.0216642 40.0021 -0.968502 50.0555 0.960758 59.7545C2.89002 69.4535 7.65206 78.3627 14.6447 85.3553C21.6373 92.3479 30.5465 97.11 40.2455 99.0392C49.9445 100.968 59.9979 99.9783 69.1342 96.194C78.2705 92.4096 86.0794 86.0009 91.5735 77.7785C97.0676 69.556 100 59.889 100 50C100 43.4339 98.7067 36.9321 96.194 30.8658C93.6812 24.7995 89.9983 19.2876 85.3553 14.6447C80.7124 10.0017 75.2005 6.31876 69.1342 3.80602C63.0679 1.29329 56.5661 0 50 0ZM50 90C42.0888 90 34.3552 87.654 27.7772 83.2588C21.1992 78.8635 16.0723 72.6164 13.0448 65.3073C10.0173 57.9983 9.2252 49.9556 10.7686 42.1964C12.312 34.4371 16.1216 27.3098 21.7157 21.7157C27.3098 16.1216 34.4372 12.312 42.1964 10.7686C49.9556 9.22518 57.9983 10.0173 65.3074 13.0448C72.6164 16.0723 78.8635 21.1992 83.2588 27.7772C87.654 34.3551 90 42.0887 90 50C90 60.6086 85.7857 70.7828 78.2843 78.2842C70.7828 85.7857 60.6087 90 50 90ZM70 45H55V30C55 28.6739 54.4732 27.4021 53.5355 26.4645C52.5979 25.5268 51.3261 25 50 25C48.6739 25 47.4022 25.5268 46.4645 26.4645C45.5268 27.4021 45 28.6739 45 30V45H30C28.6739 45 27.4022 45.5268 26.4645 46.4645C25.5268 47.4021 25 48.6739 25 50C25 51.3261 25.5268 52.5978 26.4645 53.5355C27.4022 54.4732 28.6739 55 30 55H45V70C45 71.3261 45.5268 72.5978 46.4645 73.5355C47.4022 74.4732 48.6739 75 50 75C51.3261 75 52.5979 74.4732 53.5355 73.5355C54.4732 72.5978 55 71.3261 55 70V55H70C71.3261 55 72.5979 54.4732 73.5355 53.5355C74.4732 52.5978 75 51.3261 75 50C75 48.6739 74.4732 47.4021 73.5355 46.4645C72.5979 45.5268 71.3261 45 70 45Z"
                fill="black"
              />
            </svg>
            <p>Add Poster Image</p>
          </div>
        </article>

        <article className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <p className={styles.form__text}>Name</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Example123"
              {...register("name", { required: true, max: 30, min: 1 })}
            />

            <p className={styles.form__text}>Score</p>
            <input
              className={styles.input}
              type="string"
              placeholder="0 to 10"
              {...register("score", { required: true, max: 10, min: 0 })}
            />

            <p className={styles.form__text}>Genre</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Action"
              {...register("genre", { required: true, max: 30 })}
            />

            <p className={styles.form__text}>Image</p>
            <input
              className={styles.input}
              type="text"
              placeholder="imageUrl"
              {...register("posterImage", { required: false })}
            />

            <input
              type="submit"
              value="Edit Movie"
              className={styles.addMovie__btn}
            />
          </form>
        </article>
      </main>
    </Modal>
  );
};

export default EditMovieModal;
