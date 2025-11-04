import React, { useState } from "react";
import { Button, Badge } from "reactstrap";
import {
  CheckIcon,
  CrossIcon,
  EyeIcon,
} from "../../../components/Common/icons";

const CommentRow = ({
  comment,
  index,
  addToDeleteArray,
  onStatusChange,
  onViewComment,
  getStatusBadge,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsSelected(checked);
    addToDeleteArray(checked, comment.id);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(comment.id, newStatus);
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <tr>
      <td>{index}</td>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="form-check-input"
        />
      </td>
      <td className="text-center">
        <div>
          <strong>{comment.user?.name || "ناشناس"}</strong>
          <br />
          <small>{comment.user?.email || ""}</small>
        </div>
      </td>
      <td className="text-center">
        {comment.product?.title || "محصول حذف شده"}
      </td>
      <td className="text-center">
        <Badge color="info">{comment.rating}/5</Badge>
      </td>
      <td className="text-center">{getStatusBadge(comment.status)}</td>
      <td className="text-center">
        {new Date(comment.created_at).toLocaleDateString("fa-IR")}
      </td>
      <td className="text-center">{truncateText(comment.comment_text)}</td>
      <td className="text-center action-span">
        <div className="d-flex justify-content-start gap-2">
          <button
            color="primary"
            size="sm"
            onClick={() => onViewComment(comment)}
            title="مشاهده کامل"
          >
            {EyeIcon}
          </button>

          {comment.status !== "rejected" && (
            <button
              color="danger"
              size="sm"
              onClick={() => handleStatusChange("rejected")}
              title="رد نظر"
            >
              {CrossIcon}
            </button>
          )}

          {comment.status !== "approved" && (
            <button
              color="success"
              size="sm"
              onClick={() => handleStatusChange("approved")}
              title="تایید نظر"
            >
              {CheckIcon}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CommentRow;
