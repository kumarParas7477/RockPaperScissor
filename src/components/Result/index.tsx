import React from "react";
import { IWinProps } from "../types";
interface IWinCardProps {
  winProps: IWinProps;
  showWinText: boolean;
}
const Result: React.FC<IWinCardProps> = ({ winProps, showWinText }) => {
  const { choice, money } = winProps || {};
  return (
    <div>
      <h1 style={{ color: "green", height: "1rem" }}>
        {showWinText && choice ? choice + " " + "Won" : null}
      </h1>
      <h1 style={{ color: "Red", height: "1rem" }}>
        {showWinText && !choice ? "You lost" : null}
      </h1>
      <h1 style={{ color: "green", height: "1rem" }}>
        {showWinText && choice ? "You Won " + money : null}
      </h1>
    </div>
  );
};

export default Result;
