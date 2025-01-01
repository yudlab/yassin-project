import React from "react";
import { useGlobalContext } from "../../PROVIDER/GlobalContextProvider";
import './home.scss';

const Home = () => {
  const { globalData, globalFunction } = useGlobalContext();

  return (
    <div className="main">
      <h1>Home</h1>
      <pre>{JSON.stringify(globalData, null, 2)}</pre>
      <button onClick={globalFunction.flush}>Flush Data</button>
    </div>
  );
};

export default Home;
