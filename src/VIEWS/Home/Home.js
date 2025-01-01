import React, { useContext } from "react";
import { GlobalContextProvider, useGlobalContext } from "../../PROVIDER/GlobalContextProvider";
import './home.scss';

const Home = () => {
  const { globalData } = useContext(useGlobalContext);
  return (
    <GlobalContextProvider>
      <div className="main">Home
      </div>
      <pre>{JSON.stringify(globalData)}</pre>
    </GlobalContextProvider>
  );
};

export default Home;
