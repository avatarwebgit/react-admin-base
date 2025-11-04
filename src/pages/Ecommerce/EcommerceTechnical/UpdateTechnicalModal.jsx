import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
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
import { mapToOptions } from "../../../helpers/helperFunctions";
import {
  getAttributeGroups,
  showAttribute,
  showTechnical,
  updateAttribute,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";

const UpdateTechnicalModal = ({ techId, isOpen, toggle, closeModal }) => {
  const [attributeGroupOptions, setAttributeGroupOptions] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    attribute_group_id: 0,
    is_filterable: false,
    is_visible: false,
    display_order: 1,
    show_in_product: false,
    show_in_list: false,
    parents: [],
  });
  const dispatch = useDispatch();

  const attributeGroups = useSelector(
    (state) => state.ecommerce.attributeGroups.items
  );

  const technicalDetail = useSelector(
    (state) => state.ecommerce.attributeDetails[techId]
  );

  const { singleAttributeUpdateStatus, attributeUpdateStatus } = useSelector(
    (state) => state.ecommerce
  );

  const validationSchema = yup.object().shape({
    name: yup.string().required("لطفا نام ویژگی را وارد کنید"),
    attribute_group_id: yup.number(),
    is_filterable: yup.boolean(),
    is_visible: yup.boolean(),
    show_in_list: yup.boolean(),
    show_in_product: yup.boolean(),
    display_order: yup.number().min(1, "ترتیب نمایش نمی‌تواند منفی باشد"),
    parents: yup.array(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const attrGroupId =
          values.attribute_group_id === 0 ? null : values.attribute_group_id;
        const payload = {
          ...values,
          id: techId,
          attribute_group_id: attrGroupId,
        };
        dispatch(updateAttribute(payload));
      } catch (err) {
        toast.error(err?.message || "خطا در بروزرسانی ویژگی");
      }
    },
  });

  useEffect(() => {
    if (technicalDetail) {
      setInitialValues({
        name: technicalDetail?.name || "",
        attribute_group_id: technicalDetail?.attribute_group?.id || 0,
        is_filterable: technicalDetail?.is_filterable || false,
        is_visible: technicalDetail?.is_visible || false,
        display_order: technicalDetail?.display_order || 1,
        show_in_product: technicalDetail?.show_in_product || false,
        show_in_list: technicalDetail?.show_in_list || false,
      });
    }
  }, [technicalDetail]);

  useEffect(() => {
    if (isOpen && techId) {
      dispatch(showAttribute(techId));
      dispatch(showTechnical(techId));
      dispatch(getAttributeGroups());
    }
  }, [isOpen, techId]);

  useEffect(() => {
    if (attributeGroups) {
      setAttributeGroupOptions(mapToOptions(attributeGroups));
    }
  }, [attributeGroups]);

  useEffect(() => {
    if (attributeUpdateStatus) {
      closeModal();
      formik.resetForm();
    }
  }, [attributeUpdateStatus]);

  return (
    <OptionalSizes center size="xl" isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {singleAttributeUpdateStatus ? (
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
                        <Col sm="4">
                          <div className="mb-3">
                            <Label htmlFor="name"> نام ویژگی </Label>
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
                        <Col sm="4">
                          <div className="mb-3">
                            <Label htmlFor="category_ids">دسته بندی والد</Label>
                            <Select
                              isClearable
                              classNamePrefix="select2-selection"
                              name="attribute_group_id"
                              placeholder="انتخاب ..."
                              options={attributeGroupOptions}
                              value={attributeGroupOptions.find(
                                (option) =>
                                  option.value ===
                                  formik.values.attribute_group_id
                              )}
                              onChange={(selectedOption) =>
                                formik.setFieldValue(
                                  "attribute_group_id",
                                  selectedOption ? selectedOption.value : 0
                                )
                              }
                              invalid={
                                formik.touched.attribute_group_id &&
                                formik.errors.attribute_group_id
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.attribute_group_id &&
                              formik.errors.attribute_group_id && (
                                <div className="text-danger mt-1">
                                  {formik.errors.attribute_group_id}
                                </div>
                              )}
                          </div>
                        </Col>
                        <Col sm="4">
                          <div className="mb-3">
                            <Label htmlFor="display_order">اولویت</Label>
                            <Input
                              id="display_order"
                              name="display_order"
                              type="number"
                              placeholder="نام مستعار صفحه برند"
                              value={formik.values.display_order}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.display_order &&
                                formik.errors.display_order
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.display_order &&
                            formik.touched.display_order ? (
                              <FormFeedback type="invalid">
                                {formik.errors.display_order}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col
                          sm="3"
                          className="d-flex align-items-end justify-content-start"
                        >
                          <div className="mb-3 form-check form-switch">
                            <Input
                              id="is_visible"
                              name="is_visible"
                              type="switch"
                              checked={formik.values.is_visible}
                              onClick={(e) => {
                                formik.setFieldValue(
                                  "is_visible",
                                  !e.target.checked
                                );
                              }}
                            />
                            <Label htmlFor="is_visible" check>
                              وضعیت نمایش ویژگی
                            </Label>
                          </div>
                        </Col>
                        {/* <Col
                          sm="3"
                          className="d-flex align-items-end justify-content-start"
                        >
                          <div className="mb-3 form-check form-switch">
                            <Input
                              id="is_filterable"
                              name="is_filterable"
                              type="switch"
                              checked={formik.values.is_filterable}
                              onClick={(e) => {
                                formik.setFieldValue(
                                  "is_filterable",
                                  !e.target.checked
                                );
                              }}
                            />
                            <Label htmlFor="is_filterable" check>
                              قابل فیلتر
                            </Label>
                          </div>
                        </Col>
                        <Col
                          sm="3"
                          className="d-flex align-items-end justify-content-start"
                        >
                          <div className="mb-3 form-check form-switch">
                            <Input
                              id="show_in_list"
                              name="show_in_list"
                              type="switch"
                              checked={formik.values.show_in_list}
                              onClick={(e) => {
                                formik.setFieldValue(
                                  "show_in_list",
                                  !e.target.checked
                                );
                              }}
                            />
                            <Label htmlFor="show_in_list" check>
                              نمایش در لیست محصول
                            </Label>
                          </div>
                        </Col> */}
                        <Col
                          sm="3"
                          className="d-flex align-items-end justify-content-start"
                        >
                          {/* For is_filterable checkbox */}
                          <div className="mb-3 form-check form-switch">
                            <Input
                              id="show_in_product"
                              name="show_in_product"
                              type="switch"
                              checked={formik.values.show_in_product}
                              onClick={(e) => {
                                formik.setFieldValue(
                                  "show_in_product",
                                  !e.target.checked
                                );
                              }}
                            />
                            <Label htmlFor="show_in_product" check>
                              نمایش در باکس محصول
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

export default UpdateTechnicalModal;
