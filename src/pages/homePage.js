import React, { useEffect, Fragment } from "react";
import CustomizedTables from "../components/Table";
import InputForm from "../components/inputForm";
const HomePage = () => {
  useEffect(() => {
    fetch("https://imj1m.sse.codesandbox.io/")
      .then(console.log("connection success"))
      .catch(err => console.error(err));
  }, []);

  return (
    <Fragment>
      <InputForm />
      <CustomizedTables />
    </Fragment>
  );
};

export default HomePage;
