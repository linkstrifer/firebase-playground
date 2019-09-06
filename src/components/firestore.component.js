import React, { useState } from "react";
import { Header, Form } from "semantic-ui-react";

export default function Firestore() {
  const [query, setQuery] = useState([]);

  return (
    <Form>
      <Header as="h2">Firestore</Header>
      <Form.Field
        label="collection"
        name="collection"
        control={Form.Input}
        width="3"
      />
    </Form>
  );
}
