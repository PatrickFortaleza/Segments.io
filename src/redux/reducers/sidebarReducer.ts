import { Action } from "../../models/action";

const inititalState = {
  isDragging: <boolean>true,
};

const sidebarReducer = (state = inititalState, action: Action) => {
  switch (action.type) {
    case "evaluate_dragging": {
      return { ...state, isDragging: action.payload };
    }
  }
  return state;
};
export default sidebarReducer;
