import React from "react";
import { ICards } from "../types";
interface ICardProps {
  card: ICards;
  handleClick: Function;
  isDisable: boolean;
  betAmount: number;
  won: boolean;
}
const Card: React.FC<ICardProps> = ({
  card,
  handleClick,
  isDisable,
  betAmount,
  won,
}) => {
  const { value, color } = card || {};
  const handleCardClick = () => {
    if (!isDisable) {
      handleClick(value);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: color,
        borderRadius: "5%",
        width: "8rem",
        height: "8rem",
        border: `0.1rem solid ${color}`,
        opacity: isDisable ? 0.2 : 1,
        margin: "1rem",
        borderWidth: won ? "0.2rem" : "0.1rem",
      }}
      onClick={handleCardClick}
    >
      {betAmount ? (
        <div
          style={{
            border: `0.2rem solid dark${color}`,
            borderRadius: "100%",
            width: "1.9rem",
            height: "1.9rem",
            fontSize: "0.7rem",
            backgroundColor: "white",
            fontWeight: "bolder",
            position:'relative'
          }}
        >
          <p
            style={{
              right: "50%",
              bottom: "20%",
              transform: "translate(50%,50%)",
              position: "absolute",
            }}
          >
            {betAmount}
          </p>
        </div>
      ) : null}
      {value && (
        <h6>
          <b>{value}</b>
        </h6>
      )}
    </div>
  );
};

export default Card;
