import React from "react";
import { Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon } from "../../../store/e-commerce/actions";
import moment from "moment";
import { DeleteIcon, EditIcon } from "../../../components/Common/icons";

const CouponRow = ({ coupon, index, setUpdateModalOpen, setSelectedId }) => {
  const isLoading = useSelector((state) => state.ecommerce.loading);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCoupon(coupon.id));
  };

  const handleOpenUpdateModal = () => {
    setUpdateModalOpen(true);
    setSelectedId(coupon.id);
  };

  return (
    <tr>
      <td className="text-nowrap" scope="row">
        {index + 1}
      </td>
      <td>{coupon.code}</td>
      <td>{coupon.discount_percent}%</td>
      <td>
        {moment(coupon.end_date || coupon.expires_at).format("YYYY-MM-DD")}
      </td>
      <td>{coupon.usage_limit !== null ? coupon.usage_limit : "نامحدود"}</td>
      <td>
        {coupon.min_price
          ? `${Number(coupon.min_price).toLocaleString("fa-IR")} تومان`
          : "-"}
      </td>
      <td>
        {coupon.users_count > 0 ? `${coupon.users_count} کاربر` : "همه کاربران"}
      </td>
      <td>{coupon.is_active ? "فعال" : "غیرفعال"}</td>
      <td>
        <Row className="d-flex align-items-center justify-content-center">
          <Col sm="4">
            <button
              onClick={handleOpenUpdateModal}
              style={{ background: "transparent", border: "none" }}
            >
              <i
                className="bx bx-edit-alt fs-2"
                style={{ color: "green", cursor: "pointer" }}
              ></i>
            </button>
          </Col>
          <Col sm="4">
            <button
              onClick={handleDelete}
              style={{ background: "transparent", border: "none" }}
              disabled={isLoading}
            >
              <i
                className="bx bxs-trash-alt fs-2"
                style={{ color: "red", cursor: "pointer" }}
              ></i>
            </button>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

export default CouponRow;
