import { getSession } from "@auth0/nextjs-auth0";

export default async function ProfileServer() {
  const session = await getSession();
  const user = session?.user;

  return (
    user && (
      <div>
        <p>Homepage</p>
      </div>
    )
  );
}
