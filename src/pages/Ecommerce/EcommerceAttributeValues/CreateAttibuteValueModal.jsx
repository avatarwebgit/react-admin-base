import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as yup from "yup";
import ColorPicker from "../../../components/Common/ColorPicker";
import { addAttributeValue } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import { useSelector } from "react-redux";

const CreateAttributeValueModal = ({
  isOpen,
  toggle,
  creationOrigin,
  secondOriginData,
}) => {
  const { id } = useParams();

  const { attributeValueCreated } = useSelector((state) => state.ecommerce);

  const dispatch = useDispatch();
  const [isColor, setIsColor] = useState(false);

  const formik = useFormik({
    initialValues: {
      value: "",
      value_color: "",
      is_active: true,
      display_order: 1,
    },
    validationSchema: yup.object().shape({
      value: yup.string().required("لطفا مقدار/نام را وارد کنید"),
      value_color: yup.string().when([], {
        is: () => isColor,
        then: (schema) =>
          schema
            .required("لطفا کد رنگ را وارد کنید")
            .matches(/^#([0-9A-Fa-f]{3}){1,2}$/, "کد رنگ معتبر نیست"),
        otherwise: (schema) => schema.notRequired().nullable(),
      }),
      is_active: yup.boolean(),
      display_order: yup
        .number()
        .typeError("لطفا عدد وارد کنید")
        .min(1, "حداقل مقدار 1 میباشد"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const attributeId =
          creationOrigin === "products" ? secondOriginData.attributeId : id;

        const payload = {
          attribute_id: attributeId,
          is_active: values.is_active,
          display_order: values.display_order,
          value: values.value,
        };
        if (isColor) {
          payload.value_color = values.value_color;
        } else {
          payload.value_color = null;
        }
        dispatch(addAttributeValue(payload));

        setIsColor(false);
      } catch (error) {
        console.error("⛔ خطا در ثبت ویژگی:", error);
      }
    },
  });

  useEffect(() => {
    if (
      isOpen &&
      creationOrigin === "products" &&
      secondOriginData &&
      secondOriginData.value
    ) {
      formik.setFieldValue("value", secondOriginData.value);
    }
  }, [isOpen, creationOrigin, secondOriginData]);

  useEffect(() => {
    if (attributeValueCreated) {
      toggle();
      formik.resetForm();
    }
  }, [attributeValueCreated]);

  return (
    <OptionalSizes
      center={true}
      size={"xl"}
      isOpen={isOpen}
      toggle={toggle}
      title={
        creationOrigin === "products"
          ? secondOriginData.title
          : "افزودن مقدار جدید"
      }
    >
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">ایجاد مقدار ویژگی</CardTitle>
                <p className="card-title-desc mb-4">
                  تمام اطلاعات زیر را پر کنید
                </p>

                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                  <Row>
                    <Col sm="12">
                      <FormGroup switch className="mb-3">
                        <Input
                          type="switch"
                          checked={isColor}
                          onClick={() => {
                            const newIsColor = !isColor;
                            setIsColor(newIsColor);
                            if (newIsColor) {
                              formik.setFieldValue("value", null);
                            } else {
                              formik.setFieldValue("color_code", null);
                            }
                          }}
                        />
                        <Label check>مقدار از نوع رنگ است؟</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="value">
                          {isColor ? "نام رنگ" : "مقدار"}
                        </Label>
                        <Input
                          id="value"
                          name="value"
                          type="text"
                          placeholder={isColor ? "مثال: قرمز" : "مقدار"}
                          value={formik.values.value}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.value && !!formik.errors.value
                          }
                        />
                        {formik.errors.value && formik.touched.value && (
                          <FormFeedback type="invalid">
                            {formik.errors.value}
                          </FormFeedback>
                        )}
                      </div>
                      {isColor && (
                        <div className="mb-3">
                          <Label htmlFor="value_color"> کد رنگ</Label>
                          <Input
                            id="value_color"
                            name="value_color"
                            maxLength={7}
                            type="text"
                            placeholder="کد رنگ (مثال: #ff0000)"
                            value={formik.values.value_color || ""}
                            onChange={(e) =>
                              formik.setFieldValue(
                                "value_color",
                                e.target.value
                              )
                            }
                            invalid={
                              formik.touched.value_color &&
                              !!formik.errors.value_color
                            }
                          />
                          {formik.errors.value_color &&
                            formik.touched.value_color && (
                              <FormFeedback type="invalid">
                                {formik.errors.value_color}
                              </FormFeedback>
                            )}
                          <ColorPicker
                            color={formik.values.value_color}
                            onChange={(val) =>
                              formik.setFieldValue("value_color", val)
                            }
                          />
                        </div>
                      )}
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="display_order"> اولویت نمایش </Label>
                        <Input
                          id="display_order"
                          name="display_order"
                          type="text"
                          placeholder="اولویت نمایش"
                          value={formik.values.display_order}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.display_order &&
                            !!formik.errors.display_order
                          }
                        />
                        {formik.errors.display_order &&
                          formik.touched.display_order && (
                            <FormFeedback type="invalid">
                              {formik.errors.display_order}
                            </FormFeedback>
                          )}
                      </div>
                      <div className="mb-3 form-check form-switch">
                        <Input
                          type="checkbox"
                          id="is_active"
                          name="is_active"
                          className="form-check-input"
                          checked={formik.values.is_active}
                          onClick={(e) =>
                            formik.setFieldValue("is_active", !e.target.checked)
                          }
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="is_active"
                          check
                        >
                          فعال
                        </Label>
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={formik.isSubmitting}
                    >
                      ذخیره
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

export default CreateAttributeValueModal;
