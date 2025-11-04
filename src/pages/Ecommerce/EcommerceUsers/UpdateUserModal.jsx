import { useFormik } from "formik";
import { useEffect } from "react";
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
import { showUser, updateUser } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";

const statusOptions = [
  { value: 1, label: "عادی" },
  { value: 2, label: "مسدود" },
  { value: 3, label: "غیرفعال" },
];

const UpdateUserModal = ({ userId, isOpen, toggle }) => {
  const userDetails = useSelector(
    (state) => state.ecommerce.userDetails[userId]
  );
  const { singleUserLoading } = useSelector((state) => state.ecommerce);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      address: "",
      landline: "",
      mobile: "",
      status: 1,
      password: "",
      password_confirmation: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      first_name: yup.string(),
      last_name: yup.string(),
      address: yup.string(),
      landline: yup.string(),
      mobile: yup.string().required("شماره موبایل الزامی است"),
      password: yup
        .string()
        .test(
          "password-strength",
          "رمز عبور باید حداقل 8 کاراکتر و شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد",
          function (value) {
            // If password is empty, it's optional so return true
            if (!value || value.length === 0) return true;

            // If password has value, validate it
            if (value.length < 8) return false;
            if (!/(?=.*[a-z])/.test(value)) return false;
            if (!/(?=.*[A-Z])/.test(value)) return false;
            if (!/(?=.*[0-9])/.test(value)) return false;
            if (!/(?=.*[!@#\$%\^&\*])/.test(value)) return false;

            return true;
          }
        ),
      password_confirmation: yup
        .string()
        .test(
          "passwords-match",
          "رمزهای عبور باید یکسان باشند",
          function (value) {
            const { password } = this.parent;

            // If no password is entered, confirmation is not required
            if (!password || password.length === 0) return true;

            // If password is entered, confirmation must match
            return value === password;
          }
        ),
      status: yup.number().required("وضعیت کاربر الزامی است"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          id: userId,
          first_name: values.first_name,
          last_name: values.last_name,
          address: values.address,
          landline: values.landline,
          mobile: values.mobile,
          status: values.status,
        };

        if (values.password && values.password.length > 0) {
          payload.password = values.password;
          payload.password_confirmation = values.password_confirmation;
        }

        dispatch(updateUser(payload));
        toggle();
        toast.success("اطلاعات کاربر با موفقیت به‌روزرسانی شد");
      } catch (error) {
        console.error("⛔ خطا در به‌روزرسانی کاربر:", error);
        toast.error(
          error?.response?.data?.message ||
            "مشکلی در به‌روزرسانی کاربر وجود دارد"
        );
      }
    },
  });

  useEffect(() => {
    if (userId) {
      dispatch(showUser(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen && userDetails) {
      let currentStatus = userDetails.status;
      if (typeof currentStatus === "boolean") {
        currentStatus = currentStatus ? 1 : 3;
      }

      formik.setValues({
        first_name: userDetails.first_name || "",
        last_name: userDetails.last_name || "",
        address: userDetails.address || "",
        landline: userDetails.landline || "",
        mobile: userDetails.mobile || "",
        status: currentStatus || 1,
        password: "",
        password_confirmation: "",
      });
    }
  }, [isOpen, userDetails]);

  return (
    <OptionalSizes center={true} size={"lg"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {singleUserLoading ? (
                  <div className="update-loading-wrapper d-flex flex-column">
                    <Spinner color="primary" size={"md"} />
                    <br />
                    <span>درحال بارگذاری اطلاعات ...</span>
                  </div>
                ) : (
                  <>
                    <CardTitle tag="h4">ویرایش اطلاعات کاربر</CardTitle>
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
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.first_name &&
                                formik.errors.first_name
                              }
                              dir="rtl"
                            />
                            <FormFeedback>
                              {formik.errors.first_name}
                            </FormFeedback>
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
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.last_name &&
                                formik.errors.last_name
                              }
                              dir="rtl"
                            />
                            <FormFeedback>
                              {formik.errors.last_name}
                            </FormFeedback>
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
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.mobile && formik.errors.mobile
                              }
                              dir="rtl"
                            />
                            <FormFeedback>{formik.errors.mobile}</FormFeedback>
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
                              onBlur={formik.handleBlur}
                              dir="rtl"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="password">
                              رمز عبور جدید (اختیاری)
                            </Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              placeholder="رمز عبور جدید"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.password &&
                                formik.errors.password
                              }
                              dir="rtl"
                            />
                            <FormFeedback>
                              {formik.errors.password}
                            </FormFeedback>
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="password_confirmation">
                              تکرار رمز عبور جدید
                            </Label>
                            <Input
                              id="password_confirmation"
                              name="password_confirmation"
                              type="password"
                              placeholder="تکرار رمز عبور جدید"
                              value={formik.values.password_confirmation}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.password_confirmation &&
                                formik.errors.password_confirmation
                              }
                              dir="rtl"
                            />
                            <FormFeedback>
                              {formik.errors.password_confirmation}
                            </FormFeedback>
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
                              onBlur={formik.handleBlur}
                              rows="3"
                              dir="rtl"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="my-2">
                        <Col
                          sm="12"
                          className="d-flex align-items-end justify-content-start"
                        >
                          <div className="mb-3">
                            <Label htmlFor="status">وضعیت کاربر</Label>
                            <Input
                              id="status"
                              name="status"
                              type="select"
                              value={formik.values.status}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
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
                          ذخیره تغییرات
                        </Button>
                        <Button
                          type="button"
                          color="secondary"
                          onClick={toggle}
                        >
                          انصراف
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

export default UpdateUserModal;
