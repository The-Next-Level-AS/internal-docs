import { useSession, signIn, signOut } from "next-auth/react";

export default function Login({ children }) {
  const { data: session } = useSession();

  if (session) return children;

  return (
    <div style={{ margin: "2rem" }}>
      <img src="logo.svg" />
      <br />
      <button onClick={() => signIn()} style={{ textDecoration: "underline" }}>
        Sign in
      </button>
    </div>
  );
}
