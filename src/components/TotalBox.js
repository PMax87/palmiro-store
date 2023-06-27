import React from "react";
import { useGlobalContext } from "../context";
import FormatNumber from "../utils/FormatNumber";

const TotalBox = () => {
  const { totalAmount } = useGlobalContext();

  return <div>{FormatNumber(totalAmount)}</div>;
};

export default TotalBox;
