import { useEffect, useRef, useState } from "react";

const PlaygroundSwitcher = () => {
  const playgrounds = { A: useRef(null), B: useRef(null) },
    [active, setActive] = useState("A"),
    [streamlitReady, setStreamlitReady] = useState(false);

  useEffect(() => {
    const handleMessage = ({ data }) => {
      if (typeof data === "string" && data.indexOf("nxtl__") === 0) {
        const next =
            active === "A" ? playgrounds.B.current : playgrounds.A.current,
          nextSrc = new URL(next.src),
          accumulated = new URL(
            playgrounds[active].current.src
          ).searchParams.get("log");

        nextSrc.searchParams.set(
          "log",
          `${accumulated ? `${accumulated}\n` : ""}${data.split("__")[1]}`
        );
        nextSrc.searchParams.set("uj", data.split("__")[2]);
        nextSrc.searchParams.set("m", data.split("__")[3]);
        nextSrc.searchParams.set("dq", data.split("__")[4]);
        setActive(active === "A" ? "B" : "A");
        setStreamlitReady(false);
        next.src = nextSrc.toString();
      } else if (typeof data === "string" && data === "streamlit_ready")
        setStreamlitReady(true);
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  });

  useEffect(() => {
    const curr = playgrounds[active === "A" ? "B" : "A"].current,
      next = playgrounds[active].current;

    if (streamlitReady) {
      curr.style.opacity = "0";
      curr.style.pointerEvents = "none";
      next.style.opacity = "1";
      next.style.pointerEvents = "initial";
    }
  }, [active, streamlitReady]);

  return (
    <>
      <iframe
        src="https://playground-47d69.ondigitalocean.app?embed=true&embed_options=hide_loading_screen&embed_options=disable_scrolling&log="
        width="100%"
        style={{
          height: "1600px",
          filter: "brightness(0.96875)",
          borderRadius: "8px",
          opacity: "0",
        }}
        ref={playgrounds.A}
      />
      <iframe
        src="https://playground-47d69.ondigitalocean.app?embed=true&embed_options=hide_loading_screen&embed_options=disable_scrolling&log="
        width="100%"
        style={{
          height: "1600px",
          marginTop: "-1600px",
          filter: "brightness(0.96875)",
          borderRadius: "8px",
          opacity: "0",
        }}
        ref={playgrounds.B}
      />
    </>
  );
};

export default PlaygroundSwitcher;
