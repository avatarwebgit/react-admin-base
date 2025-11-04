import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
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
  addCoupon,
  getUsers,
  getCategories,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import JalaliDatePicker from "../../../components/Common/JalaliDatePicker";


const CreateCouponModal = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();

  const [userOptions, setUserOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const { users, loading, categories, provinces, provincesLoading } = useSelector(
    (state) => ({
      users: state.ecommerce.users.items,
      loading: state.ecommerce.loading,
      categories: state.ecommerce.categories.items,
      provinces: state.ecommerce.provinces,
      provinces: state.ecommerce.provinces,
    })
  );

  useEffect(() => {
    if (isOpen) {
      dispatch(getUsers());
      dispatch(getCategories());
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (users) {
      const options = users.map((user) => ({
        value: user.id,
        label:
          user.full_name ||
          `${user.first_name || ""} ${user.last_name || ""}`.trim(),
      }));
      setUserOptions(options);
    }
  }, [users]);

  useEffect(() => {
    if (categories) {
      setCategoryOptions(mapToOptions(categories));
    }
  }, [categories]);

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      discount_percent: "",
      end_date: "",
      start_date: "",
      is_active: true,
      user_ids: [],
      usage_limit: "",
      usage_per_user: "",
      min_price: "",
      max_price: "",
      category_ids: [],
      city_ids: [],
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام کوپن را وارد کنید"),
      code: yup.string().required("لطفا کد کوپن را وارد کنید"),
      discount_percent: yup
        .number()
        .required("لطفا درصد تخفیف را وارد کنید")
        .min(1, "حداقل تخفیف 1% است")
        .max(100, "حداکثر تخفیف 100% است"),
      start_date: yup.string().required("لطفا تاریخ شروع را وارد کنید"),
      end_date: yup
        .string()
        .required("لطفا تاریخ انقضا را وارد کنید")
        .test(
          "is-after-start",
          "تاریخ انقضا باید بعد از تاریخ شروع باشد",
          function (value) {
            const { start_date } = this.parent;
            return (
              !start_date || !value || new Date(value) > new Date(start_date)
            );
          }
        ),
      is_active: yup.boolean(),
      user_ids: yup.array().of(yup.object()),
      usage_limit: yup.number().nullable().min(0, "مقدار باید مثبت باشد"),
      usage_per_user: yup.number().nullable().min(0, "مقدار باید مثبت باشد"),
      min_price: yup.number().nullable().min(0, "مقدار باید مثبت باشد"),
      max_price: yup
        .number()
        .nullable()
        .min(0, "مقدار باید مثبت باشد")
        .test(
          "is-greater",
          "مبلغ حداکثر باید بیشتر از حداقل باشد",
          function (value) {
            const { min_price } = this.parent;
            return !min_price || !value || value > min_price;
          }
        ),
      category_ids: yup.array().of(yup.object()),
      city_ids: yup.array().of(yup.object()),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          ...values,
          user_ids: values.user_ids.map((u) => u.value),
          category_ids: values.category_ids.map((c) => c.value),
          city_ids: values.city_ids.map((c) => c.value),
          usage_limit: values.usage_limit || null,
          usage_per_user: values.usage_per_user || null,
          min_price: values.min_price || null,
          max_price: values.max_price || null,
        };
        dispatch(addCoupon(payload));
        toggle();
        resetForm();
      } catch (error) {
        console.error("Error adding coupon:", error);
      }
    },
  });

  return (
    <OptionalSizes center={true} size={"xl"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">ایجاد کوپن جدید</CardTitle>
                <p className="card-title-desc mb-4">
                  تمام اطلاعات زیر را پر کنید
                </p>

                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="name">نام کوپن</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="مثال: تخفیف عید فطر"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          invalid={formik.touched.name && !!formik.errors.name}
                        />
                        <FormFeedback>{formik.errors.name}</FormFeedback>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="code">کد کوپن</Label>
                        <Input
                          id="code"
                          name="code"
                          type="text"
                          placeholder="کد تخفیف"
                          value={formik.values.code}
                          onChange={formik.handleChange}
                          invalid={formik.touched.code && !!formik.errors.code}
                        />
                        <FormFeedback>{formik.errors.code}</FormFeedback>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <div className="mb-3">
                        <Label htmlFor="discount_percent">درصد تخفیف</Label>
                        <Input
                          id="discount_percent"
                          name="discount_percent"
                          type="number"
                          placeholder="مثال: 15"
                          value={formik.values.discount_percent}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.discount_percent &&
                            !!formik.errors.discount_percent
                          }
                        />
                        <FormFeedback>
                          {formik.errors.discount_percent}
                        </FormFeedback>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="3">
                      <div className="mb-3">
                        <Label htmlFor="usage_limit">محدودیت استفاده کل</Label>
                        <Input
                          id="usage_limit"
                          name="usage_limit"
                          type="number"
                          placeholder="مثال: 100"
                          value={formik.values.usage_limit}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.usage_limit &&
                            !!formik.errors.usage_limit
                          }
                        />
                        <FormFeedback>{formik.errors.usage_limit}</FormFeedback>
                      </div>
                    </Col>
                    <Col sm="3">
                      <div className="mb-3">
                        <Label htmlFor="usage_per_user">
                          محدودیت برای هر کاربر
                        </Label>
                        <Input
                          id="usage_per_user"
                          name="usage_per_user"
                          type="number"
                          placeholder="مثال: 1"
                          value={formik.values.usage_per_user}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.usage_per_user &&
                            !!formik.errors.usage_per_user
                          }
                        />
                        <FormFeedback>
                          {formik.errors.usage_per_user}
                        </FormFeedback>
                      </div>
                    </Col>
                    <Col sm="3">
                      <div className="mb-3">
                        <Label htmlFor="min_price">
                          حداقل مبلغ خرید (تومان)
                        </Label>
                        <Input
                          id="min_price"
                          name="min_price"
                          type="number"
                          placeholder="مثال: 50000"
                          value={formik.values.min_price}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.min_price &&
                            !!formik.errors.min_price
                          }
                        />
                        <FormFeedback>{formik.errors.min_price}</FormFeedback>
                      </div>
                    </Col>
                    <Col sm="3">
                      <div className="mb-3">
                        <Label htmlFor="max_price">
                          حداکثر مبلغ تخفیف (تومان)
                        </Label>
                        <Input
                          id="max_price"
                          name="max_price"
                          type="number"
                          placeholder="مثال: 25000"
                          value={formik.values.max_price}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.max_price &&
                            !!formik.errors.max_price
                          }
                        />
                        <FormFeedback>{formik.errors.max_price}</FormFeedback>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <JalaliDatePicker
                        label="تاریخ شروع"
                        name="start_date"
                        value={formik.values.start_date}
                        setFieldValue={formik.setFieldValue}
                        touched={formik.touched.start_date}
                        error={formik.errors.start_date}
                      />
                    </Col>
                    <Col sm="6">
                      <JalaliDatePicker
                        label="تاریخ انقضا"
                        name="end_date"
                        value={formik.values.end_date}
                        setFieldValue={formik.setFieldValue}
                        touched={formik.touched.end_date}
                        error={formik.errors.end_date}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="category_ids">
                          اعمال روی دسته بندی ها (اختیاری)
                        </Label>
                        <Select
                          isMulti
                          name="category_ids"
                          options={categoryOptions}
                          classNamePrefix="select2-selection"
                          placeholder="انتخاب دسته بندی ها..."
                          value={formik.values.category_ids}
                          onChange={(selectedOptions) =>
                            formik.setFieldValue(
                              "category_ids",
                              selectedOptions || []
                            )
                          }
                          isLoading={loading}
                        />
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="city_ids">
                          اعمال روی شهرها (اختیاری)
                        </Label>
                        <Select
                          isMulti
                          name="city_ids"
                          options={provinceOptions}
                          classNamePrefix="select2-selection"
                          placeholder="انتخاب شهرها..."
                          value={formik.values.city_ids}
                          onChange={(selectedOptions) =>
                            formik.setFieldValue(
                              "city_ids",
                              selectedOptions || []
                            )
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <div className="mb-3">
                        <Label htmlFor="user_ids">
                          اختصاص به کاربران (اختیاری)
                        </Label>
                        <Select
                          isMulti
                          name="user_ids"
                          options={userOptions}
                          classNamePrefix="select2-selection"
                          placeholder="انتخاب کاربران..."
                          value={formik.values.user_ids}
                          onChange={(selectedOptions) =>
                            formik.setFieldValue(
                              "user_ids",
                              selectedOptions || []
                            )
                          }
                          isLoading={loading}
                        />
                        <small className="form-text text-muted">
                          اگر کاربری انتخاب نشود، کوپن برای همه کاربران معتبر
                          خواهد بود.
                        </small>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <div className="mb-3 form-check form-switch">
                        <Input
                          type="switch"
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
                    </Col>
                  </Row>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={formik.isSubmitting}
                    >
                      ایجاد کوپن
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

export default CreateCouponModal;
