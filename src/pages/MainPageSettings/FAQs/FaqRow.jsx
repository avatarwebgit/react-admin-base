import React, { useState } from "react";
import { Button, Collapse, Card, CardBody } from "reactstrap";
import { SortableItem } from "react-easy-sort";

const FaqRow = ({ faq, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <SortableItem>
      <div className="mb-2">
        <Card>
          <div className="p-3 d-flex align-items-center">
            <i
              className="bx bx-grid-vertical fs-5 me-2 text-muted drag-handle"
              style={{ cursor: "grab" }}
            ></i>
            <strong
              className="flex-grow-1"
              style={{ cursor: "pointer" }}
              onClick={toggle}
            >
              {faq.question}
            </strong>
            <div className="faq-actions">
              <Button
                color="light"
                size="sm"
                className="me-1 btn-icon"
                onClick={() => onEdit(faq)}
                title="ویرایش"
              >
                <i className="bx bx-pencil fs-5 text-primary"></i>
              </Button>
              <Button
                color="light"
                size="sm"
                className="me-1 btn-icon"
                onClick={() => onDelete(faq.id)}
                title="حذف"
              >
                <i className="bx bx-trash fs-5 text-danger"></i>
              </Button>
              <Button
                color="light"
                size="sm"
                className="btn-icon"
                onClick={toggle}
                title={isOpen ? "پنهان کردن پاسخ" : "نمایش پاسخ"}
              >
                <i
                  className={`bx bx-chevron-${isOpen ? "up" : "down"} fs-5`}
                ></i>
              </Button>
            </div>
          </div>
          <Collapse isOpen={isOpen}>
            <CardBody className="pt-0">
              <p className="text-muted">{faq.answer}</p>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    </SortableItem>
  );
};

export default FaqRow;
