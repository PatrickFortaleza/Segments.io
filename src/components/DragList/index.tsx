import React, { useRef, useEffect, useState } from "react";
import { GroupedAttributes } from "../../models/attributes";
import { useSelector } from "react-redux";
import DragListView from "./view";

export default function DragList({
  groupedAttributes,
}: {
  groupedAttributes: GroupedAttributes | null;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [scrollPos, setScrollPos] = useState<number>(0);
  const { isDragging, itemId } = useSelector((state: any) => state.dragReducer);
  const buckets = useSelector((state: any) => state.bucketReducer.buckets);

  const scrollBoxRef = useRef<HTMLDivElement | null>(null);

  const onScroll = () => {
    if (!scrollBoxRef?.current) return;
    setScrollPos(scrollBoxRef.current.scrollTop);
  };

  useEffect(() => {
    if (scrollBoxRef?.current) {
      scrollBoxRef.current.addEventListener("scroll", onScroll);
    }

    return () => {
      if (scrollBoxRef.current)
        scrollBoxRef.current.removeEventListener("scroll", onScroll);
    };
  }, [scrollBoxRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DragListView
      groupedAttributes={groupedAttributes}
      isDragging={isDragging}
      scrollBoxRef={scrollBoxRef}
      scrollPos={scrollPos}
      expanded={{
        value: expanded,
        setter: setExpanded,
      }}
    />
  );
}
