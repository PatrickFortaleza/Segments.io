import { Action } from "../../models/action";
import { RectCoordinates } from "../../models/positioning";

const initialState = {
  isDragging: <boolean>false,
  itemId: {
    id: <string | number>"",
    type: <string>"",
  },
  itemRectCoords: <RectCoordinates>{
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

const drag = (state = initialState, action: Action) => {
  switch (action.type) {
    case "item_dragging": {
      let { isDragging, itemId, itemRectCoords } = action.payload;
      return { ...state, isDragging, itemId, itemRectCoords };
    }
    case "item_dragging_unset": {
      return { ...initialState };
    }
  }
  return state;
};
export default drag;
