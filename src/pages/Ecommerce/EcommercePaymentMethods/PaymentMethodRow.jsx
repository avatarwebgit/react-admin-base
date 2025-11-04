import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { EditIcon } from "../../../components/Common/icons";
import { updatePaymentMethod } from "../../../store/actions";

const PaymentMethodRow = ({
  paymentMethod,
  index,
  setUpdateModalOpen,
  setSelectedId,
}) => {
  const isLoading = useSelector((state) => state.ecommerce.loading);
  const dispatch = useDispatch();  

  const handleOpenUpdateModal = () => {
    setUpdateModalOpen(true);
    setSelectedId(paymentMethod.id);
  };

  const handleChangeActiveStatus = () => {
    dispatch(
      updatePaymentMethod({
        id: paymentMethod.id,
        is_active: !paymentMethod?.is_active,
        name: paymentMethod.name,
        title: paymentMethod.title,
      })
    );
  };


  return (
    <tr>
      <td className="text-nowrap" scope="row">
        {index + 1}
      </td>
      <td>{paymentMethod.name}</td>
      <td>{paymentMethod.fee_percentage}%</td>
      <td>{paymentMethod.display_order}</td>
      <td>{paymentMethod.short_description}</td>
      <td>
        {
          <center>
            <button onClick={handleChangeActiveStatus}>
              {paymentMethod.is_active ? (
                <i className="bx bx-check fs-2" />
              ) : (
                <i className="bx bx-x fs-2" />
              )}{" "}
            </button>
          </center>
        }
      </td>
      <td>
        <Row>
          <Col sm="12">
            <Row className="d-flex align-items-center justify-content-center">
              <Col sm="12">
                <button
                  onClick={handleOpenUpdateModal}
                  id="edit-btn"
                  style={{ background: "transparent", border: "none" }}
                >
                  {EditIcon}
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

export default PaymentMethodRow;
