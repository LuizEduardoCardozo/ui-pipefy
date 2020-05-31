import React, {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';

import { Container, Label } from './styles';

function Card({data}) {
  const ref = useRef();
  const [{isDragging}, dragRef] = useDrag({

    item: {
      type: 'CARD', 
      id: data.id,
    },

    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),

  });

  const [,dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor){
      console.log(item.id);
    },
  });

  dragRef(dropRef(ref));

  return (
      <Container ref={dragRef} isDragging={isDragging}>
          <header>
            {data.labels.map(label => <Label color={label} />)}
          </header>
          <p>{data.content}</p>
          {data.user && <img src={data.user} alt="img :)" />}
      </Container>
  );
}

export default Card;