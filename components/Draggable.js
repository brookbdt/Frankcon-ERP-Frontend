import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Paper } from "@mui/material";

export default function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    color: "white",
    padding: 0,
    margin: 0,
    width: "287px",
    padding: "12px",
  };

  return (
    <Paper ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </Paper>
  );
}
