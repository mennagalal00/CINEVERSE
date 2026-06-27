import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback, hasMore) {
  const observer = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    if (!hasMore) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callback();
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) observer.current.observe(sentinelRef.current);

    return () => { if (observer.current) observer.current.disconnect(); };
  }, [callback, hasMore]);

  return sentinelRef;
}
