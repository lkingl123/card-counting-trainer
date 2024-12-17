"use client";

import React, { useState } from "react";
import Level1Trainer from "./Level1Trainer";
import Level2Trainer from "./Level2Trainer";

const ToggleTrainer: React.FC = () => {
  const [isLevel2, setIsLevel2] = useState<boolean>(false);

  const handleToggle = () => {
    setIsLevel2((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 h-screen overflow-hidden">
      {/* Fixed Toggle Container */}
      <div className="w-full flex justify-center fixed top-0 bg-white shadow-md py-4 z-10">
        <div className="flex items-center space-x-4">
          {/* Level 1 Label */}
          <div className="w-20 text-center">
            <span
              className={`text-lg font-semibold transition-colors duration-300 ${
                !isLevel2 ? "text-gray-800" : "text-gray-400"
              }`}
            >
              Level 1
            </span>
          </div>

          {/* Toggle Switch */}
          <div
            className={`relative w-16 h-8 rounded-full cursor-pointer ${
              isLevel2 ? "bg-green-500" : "bg-gray-400"
            }`}
            onClick={handleToggle}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ${
                isLevel2 ? "translate-x-8" : ""
              }`}
            ></div>
          </div>

          {/* Level 2 Label */}
          <div className="w-20 text-center">
            <span
              className={`text-lg font-semibold transition-colors duration-300 ${
                isLevel2 ? "text-gray-800" : "text-gray-400"
              }`}
            >
              Level 2
            </span>
          </div>
        </div>
      </div>

      {/* Content Below the Toggle */}
      <div className="flex-1 w-full pt-16 overflow-hidden">
        {isLevel2 ? <Level2Trainer /> : <Level1Trainer />}
      </div>
    </div>
  );
};

export default ToggleTrainer;
