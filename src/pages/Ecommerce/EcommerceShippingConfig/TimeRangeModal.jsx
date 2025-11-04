import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const TimeRangeModal = ({ isOpen, toggle, time, onSave }) => {
  const [start, setStart] = useState("00");
  const [end, setEnd] = useState("00");
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  useEffect(() => {
    if (isOpen) {
      const [s = "09", e = "17"] = time.split("-");
      setStart(s);
      setEnd(e);
    }
  }, [isOpen, time]);

  const handleSave = () => {
    onSave(`${start}-${end}`);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>انتخاب بازه زمانی</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Label for="start-hour">ساعت شروع</Label>
            <Input
              id="start-hour"
              type="select"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            >
              {hours.map((h) => (
                <option key={`start-${h}`} value={h}>
                  {h}
                </option>
              ))}
            </Input>
          </Col>
          <Col>
            <Label for="end-hour">ساعت پایان</Label>
            <Input
              id="end-hour"
              type="select"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            >
              {hours.map((h) => (
                <option key={`end-${h}`} value={h}>
                  {h}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          لغو
        </Button>
        <Button color="primary" onClick={handleSave}>
          ذخیره
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TimeRangeModal;
