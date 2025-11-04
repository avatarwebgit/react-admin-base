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
} from "reactstrap";
import * as yup from "yup";
import { addUser } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import { toast } from "react-toastify";

const statusOptions = [
  { value: 1, label: "عادی" },
  { value: 2, label: "مسدود" },
  { value: 3, label: "غیرفعال" },
];

const CreateUserModal = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();

  const { userCreated } = useSelector((state) => state.ecommerce);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      address: "",
      landline: "",
      mobile: "",
      password: "",
      password_confirmation: "",
      status: 1,
    },
    validationSchema: yup.object().shape({
      first_name: yup.string().required("لطفا نام را وارد کنید"),
      last_name: yup.string().required("لطفا نام خانوادگی را وارد کنید"),
      address: yup.string(),
      landline: yup.string(),
      mobile: yup.string().required("شماره موبایل الزامی است"),
      password: yup
        .string()
        .required("رمز عبور الزامی است")
        .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "رمز عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد"
        ),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "رمزهای عبور باید یکسان باشند")
        .required("تکرار رمز عبور الزامی است"),
      status: yup.number().required("وضعیت کاربر الزامی است"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          ...values,
        };

        dispatch(addUser(payload));
      } catch (error) {
        console.error("⛔ خطا در ایجاد کاربر:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "مشکلی در ایجاد کاربر وجود دارد";
        toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    if (userCreated) {
      toggle();
      formik.resetForm();
    }
  }, [userCreated]);

  return (
    <OptionalSizes center={true} size={"lg"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">اطلاعات کاربر</CardTitle>
                <p className="card-title-desc mb-4">
                  لطفا تمام اطلاعات زیر را وارد کنید
                </p>

                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="first_name">نام</Label>
                        <Input
                          id="first_name"
                          name="first_name"
                          type="text"
                          placeholder="نام"
                          value={formik.values.first_name}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.first_name &&
                            formik.errors.first_name
                              ? true
                              : false
                          }
                          dir="rtl"
                        />
                        {formik.errors.first_name &&
                        formik.touched.first_name ? (
                          <FormFeedback type="invalid">
                            {formik.errors.first_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="last_name">نام خانوادگی</Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          type="text"
                          placeholder="نام خانوادگی"
                          value={formik.values.last_name}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.last_name && formik.errors.last_name
                              ? true
                              : false
                          }
                          dir="rtl"
                        />
                        {formik.errors.last_name && formik.touched.last_name ? (
                          <FormFeedback type="invalid">
                            {formik.errors.last_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="mobile">شماره موبایل</Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          placeholder="09xxxxxxxxx"
                          value={formik.values.mobile}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.mobile && formik.errors.mobile
                              ? true
                              : false
                          }
                          dir="rtl"
                        />
                        {formik.errors.mobile && formik.touched.mobile ? (
                          <FormFeedback type="invalid">
                            {formik.errors.mobile}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="landline">تلفن ثابت</Label>
                        <Input
                          id="landline"
                          name="landline"
                          type="tel"
                          placeholder="xxxxxxxxxx"
                          value={formik.values.landline}
                          onChange={formik.handleChange}
                          dir="rtl"
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="password">رمز عبور</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="رمز عبور"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.password && formik.errors.password
                              ? true
                              : false
                          }
                          dir="rtl"
                        />
                        {formik.errors.password && formik.touched.password ? (
                          <FormFeedback type="invalid">
                            {formik.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="password_confirmation">
                          تکرار رمز عبور
                        </Label>
                        <Input
                          id="password_confirmation"
                          name="password_confirmation"
                          type="password"
                          placeholder="تکرار رمز عبور"
                          value={formik.values.password_confirmation}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.password_confirmation &&
                            formik.errors.password_confirmation
                              ? true
                              : false
                          }
                          dir="rtl"
                        />
                        {formik.errors.password_confirmation &&
                        formik.touched.password_confirmation ? (
                          <FormFeedback type="invalid">
                            {formik.errors.password_confirmation}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12">
                      <div className="mb-3">
                        <Label htmlFor="address">آدرس</Label>
                        <Input
                          id="address"
                          name="address"
                          type="textarea"
                          placeholder="آدرس کامل"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          rows="3"
                          dir="rtl"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <div className="mb-3">
                        <Label htmlFor="status">وضعیت کاربر</Label>
                        <Input
                          id="status"
                          name="status"
                          type="select"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.status && formik.errors.status
                              ? true
                              : false
                          }
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Input>
                        {formik.errors.status && formik.touched.status ? (
                          <FormFeedback type="invalid">
                            {formik.errors.status}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex flex-wrap gap-2 justify-content-end">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={formik.isSubmitting}
                    >
                      ذخیره کاربر
                    </Button>
                    <Button type="button" color="secondary" onClick={toggle}>
                      انصراف
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

export default CreateUserModal;
