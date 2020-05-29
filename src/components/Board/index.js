import React from 'react';
import {loadLists} from '../../services/api';

import Lista from '../Lista';

import { Container } from './styles';

const lists = loadLists();

function Board() {
  return (
    <Container>
      {lists.map(list => <Lista key={list.title} data={list}/>)}
    </Container>
  );
}

export default Board;