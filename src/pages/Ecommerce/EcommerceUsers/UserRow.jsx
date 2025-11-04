import { Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../../store/e-commerce/actions";
import { Link } from "react-router-dom";
import { DELETE_USER } from "../../../store/e-commerce/actionTypes";
import { openDeleteModal } from "../../../store/_global/actions";
import { DeleteIcon, EditIcon } from "../../../components/Common/icons";

const UserRow = ({ user, index, isUpdateModalOpen, sendUserId }) => {
  const isLoading = useSelector((state) => state.ecommerce.loading);
  const dispatch = useDispatch();

  const handleOpenUpdateModal = () => {
    isUpdateModalOpen(true);
    sendUserId(user.id);
  };

  const handleDeleteUser = () => {
    dispatch(
      openDeleteModal({
        message: `آیا از پاک کردن کاربر  " ${user.first_name} " اطمینان دارید؟`,
        actionType: DELETE_USER,
        id: user.id,
        title: "حذف کاربر",
      })
    );
  };

  const getStatusBadge = (status) => {
    let currentStatus = status;
    if (typeof status === "boolean") {
      currentStatus = status ? 1 : 3;
    }

    switch (currentStatus) {
      case 1:
        return <span className="badge bg-success">عادی</span>;
      case 2:
        return <span className="badge bg-warning">مسدود</span>;
      case 3:
        return <span className="badge bg-danger">غیرفعال</span>;
      default:
        return <span className="badge bg-secondary">نامشخص</span>;
    }
  };

  return (
    <>
      {user && (
        <tr>
          <td className="text-nowrap" scope="row">
            {index + 1}
          </td>
          <td>
            {user.full_name || user.first_name || user.last_name || "بدون نام"}
          </td>
          <td>{user.email}</td>
          <td>{user.role?.name || user.role || "User"}</td>
          <td>
            <center>{getStatusBadge(user.status)}</center>
          </td>
          <td>
            {(user.created_at &&
              new Date(user.created_at).toLocaleDateString()) ||
              "نا مشخص"}
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
                      onClick={() => handleDeleteUser()}
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

export default UserRow;
