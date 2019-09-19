import React, { useState, useEffect } from 'react';
import { Button, Form, Header, Container } from 'semantic-ui-react';
import { Store } from './storeProvider.component';

export default function Config() {
  const [opened, setOpen] = useState(false);
  const [globalState, dispatch] = Store();
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (fields.length === 0) {
      let initialFields = Object.getOwnPropertyNames(globalState.config);

      initialFields = initialFields.map(name => ({
        name,
        value: globalState.config[name],
      }));

      setFields(initialFields);
    }
  }, [fields, globalState.config]);

  function handleChange(e, { name, value }) {
    const newFields = fields.map(field => {
      if (field.name === name) {
        return {
          ...field,
          value,
        };
      }
      return field;
    });

    setFields(newFields);
  }

  function handleSubmit() {
    const config = {};

    fields.forEach(({ name, value }) => {
      config[name] = value;
    });

    dispatch({
      type: 'CONFIG_UPDATE',
      config,
    });
  }

  if (!opened) {
    return (
      <Container>
        <Button onClick={() => setOpen(!opened)}>Set config</Button>
      </Container>
    );
  }

  return (
    <Container style={{ margin: '15px 0' }}>
      <Form onSubmit={handleSubmit}>
        <Header as="h2">Config</Header>
        {fields.map(({ name, value }) => (
          <Form.Field
            control={Form.Input}
            key={name}
            label={name}
            name={name}
            onChange={handleChange}
            value={value}
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
