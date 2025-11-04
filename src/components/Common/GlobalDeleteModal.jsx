import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import OptionalSizes from "../../pages/Ui/UiModal/OptionalSizes";
import {
  closeDeleteModal,
  initiateDeleteSequence,
} from "../../store/_global/actions";
import { useEffect } from "react";

const GlobalDeleteModal = () => {
  const {
    deleteModalStatus,
    message,
    title,
    actionType,
    id,
    ids,
    bulkDelete = false,
  } = useSelector((state) => state._global);

  const dispatch = useDispatch();

  const handleConfirm = () => {
    console.log(actionType, id);
    if (actionType && id) {
      dispatch(
        initiateDeleteSequence({
          id,
          actionType,
        })
      );
    }
  };

  const toggle = () => {
    dispatch(closeDeleteModal());
  };

  return (
    <OptionalSizes
      isOpen={deleteModalStatus}
      toggle={toggle}
      center
      size="md"
      title={title}
    >
      <div className="p-4">
        <h4>{title}</h4>
        <p className="my-3">{message}</p>
        <div className="d-flex justify-content-end gap-2">
          <Button color="primary" onClick={toggle}>
            لغو
          </Button>
          <Button color="danger" onClick={handleConfirm}>
            حذف
          </Button>
        </div>
      </div>
    </OptionalSizes>
  );
};

export default GlobalDeleteModal;
