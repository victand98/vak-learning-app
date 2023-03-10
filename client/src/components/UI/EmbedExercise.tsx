import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const EmbedExercise = () => {
  const { data: session } = useSession();

  useEffect(() => {
    window.addEventListener("message", onMessageReceived, false);
    return () => {
      window.removeEventListener("message", onMessageReceived);
    };
  }, []);

  const onMessageReceived = (e: MessageEvent) => {
    if (e.data && typeof e.data === "string") {
      var data = JSON.parse(e.data);
      console.log(data);
    }
  };

  return (
    <iframe
      id="tutor_iframe"
      src="/CTAT/HTML/4x=43.html"
      data-params='{"question_file":"/CTAT/FinalBRDs/4xI43.brd","problem_name":"cookies"}'
      className="w-full h-[675px] lg:flex-1"
    />
  );
};
