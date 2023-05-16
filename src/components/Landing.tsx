import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ICards } from "./types";
import Card from "./Cards";
const cards: ICards[] = [
  {
    value: "Rock",
    color: "blue",
  },
  {
    value: "Paper",
    color: "green",
  },
  {
    value: "Scissor",
    color: "red",
  },
];
const winMultiplier = {
  oneOption: 14,
  twoOptions: 3,
};
const Landing: React.FC<{}> = () => {
  const [btnTxt, setBtnTxt] = useState<string>("Play");
  const [betAmount, setBetAmount] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(5000);
  const [computerChoice, setComputerChoice] = useState<string>("");
  const [win, setWin] = useState<number>(0);
  const [choices, setChoices] = useState<any>({});
  const [winChoice,setWinChoice] = useState('');
  const handlePlay = () => {
    if(!betAmount){return}
    const multiplier =
      Object.keys(choices).length > 1
        ? winMultiplier["twoOptions"]
        : winMultiplier["oneOption"];
    let win = false;
    let choice: string = "";
    let val = Object.keys(choices).filter(
      (key: string) => key !== computerChoice
    );
    if (val.length < 2) {
      win = checkWinningCondition(val[0], computerChoice);
      choice = val[0];
    } else {
      val.map((key: string) => {
        let win1 = checkWinningCondition(key, computerChoice);
        if (win1) {
          win = true;
          choice = key;
        }
      });
    }

    if (win) {

      setWinChoice(choice);
      setUserBalance(
        (userBalance) => userBalance + choices[choice] * multiplier
      );
      setWin((win) => win + 1);
    }
    setBtnTxt("Clear");
  };
  const clear = () => {
    setBtnTxt("Play");
    setBetAmount(0);
    setChoices([]);
    setComputerChoice("");
    setWinChoice('');

  };
  const checkWinningCondition = (val1: string, val2: string) => {
    if (
      (val1 === "Rock" && val2 === "Scissor") ||
      (val1 === "Paper" && val2 === "Rock") ||
      (val1 === "Scissor" && val2 === "Paper")
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleCardClick = (value: string) => {
    if (userBalance < 500 || btnTxt == 'Clear') {
      return;
    }
    const computerChoice =
      cards[Math.floor(Math.random() * cards.length)]["value"];
    setComputerChoice(computerChoice);
    const newChoices = JSON.parse(JSON.stringify(choices));
    if (choices[value]) {
      newChoices[value] += 500;
    } else {
      newChoices[value] = 500;
    }
    setChoices({ ...newChoices });
    setUserBalance((balance) => balance - 500);
    setBetAmount((amount) => amount + 500);
  };
  return (
    <div style={{ backgroundColor: "grey", minHeight: "100vh" }}>
      <Header
        userBalance={userBalance}
        betAmount={betAmount}
        win={win}
      ></Header>
      <h1 style={{color:'green',height:'1rem'}}>{winChoice ?winChoice +" "+'Won' :null}</h1>
        <h1 style={{color:'Red',height:'1rem'}}>{!winChoice && btnTxt =='Clear' ?'You lost' :null}</h1>
      <div
        style={{
          display: "flex",
          marginTop: "30vh",
          justifyContent: "center",
        }}
      >
        {cards.map((card: ICards) => (
          <Card
            card={card}
            handleClick={handleCardClick}
            won={card.value == winChoice}
            betAmount={choices[card.value]}
            isDisable={
              (Object.keys(choices).length === 2 && !choices[card.value])
            }
          />
        ))}
      </div>
      <div
        style={{
          backgroundColor: 'black',
          border: 'none',
          color: 'gold',
          padding: '0.5rem 2rem',
          textAlign: 'center',
          display: 'inline',
          margin: '0.2rem 0.1rem',
          cursor: 'pointer',
          borderRadius: '20px',
          borderColor:'gold',
          borderWidth:'2px',
          borderStyle:'solid'
        }}
        onClick={btnTxt === "Clear" ? clear : handlePlay}
      >
        {btnTxt}
      </div>
    </div>
  );
};


export default Landing;
