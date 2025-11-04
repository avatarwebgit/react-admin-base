import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { DeleteIcon, EditIcon } from "../../../components/Common/icons";
import { openDeleteModal } from "../../../store/actions";
import { showBrand, updateBrand } from "../../../store/e-commerce/actions";
import { DELETE_BRAND } from "../../../store/e-commerce/actionTypes";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import Meta from "../Meta";
import Discount from "../Discount";
import { emptyToNull } from "../../../helpers/helperFunctions";

const Brand = ({ data, index, isEditing, brandId }) => {
  const [createUnitModalOpen, setCreateUnitModalOpen] = useState(false);
  const [iconFiles, seticonFiles] = useState([]);
  const [bannerFiles, setbannerFiles] = useState([]);

  const [initialValues, setInitialValues] = useState();

  const dispatch = useDispatch();

  const handleProceedUpdate = () => {
    isEditing(true);
    brandId(data.id);
  };

  const formik = useFormik({
    initialValues: {
      name: data.name || "",
      slug: data.slug || "",
      description: data.description || "",
      is_active: data.is_active || false,
      is_for_sale: data.is_for_sale || false,
      display_order: data.display_order || 1,
      meta: {
        meta_keywords: data.meta_keywords || [],
        meta_description: data.meta_description || "",
        meta_title: data.meta_title || "",
        canonical: data.canonical || "",
      },
      discount: data.discount || {
        discount_percent: 0,
        start_date: "",
        end_date: "",
        has_day_dependency: true,
        is_visiable: true,
        hasDiscount: false,
      },
    },
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
            .min(1, "حدااقل مقدار تخفیف 1 میباشد")
            .max(100, "حداکثر مقدار تخفیف 100 میباشد"),
        }),
      start_date: yup.date(),
      end_date: yup.date(),
      has_day_dependency: yup.boolean(),
      is_visiable: yup.boolean(),
      hasDiscount: yup.boolean(),
    }),
    onSubmit: async (values) => {
      const isMetaEmpty =
        !values.meta.meta_title &&
        !values.meta.meta_description &&
        (!values.meta.meta_keywords ||
          values.meta.meta_keywords.length === 0) &&
        !values.meta.canonical;

      const isDiscountMetaEmpty =
        !values.discount.discount_percent &&
        !values.discount.end_date &&
        (!values.discount.hasDiscount ||
          values.discount.has_day_dependency === 0) &&
        !values.discount.is_visiable;
      !values.discount.start_date;
      try {
        const payload = {
          id: data.id,
          name: values.name,
          slug: values.slug,
          description: values.description,
          is_active: values.is_active,
          is_for_sale: values.is_for_sale,
          display_order: values.display_order,
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
                has_day_dependency: emptyToNull(
                  values.discount.has_day_dependency
                ),
                is_visiable: emptyToNull(values.discount.is_visiable),
                hasDiscount: emptyToNull(values.discount.hasDiscount),
              },
        };

        dispatch(updateBrand(payload));

        setCreateUnitModalOpen(false);
        formik.resetForm();
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

  const toggle = () => setCreateUnitModalOpen(!createUnitModalOpen);

  useEffect(() => {
    if (createUnitModalOpen) {
      dispatch(showBrand(data.id));
    }
  }, [createUnitModalOpen]);

  const handleDeleteBrand = () => {
    dispatch(
      openDeleteModal({
        message: `آیا از پاک کردن برند  " ${data.name} " اطمینان دارید؟`,
        actionType: DELETE_BRAND,
        id: data.id,
        title: "حذف برند",
      })
    );
  };

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleAcceptedFiles(files, type) {
    const formattedFiles = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    if (type === "icon") {
      seticonFiles(formattedFiles);
    } else if (type === "banner") {
      setbannerFiles(formattedFiles);
    }
  }

  return (
    data && (
      <tr>
        <td className="text-nowrap" scope="row">
          {index}
        </td>
        <td>{data.name}</td>
        <td>
          <img />
        </td>
        <td>
          <img />
        </td>
        <td colSpan="1">
          <Row>
            <Col sm="12">
              <Row className="d-flex align-items-center justify-content-center">
                <Col sm="4">
                  <button
                    onClick={handleProceedUpdate}
                    id="edit-btn"
                    style={{ background: "transparent", border: "none" }}
                  >
                    {EditIcon}
                  </button>
                </Col>
                <Col sm="4">
                  <button
                    onClick={handleDeleteBrand}
                    style={{ background: "transparent", border: "none" }}
                  >
                    {DeleteIcon}
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </td>
        <OptionalSizes
          center={true}
          size={"xl"}
          isOpen={createUnitModalOpen}
          toggle={toggle}
        >
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
                              placeholder="نام دسته بندی"
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
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="name">نام مستعار صفحه </Label>
                            <Input
                              id="name"
                              name="slug"
                              type="text"
                              placeholder="نام مستعار صفحه برند"
                              value={formik.values.slug}
                              onChange={formik.handleChange}
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
                            <Label htmlFor="name">اولویت</Label>
                            <Input
                              id="name"
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
                          <div className="mb-3  form-check form-switch">
                            <Label htmlFor="is_active">فعال</Label>
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
                            {formik.errors.price && formik.touched.price ? (
                              <FormFeedback type="invalid">
                                {formik.errors.price}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Discount formik={formik} />

                      <Meta formik={formik} />
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          type="submit"
                          color="primary"
                          disabled={formik.isSubmitting}
                        >
                          ذخیره تغییرات
                        </Button>
                        <Button
                          type="button"
                          color="secondary"
                          onClick={() => setCreateUnitModalOpen(false)}
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
      </tr>
    )
  );
};

export default Brand;
