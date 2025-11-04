import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback,
  Col,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  showDeliveryMethod,
  updateDeliveryMethod,
} from "../../../store/e-commerce/actions";

const ShippingUpdateModal = ({ modal, toggle }) => {
  const dispatch = useDispatch();

  const methodDetails = useSelector(
    (state) => state.ecommerce.deliveryMethodDetails[modal.id]
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
      payment_type: 0,
      is_active: false,
    },
    validationSchema: yup.object({
      name: yup.string().required("نام روش ارسال الزامی است"),
      slug: yup.string().required("اسلاگ الزامی است"),
      description: yup.string().required("توضیحات الزامی است"),
      payment_type: yup.number().required("نوع پرداخت الزامی است"),
      is_active: yup.boolean(),
    }),
    onSubmit: (values) => {
      const payload = {
        id: modal.id,
        ...values,
        payment_type: Number(values.payment_type),
      };
      dispatch(updateDeliveryMethod(payload));
      toggle();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (modal.isOpen && modal.id) {
      dispatch(showDeliveryMethod(modal.id));
    }
  }, [modal.isOpen, modal.id, dispatch]);

  useEffect(() => {
    if (methodDetails) {
      formik.setValues({
        name: methodDetails.name || "",
        slug: methodDetails.slug || "",
        description: methodDetails.description || "",
        payment_type: methodDetails.payment_type ?? 0,
        is_active: methodDetails.is_active || false,
      });
    }
  }, [methodDetails]);

  return (
    <Modal isOpen={modal.isOpen} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        ویرایش روش ارسال: {methodDetails?.name}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="name">نام روش ارسال</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.name && !!formik.errors.name}
                />
                <FormFeedback>{formik.errors.name}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="slug">اسلاگ (Slug)</Label>
                <Input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.slug && !!formik.errors.slug}
                />
                <FormFeedback>{formik.errors.slug}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label htmlFor="description">توضیحات</Label>
            <Input
              type="textarea"
              id="description"
              name="description"
              rows="3"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={
                formik.touched.description && !!formik.errors.description
              }
            />
            <FormFeedback>{formik.errors.description}</FormFeedback>
          </FormGroup>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="payment_type">نوع پرداخت</Label>
                <Input
                  type="select"
                  id="payment_type"
                  name="payment_type"
                  value={formik.values.payment_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={
                    formik.touched.payment_type && !!formik.errors.payment_type
                  }
                >
                  <option value={0}>پیش‌ پرداخت</option>
                  <option value={1}>پس‌ کرایه</option>
                  <option value={2}>رایگان</option>
                </Input>
                <FormFeedback>{formik.errors.payment_type}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6} className="d-flex align-items-center pt-3">
              <FormGroup switch className="mb-0">
                <Input
                  type="switch"
                  id="is_active"
                  name="is_active"
                  checked={formik.values.is_active}
                  onChange={formik.handleChange}
                />
                <Label check htmlFor="is_active">
                  فعال
                </Label>
              </FormGroup>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button color="secondary" onClick={toggle}>
              انصراف
            </Button>
            <Button color="primary" type="submit">
              ذخیره تغییرات
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ShippingUpdateModal;
