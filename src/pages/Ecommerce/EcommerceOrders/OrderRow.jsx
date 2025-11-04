import React from "react";
import { Link } from "react-router-dom";
import { Badge, Input, UncontrolledTooltip } from "reactstrap";

import {
  EyeIcon,
  DeleteIcon,
  Printer,
  PrinterCheck,
} from "../../../components/Common/icons";

const OrderRow = ({ order, onDelete, onView, onStatusChange }) => {
  const getPaymentIcon = (method) => {
    switch (method) {
      case "مسترکارت":
        return "fa-cc-mastercard";
      case "ویزاکارت":
        return "fa-cc-visa";
      case "پی پال":
        return "fa-cc-paypal";
      case "COD":
        return "fa-money-bill-alt";
      default:
        return "fa-credit-card";
    }
  };

  const handlePrint = (type) => {
    // In a real app, this would trigger a print action.
    alert(`چاپ ${type} برای سفارش ${order.orderId}`);
  };

  return (
    <tr>
      <td>
        <div className="form-check font-size-16">
          <input
            type="checkbox"
            className="form-check-input"
            id={`order-checkbox-${order.id}`}
          />
          <label
            className="form-check-label"
            htmlFor={`order-checkbox-${order.id}`}
          ></label>
        </div>
      </td>
      <td>
        <Link to="#" className="text-body fw-bold">
          {order.orderId}
        </Link>
      </td>
      <td>{order.billingName}</td>
      <td>{order.orderDate}</td>
      <td>{order.total} تومان</td>
      <td>
        <Badge className={`font-size-12 badge-soft-${order.badgeClass}`} pill>
          {order.paymentStatus}
        </Badge>
      </td>
      <td>
        <Input
          type="select"
          className="form-select form-select-sm"
          style={{ minWidth: "120px", cursor: "pointer" }}
          value={order.paymentStatus}
          onChange={(e) => onStatusChange(order.id, e.target.value)}
        >
          <option>پرداخت شده</option>
          <option>شارژ مجدد</option>
          <option>بازپرداخت</option>
        </Input>
      </td>
      <td>
        <i className={`fab ${getPaymentIcon(order.paymentMethod)} me-1`}></i>{" "}
        {order.paymentMethod}
      </td>
      <td>
        <div className="action-icons">
          <Link
            to="#"
            className="text-info"
            onClick={() => handlePrint("فاکتور")}
            id={`invoice-print-tooltip-${order.id}`}
          >
            {Printer}
            <UncontrolledTooltip
              placement="top"
              target={`invoice-print-tooltip-${order.id}`}
            >
              چاپ فاکتور
            </UncontrolledTooltip>
          </Link>
          <Link
            to="#"
            className="text-secondary"
            onClick={() => handlePrint("تحویل")}
            id={`delivery-print-tooltip-${order.id}`}
          >
            {PrinterCheck}
            <UncontrolledTooltip
              placement="top"
              target={`delivery-print-tooltip-${order.id}`}
            >
              چاپ تحویل
            </UncontrolledTooltip>
          </Link>
          <Link
            to="#"
            className="text-primary"
            onClick={() => onView(order)}
            id={`viewtooltip-${order.id}`}
          >
            {EyeIcon}
            <UncontrolledTooltip
              placement="top"
              target={`viewtooltip-${order.id}`}
            >
              دیدن جزئیات
            </UncontrolledTooltip>
          </Link>
          <Link
            to="#"
            className="text-danger"
            onClick={() => onDelete(order)}
            id={`deletetooltip-${order.id}`}
          >
            {DeleteIcon}
            <UncontrolledTooltip
              placement="top"
              target={`deletetooltip-${order.id}`}
            >
              حذف
            </UncontrolledTooltip>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
