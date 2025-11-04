import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import ImageWithModal from "../../../components/Common/ImageWithModal";
import SelectLoading from "../../../components/Common/SelectLoading";
import { emptyToNull } from "../../../helpers/helperFunctions";
import {
  createProductImages,
  showAttributeValue,
  showProductVariant,
  updateProductVariant,
} from "../../../store/e-commerce/actions";
import {
  formatPersianCurrency,
  parseCurrencyInput,
} from "../../../utils/helperFunctions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import Discount from "../Discount";

const UpdateProductVariantModal = ({
  isOpen,
  toggle,
  variantId,
  productId,
  product,
  allAttributes,
}) => {
  const dispatch = useDispatch();

  const variantDetails = useSelector(
    (state) => state.ecommerce.productVariantDetails[variantId]
  );

  const {
    singleProductVariantLoading,
    productVariantUpdateStatus,
    attributeValueLoading,
    GalleryImageCreated,
  } = useSelector((state) => state.ecommerce);

  const [selectedFile, setSelectedFile] = useState(null);
  const [initialValues, setInitialValues] = useState({
    sku: "",
    price: "",
    stock: "",
    is_active: true,
    attribute_values: [{ attribute_id: "", attribute_value_id: "" }],
    discount: {
      discount_percent: 0,
      start_date: "",
      end_date: "",
      has_data_dependency: false,
      is_visible: false,
      hasDiscount: false,
      is_unlimited: false,
      available: true,
    },
  });

  useEffect(() => {
    if (isOpen && variantId) {
      dispatch(showProductVariant(variantId));
    }
  }, [isOpen, variantId, dispatch]);

  const attributeOptions = Object.entries(allAttributes || {}).map(
    ([id, attr]) => ({
      value: id,
      label: attr.name,
    })
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      sku: yup.string(),
      is_unlimited: yup.boolean(),
      is_active: yup.boolean(),
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
      price: yup
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
      attribute_values: yup
        .array()
        .of(
          yup.object().shape({
            attribute_id: yup.string().required("انتخاب ویژگی الزامی است"),
            attribute_value_id: yup
              .string()
              .required("انتخاب مقدار الزامی است"),
          })
        )
        .min(1, "حداقل یک ویژگی باید انتخاب شود"),
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
      const attributesPayload = values.attribute_values.reduce((acc, item) => {
        acc[item.attribute_id] = [Number(item.attribute_value_id)];
        return acc;
      }, {});

      const isDiscountMetaEmpty =
        +values.discount.discount_percent === 0 &&
        !values.discount.end_date &&
        !values.discount.start_date;

      try {
        const payload = {
          id: variantId,
          product_id: +productId,
          sku: values.sku,
          price: +values.price,
          is_active: values.is_active,
          is_unlimited: values.is_unlimited,
          stock: values.is_unlimited ? 0 : Number(values.stock),
          attribute_values: attributesPayload,
          discount: isDiscountMetaEmpty
            ? null
            : {
                discount_percent: emptyToNull(values.discount.discount_percent),
                start_date: emptyToNull(values.discount.start_date),
                end_date: emptyToNull(values.discount.end_date),
                has_data_dependency: emptyToNull(
                  values.discount.has_data_dependency
                ),
                is_visible: emptyToNull(values.discount.is_visible),
                hasDiscount: emptyToNull(values.discount.hasDiscount),
              },
        };

        await dispatch(updateProductVariant(payload));

        if (selectedFile && !selectedFile.isExisting) {
          const formData = new FormData();
          formData.append("imageable_id", variantId);
          formData.append("imageable_type", "variant");
          formData.append(`images[0]`, selectedFile);

          await dispatch(
            createProductImages({
              productId,
              formData,
              config: {
                onUploadProgress: (progressEvent) => {
                  const percent = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  // Optional: setUploadProgress(percent);
                },
              },
            })
          );
        }
      } catch (error) {
        console.error("خطا در بروزرسانی:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "مشکلی در بروزرسانی وجود دارد";
        toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    if (
      variantDetails &&
      allAttributes &&
      Object.keys(allAttributes).length > 0
    ) {
      let initialCombination = [{ attribute_id: "", attribute_value_id: "" }];

      // Handle images
      if (variantDetails.images && variantDetails.images.length > 0) {
        const mainImage =
          variantDetails.images.find((img) => img.is_main) ||
          variantDetails.images[0];
        setSelectedFile({
          preview: mainImage.url,
          name: "Current Image",
          isExisting: true,
        });
      }

      // Handle attributes
      if (variantDetails.attribute_values) {
        initialCombination = Object.entries(
          variantDetails.attribute_values
        ).map(([attrId, valIds]) => ({
          attribute_id: String(attrId),
          attribute_value_id: String(valIds[0]),
        }));

        // Load attribute values if needed
        initialCombination.forEach(({ attribute_id }) => {
          if (
            attribute_id &&
            (!allAttributes[attribute_id] ||
              !allAttributes[attribute_id].values ||
              allAttributes[attribute_id].values.length === 0)
          ) {
            dispatch(showAttributeValue(attribute_id));
          }
        });
      }

      // Derive available from stock and is_unlimited
      const isAvailable =
        variantDetails.is_unlimited === true || variantDetails.stock > 0;

      setInitialValues({
        sku: variantDetails.sku || "",
        price: Number(variantDetails.price) || 0,
        stock: Number(variantDetails.stock) || 0,
        is_unlimited: Boolean(variantDetails.is_unlimited),
        available: isAvailable, // Derived field
        is_active: variantDetails.is_active ?? true,
        attribute_values:
          initialCombination.length > 0
            ? initialCombination
            : [{ attribute_id: "", attribute_value_id: "" }],
        discount: variantDetails.discount || {
          discount_percent: 0,
          start_date: "",
          end_date: "",
          has_data_dependency: false,
          is_visible: false,
          hasDiscount: false,
        },
      });
    }
  }, [variantDetails, allAttributes, dispatch]);

  const getAvailableAttributeOptions = (currentIndex) => {
    const selectedAttributeIds = formik.values.attribute_values
      .map((item, index) => (index !== currentIndex ? item.attribute_id : null))
      .filter(Boolean);
    return attributeOptions.filter(
      (opt) => !selectedAttributeIds.includes(opt.value)
    );
  };

  useEffect(() => {
    if (productVariantUpdateStatus) {
      toggle();
      formik.resetForm();
    }
  }, [productVariantUpdateStatus]);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        isExisting: false,
      })
    );
    formik.setFieldValue("image", file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    formik.setFieldValue("image", null);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleAvailabilityChange = (isAvailable) => {
    formik.setFieldValue("available", isAvailable);

    if (!isAvailable) {
      formik.setFieldValue("is_unlimited", false);
      formik.setFieldValue("price", 0);
      formik.setFieldValue("stock", 0);
      formik.setFieldTouched("price", false);
      formik.setFieldTouched("stock", false);
    } else {
      if (!formik.values.is_unlimited) {
        formik.setFieldValue("stock", 1);
      }
    }
  };

  const handleStockChange = (e) => {
    const value = e.target.value;
    formik.handleChange(e);

    if (Number(value) === 0) {
      formik.setFieldValue("available", false);
    }
  };

  return (
    <OptionalSizes isOpen={isOpen} toggle={toggle} size="lg" center>
      {singleProductVariantLoading ? (
        <div className="update-loading-wrapper d-flex flex-column">
          <Spinner color="primary" size={"md"} />
          <br />
          <span>درحال بارگذاری اطلاعات ...</span>
        </div>
      ) : (
        <>
          <ModalHeader>ویرایش تنوع برای {product?.name}</ModalHeader>
          <ModalBody>
            <FormikProvider value={formik}>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="price">قیمت (تومان)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="text"
                        value={
                          formik.values.available
                            ? formatPersianCurrency(formik.values.price)
                            : "0"
                        }
                        onChange={(e) => {
                          const rawValue = parseCurrencyInput(e.target.value);
                          formik.setFieldValue(
                            "price",
                            rawValue ? Number(rawValue) : 0
                          );
                        }}
                        disabled={formik.values.available === false}
                        {...formik.getFieldProps("price")}
                        invalid={formik.touched.price && !!formik.errors.price}
                      />
                      <FormFeedback>{formik.errors.price}</FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="stock">موجودی</Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="text"
                        placeholder="موجودی محصول"
                        value={
                          formik.values.is_unlimited ? "∞" : formik.values.stock
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
                      <FormFeedback>{formik.errors.stock}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="sku">کد محصول (SKU)</Label>
                      <Input
                        id="sku"
                        name="sku"
                        type="text"
                        {...formik.getFieldProps("sku")}
                        invalid={formik.touched.sku && !!formik.errors.sku}
                      />
                      <FormFeedback>{formik.errors.sku}</FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <div className="mb-3 form-check form-switch">
                      <Label htmlFor="available">
                        {" "}
                        وضعیت موجودی (
                        {formik.values.available
                          ? "  موجود "
                          : " ناموجود  "}){" "}
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
                      {formik.errors.available && formik.touched.available ? (
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
                          if (e.target.checked) {
                            formik.setFieldValue("stock", 0);
                          }
                          formik.setFieldValue("available", true);
                          formik.setFieldValue(
                            "is_unlimited",
                            !e.target.checked
                          );
                        }}
                      />
                      {formik.errors.is_unlimited &&
                      formik.touched.is_unlimited ? (
                        <FormFeedback type="invalid">
                          {formik.errors.is_unlimited}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3 form-check form-switch">
                      <Label htmlFor="is_active">وضعیت نمایش تنوع</Label>
                      &nbsp;
                      <Input
                        id="is_active"
                        name="is_active"
                        type="switch"
                        checked={formik.values.is_active}
                        onChange={(e) =>
                          formik.setFieldValue("is_active", !e.target.checked)
                        }
                      />
                      {formik.errors.is_active && formik.touched.is_active ? (
                        <FormFeedback type="invalid">
                          {formik.errors.is_active}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <Label>تصویر پس زمینه دسکتاپ</Label>
                  <Dropzone onDrop={handleDrop} accept="image/*" maxFiles={1}>
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone">
                        <div
                          className="dz-message needsclick"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                          </div>
                          <h4 className="fs-6">
                            فایل را اینجا رها کنید یا برای آپلود کلیک کنید
                          </h4>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  {selectedFile && (
                    <div className="mt-2">
                      <div className="border rounded p-2">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm bg-light rounded p-1">
                              <ImageWithModal
                                thumbnailSize="50"
                                className="img-fluid rounded d-block"
                                src={selectedFile.preview}
                                alt={selectedFile.name || "Product Image"}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <div className="pt-1">
                              <h5 className="fs-md mb-1">
                                {selectedFile.isExisting
                                  ? "تصویر فعلی"
                                  : selectedFile.name}
                              </h5>
                              {!selectedFile.isExisting &&
                                selectedFile.size && (
                                  <p className="fs-sm text-muted mb-0">
                                    {formatBytes(selectedFile.size)}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="flex-shrink-0 ms-3">
                            <Button
                              color="danger"
                              size="sm"
                              onClick={removeFile}
                            >
                              حذف
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <hr />
                <h5>ویژگی‌های تنوع</h5>

                <FieldArray
                  name="attribute_values"
                  render={(arrayHelpers) => (
                    <div>
                      {console.log(formik)}
                      {formik.values.attribute_values.map((item, index) => (
                        <Row key={index} className="mb-3 align-items-center">
                          <Col md={5}>
                            <FormGroup className="mb-0">
                              {index === 0 && <Label>ویژگی</Label>}
                              <Select
                                classNamePrefix="select2-selection"
                                placeholder="انتخاب ویژگی..."
                                noOptionsMessage={() => "موردی یافت نشد"}
                                options={getAvailableAttributeOptions(index)}
                                styles={{
                                  menu: (base) => ({
                                    ...base,
                                    backgroundColor: "#fff",
                                    zIndex: 9999,
                                  }),
                                  menuList: (base) => ({
                                    ...base,
                                    backgroundColor: "#fff",
                                  }),
                                  option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused
                                      ? "#f8f9fa"
                                      : "#fff",
                                    color: "#000",
                                    cursor: "pointer",
                                  }),
                                }}
                                value={
                                  attributeOptions.find(
                                    (opt) => opt.value === item.attribute_id
                                  ) || null
                                }
                                onChange={(option) => {
                                  const attributeId = option
                                    ? option.value
                                    : "";
                                  formik.setFieldValue(
                                    `attribute_values.${index}.attribute_id`,
                                    attributeId
                                  );
                                  formik.setFieldValue(
                                    `attribute_values.${index}.attribute_value_id`,
                                    ""
                                  );

                                  if (
                                    attributeId &&
                                    (!allAttributes[attributeId] ||
                                      !allAttributes[attributeId].values ||
                                      allAttributes[attributeId].values
                                        .length === 0)
                                  ) {
                                    dispatch(showAttributeValue(attributeId));
                                  }
                                }}
                              />
                              {formik.touched.attribute_values?.[index]
                                ?.attribute_id &&
                                formik.errors.attribute_values?.[index]
                                  ?.attribute_id && (
                                  <div
                                    className="text-danger mt-1"
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {
                                      formik.errors.attribute_values[index]
                                        .attribute_id
                                    }
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                          <Col md={5}>
                            <FormGroup className="mb-0">
                              {index === 0 && <Label>مقدار</Label>}
                              <Select
                                classNamePrefix="select2-selection"
                                placeholder="انتخاب مقدار..."
                                options={
                                  allAttributes[item.attribute_id]?.values || []
                                }
                                noOptionsMessage={() => "موردی یافت نشد"}
                                getOptionValue={(option) =>
                                  String(option.value)
                                }
                                isLoading={attributeValueLoading}
                                loadingMessage={() => <SelectLoading />}
                                getOptionLabel={(option) => option.label}
                                styles={{
                                  menu: (base) => ({
                                    ...base,
                                    backgroundColor: "#fff",
                                    zIndex: 9999,
                                  }),
                                  menuList: (base) => ({
                                    ...base,
                                    backgroundColor: "#fff",
                                  }),
                                  option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused
                                      ? "#f8f9fa"
                                      : "#fff",
                                    color: "#000",
                                    cursor: "pointer",
                                  }),
                                }}
                                value={
                                  (
                                    allAttributes[item.attribute_id]?.values ||
                                    []
                                  ).find(
                                    (val) =>
                                      String(val.value) ===
                                      item.attribute_value_id
                                  ) || null
                                }
                                onChange={(option) =>
                                  formik.setFieldValue(
                                    `attribute_values.${index}.attribute_value_id`,
                                    option ? String(option.value) : ""
                                  )
                                }
                                isDisabled={!item.attribute_id}
                              />
                              {formik.touched.attribute_values?.[index]
                                ?.attribute_value_id &&
                                formik.errors.attribute_values?.[index]
                                  ?.attribute_value_id && (
                                  <div
                                    className="text-danger mt-1"
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {
                                      formik.errors.attribute_values[index]
                                        .attribute_value_id
                                    }
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                          <Col md={2}>
                            <Button
                              color="danger"
                              className={index !== 0 ? "" : "mt-4"}
                              onClick={() => arrayHelpers.remove(index)}
                              disabled={
                                formik.values.attribute_values.length <= 1
                              }
                            >
                              حذف
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button
                        type="button"
                        color="success"
                        onClick={() =>
                          arrayHelpers.push({
                            attribute_id: "",
                            attribute_value_id: "",
                          })
                        }
                      >
                        افزودن ویژگی
                      </Button>
                    </div>
                  )}
                />

                <hr />
                <h5>تخفیف این تنوع</h5>

                <Discount formik={formik} />

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button color="secondary" onClick={toggle}>
                    انصراف
                  </Button>
                  <Button color="primary" type="submit">
                    ذخیره تغییرات
                  </Button>
                </div>
              </Form>
            </FormikProvider>
          </ModalBody>
        </>
      )}
    </OptionalSizes>
  );
};

export default UpdateProductVariantModal;
