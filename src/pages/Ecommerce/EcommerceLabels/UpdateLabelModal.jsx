import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import ColorPicker from "../../../components/Common/ColorPicker";
import { showLabel, updateLabel } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
const UpdateLabelModal = ({ labelId, isOpen, toggle }) => {
  const labelDetails = useSelector(
    (state) => state.ecommerce.labelDetails[labelId]
  );

  const [initialValues, setInitialValues] = useState({});

  const { labelLoading, labelUpdateStatus } = useSelector(
    (state) => state.ecommerce
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (labelDetails) {
      setInitialValues(labelDetails);
    }
    if (!labelDetails && labelId !== null) {
      dispatch(showLabel(labelId));
    }
  }, [isOpen, labelId, labelDetails]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام واحد را وارد کنید"),
      background_color: yup
        .string()
        .required("رنگ پس زمینه الزامی است")
        .matches(
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          "رنگ هگز باید با # شروع شود و 3 یا 6 کاراکتر هگز داشته باشد"
        ),

      text_color: yup
        .string()
        .required("رنگ متن الزامی است")
        .matches(
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          "رنگ هگز باید با # شروع شود و 3 یا 6 کاراکتر هگز داشته باشد"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          id: labelId,
          name: values.name,
          background_color: values.background_color,
          text_color: values.text_color,
        };

        dispatch(updateLabel(payload));
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
    if (labelUpdateStatus) {
      toggle();
      formik.resetForm();
    }
  }, [labelUpdateStatus]);

  return (
    <OptionalSizes center={true} size={"xl"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {labelLoading ? (
                  <div className="update-loading-wrapper d-flex flex-column">
                    <Spinner color="primary" size={"md"} />
                    <br />
                    <span>درحال بارگذاری اطلاعات ...</span>
                  </div>
                ) : (
                  <>
                    <CardTitle tag="h4">اطلاعات برچسب محصول گیری</CardTitle>
                    <p className="card-title-desc mb-4">
                      تمام اطلاعات زیر را پر کنید
                    </p>

                    <Form onSubmit={formik.handleSubmit} autoComplete="off">
                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="name">متن برچسب </Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="نام"
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
                      </Row>
                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="text_color"> رنگ متن </Label>
                            <Input
                              value={formik.values.text_color}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "text_color",
                                  e.target.value
                                )
                              }
                              maxLength={7}
                              name="text_color"
                              invalid={
                                formik.touched.text_color &&
                                Boolean(formik.errors.text_color)
                              }
                            />{" "}
                            {formik.touched.text_color &&
                              formik.errors.text_color && (
                                <FormFeedback>
                                  {formik.errors.text_color}
                                </FormFeedback>
                              )}
                            <ColorPicker
                              color={formik.values.text_color}
                              onChange={(val) =>
                                formik.setFieldValue("text_color", val)
                              }
                            />
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="background_color">
                              {" "}
                              رنگ پس زمینه{" "}
                            </Label>
                            <Input
                              value={formik.values.background_color}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "background_color",
                                  e.target.value
                                )
                              }
                              maxLength={7}
                              name="background_color"
                              invalid={
                                formik.touched.background_color &&
                                Boolean(formik.errors.background_color)
                              }
                            />{" "}
                            {formik.touched.background_color &&
                              formik.errors.background_color && (
                                <FormFeedback>
                                  {formik.errors.background_color}
                                </FormFeedback>
                              )}
                            <ColorPicker
                              color={formik.values.background_color}
                              onChange={(val) =>
                                formik.setFieldValue("background_color", val)
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          type="submit"
                          color="primary"
                          disabled={formik.isSubmitting}
                        >
                          {labelLoading && <div className="loader me-2"/>}
                          <span className="d-flex align-items-center justify-content-center ">
                            {labelLoading ? "درحال بروز رسانی" : "بروز رسانی "}
                          </span>
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

export default UpdateLabelModal;
