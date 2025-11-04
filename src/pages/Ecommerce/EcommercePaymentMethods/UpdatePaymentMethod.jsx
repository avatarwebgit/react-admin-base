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
import {
  showPaymentMethod,
  updatePaymentMethod,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import Dropzone from "react-dropzone";

const UpdatePaymentMethodModal = ({ paymentMethodId, isOpen, toggle }) => {
  const paymentMethodDetails = useSelector(
    (state) => state.ecommerce.paymentMethodDetails[paymentMethodId]
  );

  const [initialValues, setInitialValues] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentMethodDetails) {
      setInitialValues(paymentMethodDetails);
    }
    if (!paymentMethodDetails && paymentMethodId !== null) {
      dispatch(showPaymentMethod(paymentMethodId));
    }
  }, [isOpen, paymentMethodId, paymentMethodDetails]);

  const validationSchema = yup.object().shape({
    name: yup.string().required("لطفا نام درگاه را وارد کنید"),
    fee_percentage: yup
      .number()
      .min(0)
      .max(100)
      .typeError("لطفا مقدار عددی بین 0 و 100 وارد کنید"),
    display_order: yup
      .number()
      .min(1, "حداقل مقدار 1 میباشد")
      .max(12)
      .required("لطفا اولویت نمایش را وارد کنید"),
    short_description: yup.string(),
    is_active: yup.boolean(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          id: paymentMethodId,
          ...values,
        };
        dispatch(updatePaymentMethod(payload));
        toggle();
      } catch (error) {
        console.error("Error updating payment method:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <OptionalSizes
      center={true}
      size={"xl"}
      isOpen={isOpen}
      toggle={toggle}
      title={`ویرایش درگاه پرداخت ${paymentMethodDetails?.name}`}
    >
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">ویرایش درگاه پرداخت</CardTitle>
                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col sm="4">
                      <div className="mb-3">
                        <Label htmlFor="name">نام درگاه</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="نام درگاه پرداخت"
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
                        <Label htmlFor="fee_percentage">
                          درصد کارمزد اضافی
                        </Label>
                        <Input
                          id="fee_percentage"
                          name="fee_percentage"
                          type="text"
                          placeholder="مثال: 2.5"
                          value={formik.values.fee_percentage}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.fee_percentage &&
                            formik.errors.fee_percentage
                              ? true
                              : false
                          }
                        />
                        {formik.errors.fee_percentage &&
                        formik.touched.fee_percentage ? (
                          <FormFeedback type="invalid">
                            {formik.errors.fee_percentage}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col sm="4">
                      <div className="mb-3">
                        <Label htmlFor="display_order">اولویت نمایش</Label>
                        <Input
                          id="display_order"
                          name="display_order"
                          type="text"
                          placeholder="اولویت نمایش"
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

                  <Row>
                    <Col sm="12">
                      <CardBody>
                        <CardTitle className="mb-3">تصویر آیکون </CardTitle>
                        <Form>
                          <Dropzone
                            onDrop={(acceptedFiles) => {
                              handleAcceptedFiles(acceptedFiles);
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <div className="dz-message needsclick">
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <p>
                                      فایل ها را اینجا رها کنید یا برای آپلود
                                      کلیک کنید
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <ul className="list-unstyled mb-0" id="file-previews">
                            {selectedFiles.map((file, index) => {
                              return (
                                <li className="mt-2 dz-image-preview" key="">
                                  <div className="border rounded">
                                    <div className="d-flex flex-wrap gap-2 p-2">
                                      <div className="flex-shrink-0 me-3">
                                        <div className="avatar-sm bg-light rounded p-2">
                                          <img
                                            data-dz-thumbnail=""
                                            className="img-fluid rounded d-block"
                                            src={file.preview}
                                            alt={file.name}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex-grow-1">
                                        <div className="pt-1">
                                          <h5
                                            className="fs-md mb-1"
                                            data-dz-name
                                          >
                                            {file.path}
                                          </h5>
                                          <strong
                                            className="error text-danger"
                                            data-dz-errormessage
                                          ></strong>
                                        </div>
                                      </div>
                                      <div className="flex-shrink-0 ms-3">
                                        <Button
                                          color="danger"
                                          size="sm"
                                          onClick={() => {
                                            const newImages = [
                                              ...selectedFiles,
                                            ];
                                            newImages.splice(index, 1);
                                            setSelectedFiles(newImages);
                                          }}
                                        >
                                          حذف
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </Form>
                      </CardBody>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12">
                      <div className="mb-3">
                        <Label htmlFor="short_description">توضیحات کوتاه</Label>
                        <Input
                          id="short_description"
                          name="short_description"
                          type="textarea"
                          placeholder="توضیحات مختصر درباره درگاه"
                          value={formik.values.short_description}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="mb-3 form-check form-switch">
                    <Input
                      type="checkbox"
                      id="is_active"
                      name="is_active"
                      className="form-check-input"
                      checked={formik.values.is_active}
                      onChange={(e) => {
                        formik.setFieldValue("is_active", e.target.checked);
                      }}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="is_active"
                      check
                    >
                      فعال
                    </Label>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    <Button type="submit" color="primary">
                      ذخیره تغییرات
                    </Button>
                    <Button color="secondary" onClick={toggle}>
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

export default UpdatePaymentMethodModal;
