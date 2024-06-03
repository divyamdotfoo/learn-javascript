import { useSingleStore } from "@/store";
import { useEffect, useRef } from "react";

export const useTouch = () => {
  const { incrementIndex, decrementIndex } = useSingleStore((s) => ({
    incrementIndex: s.incrementIndex,
    decrementIndex: s.decrementIndex,
  }));
  const start = useRef({ x: 0, y: 0 });
  const end = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleTouchStart = (ev: TouchEvent) => {
      const touch = ev.touches.item(0);
      if (touch) {
        start.current = { x: touch.clientX, y: touch.clientY };
        end.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches.item(0);
      if (touch) {
        end.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchEnd = (ev: TouchEvent) => {
      const el = ev.target as HTMLElement;
      if (el) {
        const closest = el.closest(".scrollContainer");
        if (closest && closest.scrollWidth > closest.clientWidth) {
          return;
        }
      }

      const deltaX = end.current.x - start.current.x;
      const deltaY = end.current.y - start.current.y;

      if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
        if (deltaX > 0) {
          console.log("swipe right");
          decrementIndex();
        } else {
          console.log("swipe left");
          incrementIndex();
        }
      }
    };
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [start, end, incrementIndex, decrementIndex]);

  return null;
};
