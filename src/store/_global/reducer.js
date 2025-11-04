import {
  OPEN_DELETE_MODAL,
  CLOSE_DELETE_MODAL,
  INITIATE_DELETE_SEQUENCE,
} from "./actionTypes";

const INIT_STATE = {
  deleteModalStatus: false,
  message: "",
  id: null,
  ids: null,
  actionType: null,
  title: "",
  bulkDelete: false,
};

const _global = (state = INIT_STATE, action) => {
  switch (action.type) {
    case OPEN_DELETE_MODAL:
      return {
        ...state,
        deleteModalStatus: true,
        message: action.payload.message,
        title: action.payload.title || "حذف آیتم",
        id: action.payload.id,
        ids: action.payload.ids,
        actionType: action.payload.actionType,
        bulkDelete: action.payload.bulkDelete,
      };

    case INITIATE_DELETE_SEQUENCE:
      return {
        ...state,
      };

    case CLOSE_DELETE_MODAL:
      return INIT_STATE;

    default:
      return state;
  }
};

export default _global;
