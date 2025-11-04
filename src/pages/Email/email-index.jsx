import { useFormik } from "formik";
import { useEffect, useState } from "react";
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
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { getMailSettings, updateMailSettings } from "../../store/actions";

const EmailSettings = () => {
  const { mailSettings, emailSettingsLoading, emailSettingsUpdated } =
    useSelector((state) => state.mails);
  const [initialValues, setInitialValues] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    from_address: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMailSettings());
  }, [dispatch]);

  useEffect(() => {
    if (mailSettings) {
      setInitialValues(mailSettings);
    }
  }, [initialValues, mailSettings]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      host: yup.string().required("میزبان  الزامی است"),
      port: yup.number().required("پورت  الزامی است"),
      username: yup.string().required("نام کاربری  الزامی است"),
      password: yup.string().required("نام کاربری  الزامی است"),
      from_address: yup
        .string()
        .email("ایمیل نامعتبر")
        .required("ایمیل فرستنده الزامی است"),
      from_address: yup.string().required("نام فرستنده الزامی است"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(updateMailSettings(values));
      } catch (error) {
        console.error("خطا در به‌روزرسانی تنظیمات ایمیل:", error);
      }
    },
  });

  return (
    <div className="page-content slider-main-container">
      <Container fluid>
        <Breadcrumb title="تنظیمات ایمیل" breadcrumbItem="تنظیمات ایمیل" />
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">تنظیمات ایمیل</CardTitle>
                {emailSettingsLoading ? (
                  <div className="d-flex justify-content-center">
                    <Spinner color="primary" size={"sm"} />
                  </div>
                ) : (
                  <>
                    <p className="card-title-desc mb-4">
                      تنظیمات سرور ایمیل خود را پیکربندی کنید
                    </p>
                    <Form onSubmit={formik.handleSubmit} autoComplete="off">
                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="host">میزبان </Label>
                            <Input
                              id="host"
                              name="host"
                              type="text"
                              placeholder=".example.com"
                              value={formik.values.host}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.host && formik.errors.host
                              }
                            />
                            <FormFeedback>{formik.errors.host}</FormFeedback>
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="port">پورت </Label>
                            <Input
                              id="port"
                              name="port"
                              type="number"
                              placeholder="587"
                              value={formik.values.port}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.port && formik.errors.port
                              }
                            />
                            <FormFeedback>{formik.errors.port}</FormFeedback>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="username">نام کاربری </Label>
                            <Input
                              id="username"
                              name="username"
                              type="text"
                              value={formik.values.username}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.username &&
                                formik.errors.username
                              }
                            />
                            <FormFeedback>
                              {formik.errors.username}
                            </FormFeedback>
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="password">رمز عبور </Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="from_address">ایمیل فرستنده</Label>
                            <Input
                              id="from_address"
                              name="from_address"
                              type="email"
                              value={formik.values.from_address}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.from_address &&
                                formik.errors.from_address
                              }
                            />
                            <FormFeedback>
                              {formik.errors.from_address}
                            </FormFeedback>
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
                          {emailSettingsUpdated && (
                            <div className="loader me-2" />
                          )}
                          <span className="d-flex align-items-center justify-content-center ">
                            {emailSettingsUpdated
                              ? "درحال بروز رسانی"
                              : "بروز رسانی "}
                          </span>
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
    </div>
  );
};

export default EmailSettings;
