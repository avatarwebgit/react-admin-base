import React from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const Freight = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="تنظیمات باربری" />
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <Form>
                  <CardTitle tag="h5" className="mb-4">
                    تعرفه همه استان ها (به جز تهران و البرز )
                  </CardTitle>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="freight_price">تعرفه (تومان)</Label>
                        <Input
                          id="freight_price"
                          name="price"
                          type="text"
                          placeholder="مبلغ را وارد کنید"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button color="primary" type="submit">
                    ذخیره تغییرات
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Freight;
