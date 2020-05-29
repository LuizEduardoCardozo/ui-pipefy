import React from 'react';

import { Container, Label } from './styles';

function Card({data}) {
  console.log("Data: ");
  console.log(data);
  return (
      <Container>
          <header>
            {data.labels.map(label => <Label color={label} />)}
          </header>
          <p>{data.content}</p>
          {data.user && <img src={data.user} alt="img :)" />}
      </Container>
  );
}

export default Card;