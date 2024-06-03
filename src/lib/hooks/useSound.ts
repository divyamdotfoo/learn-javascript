import { useRef, useEffect } from "react";

export const useSound = (volume: number = 1.0, id: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    // in this usecase it will never change
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.id = id;
      audioRef.current.volume = volume;
    }

    // deleting the audio instance before the component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.src = "";
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const play = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = url;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return [play, pause];
};
