import React, { useState } from "react";
import { Button, Form, Header, Container } from "semantic-ui-react";
import { Store } from "./storeProvider.component";

const fields = [
  "apiKey",
  "authDomain",
  "databaseURL",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId"
];

export default function Config() {
  const [opened, setOpen] = useState(false);
  const [state, setState] = useState({});
  const [, dispatch] = Store();

  function handleChange(e, { name, value }) {
    setState({
      ...state,
      [name]: value
    });
  }

  function handleSubmit() {
    dispatch({
      type: "CONFIG_UPDATE",
      config: state
    });
  }

  if (!opened) {
    return <Button onClick={() => setOpen(!opened)}>Set config</Button>;
  }

  return (
    <Container style={{ margin: "15px 0" }}>
      <Form onSubmit={handleSubmit}>
        <Header as="h2">Config</Header>
        {fields.map(name => (
          <Form.Field
            control={Form.Input}
            key={name}
            label={name}
            name={name}
            onChange={handleChange}
          />
        ))}
        <Button type="submit" primary>
          Set config
        </Button>
        <Button onClick={() => setOpen(!opened)}>Cancel</Button>
      </Form>
    </Container>
  );
}
