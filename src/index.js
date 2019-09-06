import React from "react";
import ReactDOM from "react-dom";

import { Header, Container } from "semantic-ui-react";

import Config from "./components/config.component";
import Firestore from "./components/firestore.component";
import StoreProvider from "./components/storeProvider.component";

function App() {
  return (
    <StoreProvider>
      <Container text>
        <Header as="h1">Firebase Playground</Header>
        <Config />
        <Firestore />
      </Container>
    </StoreProvider>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
