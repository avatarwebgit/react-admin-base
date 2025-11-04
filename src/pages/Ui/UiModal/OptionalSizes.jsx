import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const OptionalSizes = ({
  size,
  isOpen,
  toggle,
  title,
  center,
  children,
  transparent,
  className,
}) => {
  return (
    <React.Fragment>
      <Modal
        size={size}
        isOpen={isOpen}
        toggle={toggle}
        centered={center}
        fade={true}
        modalTransition={{ timeout: 10 }}
        backdropTransition={{ timeout: 1 }}
        backdrop={true}
        className={`${transparent ? "transparent" : ""}`}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody className={className}>{children}</ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default OptionalSizes;
