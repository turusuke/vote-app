// Recipes by https://usehooks.com/useKeyPress/
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export default function useKeyPress(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ metaKey, key }: KeyboardEvent) {
    if (metaKey && key.toLowerCase() === "enter") setKeyPressed(true);
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  return [keyPressed, setKeyPressed];
}
