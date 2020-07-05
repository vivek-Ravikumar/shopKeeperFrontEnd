import React, { useEffect, Fragment, useState } from "react";
import CustomizedTables from "../components/Table";
import InputForm from "../components/inputForm";
const HomePage = () => {
  return (
    <Fragment>
      <InputForm />
      <CustomizedTables />
    </Fragment>
  );
};

export default HomePage;
