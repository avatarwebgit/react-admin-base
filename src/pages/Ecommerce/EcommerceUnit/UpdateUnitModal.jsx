import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  FormFeedback,
  Spinner,
} from "reactstrap";
import {
  getMeasurement,
  updateMeasurement,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";

const UpdateUnitModal = ({ unitId, isOpen, toggle }) => {
  const unitDetails = useSelector(
    (state) => state.ecommerce.measurementDetails[unitId]
  );
  const { unitLoading, unitUpdateStatus } = useSelector(
    (state) => state.ecommerce
  );

  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    name: "",
    symbol: "",
  });

  useEffect(() => {
    if (isOpen && unitId) {
      dispatch(getMeasurement(unitId));
    }
  }, [unitId, dispatch, isOpen]);

  useEffect(() => {
    if (unitDetails) {
      setInitialValues(unitDetails);
    }
    console.log(unitDetails);
  }, [unitDetails]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام واحد را وارد کنید"),
      symbol: yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          name: values.name,
          symbol: values.symbol.trim() === "" ? null : values.symbol,
        };
        dispatch(updateMeasurement({ id: unitId, ...payload }));
      } catch (error) {
        console.error("خطا در بروزرسانی واحد:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "مشکلی در بروزرسانی واحد وجود دارد";
        toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    if (unitUpdateStatus) {
      toggle();
    }
  }, [unitUpdateStatus]);

  return (
    <OptionalSizes center={true} size={"md"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {unitLoading ? (
                  <div className="update-loading-wrapper d-flex flex-column">
                    <Spinner color="primary" size={"md"} className="my-3" />
                   
                    <span>درحال بارگذاری اطلاعات ...</span>
                  </div>
                ) : (
                  <>
                    <CardTitle tag="h4">اطلاعات واحد اندازه گیری</CardTitle>
                    <p className="card-title-desc mb-4">
                      تمام اطلاعات زیر را پر کنید
                    </p>

                    <Form onSubmit={formik.handleSubmit} autoComplete="off">
                      <Row>
                        <Col sm="12">
                          <div className="mb-3">
                            <Label htmlFor="name">نام واحد</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="نام واحد "
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.name && formik.errors.name
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.name && formik.touched.name ? (
                              <FormFeedback type="invalid">
                                {formik.errors.name}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm="12">
                          <div className="mb-3">
                            <Label htmlFor="symbol"> سمبل واحد </Label>
                            <Input
                              id="symbol"
                              name="symbol"
                              type="text"
                              placeholder="واحد فروش "
                              value={formik.values.symbol}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.symbol && formik.errors.symbol
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.symbol && formik.touched.symbol ? (
                              <FormFeedback type="invalid">
                                {formik.errors.symbol}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3 form-check form-switch">
                            <Label htmlFor="is_active">واحد طولی</Label>
                            &nbsp;
                            <Input
                              id="is_active"
                              name="is_active"
                              type="switch"
                              checked={formik.values.is_active}
                            />
                            {formik.errors.is_active &&
                            formik.touched.is_active ? (
                              <FormFeedback type="invalid">
                                {formik.errors.is_active}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          type="submit"
                          color="primary"
                          disabled={formik.isSubmitting}
                        >
                          ذخیره تغییرات
                        </Button>
                        <Button
                          type="button"
                          color="secondary"
                          onClick={toggle}
                        >
                          لغو
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </OptionalSizes>
  );
};

export default UpdateUnitModal;
