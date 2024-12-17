"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SpinnerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true); // Start in loading state
  const pathname = usePathname(); // Tracks path changes

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Simulated loading duration
    }, 1000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [pathname]);

  // Show the spinner initially (before hydration completes)
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="spinner-card">
          <img
            src="/cards/king_of_spades.png"
            alt="Spinning Card"
            className="w-24 h-32"
          />
        </div>
        <style jsx>{`
          .spinner-card {
            animation: spin 0.8s infinite linear;
          }

          @keyframes spin {
            from {
              transform: rotateY(0deg);
            }
            to {
              transform: rotateY(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
