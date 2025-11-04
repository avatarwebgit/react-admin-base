import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Badge,
  Row,
  Col,
} from "reactstrap";

const CommentViewModal = ({
  isOpen,
  toggle,
  comment,
  onStatusChange,
  getStatusBadge,
}) => {
  if (!comment) return null;

  const handleStatusChange = (newStatus) => {
    onStatusChange(comment.id, newStatus);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" dir="rtl">
      <ModalHeader toggle={toggle}>مشاهده کامل نظر</ModalHeader>
      <ModalBody>
        <Row className="mb-3">
          <Col md="6">
            <strong>کاربر:</strong> {comment.user?.name || "ناشناس"}
          </Col>
          <Col md="6">
            <strong>ایمیل:</strong> {comment.user?.email || "ندارد"}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md="6">
            <strong>محصول:</strong> {comment.product?.title || "محصول حذف شده"}
          </Col>
          <Col md="6">
            <strong>امتیاز:</strong>{" "}
            <Badge color="info">{comment.rating}/5</Badge>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md="6">
            <strong>وضعیت:</strong> {getStatusBadge(comment.status)}
          </Col>
          <Col md="6">
            <strong>تاریخ:</strong>{" "}
            {new Date(comment.created_at).toLocaleDateString("fa-IR")}
          </Col>
        </Row>

        <div className="mb-3">
          <strong>متن کامل نظر:</strong>
          <div className="comment-text p-3 mt-2 border rounded">
            {comment.comment_text}
          </div>
        </div>

        {comment.reply_text && (
          <div className="mb-3">
            <strong>پاسخ مدیر:</strong>
            <div className="reply-text p-3 mt-2 border rounded bg-light">
              {comment.reply_text}
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <div className="d-flex gap-2">
          {comment.status !== "approved" && (
            <Button
              color="success"
              onClick={() => handleStatusChange("approved")}
            >
              تایید نظر
            </Button>
          )}
          {comment.status !== "rejected" && (
            <Button
              color="danger"
              onClick={() => handleStatusChange("rejected")}
            >
              رد نظر
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>
            بستن
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default CommentViewModal;
