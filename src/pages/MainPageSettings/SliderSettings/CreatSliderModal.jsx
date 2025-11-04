import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // ADD THIS IMPORT
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; // ADD THIS IMPORT
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
import { addSlider } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";

const CreateSliderModal = ({ isOpen, toggle }) => {
  const { sliderCreated } = useSelector((state) => state.ecommerce);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false); // ADD THIS STATE

  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState({
    background_image: null,
    foreground_image: null,
    background_image_mobile: null,
    foreground_image_mobile: null,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      button_text: "",
      display_order: 1,
      background_image: null,
      foreground_image: null,
      background_image_mobile: null,
      foreground_image_mobile: null,
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("عنوان اسلایدر الزامی است"),
      subtitle: yup.string(),
      button_text: yup.string().max(20,"متن دکمه نباید بیشتر از 20 کاراکتر باشد").required("متن دکمه الزامیست"),
      display_order: yup.number().min(1).required("اولویت نمایش الزامی است"),

      background_image: yup
        .mixed()
        .required("تصویر پس‌زمینه دسکتاپ الزامی است")
        .test(
          "fileSize",
          "حجم فایل نباید بیشتر از 2MB باشد",
          (value) => !value || value.size <= 2 * 1024 * 1024
        )
        .test(
          "fileType",
          "فرمت فایل باید jpg, png یا webp باشد",
          (value) =>
            !value ||
            ["image/jpeg", "image/png", "image/webp"].includes(value.type)
        ),

      foreground_image: yup
        .mixed()
        .required("تصویر جلوه دسکتاپ الزامی است")
        .test(
          "fileSize",
          "حجم فایل نباید بیشتر از 2MB باشد",
          (value) => !value || value.size <= 2 * 1024 * 1024
        )
        .test(
          "fileType",
          "فرمت فایل باید jpg, png یا webp باشد",
          (value) =>
            !value ||
            ["image/jpeg", "image/png", "image/webp"].includes(value.type)
        ),

      background_image_mobile: yup
        .mixed()
        .required("تصویر پس‌زمینه موبایل الزامی است")
        .test(
          "fileSize",
          "حجم فایل نباید بیشتر از 2MB باشد",
          (value) => !value || value.size <= 2 * 1024 * 1024
        )
        .test(
          "fileType",
          "فرمت فایل باید jpg, png یا webp باشد",
          (value) =>
            !value ||
            ["image/jpeg", "image/png", "image/webp"].includes(value.type)
        ),

      foreground_image_mobile: yup
        .mixed()
        .required("تصویر جلوه موبایل الزامی است")
        .test(
          "fileSize",
          "حجم فایل نباید بیشتر از 2MB باشد",
          (value) => !value || value.size <= 2 * 1024 * 1024
        )
        .test(
          "fileType",
          "فرمت فایل باید jpg, png یا webp باشد",
          (value) =>
            !value ||
            ["image/jpeg", "image/png", "image/webp"].includes(value.type)
        ),
    }),
    onSubmit: async (values) => {
      try {
        setIsUploading(true); // START UPLOADING
        setUploadProgress(0); // RESET PROGRESS

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("subtitle", values.subtitle);
        formData.append("button_text", values.button_text);
        formData.append("display_order", values.display_order);

        // Append files if they exist
        if (selectedFiles.background_image)
          formData.append("background_image", selectedFiles.background_image);
        if (selectedFiles.foreground_image)
          formData.append("foreground_image", selectedFiles.foreground_image);
        if (selectedFiles.background_image_mobile)
          formData.append(
            "background_image_mobile",
            selectedFiles.background_image_mobile
          );
        if (selectedFiles.foreground_image_mobile)
          formData.append(
            "foreground_image_mobile",
            selectedFiles.foreground_image_mobile
          );

        await dispatch(
          // ADD AWAIT HERE
          addSlider({
            formData,
            config: {
              onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percent);
              },
            },
          })
        );
      } catch (error) {
        setIsUploading(false); // STOP UPLOADING ON ERROR
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "مشکلی در ایجاد اسلایدر وجود دارد";
        toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    console.log(uploadProgress);
  }, [uploadProgress]);

  useEffect(() => {
    if (sliderCreated) {
      setIsUploading(false); // RESET UPLOADING STATE
      setUploadProgress(0); // RESET PROGRESS
      toggle();
      formik.resetForm();
      setSelectedFiles({
        background_image: null,
        foreground_image: null,
        background_image_mobile: null,
        foreground_image_mobile: null,
      });
    }
  }, [sliderCreated]);

  const handleImageDrop = (fieldName, acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      });

      setSelectedFiles((prev) => ({
        ...prev,
        [fieldName]: newFile,
      }));

      formik.setFieldValue(fieldName, newFile);
      formik.setFieldTouched(fieldName, true, false);
    }
  };

  const removeImage = (fieldName) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
    formik.setFieldValue(fieldName, null);
    formik.setFieldTouched(fieldName, false);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <OptionalSizes center={true} size={"xl"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">ایجاد اسلایدر جدید</CardTitle>
                <p className="card-title-desc mb-4">
                  تمام اطلاعات مورد نیاز را وارد کنید
                </p>

                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="title">عنوان اسلایدر</Label>
                        <Input
                          id="title"
                          name="title"
                          type="text"
                          placeholder="عنوان اصلی اسلایدر"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.title && formik.errors.title
                              ? true
                              : false
                          }
                        />
                        {formik.errors.title && formik.touched.title ? (
                          <FormFeedback type="invalid">
                            {formik.errors.title}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="subtitle">زیرعنوان</Label>
                        <Input
                          id="subtitle"
                          name="subtitle"
                          type="text"
                          placeholder="زیرعنوان اسلایدر"
                          value={formik.values.subtitle}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="button_text">متن دکمه</Label>
                        <Input
                          id="button_text"
                          name="button_text"
                          type="text"
                          placeholder="متن دکمه اقدام"
                          value={formik.values.button_text}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.button_text &&
                            formik.errors.button_text
                              ? true
                              : false
                          }
                        />
                        {formik.errors.button_text &&
                        formik.touched.button_text ? (
                          <FormFeedback type="invalid">
                            {formik.errors.button_text}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="display_order">اولویت نمایش</Label>
                        <Input
                          id="display_order"
                          name="display_order"
                          type="number"
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

                  {/* Desktop Images Section */}
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle tag="h5">تصاویر دسکتاپ</CardTitle>
                      <Row>
                        <Col sm="6">
                          {/* Background Image */}
                          <div className="mb-3">
                            <Label>تصویر پس زمینه دسکتاپ</Label>
                            <Dropzone
                              onDrop={(acceptedFiles) =>
                                handleImageDrop(
                                  "background_image",
                                  acceptedFiles
                                )
                              }
                              accept="image/*"
                              maxFiles={1}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div
                                  className={`dropzone ${
                                    formik.errors.background_image &&
                                    formik.touched.background_image
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4 style={{ fontSize: "14px" }}>
                                      فایل را اینجا رها کنید یا برای آپلود کلیک
                                      کنید
                                    </h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            {selectedFiles.background_image && (
                              <div className="mt-2">
                                <div className="border rounded p-2">
                                  <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 me-3">
                                      <div className="avatar-sm bg-light rounded p-1">
                                        <img
                                          className="img-fluid rounded d-block"
                                          src={
                                            selectedFiles.background_image
                                              .preview
                                          }
                                          alt={
                                            selectedFiles.background_image.name
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="flex-grow-1">
                                      <div className="pt-1">
                                        <h5 className="fs-md mb-1">
                                          {selectedFiles.background_image.name}
                                        </h5>
                                        <p className="fs-sm text-muted mb-0">
                                          {
                                            selectedFiles.background_image
                                              .formattedSize
                                          }
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0 ms-3">
                                      <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() =>
                                          removeImage("background_image")
                                        }
                                      >
                                        حذف
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {formik.errors.background_image &&
                              formik.touched.background_image && (
                                <FormFeedback className="d-block">
                                  {formik.errors.background_image}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                        <Col sm="6">
                          {/* Foreground Image */}
                          <div className="mb-3">
                            <Label>تصویر جلوه دسکتاپ</Label>
                            <Dropzone
                              onDrop={(acceptedFiles) =>
                                handleImageDrop(
                                  "foreground_image",
                                  acceptedFiles
                                )
                              }
                              accept="image/*"
                              maxFiles={1}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div
                                  className={`dropzone ${
                                    formik.errors.foreground_image &&
                                    formik.touched.foreground_image
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4 style={{ fontSize: "14px" }}>
                                      فایل را اینجا رها کنید یا برای آپلود کلیک
                                      کنید
                                    </h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            {selectedFiles.foreground_image && (
                              <div className="mt-2">
                                <div className="border rounded p-2">
                                  <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 me-3">
                                      <div className="avatar-sm bg-light rounded p-1">
                                        <img
                                          className="img-fluid rounded d-block"
                                          src={
                                            selectedFiles.foreground_image
                                              .preview
                                          }
                                          alt={
                                            selectedFiles.foreground_image.name
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="flex-grow-1">
                                      <div className="pt-1">
                                        <h5 className="fs-md mb-1">
                                          {selectedFiles.foreground_image.name}
                                        </h5>
                                        <p className="fs-sm text-muted mb-0">
                                          {
                                            selectedFiles.foreground_image
                                              .formattedSize
                                          }
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0 ms-3">
                                      <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() =>
                                          removeImage("foreground_image")
                                        }
                                      >
                                        حذف
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {formik.errors.foreground_image &&
                              formik.touched.foreground_image && (
                                <FormFeedback className="d-block">
                                  {formik.errors.foreground_image}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  {/* Mobile Images Section */}
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle tag="h5">تصاویر موبایل</CardTitle>
                      <Row>
                        <Col sm="6">
                          {/* Background Mobile Image */}
                          <div className="mb-3">
                            <Label>تصویر پس زمینه موبایل</Label>
                            <Dropzone
                              onDrop={(acceptedFiles) =>
                                handleImageDrop(
                                  "background_image_mobile",
                                  acceptedFiles
                                )
                              }
                              accept="image/*"
                              maxFiles={1}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div
                                  className={`dropzone ${
                                    formik.errors.background_image_mobile &&
                                    formik.touched.background_image_mobile
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4 style={{ fontSize: "14px" }}>
                                      فایل را اینجا رها کنید یا برای آپلود کلیک
                                      کنید
                                    </h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            {selectedFiles.background_image_mobile && (
                              <div className="mt-2">
                                <div className="border rounded p-2">
                                  <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 me-3">
                                      <div className="avatar-sm bg-light rounded p-1">
                                        <img
                                          className="img-fluid rounded d-block"
                                          src={
                                            selectedFiles
                                              .background_image_mobile.preview
                                          }
                                          alt={
                                            selectedFiles
                                              .background_image_mobile.name
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="flex-grow-1">
                                      <div className="pt-1">
                                        <h5 className="fs-md mb-1">
                                          {
                                            selectedFiles
                                              .background_image_mobile.name
                                          }
                                        </h5>
                                        <p className="fs-sm text-muted mb-0">
                                          {
                                            selectedFiles
                                              .background_image_mobile
                                              .formattedSize
                                          }
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0 ms-3">
                                      <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() =>
                                          removeImage("background_image_mobile")
                                        }
                                      >
                                        حذف
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {formik.errors.background_image_mobile &&
                              formik.touched.background_image_mobile && (
                                <FormFeedback className="d-block">
                                  {formik.errors.background_image_mobile}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                        <Col sm="6">
                          {/* Foreground Mobile Image */}
                          <div className="mb-3">
                            <Label>تصویر جلوه موبایل</Label>
                            <Dropzone
                              onDrop={(acceptedFiles) =>
                                handleImageDrop(
                                  "foreground_image_mobile",
                                  acceptedFiles
                                )
                              }
                              accept="image/*"
                              maxFiles={1}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div
                                  className={`dropzone ${
                                    formik.errors.foreground_image_mobile &&
                                    formik.touched.foreground_image_mobile
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4 style={{ fontSize: "14px" }}>
                                      فایل را اینجا رها کنید یا برای آپلود کلیک
                                      کنید
                                    </h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            {selectedFiles.foreground_image_mobile && (
                              <div className="mt-2">
                                <div className="border rounded p-2">
                                  <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 me-3">
                                      <div className="avatar-sm bg-light rounded p-1">
                                        <img
                                          className="img-fluid rounded d-block"
                                          src={
                                            selectedFiles
                                              .foreground_image_mobile.preview
                                          }
                                          alt={
                                            selectedFiles
                                              .foreground_image_mobile.name
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="flex-grow-1">
                                      <div className="pt-1">
                                        <h5 className="fs-md mb-1">
                                          {
                                            selectedFiles
                                              .foreground_image_mobile.name
                                          }
                                        </h5>
                                        <p className="fs-sm text-muted mb-0">
                                          {
                                            selectedFiles
                                              .foreground_image_mobile
                                              .formattedSize
                                          }
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0 ms-3">
                                      <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() =>
                                          removeImage("foreground_image_mobile")
                                        }
                                      >
                                        حذف
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {formik.errors.foreground_image_mobile &&
                              formik.touched.foreground_image_mobile && (
                                <FormFeedback className="d-block">
                                  {formik.errors.foreground_image_mobile}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <div className="d-flex align-items-center">
                          <div style={{ width: 30, height: 30, marginLeft: 8 }}>
                            <CircularProgressbar
                              value={uploadProgress}
                              text={`${uploadProgress}%`}
                              styles={{
                                path: { stroke: "#ffffffff" },
                                text: { fill: "#ffffffff", fontSize: "40px" },
                                trail: { stroke: "rgba(255,255,255,0.3)" },
                              }}
                            />
                          </div>
                          <span>در حال آپلود...</span>
                        </div>
                      ) : (
                        "ذخیره اسلایدر"
                      )}
                    </Button>
                    <Button
                      type="button"
                      color="secondary"
                      onClick={toggle}
                      disabled={isUploading}
                    >
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

export default CreateSliderModal;
