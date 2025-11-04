import { useFormik } from "formik";
import { useDispatch } from "react-redux";
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
import ColorPicker from "../../../components/Common/ColorPicker";
import { addLabel } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const CreateLabelModal = ({ label, isOpen, toggle }) => {
  const dispatch = useDispatch();

  const { labelCreated } = useSelector((state) => state.ecommerce);

  const formik = useFormik({
    initialValues: {
      name: "",
      background_color: "",
      text_color: "",
    },
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
          name: values.name,
          background_color: values.background_color,
          text_color: values.text_color,
        };

        dispatch(addLabel(payload));
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
    if (labelCreated) {
      toggle();
      formik.resetForm();
    }
  }, [labelCreated]);

  return (
    <OptionalSizes center={true} size={"xl"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
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
                            formik.setFieldValue("text_color", e.target.value)
                          }
                          maxLength={7}
                          name="text_color"
                        />
                        {formik.errors.text_color &&
                        formik.touched.text_color ? (
                          <FormFeedback type="invalid">
                            {formik.errors.text_color}
                          </FormFeedback>
                        ) : null}
                        <ColorPicker
                          color={formik.values.text_color}
                          onChange={(val) =>
                            formik.setFieldValue("text_color", val)
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
                      <div className="mb-3">
                        <Label htmlFor="background_color"> رنگ پس زمینه </Label>
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
                        />
                        {formik.errors.background_color &&
                        formik.touched.background_color ? (
                          <FormFeedback type="invalid">
                            {formik.errors.background_color}
                          </FormFeedback>
                        ) : null}
                        <ColorPicker
                          color={formik.values.background_color}
                          onChange={(val) =>
                            formik.setFieldValue("background_color", val)
                          }
                        />
                        {formik.errors.symbol && formik.touched.symbol ? (
                          <FormFeedback type="invalid">
                            {formik.errors.symbol}
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
                    <Button type="button" color="secondary" onClick={toggle}>
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

export default CreateLabelModal;
