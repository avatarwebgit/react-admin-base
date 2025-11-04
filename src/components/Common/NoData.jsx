import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

const NoData = ({ title, message = "موردی یافت نشد" }) => {
  return (
    <Row>
      <Col className="col-12">
        <Card>
          <CardBody>
            <CardTitle className="h4">{title}</CardTitle>
            <div className="no-content">{message}</div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default NoData;
