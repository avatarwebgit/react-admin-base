import { useEffect, useState } from "react";

import { useFormik } from "formik";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyToNull, mapToOptions } from "../../../helpers/helperFunctions";
import {
  getBrands,
  getCategories,
  getLabels,
  getMeasurements,
  getProduct,
  updateProduct,
} from "../../../store/e-commerce/actions";
import "../../../styles/categories.scss";
import {
  formatPersianCurrency,
  generateSlug,
  groupItemsByKey,
  parseCurrencyInput,
  roundPrice,
} from "../../../utils/helperFunctions";
import Discount from "../Discount";
import Meta from "../Meta";
import { Editor } from "@tinymce/tinymce-react";
import { formatGroupLabel, persianStyles } from "../../../utils/selectFormat";
import { editorInit } from "../../../utils/tinyEditorInit";

const ProductUpdateModal = ({ isOpen, toggle, productId }) => {
  const PAGE_META = "update-product";

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setbrandOptions] = useState([]);
  const [unitOptions, setunitOptions] = useState([]);
  const [labelOptions, setlabelOptions] = useState([]);
  const [selectedFiles, setselectedFiles] = useState([]);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(true);
  const [groupedCategoryOptions, setGroupedCategoryOptions] = useState([]);

  const categories = useSelector((state) => state.ecommerce.categories.items);
  const labels = useSelector((state) => state.ecommerce.labels.items);
  const brands = useSelector((state) => state.ecommerce.brands.items);
  const units = useSelector((state) => state.ecommerce.measurements.items);
  const {
    productUpdateStatus,
    singleProductLoading,
    liveEditingProduct,
    productLoading,
    brandLoading,
    unitLoading,
    labelLoading,
    categoryLoading,
  } = useSelector((state) => state.ecommerce);

  const productDetails = useSelector((state) =>
    productId != null ? state.ecommerce.productDetails[productId] : undefined
  );

  const { pagination } = useSelector((state) => state.ecommerce.products);

  const validationSchema = yup.object().shape({
    name: yup.string().required("لطفا نام محصول را وارد کنید"),
    slug: yup.string().required("لطفا اسلاگ را وارد کنید"),
    is_active: yup.boolean(),
    is_special_offer: yup.boolean(),
    sku: yup.string(),
    is_unlimited: yup.boolean(),
    available: yup.boolean(),
    stock: yup
      .number()
      .nullable()
      .when(["available", "is_unlimited"], {
        is: (available, is_unlimited) => available && !is_unlimited,
        then: (schema) =>
          schema
            .min(1, "موجودی باید بیشتر از 0 باشد")
            .max(10000, "حداکثر موجودی 10000 عدد است")
            .required("وارد کردن موجودی الزامیست"),
        otherwise: (schema) => schema.notRequired(),
      }),
    original_price: yup
      .number()
      .nullable()
      .when("available", {
        is: true,
        then: (schema) =>
          schema
            .min(1, "قیمت باید بیشتر از 0 باشد")
            .required("در صورتیکه محصول موجود باشد وارد کردن قیمت الزامیست"),
        otherwise: (schema) => schema.notRequired(),
      }),
    description: yup.string(),
    detailed_description: yup.string(),
    embed_code: yup.string(),
    product_accounting_code: yup.string(),
    category_ids: yup.array().of(yup.number()).nullable(),
    label_id: yup.number().nullable(),
    brand_id: yup.number().nullable(),
    unit_id: yup.number().nullable(),
    display_order: yup.number(),
    product_images: yup.array().nullable(),
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
  });

  const formik = useFormik({
    initialValues: {
      name: productDetails?.name || "",
      slug: productDetails?.slug || "",
      sku: productDetails?.sku || "",
      product_accounting_code: productDetails?.product_accounting_code || "",
      is_active: productDetails?.is_active || false,
      is_special_offer: productDetails?.is_special_offer || false,
      description: productDetails?.description || "",
      detailed_description: productDetails?.detailed_description || "",
      available: productDetails?.available ?? true,

      // FIX: Remove duplicates and ensure we have valid numbers
      category_ids: productDetails?.categories
        ? [...new Set(productDetails.categories.map((p) => Number(p.id)))]
        : [],

      brand_id: productDetails?.brand?.id
        ? Number(productDetails.brand.id)
        : null,

      label_id: productDetails?.label?.id
        ? Number(productDetails.label.id)
        : null,
      unit_id: productDetails?.unit?.id ? Number(productDetails.unit.id) : null,

      stock: productDetails?.stock || 1,
      original_price: roundPrice(productDetails?.original_price) || 0,
      display_order: productDetails?.display_order || 1,
      is_unlimited: productDetails?.is_unlimited || false,

      meta: {
        meta_keywords: productDetails?.meta?.meta_keywords || [],
        meta_description: productDetails?.meta?.meta_description || "",
        meta_title: productDetails?.meta?.meta_title || "",
        canonical: productDetails?.meta?.canonical || "",
      },

      discount: {
        discount_percent: productDetails?.discount?.discount_percent || 0,
        start_date: productDetails?.discount?.start_date || "",
        end_date: productDetails?.discount?.end_date || "",
        has_date_dependency:
          productDetails?.discount?.has_date_dependency || false,
        is_visible: productDetails?.discount?.is_visible || false,
        hasDiscount: productDetails?.discount?.hasDiscount || false,
      },
    },

    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const isMetaEmpty =
        !values.meta.meta_title &&
        !values.meta.meta_description &&
        (!values.meta.meta_keywords ||
          values.meta.meta_keywords.length === 0) &&
        !values.meta.canonical;

      const isDiscountMetaEmpty =
        Number(values.discount.discount_percent) === 0;

      try {
        const newSlug = formik.values.slug.replace(/\s+/g, "_");

        const payload = {
          page: pagination.current_page,
          id: productId,
          name: values.name,
          slug: newSlug,
          description: values.description,
          stock: values.is_unlimited ? 0 : Number(values.stock),
          category_ids:
            values.category_ids.length > 0
              ? values.category_ids.map(Number)
              : [],
          is_active: values.is_active,
          brand_id: values?.brand_id ? Number(values.brand_id) : null,
          label_id: values?.label_id ? Number(values.label_id) : null,
          unit_id: values?.unit_id ? Number(values.unit_id) : null,
          original_price: roundPrice(values.original_price),
          available: values.available,

          display_order: Number(values.display_order),
          meta: isMetaEmpty
            ? null
            : {
                meta_title: emptyToNull(values.meta.meta_title),
                meta_description: emptyToNull(values.meta.meta_description),
                meta_keywords: emptyToNull(values.meta.meta_keywords),
                canonical: emptyToNull(values.meta.canonical),
              },
          discount: isDiscountMetaEmpty
            ? null
            : {
                discount_percent: emptyToNull(values.discount.discount_percent),
                start_date: emptyToNull(values.discount.start_date),
                end_date: emptyToNull(values.discount.end_date),
                has_date_dependency: emptyToNull(
                  values.discount.has_date_dependency
                ),
                is_visible: emptyToNull(values.discount.is_visible),
                hasDiscount: emptyToNull(values.discount.hasDiscount),
              },
        };

        dispatch(updateProduct(payload));
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (productUpdateStatus) {
      toggle();
      formik.resetForm();
    }
  }, [productUpdateStatus]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleAcceptedFiles(files, type) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    // setSelectedFiles(files);
  }

  useEffect(() => {
    if (categories.length > 0) {
      const grouped = groupItemsByKey(categories, "parent.name");
      setGroupedCategoryOptions(grouped);
    }
  }, [categories]);

  useEffect(() => {
    if (categories) {
      setCategoryOptions(mapToOptions(categories));
    }
  }, [categories]);

  useEffect(() => {
    setlabelOptions(mapToOptions(labels));
  }, [labels]);

  useEffect(() => {
    setbrandOptions(mapToOptions(brands));
  }, [brands]);

  useEffect(() => {
    setunitOptions(mapToOptions(units));
  }, [units]);

  useEffect(() => {
    if (productId) {
      dispatch(getLabels({ meta: PAGE_META, per_page: 100, page: 1 }));
      dispatch(getBrands({ meta: PAGE_META, per_page: 100, page: 1 }));
      dispatch(getMeasurements({ meta: PAGE_META, per_page: 100, page: 1 }));
      dispatch(getCategories({ meta: PAGE_META, per_page: 100, page: 1 }));
    }
  }, [productId]);

  useEffect(() => {
    if (productId && isOpen) {
      dispatch(getProduct(productId));
    }
  }, [productId, isOpen]);

  const handleAvailabilityChange = (isAvailable) => {
    formik.setFieldValue("available", isAvailable);

    if (!isAvailable) {
      formik.setFieldValue("is_unlimited", false);
      formik.setFieldValue("original_price", 0);
      formik.setFieldValue("stock", 0);
      formik.setFieldTouched("original_price", false);
      formik.setFieldTouched("stock", false);
    } else {
      if (!formik.values.is_unlimited) {
        formik.setFieldValue("stock", 1);
      }
    }
  };

  return (
    <OptionalSizes
      center={true}
      size={"xl"}
      isOpen={isOpen}
      toggle={toggle}
      title={"اطلاعات محصول"}
    >
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {singleProductLoading ? (
                  <div className="update-loading-wrapper d-flex flex-column">
                    <Spinner color="primary" size={"md"} />
                    <br />
                    <span>درحال بارگذاری اطلاعات ...</span>
                  </div>
                ) : (
                  <>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="name">نام محصول</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="نام  محصول"
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
                            <Label htmlFor="slug"> نام مستعار صفحه </Label>
                            <Input
                              id="slug"
                              name="slug"
                              type="text"
                              placeholder="نام مستعار صفحه"
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
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="sku"> شناسه کالا</Label>
                            <Input
                              id="sku"
                              name="sku"
                              type="text"
                              placeholder=" شناسه کالا"
                              value={formik.values.sku}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.sku && formik.errors.sku
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.sku && formik.touched.sku ? (
                              <FormFeedback type="invalid">
                                {formik.errors.sku}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="product_accounting_code">
                              {" "}
                              کد حسابداری محصول
                            </Label>
                            <Input
                              id="product_accounting_code"
                              name="product_accounting_code"
                              type="text"
                              placeholder="  کد حسابداری محصول"
                              value={formik.values.product_accounting_code}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.product_accounting_code &&
                                formik.errors.product_accounting_code
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.product_accounting_code &&
                            formik.touched.product_accounting_code ? (
                              <FormFeedback type="invalid">
                                {formik.errors.product_accounting_code}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="category_ids">دسته بندی والد</Label>
                            <Select
                              classNamePrefix="select2-selection"
                              name="category_ids"
                              placeholder="انتخاب ..."
                              options={groupedCategoryOptions}
                              styles={persianStyles}
                              formatGroupLabel={formatGroupLabel}
                              isLoading={categoryLoading}
                              onFocus={() => dispatch(getCategories())}
                              loadingMessage={() => <SelectLoading />}
                              isMulti
                              value={
                                formik.values.category_ids?.length
                                  ? formik.values.category_ids
                                      .map((categoryId) => {
                                        for (const group of groupedCategoryOptions) {
                                          const foundOption =
                                            group.options.find(
                                              (opt) => opt.value === categoryId
                                            );
                                          if (foundOption) return foundOption;
                                        }
                                        return null;
                                      })
                                      .filter(Boolean)
                                  : []
                              }
                              onChange={(selectedOptions) =>
                                formik.setFieldValue(
                                  "category_ids",
                                  selectedOptions
                                    ? selectedOptions.map(
                                        (option) => option.value
                                      )
                                    : []
                                )
                              }
                              className={`react-select ${
                                formik.touched.category_ids &&
                                formik.errors.category_ids
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {formik.touched.category_ids &&
                              formik.errors.category_ids && (
                                <div className="text-danger mt-1">
                                  {formik.errors.category_ids}
                                </div>
                              )}
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="brand_id"> برند</Label>
                            <Select
                              isClearable
                              classNamePrefix="select2-selection"
                              name="brand_id"
                              placeholder="انتخاب ..."
                              options={brandOptions}
                              value={brandOptions.find(
                                (option) =>
                                  option.value === formik.values.brand_id
                              )}
                              onChange={(selectedOption) =>
                                formik.setFieldValue(
                                  "brand_id",
                                  selectedOption ? selectedOption.value : null
                                )
                              }
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="label_id"> لیبل</Label>
                            <Select
                              isClearable
                              classNamePrefix="select2-selection"
                              name="label_id"
                              placeholder="انتخاب ..."
                              options={labelOptions}
                              value={labelOptions.find(
                                (option) =>
                                  option.value === formik.values.label_id
                              )}
                              onChange={(selectedOption) =>
                                formik.setFieldValue(
                                  "label_id",
                                  selectedOption ? selectedOption.value : null
                                )
                              }
                            />
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="unit_id">واحد اندازی گیری</Label>
                            <Select
                              isClearable
                              classNamePrefix="select2-selection"
                              name="unit_id"
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
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="stock"> موجودی محصول</Label>
                            <Input
                              id="stock"
                              name="stock"
                              type="text"
                              placeholder="موجودی محصول"
                              value={
                                formik.values.is_unlimited
                                  ? "∞"
                                  : formik.values.stock
                              }
                              onChange={(e) => {
                                if (!formik.values.is_unlimited) {
                                  handleStockChange(e);
                                }
                              }}
                              disabled={
                                formik.values.available === false ||
                                formik.values.is_unlimited === true
                              }
                              invalid={
                                formik.touched.stock && formik.errors.stock
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.stock && formik.touched.stock ? (
                              <FormFeedback type="invalid">
                                {formik.errors.stock}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="original_price"> قیمت واحد </Label>
                            <Input
                              id="original_price"
                              name="original_price"
                              type="text"
                              placeholder=" قیمت"
                              disabled={formik.values.available === false}
                              value={
                                formik.values.available
                                  ? formatPersianCurrency(
                                      formik.values.original_price
                                    )
                                  : "0"
                              }
                              onChange={(e) => {
                                const rawValue = parseCurrencyInput(
                                  e.target.value
                                );
                                formik.setFieldValue(
                                  "original_price",
                                  rawValue ? Number(rawValue) : 0
                                );
                              }}
                              invalid={
                                formik.touched.original_price &&
                                formik.errors.original_price
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.original_price &&
                            formik.touched.original_price ? (
                              <FormFeedback type="invalid">
                                {formik.errors.original_price}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="6">
                          <div className="mb-3 form-check form-switch">
                            <Label htmlFor="available">
                              {" "}
                              وضعیت موجودی (
                              {formik.values.available
                                ? "  موجود "
                                : " ناموجود  "}
                              ){" "}
                            </Label>
                            &nbsp;
                            <Input
                              id="available"
                              name="available"
                              type="switch"
                              checked={formik.values.available}
                              onClick={(e) => {
                                handleAvailabilityChange(!e.target.checked);
                              }}
                            />
                            {formik.errors.available &&
                            formik.touched.available ? (
                              <FormFeedback type="invalid">
                                {formik.errors.available}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3 form-check form-switch">
                            <Label htmlFor="is_unlimited">موجودی نامحدود</Label>
                            &nbsp;
                            <Input
                              id="is_unlimited"
                              name="is_unlimited"
                              type="switch"
                              checked={formik.values.is_unlimited === true}
                              onClick={(e) => {
                                const newIsLimited = !e.target.checked;
                                formik.setFieldValue("available", true);
                                formik.setFieldValue(
                                  "is_unlimited",
                                  newIsLimited
                                );

                                if (newIsLimited) {
                                  formik.setFieldValue("stock", 0);
                                } else {
                                  formik.setFieldValue("stock", 1);
                                }
                              }}
                            />
                            {formik.errors.is_unlimited &&
                            formik.touched.is_unlimited ? (
                              <FormFeedback type="invalid">
                                {formik.errors.is_unlimited}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3  form-check form-switch">
                            <Label htmlFor="is_active">وضعیت نمایش محصول</Label>
                            &nbsp;
                            <Input
                              id="is_active"
                              name="is_active"
                              type="checkbox"
                              checked={formik.values.is_active}
                              onClick={(e) => {
                                formik.setFieldValue(
                                  "is_active",
                                  !e.target.checked
                                );
                              }}
                            />
                            {formik.errors.is_active &&
                            formik.touched.is_active ? (
                              <FormFeedback type="invalid">
                                {formik.errors.is_active}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 form-check form-switch">
                            <Label htmlFor="is_special_offer">محصول ویژه</Label>
                            &nbsp;
                            <Input
                              id="is_special_offer"
                              name="is_special_offer"
                              type="switch"
                              // checked={formik.values.is_special_offer}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "is_special_offer",
                                  e.target.checked
                                )
                              }
                            />
                            {formik.errors.is_special_offer &&
                            formik.touched.is_special_offer ? (
                              <FormFeedback type="invalid">
                                {formik.errors.is_special_offer}
                              </FormFeedback>
                            ) : null}
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
                          <div className="mb-3">
                            <Label htmlFor="description"> توضیحات کوتاه</Label>
                            <Editor
                              tag="textarea"
                              className="mb-3"
                              id="description"
                              name="description"
                              rows={5}
                              apiKey={import.meta.env.VITE_APP_TINY_API_KEY}
                              init={editorInit}
                              placeholder="توضیحات  کوتاه"
                              value={formik.values.description}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.description &&
                                formik.errors.description
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.description &&
                            formik.touched.description ? (
                              <FormFeedback type="invalid">
                                {formik.errors.description}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm="12">
                          <div className="mb-3">
                            <Label htmlFor="detailed_description">
                              توضیحات تکمیلی
                            </Label>
                            <Editor
                              tag="textarea"
                              className="mb-3"
                              id="detailed_description"
                              name="detailed_description"
                              rows={5}
                              placeholder="  کد امبد"
                              value={formik.values.detailed_description}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.detailed_description &&
                                formik.errors.detailed_description
                                  ? true
                                  : false
                              }
                              apiKey={import.meta.env.VITE_APP_TINY_API_KEY}
                              init={editorInit}
                            />
                            {formik.errors.detailed_description &&
                            formik.touched.detailed_description ? (
                              <FormFeedback type="invalid">
                                {formik.errors.detailed_description}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12"></Col>
                      </Row>
                      <Card>
                        {/* <CardBody>
                          <CardTitle className="mb-3">
                            تصویر دسته بندی
                          </CardTitle>
                          <Dropzone
                            multiple={true}
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
                                    <h4>
                                      فایل ها را اینجا رها کنید یا برای آپلود
                                      کلیک کنید
                                    </h4>
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
                                            setselectedFiles(newImages);
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
                        </CardBody> */}
                        <Discount formik={formik} />
                        <Meta formik={formik} />
                      </Card>
                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <Button
                          type="submit"
                          color="primary"
                          disabled={formik.isSubmitting}
                        >
                          بروزرسانی محصول
                        </Button>
                        <Button
                          type="submit"
                          color="secondary"
                          onClick={toggle}
                        >
                          لغو
                        </Button>
                      </div>
                    </form>
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

export default ProductUpdateModal;
