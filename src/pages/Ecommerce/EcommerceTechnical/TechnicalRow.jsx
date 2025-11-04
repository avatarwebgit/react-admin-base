import { Col, Row } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openDeleteModal } from "../../../store/_global/actions";
import { DELETE_ATTRIBUTE } from "../../../store/e-commerce/actionTypes";

import { DeleteIcon, EditIcon } from "../../../components/Common/icons";
import { updateAttribute } from "../../../store/e-commerce/actions";

const TechnicalRow = ({
  technical,
  index,
  isUpdateModalOpen,
  sendTechnicalId,
}) => {
  const isLoading = useSelector((state) => state.ecommerce.loading);
  const dispatch = useDispatch();

  const handleOpenUpdateModal = () => {
    isUpdateModalOpen(true);
    sendTechnicalId(technical.id);
  };

  const handleToggleIsVisible = () => {
    const displayOrder =
      technical.display_order > 0 ? technical.display_order : 1;
    const payload = {
      ...technical,
      is_visible: !technical.is_visible,
      display_order: displayOrder,
    };
    dispatch(updateAttribute(payload));
  };

  const handleDeletetechnical = () => {
    dispatch(
      openDeleteModal({
        message: "از پاک کردن مشخصه فنی اطمینان دارید؟",
        actionType: DELETE_ATTRIBUTE,
        id: technical.id,
        title: "پاک کردن مشخصات فنی",
      })
    );
  };

  return (
    <>
      {technical && (
        <tr>
          <td className="text-nowrap" scope="row">
            {index}
          </td>
          <td>{technical.name}</td>
          <td>image</td> {/*image for attribute */}
          <td>
            <Link
              id="edit-btn"
              style={{ background: "transparent", border: "none" }}
              to={`/ecommerce-technical/${technical.id}`}
            >
              <i className="bx bx-cog fs-2  pointer"></i>
            </Link>
          </td>
          <td onClick={handleToggleIsVisible}>
            <center>
              {technical.is_visible ? (
                <i className="bx bx-check fs-2" />
              ) : (
                <i className="bx bx-x fs-2" />
              )}
            </center>
          </td>
          <td>
            <center>
              {technical.is_filterable ? (
                <i className="bx bx-check fs-2" />
              ) : (
                <i className="bx bx-x fs-2" />
              )}
            </center>
          </td>
          {/* <td>
            <center>
              {technical.show_in_list ? (
                <i className="bx bx-check fs-2" />
              ) : (
                <i className="bx bx-x fs-2" />
              )}
            </center>
          </td>
          <td>
            <center>
              {technical.show_in_product ? (
                <i className="bx bx-check fs-2" />
              ) : (
                <i className="bx bx-x fs-2" />
              )}
            </center>
          </td> */}
          <td colSpan={3}>
            {technical.attribute_group ? technical.attribute_group.name : "-"}
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
                      onClick={() => handleDeletetechnical()}
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

export default TechnicalRow;
