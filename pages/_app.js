import { SessionProvider } from "next-auth/react";

import Login from "../components/login";

import "../styles.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Login>
        <Component {...pageProps} />
      </Login>
    </SessionProvider>
  );
}
