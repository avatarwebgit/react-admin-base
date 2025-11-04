import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
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
import {
  getAllCategories,
  getCategories,
  getCategory,
  getMeasurements,
  updateCategory,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import Discount from "../Discount";
import Meta from "../Meta";
import { generateSlug, groupItemsByKey } from "../../../utils/helperFunctions";
import { formatGroupLabel, persianStyles } from "../../../utils/selectFormat";
import { Editor } from "@tinymce/tinymce-react";
import { editorInit } from "../../../utils/tinyEditorInit";

const UpdateCategoryModal = ({ categoryId, isOpen, toggle }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(true);
  const [groupedCategoryOptions, setGroupedCategoryOptions] = useState([]);

  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);

  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [existingIcon, setExistingIcon] = useState(null);
  const [existingHeader, setExistingHeader] = useState(null);

  const categoryDetails = useSelector(
    (state) => state.ecommerce.categoryDetails[categoryId]
  );
  const allCategories = useSelector(
    (state) => state.ecommerce.allCategories.items
  );
  const measurements = useSelector(
    (state) => state.ecommerce.measurements.items
  );
  const { categoryUpdateStatus, categoryLoading, singleCategoryLoading } =
    useSelector((state) => state.ecommerce);

  const { AllCategoryLoading } = useSelector((state) => state.ecommerce);

  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    name: "",
    slug: "",
    is_active: false,
    productdesc: "",
    parent_ids: [],
    unit_id: null,
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

  useEffect(() => {
    if (allCategories) {
      setCategoryOptions(
        allCategories
          .filter((cat) => cat.id !== categoryId)
          .map((category) => ({
            value: category.id,
            label: category.name,
          }))
      );
    }
    if (measurements) {
      setUnitOptions(
        measurements.map((unit) => ({
          value: unit.id,
          label: unit.name,
        }))
      );
    }
  }, [allCategories, categoryId, measurements]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام دسته بندی را وارد کنید"),
      slug: yup.string(),
      is_active: yup.boolean(),
      productdesc: yup.string(),
      label_id: yup.number().nullable(),
      parent_ids: yup.array().of(yup.number()).nullable(),
      brand_id: yup.number().nullable(),
      unit_id: yup.number().nullable(),
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

        const formData = new FormData();

        formData.append("id", categoryId);
        formData.append("name", values.name);
        formData.append("slug", newSlug);
        formData.append("description", values.productdesc);
        formData.append("is_active", values.is_active ? 1 : 0);
        formData.append("display_order", Number(values.display_order));

        if (values.unit_id) {
          formData.append("unit_id", values.unit_id);
        }

        values.parent_ids.forEach((id) => {
          formData.append("parent_ids[]", Number(id));
        });

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
            values.discount.discount_percent
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

        dispatch(updateCategory({ id: categoryId, formData }));
      } catch (error) {
        console.error("خطا در بروزرسانی دسته‌بندی:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "مشکلی در بروزرسانی دسته‌بندی وجود دارد";
        toast.error(errorMessage);
      }
    },
  });

  const handleGroupClick = (group) => {
    const parentId = group.value;
    if (parentId === null) return; // "دسته‌بندی اصلی" group, not selectable

    const currentParentIds = formik.values.parent_ids || [];

    if (currentParentIds.includes(parentId)) {
      formik.setFieldValue(
        "parent_ids",
        currentParentIds.filter((id) => id !== parentId)
      );
    } else {
      formik.setFieldValue("parent_ids", [...currentParentIds, parentId]);
    }
  };

  useEffect(() => {
    if (categoryDetails && isOpen) {
      setInitialValues({
        name: categoryDetails.name || "",
        slug: categoryDetails.slug || "",
        is_active: categoryDetails.is_active || false,
        productdesc: categoryDetails.description || "",
        parent_ids: categoryDetails.parents?.map((p) => p.id) || [],
        unit_id: categoryDetails.unit?.id || null,
        display_order: categoryDetails.display_order || 0,
        meta: categoryDetails.meta || {
          meta_keywords: [],
          meta_description: "",
          meta_title: "",
          canonical: "",
        },
        discount: categoryDetails.discount || {
          discount_percent: 0,
          start_date: "",
          end_date: "",
          has_date_dependency: false,
          is_visible: false,
          hasDiscount: false,
        },
      });

      // Set existing images
      if (categoryDetails.images) {
        setExistingThumbnail(categoryDetails.images.thumbnail || null);
        setExistingIcon(categoryDetails.images.icon || null);
        setExistingHeader(categoryDetails.images.header_image || null);
      }

      // Clear new uploaded images when opening modal
      setThumbnailImage(null);
      setIconImage(null);
      setHeaderImage(null);
    }
  }, [categoryDetails, isOpen]);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

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
            <ul className="list-unstyled mb-0" id="file-previews">
              {displayImage && (
                <li className="mt-2 dz-image-preview">
                  <div className="border rounded">
                    <div className="d-flex flex-wrap gap-2 p-2">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm bg-light rounded p-2">
                          <img
                            data-dz-thumbnail=""
                            className="img-fluid rounded d-block"
                            src={displayImage.preview}
                            alt={displayImage.name || "Image"}
                            onLoad={() => {
                              if (newImage) {
                                URL.revokeObjectURL(displayImage.preview);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="pt-1">
                          <h5 className="fs-md mb-1" data-dz-name>
                            {newImage ? newImage.name : "تصویر موجود"}
                          </h5>
                          {newImage && (
                            <p className="fs-sm text-muted mb-0">
                              {newImage.formattedSize}
                            </p>
                          )}
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
                </li>
              )}
            </ul>
          </Form>
        </CardBody>
      </Col>
    );
  };

  useEffect(() => {
    if (isOpen && categoryId) {
      dispatch(getAllCategories({ page: 1, per_page: 100 }));
      dispatch(getMeasurements());
    }

    if (allCategories) {
      setCategoryOptions(
        allCategories.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (categoryId && isOpen) {
      dispatch(getCategory(categoryId));
    }
  }, [categoryId, isOpen]);

  useEffect(() => {
    if (categoryUpdateStatus) {
      toggle();
      formik.resetForm();
      setThumbnailImage(null);
      setIconImage(null);
      setHeaderImage(null);
    }
  }, [categoryUpdateStatus]);

  useEffect(() => {
    if (allCategories.length > 0) {
      const grouped = groupItemsByKey(
        allCategories.filter((cat) => cat.id !== categoryId),
        "parent.name"
      );
      setGroupedCategoryOptions(grouped);
    }
  }, [allCategories, categoryId]);

  return (
    <OptionalSizes
      center={true}
      size={"xl"}
      isOpen={isOpen}
      toggle={toggle}
      title={"اطلاعات دسته بندی"}
    >
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {singleCategoryLoading ? (
                  <div className="update-loading-wrapper d-flex flex-column">
                    <Spinner color="primary" size={"md"} />
                    <br />
                    <span>درحال بارگذاری اطلاعات ...</span>
                  </div>
                ) : (
                  <>
                    <Form onSubmit={formik.handleSubmit} autoComplete="off">
                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="name">نام دسته‌بندی</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="نام دسته بندی"
                              value={formik.values?.name}
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
                            <Label htmlFor="slug">نام مستعار صفحه</Label>
                            <Input
                              id="slug"
                              name="slug"
                              type="text"
                              placeholder="نام مستعار صفحه"
                              value={formik.values?.slug}
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
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="unit_id">واحد فروش</Label>
                            <Select
                              id="unit_id"
                              name="unit_id"
                              classNamePrefix="select2-selection"
                              placeholder="انتخاب ..."
                              options={unitOptions}
                              value={unitOptions.find(
                                (option) =>
                                  option.value === formik.values.unit_id
                              )}
                              onChange={(selectedOption) =>
                                formik.setFieldValue(
                                  "unit_id",
                                  selectedOption ? selectedOption.value : null
                                )
                              }
                              isClearable
                            />
                            {formik.errors.unit_id &&
                              formik.touched.unit_id && (
                                <FormFeedback type="invalid">
                                  {formik.errors.unit_id}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="parent_ids">دسته بندی والد</Label>
                            <Select
                              classNamePrefix="select2-selection"
                              name="parent_ids"
                              placeholder="انتخاب ..."
                              options={groupedCategoryOptions}
                              styles={persianStyles}
                              formatGroupLabel={(group) =>
                                formatGroupLabel(
                                  group,
                                  handleGroupClick,
                                  formik.values.parent_ids
                                )
                              }
                              isLoading={AllCategoryLoading}
                              isMulti
                              value={
                                formik.values.parent_ids?.length
                                  ? formik.values.parent_ids
                                      .map((categoryId) => {
                                        // Search in child options first
                                        for (const group of groupedCategoryOptions) {
                                          const foundOption =
                                            group.options.find(
                                              (opt) => opt.value === categoryId
                                            );
                                          if (foundOption) return foundOption;
                                        }
                                        // If not found, check if it's a parent (group value)
                                        const parentGroup =
                                          groupedCategoryOptions.find(
                                            (group) =>
                                              group.value === categoryId
                                          );
                                        if (parentGroup) {
                                          return {
                                            value: parentGroup.value,
                                            label: parentGroup.label,
                                          };
                                        }
                                        return null;
                                      })
                                      .filter(Boolean)
                                  : []
                              }
                              onChange={(selectedOptions) =>
                                formik.setFieldValue(
                                  "parent_ids",
                                  selectedOptions
                                    ? selectedOptions.map(
                                        (option) => option.value
                                      )
                                    : []
                                )
                              }
                              className={`react-select ${
                                formik.touched.parent_ids &&
                                formik.errors.parent_ids
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />

                            {formik.errors.parent_ids &&
                            formik.touched.parent_ids ? (
                              <FormFeedback type="invalid">
                                {formik.errors.parent_ids}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="6">
                          <div className="mb-3 form-check form-switch">
                            <Label htmlFor="is-active">
                              وضعیت نمایش دسته بندی
                            </Label>
                            &nbsp;
                            <Input
                              id="is_active"
                              name="is_active"
                              type="checkbox"
                              checked={formik.values?.is_active}
                              onClick={(e) => {
                                formik.setFieldValue(
                                  "is_active",
                                  !e.target.checked
                                );
                              }}
                            />
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="display_order">اولویت نمایش </Label>
                            <Input
                              id="display_order"
                              name="display_order"
                              type="text"
                              placeholder="واحد فروش "
                              value={formik.values?.display_order}
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
                          <div className="mb-3">
                            <Label htmlFor="productdesc">
                              توضیحات دسته بندی
                            </Label>
                            <Editor
                              tag="textarea"
                              className="mb-3"
                              id="productdesc"
                              name="productdesc"
                              rows={5}
                              value={formik.values.productdesc}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.productdesc &&
                                formik.errors.productdesc
                                  ? true
                                  : false
                              }
                              apiKey={import.meta.env.VITE_APP_TINY_API_KEY}
                              init={editorInit}
                            />
                            {formik.errors.productdesc &&
                            formik.touched.productdesc ? (
                              <FormFeedback type="invalid">
                                {formik.errors.productdesc}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        {renderDropzone(
                          "تصویر دسته بندی",
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
                          {categoryLoading && <div className="loader me-2" />}
                          <span className="d-flex align-items-center justify-content-center ">
                            {categoryLoading
                              ? "درحال بروز رسانی"
                              : "بروز رسانی "}
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

export default UpdateCategoryModal;
