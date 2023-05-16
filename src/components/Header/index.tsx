interface IHeader {
  userBalance: number;
  betAmount: number;
  win: number;
}
interface IValue {
  label: string;
  value: number;
}
const getValue = (val: IValue) => {
  const { label, value } = val;
  return (
    <div style={{ marginRight: "1rem"}}>
      <label style={{ color: "gold" }}>{label}: </label>
      <text style={{ color: "white" }}>{value}</text>
    </div>
  );
};
const Header: React.FC<IHeader> = ({ userBalance, betAmount, win }) => {
  const values: IValue[] = [
    { label: "BALANCE", value: userBalance },
    { label: "BET", value: betAmount },
    { label: "WIN", value: win },
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "black",
        height: "2rem",
        alignItems:'center',
      }}
    >
      {values.map((val: IValue) => getValue(val))}
    </div>
  );
};

export default Header;
