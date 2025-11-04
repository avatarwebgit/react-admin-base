import { Col, Row } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { openDeleteModal } from "../../../store/_global/actions";
import { DELETE_LABEL } from "../../../store/e-commerce/actionTypes";
import { DeleteIcon, EditIcon } from "../../../components/Common/icons";

const LabelRow = ({ label, index, isUpdateModalOpen, sendLabelId }) => {
  const isLoading = useSelector((state) => state.ecommerce.loading);

  const dispatch = useDispatch();

  const handleDeleteLabel = () => {
    dispatch(
      openDeleteModal({
        message: `آیا از پاک کردن لیبل  " ${label.name} " اطمینان دارید؟`,
        actionType: DELETE_LABEL,
        id: label.id,
        title: "حذف لیبل",
      })
    );
  };

  const handleOpenUpdateModal = () => {
    isUpdateModalOpen(true);
    sendLabelId(label.id);
  };

  return (
    <>
      {label && (
        <tr>
          <td className="text-nowrap" scope="row">
            {index}
          </td>
          <td>{label.name}</td>
          <td>
            {label.text_color}
            <span
              className="circle-color"
              style={{ backgroundColor: label.text_color }}
            ></span>
          </td>
          <td>
            {label.background_color}
            <span
              className="circle-color"
              style={{ backgroundColor: label.background_color }}
            ></span>
          </td>
          <td colSpan="1">
            <Row>
              <Col sm="12">
                <Row className="d-flex align-items-center justify-content-center">
                  <Col sm="4">
                    <button
                      onClick={handleOpenUpdateModal}
                      id="edit-btn"
                      style={{ background: "transparent", border: "none" }}
                    >
                      {EditIcon}
                    </button>
                  </Col>
                  <Col sm="4">
                    <button
                      onClick={() => handleDeleteLabel()}
                      style={{ background: "transparent", border: "none" }}
                      disabled={isLoading}
                    >
                      {DeleteIcon}
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </td>
        </tr>
      )}
    </>
  );
};

export default LabelRow;
