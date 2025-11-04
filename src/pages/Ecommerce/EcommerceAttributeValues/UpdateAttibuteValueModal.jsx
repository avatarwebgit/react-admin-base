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
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import ColorPicker from "../../../components/Common/ColorPicker";
import {
  showAttributeValue,
  updateAttributeValue,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";

const UpdateAttributeValueModal = ({
  attributeValueId,
  isOpen,
  toggle,
  parentId,
}) => {
  const [isColor, setIsColor] = useState(false);
  const dispatch = useDispatch();

  const allAttributeValues = useSelector(
    (state) => state.ecommerce.attributeValueDetails
  );

  const { attributeValueLoading, attributeValueUpdateStatus } = useSelector(
    (state) => state.ecommerce
  );

  const attributeValueDetails =
    allAttributeValues[parentId]?.find((v) => v.id === attributeValueId) ||
    null;

  const [initialValues, setInitialValues] = useState({
    value: "",
    color_code: "",
    display_order: 1,
    is_active: false,
  });

  useEffect(() => {
    if (isOpen && parentId ) {
      dispatch(showAttributeValue(parentId));
    }
  }, [isOpen, parentId, dispatch]);

  useEffect(() => {
    if (attributeValueDetails) {
      const hasColor = !!attributeValueDetails.color_code;
      setIsColor(hasColor);
      setInitialValues({
        value: attributeValueDetails.value || "",
        color_code: attributeValueDetails.color_code || "",
        display_order: attributeValueDetails.display_order || 1,
        is_active: attributeValueDetails.is_active || false,
      });
    }
  }, [attributeValueDetails]);

  const validationSchema = yup.object().shape({
    value: yup.string().required("لطفا مقدار/نام را وارد کنید"),
    color_code: yup.string().when([], {
      is: () => isColor,
      then: (schema) =>
        schema
          .required("لطفا کد رنگ را وارد کنید")
          .matches(/^#([0-9A-Fa-f]{3}){1,2}$/, "کد رنگ معتبر نیست"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
    display_order: yup.number().required("لطفا اولویت نمایش را وارد کنید"),
    is_active: yup.boolean(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          id: attributeValueId,
          display_order: values.display_order,
          is_active: values.is_active,
          value: values.value,
          attribute_id: parentId,
        };

        if (isColor) {
          payload.color_code = values.color_code;
        } else {
          payload.color_code = null;
        }

        dispatch(updateAttributeValue(payload));
      } catch (error) {
        console.error("Error updating attribute value:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (attributeValueUpdateStatus) {
      toggle();
      formik.resetForm();
    }
  }, [attributeValueUpdateStatus]);

  return (
    <OptionalSizes center={true} size={"xl"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {attributeValueLoading ? (
                  <div className="update-loading-wrapper d-flex flex-column">
                    <Spinner color="primary" size={"md"} />
                    <br />
                    <span>درحال بارگذاری اطلاعات ...</span>
                  </div>
                ) : (
                  <>
                    <CardTitle tag="h4">ویرایش مقدار ویژگی</CardTitle>
                    <Form onSubmit={formik.handleSubmit}>
                      {isColor ? (
                        <Row>
                          <Col sm="6">
                            <FormGroup className="mb-3">
                              <Label htmlFor="value">نام رنگ</Label>
                              <Input
                                id="value"
                                name="value"
                                type="text"
                                placeholder="مثال: قرمز"
                                value={formik.values.value}
                                onChange={formik.handleChange}
                                invalid={
                                  formik.touched.value && !!formik.errors.value
                                }
                              />
                              <FormFeedback>{formik.errors.value}</FormFeedback>
                            </FormGroup>
                          </Col>
                          <Col sm="6">
                            <FormGroup className="mb-3">
                              <Label htmlFor="color_code"> کد رنگ</Label>
                              <Input
                                id="color_code"
                                name="color_code"
                                maxLength={7}
                                type="text"
                                placeholder="کد رنگ (مثال: #ff0000)"
                                value={formik.values.color_code || ""}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "color_code",
                                    e.target.value
                                  )
                                }
                                invalid={
                                  formik.touched.color_code &&
                                  !!formik.errors.color_code
                                }
                              />
                              <FormFeedback>
                                {formik.errors.color_code}
                              </FormFeedback>
                              <ColorPicker
                                color={formik.values.color_code}
                                onChange={(val) =>
                                  formik.setFieldValue("color_code", val)
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      ) : (
                        <Row>
                          <Col sm="6">
                            <FormGroup className="mb-3">
                              <Label htmlFor="value">مقدار</Label>
                              <Input
                                id="value"
                                name="value"
                                type="text"
                                placeholder="مقدار"
                                value={formik.values.value}
                                onChange={formik.handleChange}
                                invalid={
                                  formik.touched.value && !!formik.errors.value
                                }
                              />
                              <FormFeedback>{formik.errors.value}</FormFeedback>
                            </FormGroup>
                          </Col>
                        </Row>
                      )}

                      <Row>
                        <Col sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="display_order">
                              {" "}
                              اولویت نمایش{" "}
                            </Label>
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
                            <FormFeedback>
                              {formik.errors.display_order}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col sm="6" className="d-flex align-items-center">
                          <FormGroup switch>
                            <Input
                              type="switch"
                              id="is_active_update"
                              name="is_active"
                              checked={formik.values.is_active}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Label htmlFor="is_active_update" check>
                              فعال
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>

                      <div className="d-flex flex-wrap gap-2">
                        <Button type="submit" color="primary">
                          ذخیره تغییرات
                        </Button>
                        <Button color="secondary" onClick={toggle}>
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

export default UpdateAttributeValueModal;
