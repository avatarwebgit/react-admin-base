import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import {
  CheckIcon,
  CrossIcon,
  DeleteIcon,
  EditIcon,
} from "../../../components/Common/icons";
import { openDeleteModal } from "../../../store/_global/actions";
import { DELETE_ATTRIBUTE_VALUE } from "../../../store/e-commerce/actionTypes";

const AttributeValueRow = ({
  attributeValue,
  index,
  setUpdateModalOpen,
  setSelectedId,
  parentId,
}) => {
  const isLoading = useSelector((state) => state.ecommerce.loading);
  const dispatch = useDispatch();

  const handleOpenUpdateModal = () => {
    setUpdateModalOpen(true);
    setSelectedId(attributeValue.id);
  };

  const handleDeleteWithCaution = () => {
    dispatch(
      openDeleteModal({
        message: `آیا از پاک کردن مقدار  " ${
          attributeValue.value || attributeValue.value_color
        } " اطمینان دارید؟`,
        actionType: DELETE_ATTRIBUTE_VALUE,
        id: { valueId: attributeValue.id, parentId: parentId },
        title: "حذف مقدار",
      })
    );
  };

  return (
    <tr>
      <td className="text-nowrap" scope="row">
        {index + 1}
      </td>
      <td>
        {attributeValue.value_color ? (
          <div className="d-flex align-items-center">
            <span
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: attributeValue.value_color,
                display: "inline-block",
                marginRight: "8px",
                border: "1px solid #ccc",
              }}
            ></span>
            {attributeValue.value_color}
          </div>
        ) : (
          attributeValue.value
        )}
      </td>
      <td>________</td>
      <td>{attributeValue.display_order}</td>
      <td>
        {<center>{attributeValue.is_active ? CheckIcon : CrossIcon}</center>}
      </td>

      <td>
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
                  onClick={handleDeleteWithCaution}
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
  );
};

export default AttributeValueRow;
