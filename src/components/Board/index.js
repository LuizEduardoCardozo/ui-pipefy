import React, { useState } from 'react';
import produce from 'immer';
import BoardContext from './context';
import {loadLists} from '../../services/api';

import Lista from '../Lista';

import { Container } from './styles';

const data = loadLists();

function Board() {

  const [lists, setLists] = useState(data);

  // function move(from, to) {console.log(`${from} -> ${to}`)}
  function move(fromList, toList, from, to) {
    // console.log(fromList);
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];
      //console.log(fromList, from, to);
      draft[fromList].cards.splice(from,1);
      draft[toList].cards.splice(to,0,dragged);
    }));
  }

  return (
    <BoardContext.Provider value={{lists,move}}>
      <Container>
        {lists.map((list, index) => <Lista key={list.title} index={index} data={list}/>)}
      </Container>
    </BoardContext.Provider>
  );
}

export default Board;