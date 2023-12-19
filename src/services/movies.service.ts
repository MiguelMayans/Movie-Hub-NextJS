const URL = process.env.NEXT_PUBLIC_API_URL;
import { FormValues } from "@/components/EditMovieModal/EditMovieModal";

export const createNewMovie = async (userId: number, data: FormValues) => {
  try {
    const response = await fetch(`${URL}/movies/${userId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: data.name,
        score: data.score,
        genre: data.genre,
        posterImage: data.posterImage,
      }),
    });
    const dataFetched = await response.json();
    return dataFetched;
  } catch (error) {
    console.error("Error creating movie:", error);
    return null;
  }
};

export const deleteMovie = async (userId: number, movieId: number) => {
  const response = await fetch(`${URL}/movies/${userId}/${movieId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const dataFetched = response.status !== 204 ? await response.json() : {};

  return dataFetched;
};

export const updateMovie = async (
  userId: number,
  movieId: number,
  data: FormValues
) => {
  try {
    const response = await fetch(`${URL}/movies/${userId}/${movieId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: data.name,
        score: data.score,
        genre: data.genre,
        posterImage: data.posterImage,
      }),
    });
    const dataFetched = await response.json();
    return dataFetched;
  } catch (error) {
    console.error("Error creating movie:", error);
    return null;
  }
};
