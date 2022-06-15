import React, { useRef, useEffect, useState } from "react";
import { Attribute } from "../../../models/attributes";
import { Coordinates } from "../../../models/positioning";
import DragListItemView from "./view";

export default function DragListItemController({ item }: { item: Attribute }) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [pos, setPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [offset, setOffset] = useState<Coordinates>({ x: 0, y: 0 });

  const listItemRef = useRef<HTMLDivElement | null>(null);
  const bRect = document.body.getBoundingClientRect(); // define type here

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !listItemRef.current) return;
    setPos({
      x: e.x - (listItemRef.current.offsetWidth / 2 + offset.x),
      y: e.y - (listItemRef.current.offsetHeight / 2 + offset.y),
    });
  };

  const onMouseUp = async () => {
    // handleDropped({ itemId: item.id });
    setIsDragging(false);
    setPos({ x: 0, y: 0 });
  };

  const onMouseDown = (e: MouseEvent): void => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setIsTransitioning(false);

    let rect = listItemRef?.current?.getBoundingClientRect(); // find type

    if (!rect) return;

    if (offset.x === 0 && offset.y === 0) {
      setOffset({
        x: rect?.left - bRect.left,
        y: rect?.top - bRect.top,
      });
    }

    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    if (listItemRef?.current) {
      listItemRef.current.addEventListener("mousedown", onMouseDown);
    }

    return () => {
      if (listItemRef.current)
        listItemRef.current.removeEventListener("mousedown", onMouseDown);
    };
  }, [listItemRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMouseMove);
    } else {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    }
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DragListItemView
      item={item}
      itemRef={listItemRef}
      pos={pos}
      is={{
        dragging: isDragging,
        transitioning: isTransitioning,
      }}
    />
  );
}
