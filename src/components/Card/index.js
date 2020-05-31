import React, {useRef, useContext} from 'react';
import {useDrag, useDrop} from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

function Card({data, index, listIndex}) {
  const ref = useRef();
  const {move} = useContext(BoardContext);
  const [{isDragging}, dragRef] = useDrag({

    item: {
      type: 'CARD',
      index,
      id: data.id,
      listIndex
    },

    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),

  });

  const [,dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor){
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      console.log(item.listIndex);

      const draggedIndex = item.index; // Indice do item que está sendo carregado
      const targetIndex = index;       // Indice do card que está por baixo

      if(draggedIndex === targetIndex && draggedListIndex === targetListIndex) {return}

      // console.log("ok");

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      // console.log(targetCenter);

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if(draggedIndex < targetIndex && draggedTop < targetCenter) {return;}

      if(draggedIndex > targetIndex && draggedTop > targetCenter) {return;}
      console.log(draggedListIndex);
      move(draggedListIndex, targetListIndex, targetIndex, draggedIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;

    },
  });

  dragRef(dropRef(ref));

  return (
      <Container ref={ref} isDragging={isDragging}>
          <header>
            {data.labels.map(label => <Label color={label} />)}
          </header>
          <p>{data.content}</p>
          {data.user && <img src={data.user} alt="img :)" />}
      </Container>
  );
}

export default Card;