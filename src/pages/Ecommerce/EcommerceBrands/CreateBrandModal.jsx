import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
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
} from "reactstrap";
import * as yup from "yup";
import { emptyToNull } from "../../../helpers/helperFunctions";
import { addBrand } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import Meta from "../Meta";
import { generateSlug } from "../../../utils/helperFunctions";

const CreateBrandModal = ({ isOpen, toggle }) => {
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Separate state for each image type
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);

  const dispatch = useDispatch();

  const { brandCreated } = useSelector((state) => state.ecommerce);

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
      is_active: false,
      is_for_sale: false,
      display_order: 1,
      meta: {
        meta_keywords: [],
        meta_description: "",
        meta_title: "",
        canonical: "",
      },
      discount: null,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام واحد را وارد کنید"),
      slug: yup.string(),
      description: yup.string(),
      is_active: yup.boolean(),
      is_for_sale: yup.boolean(),
      display_order: yup.number(),
      meta: yup.object().shape({
        meta_keywords: yup.array(),
        meta_description: yup.string(),
        meta_title: yup.string(),
        canonical: yup.string(),
      }),
      discount: yup.array().nullable(),
    }),
    onSubmit: async (values) => {
      const isMetaEmpty =
        !values.meta.meta_title &&
        !values.meta.meta_description &&
        (!values.meta.meta_keywords ||
          values.meta.meta_keywords.length === 0) &&
        !values.meta.canonical;

      try {
        const newSlug = formik.values.slug.replace(/\s+/g, "_");

        // Create FormData object
        const formData = new FormData();

        // Append text fields
        formData.append("name", values.name);
        formData.append("slug", newSlug);
        formData.append("description", values.description);
        formData.append("is_active", values.is_active ? 1 : 0);
        formData.append("is_for_sale", values.is_for_sale ? 1 : 0);
        formData.append("display_order", Number(values.display_order));

        // Append images with specific field names
        if (thumbnailImage) {
          formData.append("thumbnail", thumbnailImage);
        }

        if (iconImage) {
          formData.append("icon", iconImage);
        }

        if (headerImage) {
          formData.append("header_image", headerImage);
        }

        // Append discount data
        formData.append("discount[discount_percent]", 0);
        formData.append("discount[start_date]", "");
        formData.append("discount[end_date]", "");
        formData.append("discount[has_day_dependency]", true);
        formData.append("discount[is_visiable]", true);
        formData.append("discount[hasDiscount]", false);

        // Append meta data
        if (!isMetaEmpty) {
          formData.append(
            "meta[meta_title]",
            emptyToNull(values.meta.meta_title) || ""
          );
          formData.append(
            "meta[meta_description]",
            emptyToNull(values.meta.meta_description) || ""
          );
          formData.append(
            "meta[canonical]",
            emptyToNull(values.meta.canonical) || ""
          );

          if (
            values.meta.meta_keywords &&
            values.meta.meta_keywords.length > 0
          ) {
            values.meta.meta_keywords.forEach((keyword) => {
              formData.append("meta[meta_keywords][]", keyword);
            });
          }
        }

        // Debug FormData - proper way to view FormData contents
        console.log("=== FormData Contents ===");
        for (let [key, value] of formData.entries()) {
          console.log(key, ":", value);
        }
        console.log("======================");

        dispatch(addBrand(formData));
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

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleAcceptedFiles = (files, imageType) => {
    if (files.length > 0) {
      const file = files[0]; // Only take the first file
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      });

      // Set the appropriate image based on type
      switch (imageType) {
        case "thumbnail":
          setThumbnailImage(file);
          break;
        case "icon":
          setIconImage(file);
          break;
        case "header_image":
          setHeaderImage(file);
          break;
        default:
          break;
      }
    }
  };

  const handleRemoveFile = (imageType) => {
    switch (imageType) {
      case "thumbnail":
        setThumbnailImage(null);
        break;
      case "icon":
        setIconImage(null);
        break;
      case "header_image":
        setHeaderImage(null);
        break;
      default:
        break;
    }
  };

  // Render individual dropzone component
  const renderDropzone = (title, imageType, imageFile) => (
    <Col sm="4">
      <CardBody>
        <CardTitle className="mb-3">{title}</CardTitle>
        <Form>
          <Dropzone
            onDrop={(acceptedFiles) => {
              handleAcceptedFiles(acceptedFiles, imageType);
            }}
            maxFiles={1}
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
            }}
            maxSize={5000000}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone">
                <div className="dz-message needsclick" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="dz-message needsclick">
                    <div className="mb-3">
                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                    </div>
                    <p style={{ fontSize: "14px" }}>
                      فایل ها را اینجا رها کنید یا برای آپلود کلیک کنید
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
          <div className="dz-preview-wrap">
            {imageFile && (
              <div className="mt-2 dz-preview">
                <div className="border rounded">
                  <div className="d-flex flex-wrap gap-2 p-2">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm bg-light rounded p-2">
                        <img
                          className="img-fluid rounded d-block"
                          src={imageFile.preview}
                          alt={imageFile.name}
                          onLoad={() => URL.revokeObjectURL(imageFile.preview)}
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="pt-1">
                        <h5 className="fs-md mb-1">{imageFile.name}</h5>
                        <p className="fs-sm text-muted mb-0">
                          {imageFile.formattedSize}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ms-3">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleRemoveFile(imageType)}
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Form>
      </CardBody>
    </Col>
  );

  useEffect(() => {
    if (brandCreated) {
      toggle();
      formik.resetForm();
      setSlugManuallyEdited(false);
      setThumbnailImage(null);
      setIconImage(null);
      setHeaderImage(null);
    }
  }, [brandCreated]);

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
      setSlugManuallyEdited(false);
      setThumbnailImage(null);
      setIconImage(null);
      setHeaderImage(null);
    }
  }, [isOpen]);

  return (
    <OptionalSizes center size="xl" isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">اطلاعات برند</CardTitle>
                <p className="card-title-desc mb-4">
                  تمام اطلاعات زیر را پر کنید
                </p>

                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="name">نام برند</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="نام برند"
                          value={formik.values.name}
                          onChange={(e) => {
                            formik.handleChange(e);
                            if (!slugManuallyEdited) {
                              formik.setFieldValue(
                                "slug",
                                generateSlug(e.target.value)
                              );
                            }
                          }}
                          invalid={formik.touched.name && !!formik.errors.name}
                        />
                        <FormFeedback>{formik.errors.name}</FormFeedback>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="slug">نام مستعار صفحه</Label>
                        <Input
                          id="slug"
                          name="slug"
                          type="text"
                          placeholder="نام مستعار صفحه برند"
                          value={formik.values.slug}
                          onChange={(e) => {
                            const slugValue = e.target.value;
                            formik.setFieldValue("slug", slugValue);
                            if (slugValue.trim() !== "") {
                              setSlugManuallyEdited(true);
                            }
                          }}
                          onBlur={(e) => {
                            const slugValue = e.target.value;
                            if (
                              slugValue.trim() === "" &&
                              formik.values.name.trim() !== ""
                            ) {
                              formik.setFieldValue(
                                "slug",
                                generateSlug(formik.values.name)
                              );
                              setSlugManuallyEdited(false);
                            }
                          }}
                          invalid={formik.touched.slug && !!formik.errors.slug}
                        />
                        <FormFeedback>{formik.errors.slug}</FormFeedback>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="4">
                      <div className="mb-3">
                        <Label htmlFor="display_order">اولویت</Label>
                        <Input
                          id="display_order"
                          name="display_order"
                          type="number"
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
                      </div>
                    </Col>
                    <Col
                      sm="4"
                      className="d-flex align-items-end justify-content-center"
                    >
                      <div className="mb-3 form-check form-switch">
                        <Input
                          id="is_active"
                          name="is_active"
                          type="checkbox"
                          checked={formik.values.is_active}
                          onChange={formik.handleChange}
                          className="form-check-input"
                        />
                        <Label
                          check
                          htmlFor="is_active"
                          className="form-check-label"
                        >
                          وضعیت نمایش برند
                        </Label>
                      </div>
                    </Col>
                    <Col
                      sm="4"
                      className="d-flex align-items-end justify-content-center form-check form-switch"
                    >
                      <div className="mb-3 form-check">
                        <Input
                          id="is_for_sale"
                          name="is_for_sale"
                          type="checkbox"
                          checked={formik.values.is_for_sale}
                          onChange={formik.handleChange}
                          className="form-check-input"
                        />
                        <Label
                          check
                          htmlFor="is_for_sale"
                          className="form-check-label"
                        >
                          وضعیت فروش برند
                        </Label>
                      </div>
                    </Col>
                  </Row>

                  <Col sm="12">
                    <div className="mb-3">
                      <Label htmlFor="description">توضیحات برند</Label>
                      <Input
                        type="textarea"
                        id="description"
                        name="description"
                        rows="5"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        invalid={
                          formik.touched.description &&
                          !!formik.errors.description
                        }
                      />
                      <FormFeedback>{formik.errors.description}</FormFeedback>
                    </div>
                  </Col>

                  <Row>
                    {renderDropzone(
                      "تصویر دسته بندی",
                      "thumbnail",
                      thumbnailImage
                    )}
                    {renderDropzone("تصویر آیکون", "icon", iconImage)}
                    {renderDropzone("تصویر بنر", "header_image", headerImage)}
                  </Row>

                  <Meta formik={formik} />

                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting
                        ? "در حال ذخیره..."
                        : "ذخیره تغییرات"}
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

export default CreateBrandModal;
