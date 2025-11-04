import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Map from "../../../components/Common/Map";
import { useDispatch } from "react-redux";

const ShippingAlopeik = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      alopeyk_token: "q",
      neshan_token: "q",
      anbar_address: "q",
      cellphone: "q",
      name: "q",
      alopeyk_location: "35.68720867389012-51.40365600585938",
    },
    validationSchema: yup.object({
      alopeyk_token: yup.string().required("توکن الوپیک الزامی است"),
      neshan_token: yup.string().required("توکن نقشه نشان الزامی است"),
      anbar_address: yup.string().required("آدرس انبار الزامی است"),
      cellphone: yup.string().required("شماره تلفن الزامی است"),
      name: yup.string().required("نام متصدی الزامی است"),
    }),
    onSubmit: (values) => {
      console.log("Saving Alopeyk settings:", values);
      // dispatch(updateAlopeykSettings(values));
    },
    enableReinitialize: true,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="تجارت الکترونیک"
            breadcrumbItem="تنظیمات الوپیک"
          />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col md="6" className="mb-3">
                        <FormGroup>
                          <Label htmlFor="alopeyk_token">
                            توکن احراز هویت الوپیک
                          </Label>
                          <Input
                            type="textarea"
                            id="alopeyk_token"
                            name="alopeyk_token"
                            {...formik.getFieldProps("alopeyk_token")}
                            invalid={
                              formik.touched.alopeyk_token &&
                              !!formik.errors.alopeyk_token
                            }
                          />
                          <FormFeedback>
                            {formik.errors.alopeyk_token}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md="6" className="mb-3">
                        <FormGroup>
                          <Label htmlFor="neshan_token">توکن نقشه نشان</Label>
                          <Input
                            type="textarea"
                            id="neshan_token"
                            name="neshan_token"
                            {...formik.getFieldProps("neshan_token")}
                            invalid={
                              formik.touched.neshan_token &&
                              !!formik.errors.neshan_token
                            }
                          />
                          <FormFeedback>
                            {formik.errors.neshan_token}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md="4" className="mb-3">
                        <FormGroup>
                          <Label htmlFor="anbar_address">آدرس انبار</Label>
                          <Input
                            type="text"
                            id="anbar_address"
                            name="anbar_address"
                            {...formik.getFieldProps("anbar_address")}
                            invalid={
                              formik.touched.anbar_address &&
                              !!formik.errors.anbar_address
                            }
                          />
                          <FormFeedback>
                            {formik.errors.anbar_address}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md="4" className="mb-3">
                        <FormGroup>
                          <Label htmlFor="cellphone">
                            شماره تلفن برای راننده
                          </Label>
                          <Input
                            type="text"
                            id="cellphone"
                            name="cellphone"
                            {...formik.getFieldProps("cellphone")}
                            invalid={
                              formik.touched.cellphone &&
                              !!formik.errors.cellphone
                            }
                          />
                          <FormFeedback>{formik.errors.cellphone}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md="4" className="mb-3">
                        <FormGroup>
                          <Label htmlFor="name">نام متصدی</Label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            {...formik.getFieldProps("name")}
                            invalid={
                              formik.touched.name && !!formik.errors.name
                            }
                          />
                          <FormFeedback>{formik.errors.name}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col xs="12">
                        <hr />
                      </Col>
                      <Col xs="12" className="mb-3">
                        <Label htmlFor="map" className="mb-3">
                          محل دریافت کالا توسط الوپیک را مشخص نمایید.
                        </Label>
                        <Map />
                        <Input
                          id="alopeyk_location"
                          type="hidden"
                          name="alopeyk_location"
                          value={formik.values.alopeyk_location}
                        />
                      </Col>
                    </Row>
                    <Button
                      color="success"
                      type="submit"
                      className="mt-3"
                      disabled={formik.isSubmitting}
                    >
                      ثبت تغییرات
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ShippingAlopeik;
