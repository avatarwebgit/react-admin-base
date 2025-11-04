import React from "react";
import { Button } from "reactstrap";
import { EditIcon, DeleteIcon } from "../../../components/Common/icons";
import { openDeleteModal } from "../../../store/_global/actions";
import { DELETE_PRODUCT_VARIANT } from "../../../store/e-commerce/actionTypes";
import { useDispatch } from "react-redux";

const ProductVariantRow = ({ variant, index, onEdit, onDelete }) => {
  const dispatch = useDispatch();

  function formatName(variant) {
    if (!variant) return "";

    const attrs = variant.attributes || [];
    const limitedAttrs = attrs.slice(0, 3);

    let attrString = limitedAttrs
      .map((attr) => `${attr.attribute}: ${attr.value}`)
      .join(" - ");

    if (attrs.length > 3) {
      attrString += " ...";
    }

    return `${variant.product?.name || ""} | ${attrString}`;
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{formatName(variant)}</td>
      <td>
        {variant.price ? Number(variant.price).toLocaleString("fa-IR") : "0"}
      </td>
      <td>{variant.sku}</td>
      <td>{variant.stock}</td>
      <td>
        <center className="d-flex align-items-center justify-content-center">
          <div className="btn-icon me-2" onClick={() => onEdit(variant.id)}>
            {EditIcon}
          </div>
          <div className="btn-icon" onClick={() => onDelete(variant)}>
            {DeleteIcon}
          </div>
        </center>
      </td>
    </tr>
  );
};

export default ProductVariantRow;
