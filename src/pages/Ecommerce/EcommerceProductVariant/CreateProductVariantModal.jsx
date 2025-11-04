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
  Row,
} from "reactstrap";
import * as yup from "yup";
import {
  addProductVariant,
  createProductImages,
  getAttributes,
  showAttributeValue,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import SelectLoading from "../../../components/Common/SelectLoading";
import {
  formatPersianCurrency,
  parseCurrencyInput,
} from "../../../utils/helperFunctions";

const CreateProductVariantModal = ({
  isOpen,
  toggle,
  productId,
  product,
  allAttributes,
}) => {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const {
    productVariantCreated,
    productVariantLoading,
    GalleryImageCreated,
    currentCreatedVariant,
    attributeValueLoading,
  } = useSelector((state) => state.ecommerce);

  const attributeOptions = Object.entries(allAttributes || {}).map(
    ([id, attr]) => ({
      value: id,
      label: attr.name,
    })
  );

  const formik = useFormik({
    initialValues: {
      sku: "",
      price: "",
      stock: "",
      attribute_combination: [{ attribute_id: "", attribute_value_id: "" }],
      is_unlimited: false,
      available: true,
    },
    validationSchema: yup.object({
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
      attribute_combination: yup
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
    }),
    onSubmit: (values, { resetForm }) => {
      const attributesPayload = values.attribute_combination.reduce(
        (acc, item) => {
          acc[item.attribute_id] = [Number(item.attribute_value_id)];
          return acc;
        },
        {}
      );

      const payload = {
        product_id: productId,
        id: productId,
        sku: values.sku,
        price: +values.price,
        is_unlimited: values.is_unlimited,
        available: values.available,
        stock: values.is_unlimited ? 0 : Number(values.stock),
        attribute_values: attributesPayload,
      };

      dispatch(addProductVariant(payload));
    },
  });

  useEffect(() => {
    // Upload image after variant is created
    if (currentCreatedVariant && selectedFile && !GalleryImageCreated) {
      const formData = new FormData();
      formData.append("imageable_id", currentCreatedVariant.id);
      formData.append("imageable_type", "variant");
      formData.append(`images[0]`, selectedFile);

      dispatch(
        createProductImages({
          productId,
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
    }
  }, [
    currentCreatedVariant,
    dispatch,
    productId,
    selectedFile,
    GalleryImageCreated,
  ]);

  useEffect(() => {
    if (productVariantCreated) {
      toggle();
      formik.resetForm();
      setSelectedFile(null);
      setUploading(false);
      setUploadProgress(0);
    }
  }, [productVariantCreated, toggle]);

  useEffect(() => {
    setUploading(productVariantLoading);
  }, [productVariantLoading]);

  const getAvailableAttributeOptions = (currentIndex) => {
    const selectedAttributeIds = formik.values.attribute_combination
      .map((item, index) => (index !== currentIndex ? item.attribute_id : null))
      .filter(Boolean);
    return attributeOptions.filter(
      (opt) => !selectedAttributeIds.includes(opt.value)
    );
  };

  useEffect(() => {
    if (productVariantCreated) {
      toggle();
      formik.resetForm();
      setSelectedFile([]);
      setUploading(false);
    }
  }, [productVariantCreated]);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
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
    <OptionalSizes
      isOpen={isOpen}
      toggle={toggle}
      size="lg"
      center
      title={` >افزودن تنوع جدید برای ${product?.name}`}
    >
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
                    placeholder=" قیمت"
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
                    invalid={
                      formik.touched.price && formik.errors.price ? true : false
                    }
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
                      formik.touched.stock && formik.errors.stock ? true : false
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
                    وضعیت موجودی (
                    {formik.values.available ? "  موجود " : " ناموجود  "}){" "}
                  </Label>
                  &nbsp;
                  <Input
                    id="available"
                    name="available"
                    type="switch"
                    checked={formik.values.available}
                    onClick={(e) => {
                      console.log(e.target.checked);
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
                      formik.setFieldValue("is_unlimited", !e.target.checked);
                    }}
                  />
                  {formik.errors.is_unlimited && formik.touched.is_unlimited ? (
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
                    // checked={formik.values.is_active}
                    onChange={(e) =>
                      formik.setFieldValue("is_active", e.target.checked)
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
                    <div className="dz-message needsclick" {...getRootProps()}>
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
                          <img
                            className="img-fluid rounded d-block"
                            src={selectedFile.preview}
                            alt={selectedFile.name}
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="pt-1">
                          <h5 className="fs-md mb-1">{selectedFile.name}</h5>
                          <p className="fs-sm text-muted mb-0">
                            {selectedFile.formattedSize}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ms-3">
                        {selectedFile && (
                          <Button
                            color="danger"
                            size="sm"
                            onClick={removeFile}
                            className="mt-2"
                          >
                            حذف
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <hr />
            <h5>ویژگی‌های تنوع</h5>

            <FieldArray
              name="attribute_combination"
              render={(arrayHelpers) => (
                <div>
                  {formik.values.attribute_combination.map((item, index) => (
                    <Row key={index} className="mb-3 align-items-center">
                      <Col md={5}>
                        <FormGroup className="mb-0">
                          {index === 0 && <Label>ویژگی</Label>}
                          <Select
                            classNamePrefix="select2-selection"
                            placeholder="انتخاب ویژگی..."
                            onFocus={() => dispatch(getAttributes())}
                            noOptionsMessage={() => "موردی یافت نشد"}
                            options={getAvailableAttributeOptions(index)}
                            value={
                              attributeOptions.find(
                                (opt) => opt.value === item.attribute_id
                              ) || null
                            }
                            onChange={(option) => {
                              const attributeId = option ? option.value : "";
                              formik.setFieldValue(
                                `attribute_combination.${index}.attribute_id`,
                                attributeId
                              );
                              formik.setFieldValue(
                                `attribute_combination.${index}.attribute_value_id`,
                                ""
                              ); // Reset value

                              if (
                                attributeId &&
                                (!allAttributes[attributeId] ||
                                  !allAttributes[attributeId].values ||
                                  allAttributes[attributeId].values.length ===
                                    0)
                              ) {
                                dispatch(showAttributeValue(attributeId));
                              }
                            }}
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
                          />

                          {formik.touched.attribute_combination?.[index]
                            ?.attribute_id &&
                            formik.errors.attribute_combination?.[index]
                              ?.attribute_id && (
                              <div
                                className="text-danger mt-1"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {
                                  formik.errors.attribute_combination[index]
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
                            noOptionsMessage={() => "موردی یافت نشد"}
                            isLoading={attributeValueLoading}
                            loadingMessage={() => <SelectLoading />}
                            options={
                              allAttributes[item.attribute_id]?.values || []
                            }
                            getOptionValue={(option) => option.value}
                            value={
                              (
                                allAttributes[item.attribute_id]?.values || []
                              ).find(
                                (val) => val.value === item.attribute_value_id
                              ) || null
                            }
                            onChange={(option) =>
                              formik.setFieldValue(
                                `attribute_combination.${index}.attribute_value_id`,
                                option.value
                              )
                            }
                            isDisabled={!item.attribute_id}
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
                          />
                          {formik.touched.attribute_combination?.[index]
                            ?.attribute_value_id &&
                            formik.errors.attribute_combination?.[index]
                              ?.attribute_value_id && (
                              <div
                                className="text-danger mt-1"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {
                                  formik.errors.attribute_combination[index]
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
                            formik.values.attribute_combination.length <= 1
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

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button color="secondary" onClick={toggle}>
                انصراف
              </Button>
              <Button color="primary" className="d-flex" type="submit">
                {uploading && <div class="loader me-2"></div>}
                ذخیره تنوع
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </ModalBody>
    </OptionalSizes>
  );
};

export default CreateProductVariantModal;
