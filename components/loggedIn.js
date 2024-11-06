import { useSession, signOut } from "next-auth/react";

export default function LoggedIn() {
  const { data: session } = useSession();

  return (
    <div className="signedIn">
      Signed in as: {session.user.email}&nbsp;&nbsp;&nbsp;
      <button
        style={{
          textDecoration: "underline",
          textShadow: "rgba(255, 255, 255, 0.33) 1px 1px 1px",
        }}
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
