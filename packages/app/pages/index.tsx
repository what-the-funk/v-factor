import React from "react";

import Head from "../src/components/head";
import Nav from "../src/components/nav";

const Home: React.SFC = (): JSX.Element => (
  <div>
    <Head title="Home" />
    <Nav />

    <div className="hero">
      <h1 className="title">Welcome to Next!</h1>
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>
    </div>
  </div>
);

export default Home;
