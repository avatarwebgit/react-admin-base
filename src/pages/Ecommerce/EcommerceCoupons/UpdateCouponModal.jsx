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
  showCoupon,
  updateCoupon,
  getUsers,
  getCategories,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import JalaliDatePicker from "../../../components/Common/JalaliDatePicker";

const mapToOptions = (items) => {
  if (!items) return [];
  return items.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};

const provinceOptions = [
  { value: 1, label: "اردبيل" },
  { value: 2, label: "اصفهان" },
  { value: 3, label: "ايلام" },
  { value: 4, label: "آذربايجان شرقی" },
  { value: 5, label: "آذربايجان غربی" },
  { value: 6, label: "بوشهر" },
  { value: 7, label: "چهارمحال و بختياری" },
  { value: 8, label: "خراسان جنوبی" },
  { value: 9, label: "خراسان رضوی" },
  { value: 10, label: "خراسان شمالی" },
  { value: 11, label: "خوزستان" },
  { value: 12, label: "زنجان" },
  { value: 13, label: "سمنان" },
  { value: 14, label: "سيستان و بلوچستان" },
  { value: 15, label: "فارس" },
  { value: 16, label: "قزوين" },
  { value: 17, label: "قم" },
  { value: 18, label: "كردستان" },
  { value: 19, label: "كرمان" },
  { value: 20, label: "كرمانشاه" },
  { value: 21, label: "كهگيلويه و بويراحمد" },
  { value: 22, label: "گلستان" },
  { value: 23, label: "گيلان" },
  { value: 24, label: "لرستان" },
  { value: 25, label: "مازندران" },
  { value: 26, label: "مركزی" },
  { value: 27, label: "هرمزگان" },
  { value: 28, label: "همدان" },
  { value: 29, label: "يزد" },
  { value: 30, label: "البرز" },
  { value: 31, label: "تهران" },
];

const UpdateCouponModal = ({ couponId, isOpen, toggle }) => {
  const dispatch = useDispatch();

  const { couponDetails, users, loading, categories } = useSelector(
    (state) => ({
      couponDetails: state.ecommerce.couponDetails[couponId],
      users: state.ecommerce.users.items,
      loading: state.ecommerce.loading,
      categories: state.ecommerce.categories.items,
    })
  );

  const [userOptions, setUserOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    code: "",
    discount_percent: "",
    start_date: "",
    end_date: "",
    is_active: false,
    user_ids: [],
    usage_limit: "",
    usage_per_user: "",
    min_price: "",
    max_price: "",
    category_ids: [],
    city_ids: [],
  });

  const formatYMDHM = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return "";
    const pad2 = (n) => String(n).padStart(2, "0");
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes();
    return `${y}-${pad2(m)}-${pad2(d)} ${pad2(h)}:${pad2(min)}`;
  };

  useEffect(() => {
    if (isOpen) {
      if (couponId && !couponDetails) {
        dispatch(showCoupon(couponId));
      }
      dispatch(getUsers());
      dispatch(getCategories());
    }
  }, [isOpen, couponId, dispatch]);

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

  useEffect(() => {
    if (couponDetails) {
      const assignedUsers =
        couponDetails.users?.map((user) => ({
          value: user.id,
          label:
            user.full_name ||
            `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        })) || [];
      const assignedCategories =
        couponDetails.categories?.map((cat) => ({
          value: cat.id,
          label: cat.name,
        })) || [];
      const assignedCities =
        couponDetails.cities?.map((city) => ({
          value: city.id,
          label: city.name,
        })) || [];

      const startDate = couponDetails.start_date
        ? new Date(couponDetails.start_date)
        : null;
      const expirationDate = couponDetails.end_date || couponDetails.expires_at;
      const endDate = expirationDate ? new Date(expirationDate) : null;

      setInitialValues({
        name: couponDetails.name || "",
        code: couponDetails.code || "",
        discount_percent: couponDetails.discount_percent || "",
        start_date: startDate ? formatYMDHM(startDate) : "",
        end_date: endDate ? formatYMDHM(endDate) : "",
        is_active: couponDetails.is_active || false,
        user_ids: assignedUsers,
        usage_limit: couponDetails.usage_limit || "",
        usage_per_user: couponDetails.usage_per_user || "",
        min_price: couponDetails.min_price || "",
        max_price: couponDetails.max_price || "",
        category_ids: assignedCategories,
        city_ids: assignedCities,
      });
    }
  }, [couponDetails]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام کوپن را وارد کنید"),
      code: yup.string().required("لطفا کد کوپن را وارد کنید"),
      discount_percent: yup.number().required("لطفا درصد تخفیف را وارد کنید"),
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
      user_ids: yup.array().of(yup.object()),
      is_active: yup.boolean(),
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
    onSubmit: async (values) => {
      try {
        const payload = {
          id: couponId,
          ...values,
          user_ids: values.user_ids.map((u) => u.value),
          category_ids: values.category_ids.map((c) => c.value),
          city_ids: values.city_ids.map((c) => c.value),
          usage_limit: values.usage_limit || null,
          usage_per_user: values.usage_per_user || null,
          min_price: values.min_price || null,
          max_price: values.max_price || null,
          is_active: values.is_active || false,
        };
        dispatch(updateCoupon(payload));
        toggle();
      } catch (error) {
        console.error("Error updating coupon:", error);
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
                <CardTitle tag="h4">ویرایش کوپن</CardTitle>
                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="name">نام کوپن</Label>
                        <Input
                          id="name"
                          name="name"
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
                          id="is_active_update"
                          name="is_active"
                          className="form-check-input"
                          checked={formik.values.is_active || false}
                          onChange={(e) =>
                            formik.setFieldValue("is_active", e.target.checked)
                          }
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="is_active_update"
                          check
                        >
                          فعال
                        </Label>
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex flex-wrap gap-2">
                    <Button type="submit" color="primary">
                      ذخیره تغییرات
                    </Button>
                    <Button color="secondary" onClick={toggle}>
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

export default UpdateCouponModal;
