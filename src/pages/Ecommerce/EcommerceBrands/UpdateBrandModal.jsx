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
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import { emptyToNull } from "../../../helpers/helperFunctions";
import { showBrand, updateBrand } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import Meta from "../Meta";
import Discount from "../Discount";
import { generateSlug } from "../../../utils/helperFunctions";
import ImageWithModal from "../../../components/Common/ImageWithModal";

const UpdateBrandModal = ({ isOpen, toggle, brand, brandId }) => {
  const brandDetails = useSelector(
    (state) => state.ecommerce.brandDetails[brandId] || null
  );

  const { brandLoading, brandUpdateStatus } = useSelector(
    (state) => state.ecommerce
  );

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(true);

  // Separate state for each image type
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);

  // Track existing images from server
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [existingIcon, setExistingIcon] = useState(null);
  const [existingHeader, setExistingHeader] = useState(null);

  const [initialValues, setInitialValues] = useState({
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
    discount: {
      discount_percent: 0,
      start_date: "",
      end_date: "",
      has_date_dependency: false,
      is_visible: false,
      hasDiscount: false,
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (brandId && isOpen) {
      dispatch(showBrand(brandId));
    }
  }, [brandId, isOpen]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
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
      discount: yup
        .object()
        .nullable()
        .shape({
          discount_percent: yup
            .number()
            .min(0, "حداقل مقدار تخفیف 0 میباشد")
            .max(100, "حداکثر مقدار تخفیف 100 میباشد"),

          start_date: yup
            .date()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .when("discount_percent", {
              is: (val) => val > 0,
              then: (schema) => schema.required("تاریخ شروع الزامی است"),
              otherwise: (schema) => schema.nullable(),
            }),

          end_date: yup
            .date()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .when("discount_percent", {
              is: (val) => val > 0,
              then: (schema) =>
                schema
                  .required("تاریخ پایان الزامی است")
                  .min(
                    yup.ref("start_date"),
                    "تاریخ پایان باید بعد از تاریخ شروع باشد"
                  ),
              otherwise: (schema) => schema.nullable(),
            }),

          has_date_dependency: yup.boolean(),
          is_visible: yup.boolean(),
          hasDiscount: yup.boolean(),
        }),
    }),
    onSubmit: async (values) => {
      const isMetaEmpty =
        !values.meta.meta_title &&
        !values.meta.meta_description &&
        (!values.meta.meta_keywords ||
          values.meta.meta_keywords.length === 0) &&
        !values.meta.canonical;

      const isDiscountMetaEmpty =
        +values.discount.discount_percent === 0 &&
        !values.discount.end_date &&
        !values.discount.start_date;

      try {
        const newSlug = formik.values.slug.replace(/\s+/g, "_");

        // Create FormData object
        const formData = new FormData();

        // Append text fields
        formData.append("id", brandId);
        formData.append("name", values.name);
        formData.append("slug", newSlug);
        formData.append("description", values.description);
        formData.append("is_active", values.is_active);
        formData.append("is_for_sale", values.is_for_sale);
        formData.append("display_order", Number(values.display_order));

        // Append new images if selected
        if (thumbnailImage) {
          formData.append("thumbnail", thumbnailImage);
        }

        if (iconImage) {
          formData.append("icon", iconImage);
        }

        if (headerImage) {
          formData.append("header_image", headerImage);
        }

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

        // Append discount data
        if (!isDiscountMetaEmpty) {
          formData.append(
            "discount[discount_percent]",
            emptyToNull(values.discount.discount_percent) || 0
          );
          formData.append(
            "discount[start_date]",
            emptyToNull(values.discount.start_date) || ""
          );
          formData.append(
            "discount[end_date]",
            emptyToNull(values.discount.end_date) || ""
          );
          formData.append(
            "discount[has_date_dependency]",
            emptyToNull(values.discount.has_date_dependency) || false
          );
          formData.append(
            "discount[is_visible]",
            emptyToNull(values.discount.is_visible) || false
          );
          formData.append(
            "discount[hasDiscount]",
            emptyToNull(values.discount.hasDiscount) || false
          );
        }

        dispatch(updateBrand({ id: brandId, formData }));
      } catch (error) {
        console.error("خطا در بروزرسانی برند:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "مشکلی در بروزرسانی برند وجود دارد";
        toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    if (brandUpdateStatus) {
      toggle();
      formik.resetForm();
      setThumbnailImage(null);
      setIconImage(null);
      setHeaderImage(null);
    }
  }, [brandUpdateStatus]);

  useEffect(() => {
    if (brandDetails && isOpen) {
      setInitialValues({
        name: brandDetails.name || "",
        slug: brandDetails.slug || "",
        description: brandDetails.description || "",
        is_active: brandDetails.is_active || false,
        is_for_sale: brandDetails.is_for_sale || false,
        display_order: brandDetails.display_order || 1,
        meta: brandDetails.meta || {
          meta_keywords: [],
          meta_description: "",
          meta_title: "",
          canonical: "",
        },
        discount: brandDetails.discount || {
          discount_percent: 0,
          start_date: "",
          end_date: "",
          has_date_dependency: false,
          is_visible: false,
          hasDiscount: false,
        },
      });

      // Set existing images
      if (brandDetails.images) {
        setExistingThumbnail(brandDetails.images.thumbnail || null);
        setExistingIcon(brandDetails.images.icon || null);
        setExistingHeader(brandDetails.images.header_image || null);
      }

      // Clear new uploaded images when opening modal with existing data
      setThumbnailImage(null);
      setIconImage(null);
      setHeaderImage(null);
    }
  }, [brandDetails, isOpen]);

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
      const file = files[0];
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      });

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
  const renderDropzone = (title, imageType, newImage, existingImage) => {
    // Determine which image to display: new upload or existing
    const displayImage =
      newImage ||
      (existingImage
        ? { preview: existingImage, name: "Existing Image" }
        : null);

    return (
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
              {displayImage && (
                <div className="mt-2 dz-preview">
                  <div className="border rounded">
                    <div className="d-flex flex-wrap gap-2 p-2">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm bg-light rounded p-2">
                          <ImageWithModal
                            className="img-fluid rounded d-block"
                            src={displayImage.preview}
                            alt={displayImage.name || "Image"}
                            onLoad={() => {
                              if (newImage) {
                                URL.revokeObjectURL(displayImage.preview);
                              }
                            }}
                            thumbnailSize="80"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="pt-1">
                          <h5 className="fs-md mb-1">
                            {newImage ? newImage.name : "تصویر موجود"}
                          </h5>
                          {newImage && (
                            <p className="fs-sm text-muted mb-0">
                              {newImage.formattedSize}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
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
  };

  return (
    <OptionalSizes center={true} size={"xl"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {brandLoading ? (
                  <div className="update-loading-wrapper d-flex flex-column">
                    <Spinner color="primary" size={"md"} />
                    <br />
                    <span>درحال بارگذاری اطلاعات ...</span>
                  </div>
                ) : (
                  <>
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
                              placeholder="نام دسته بندی"
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
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="slug">نام مستعار صفحه </Label>
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
                              invalid={
                                formik.touched.slug && formik.errors.slug
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.slug && formik.touched.slug ? (
                              <FormFeedback type="invalid">
                                {formik.errors.slug}
                              </FormFeedback>
                            ) : null}
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
                              type="text"
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
                        <Col
                          sm="4"
                          className="d-flex align-items-end justify-content-center"
                        >
                          <div className="mb-3 form-check form-switch">
                            <Label htmlFor="is_active">وضعیت نمایش برند</Label>
                            &nbsp;
                            <Input
                              id="is_active"
                              name="is_active"
                              type="checkbox"
                              checked={formik.values.is_active}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "is_active",
                                  e.target.checked
                                )
                              }
                            />
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

                      <Row>
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
                            <FormFeedback>
                              {formik.errors.description}
                            </FormFeedback>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        {renderDropzone(
                          "تصویر  اصلی",
                          "thumbnail",
                          thumbnailImage,
                          existingThumbnail
                        )}
                        {renderDropzone(
                          "تصویر آیکون",
                          "icon",
                          iconImage,
                          existingIcon
                        )}
                        {renderDropzone(
                          "تصویر بنر",
                          "header_image",
                          headerImage,
                          existingHeader
                        )}
                      </Row>

                      <Discount formik={formik} />
                      <Meta formik={formik} />

                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          type="submit"
                          color="primary"
                          disabled={formik.isSubmitting}
                        >
                          {brandLoading && <div className="loader me-2" />}
                          <span className="d-flex align-items-center justify-content-center">
                            {brandLoading ? "درحال بروز رسانی" : "بروز رسانی"}
                          </span>
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

export default UpdateBrandModal;
