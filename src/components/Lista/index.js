import React from 'react';

import Card from '../Card'

import { Container } from './styles';
import { MdAdd } from 'react-icons/md';

function Lista({data, index: listIndex}) {
  return (
      <Container done={data.done}>
          <header>
              <h2>{data.title}</h2>
              {
                  data.creatable && (
                    <button type="button">
                        <MdAdd size={24} color="#FFF"></MdAdd>
                    </button>
                  )
              }
          </header>
          <ul>
            {data.cards.map((data,index) => <Card key={data.id} index={index} data={data} listIndex={listIndex} />)}
          </ul>

      </Container>
  );
}

export default Lista;