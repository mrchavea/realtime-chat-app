"use client";
import { Player } from "@lottiefiles/react-lottie-player";

export default function WIPAnimation() {
  return (
    <Player
      autoplay
      loop
      src="/animations/wip_animation.json"
      className="w-[80%] h-auto sm:h-[50vh] sm:w-auto h-max-[420px]"
    />
  );
}
