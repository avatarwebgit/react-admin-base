import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Col,
  Row,
} from "reactstrap";
import Dropzone from "react-dropzone";

const MenuFormModal = ({ isOpen, toggle, item, onSave, depth }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const isEditing = !!item;

  const validationSchema = yup.object({
    title: yup.string().required("عنوان الزامی است"),
    type: yup.string().required("نوع الزامی است"),
    link: yup.string().when("type", {
      is: "external",
      then: (schema) =>
        schema.url("باید یک URL معتبر باشد").required("URL الزامی است"),
      otherwise: (schema) => schema.required("لینک/اسلاگ الزامی است"),
    }),
    image: yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: item?.title || "",
      type: item?.type || "page",
      link: item?.link || "",
      image: item?.image || null,
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      toggle();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setImagePreview(item?.image || null);
  }, [item]);

  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue("image", reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered dir="rtl">
      <ModalHeader toggle={toggle}>
        {isEditing ? "ویرایش آیتم منو" : "افزودن آیتم منو"}
      </ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="title">عنوان</Label>
            <Input
              id="title"
              name="title"
              {...formik.getFieldProps("title")}
              invalid={formik.touched.title && !!formik.errors.title}
            />
            <FormFeedback>{formik.errors.title}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>نوع</Label>
            <Row>
              <Col>
                <FormGroup check>
                  <Input
                    type="radio"
                    id="typePage"
                    name="type"
                    value="page"
                    checked={formik.values.type === "page"}
                    onChange={formik.handleChange}
                  />
                  <Label check for="typePage">
                    صفحه
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Input
                    type="radio"
                    id="typeExternal"
                    name="type"
                    value="external"
                    checked={formik.values.type === "external"}
                    onChange={formik.handleChange}
                  />
                  <Label check for="typeExternal">
                    لینک خارجی
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="link">
              {formik.values.type === "page"
                ? "اسلاگ صفحه (مثال: /درباره-ما)"
                : "URL کامل"}
            </Label>
            <Input
              id="link"
              name="link"
              placeholder={
                formik.values.type === "page"
                  ? "/صفحه-نمونه"
                  : "https://example.com"
              }
              {...formik.getFieldProps("link")}
              invalid={formik.touched.link && !!formik.errors.link}
              style={{ direction: "ltr", textAlign: "right" }}
            />
            <FormFeedback>{formik.errors.link}</FormFeedback>
          </FormGroup>
          {depth === 0 && (
            <FormGroup>
              <Label>تصویر (برای آیتم‌های سطح اول)</Label>
              <Dropzone
                onDrop={handleImageDrop}
                accept={{ "image/*": [] }}
                maxFiles={1}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="dropzone"
                    style={{
                      border: "2px dashed #ced4da",
                      borderRadius: ".25rem",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input {...getInputProps()} />
                    <p>
                      تصویر را اینجا بکشید و رها کنید یا برای انتخاب کلیک کنید
                    </p>
                  </div>
                )}
              </Dropzone>
              {imagePreview && (
                <div className="mt-2 text-center">
                  <img
                    src={imagePreview}
                    alt="پیش‌نمایش"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    color="danger"
                    size="sm"
                    className="ms-2"
                    onClick={handleRemoveImage}
                  >
                    حذف
                  </Button>
                </div>
              )}
            </FormGroup>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            انصراف
          </Button>
          <Button color="primary" type="submit">
            ذخیره
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default MenuFormModal;
