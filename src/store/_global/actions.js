import { CLOSE_DELETE_MODAL, INITIATE_DELETE_SEQUENCE, OPEN_DELETE_MODAL } from "./actionTypes";

export const openDeleteModal = (data) => ({
  type: OPEN_DELETE_MODAL,
  payload: data,
});

export const initiateDeleteSequence = (data) => ({
  type: INITIATE_DELETE_SEQUENCE,
  payload: data,
});

export const closeDeleteModal = (data) => ({
  type: CLOSE_DELETE_MODAL,
  payload: data,
});
