import React, { useState } from "react";
import type { LockerState } from "../types/types";
import { toQueryString } from "../utils/urlUtils";

interface ShareButtonProps {
  lockerState: LockerState;
}

const ShareButton: React.FC<ShareButtonProps> = ({ lockerState }) => {
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const handleCopyUrl = async () => {
    const url = `${window.location.origin}${
      window.location.pathname
    }?${toQueryString(lockerState)}`;

    try {
      await navigator.clipboard.writeText(url);
      setShowCopyFeedback(true);
      setTimeout(() => {
        setShowCopyFeedback(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <button
        className="btn"
        onClick={handleCopyUrl}
        disabled={showCopyFeedback}
        style={{
          width: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showCopyFeedback ? (
          <span>Copied!</span>
        ) : (
          <>
            <span>Share your design</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <rect
                x="5"
                y="7"
                width="9"
                height="10"
                rx="2"
                stroke="white"
                strokeWidth="1"
              />
              <rect
                x="10"
                y="3"
                width="9"
                height="10"
                rx="2"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default ShareButton;
