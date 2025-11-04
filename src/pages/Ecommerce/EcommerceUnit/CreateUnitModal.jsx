import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
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
} from "reactstrap";
import { addMeasurement } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import { useSelector } from "react-redux";

const CreateUnitModal = ({ isOpen, toggle }) => {
  const { unitCreated } = useSelector((state) => state.ecommerce);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      symbol: "",
      is_metric: false,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام واحد را وارد کنید"),
      symbol: yup.string(),
      is_metric: yup.boolean(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(addMeasurement(values));
      } catch (error) {
        console.error("خطا در ثبت واحد:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "مشکلی در ثبت واحد وجود دارد";
        toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    if (unitCreated) {
      toggle();
      formik.resetForm();
    }
  }, [unitCreated]);

  return (
    <OptionalSizes center={true} size={"md"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">اطلاعات واحد اندازه گیری</CardTitle>
                <p className="card-title-desc mb-4">
                  تمام اطلاعات زیر را پر کنید
                </p>

                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                  <Col sm="12">
                    <div className="mb-3">
                      <Label htmlFor="name">نام واحد</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="نام واحد"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.name && !!formik.errors.name}
                      />
                      <FormFeedback>{formik.errors.name}</FormFeedback>
                    </div>
                  </Col>
                  <Col sm="12">
                    <div className="mb-3">
                      <Label htmlFor="symbol">سمبل واحد</Label>
                      <Input
                        id="symbol"
                        name="symbol"
                        type="text"
                        placeholder="سمبل واحد"
                        value={formik.values.symbol}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.symbol && !!formik.errors.symbol
                        }
                      />
                      <FormFeedback>{formik.errors.symbol}</FormFeedback>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="mb-3 form-check form-switch">
                      <Label htmlFor="is_metric">واحد طولی</Label>
                      &nbsp;
                      <Input
                        id="is_metric"
                        name="is_metric"
                        type="switch"
                        checked={formik.values.is_metric}
                        onChange={(e) =>
                          formik.setFieldValue("is_metric", e.target.checked)
                        }
                      />
                      {formik.errors.is_metric && formik.touched.is_metric ? (
                        <FormFeedback type="invalid">
                          {formik.errors.is_metric}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <div className="d-flex flex-wrap gap-2 justify-content-end">
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
                      onClick={() => {
                        formik.resetForm();
                        toggle();
                      }}
                    >
                      لغو
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </OptionalSizes>
  );
};

export default CreateUnitModal;
