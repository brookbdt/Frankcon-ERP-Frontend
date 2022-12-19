import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { setNodeRef: setFirstDroppableRef } = useDroppable({
    id: props.id,
  });
  const { setNodeRef: setSecondDroppableRef } = useDroppable({
    id: props.id,
  });
  const { setNodeRef: setThirdDroppableRef } = useDroppable({
    id: props.id,
  });
  const { setNodeRef: setFourthDroppableRef } = useDroppable({
    id: props.id,
  });
  // const style = {
  //   opacity: isOver ? 1 : 0.5,
  // };

  return <div ref={setFirstDroppableRef}>{props.children}</div>;
}
