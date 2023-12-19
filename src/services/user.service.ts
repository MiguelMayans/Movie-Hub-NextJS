const URL = process.env.NEXT_PUBLIC_API_URL;

type GetTokenType = () => Promise<string>;

export const getAllUsers = async () => {
  const response = await fetch(`${URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const allUsers = await response.json();
  return allUsers;
};

export const getUserByEmail = async (email: string, getToken: GetTokenType) => {
  const token = await getToken();

  const response = await fetch(`${URL}/user/${email}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const userByEmail = await response.json();
  return userByEmail;
};

export const createNewUser = async (userObject: object) => {
  try {
    const response = await fetch(`${URL}/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userObject),
    });

    const dataFetched = await response.json();
    return dataFetched;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};
