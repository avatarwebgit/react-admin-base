import { useFormik } from "formik";
import moment from "moment";
import React from "react";
import Flatpickr from "react-flatpickr";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";

const OrderModal = ({ isOpen, toggle, order, isEdit, onOrderSubmit }) => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      orderId: (order && order.orderId) || "",
      billingName: (order && order.billingName) || "",
      orderDate: (order && order.orderDate) || "",
      total: (order && order.total) || "",
      paymentStatus: (order && order.paymentStatus) || "پرداخت شده",
      paymentMethod: (order && order.paymentMethod) || "Mastercard",
    },
    validationSchema: Yup.object({
      orderId: Yup.string()
        .matches(/[0-9\.\-\s+\/()]+/, "لطفا شناسه سفارش معتبر را وارد کنید")
        .required("لطفا شناسه سفارش خود را وارد کنید"),
      billingName: Yup.string().required("لطفا نام صورتحساب خود را وارد کنید"),
      orderDate: Yup.string().required("لطفا تاریخ سفارش خود را وارد کنید"),
      total: Yup.string()
        .matches(/[0-9\.\-\s+\/()]+/, "لطفا مقدار معتبر را وارد کنید")
        .required("مقدار کل الزامی است"),
      paymentStatus: Yup.string().required(
        "لطفا وضعیت پرداخت خود را وارد کنید"
      ),
      paymentMethod: Yup.string().required("لطفا روش پرداخت خود را وارد کنید"),
    }),
    onSubmit: (values) => {
      onOrderSubmit(values, isEdit);
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {!!isEdit ? "ویرایش سفارش" : "افزودن سفارش"}
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col className="col-12">
              <div className="mb-3">
                <Label>شماره سفارش</Label>
                <Input
                  name="orderId"
                  type="text"
                  placeholder="درج شناسه سفارش"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.orderId || ""}
                  invalid={
                    validation.touched.orderId && validation.errors.orderId
                      ? true
                      : false
                  }
                />
                {validation.touched.orderId && validation.errors.orderId ? (
                  <FormFeedback type="invalid">
                    {validation.errors.orderId}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label>نام صورتحساب</Label>
                <Input
                  name="billingName"
                  type="text"
                  placeholder="درج نام صورتحساب"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.billingName || ""}
                  invalid={
                    validation.touched.billingName &&
                    validation.errors.billingName
                      ? true
                      : false
                  }
                />
                {validation.touched.billingName &&
                validation.errors.billingName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.billingName}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label>تاریخ سفارش</Label>
                <Flatpickr
                  className="form-control d-block"
                  name="orderDate"
                  placeholder="انتخاب زمان"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                  onChange={(date) =>
                    validation.setFieldValue(
                      "orderDate",
                      moment(date[0]).format("DD MMMM, YYYY")
                    )
                  }
                  value={validation.values.orderDate}
                />
                {validation.touched.orderDate && validation.errors.orderDate ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.orderDate}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label>مجموع</Label>
                <Input
                  name="total"
                  type="text"
                  placeholder="درج کل مبلغ"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.total || ""}
                  invalid={
                    validation.touched.total && validation.errors.total
                      ? true
                      : false
                  }
                />
                {validation.touched.total && validation.errors.total ? (
                  <FormFeedback type="invalid">
                    {validation.errors.total}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label>وضعیت پرداخت</Label>
                <Input
                  name="paymentStatus"
                  type="select"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.paymentStatus || ""}
                >
                  <option>پرداخت شده</option>
                  <option>شارژ مجدد</option>
                  <option>بازپرداخت</option>
                </Input>
                {validation.touched.paymentStatus &&
                validation.errors.paymentStatus ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.paymentStatus}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label>روش پرداخت</Label>
                <Input
                  name="paymentMethod"
                  type="select"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.paymentMethod || ""}
                >
                  <option>مسترکارت</option>
                  <option>ویزاکارت</option>
                  <option>پی پال</option>
                  <option>COD</option>
                </Input>
                {validation.touched.paymentMethod &&
                validation.errors.paymentMethod ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.paymentMethod}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <Button type="submit" color="success" className="save-user">
                  ذخیره
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default OrderModal;
