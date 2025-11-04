import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as yup from "yup";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { getSettings, updateSettings } from "../../../store/e-commerce/actions";
import "../../../styles/categories.scss";
import IconPickerModal from "./IconPickerModal";
import SkeletonLoader from "../../../components/Common/SkeletonLoader";

const EcommerceSettings = () => {
  document.title = "تنظیمات فروشگاه";
  const { settings, loading } = useSelector((state) => state.ecommerce);
  const dispatch = useDispatch();

  const [iconModalOpen, setIconModalOpen] = useState(false);
  const [currentTargetPlatform, setCurrentTargetPlatform] = useState(null);

  const [initialValues, setInitialValues] = useState({
    site_name: "",
    home_page_title: "",
    copy_right: "",
    timezone_id: 1,
    primary_phone: "",
    secondary_phone: "",
    primary_email: "",
    secondary_email: "",
    main_address: "",
    secondary_address: "",
    working_hours: {
      saturday: { active: false, from: "", till: "" },
      sunday: { active: false, from: "", till: "" },
      monday: { active: false, from: "", till: "" },
      tuesday: { active: false, from: "", till: "" },
      wednesday: { active: false, from: "", till: "" },
      thursday: { active: false, from: "", till: "" },
      friday: { active: false, from: "", till: "" },
    },
    social_links: {
      instagram: { url: "", icon: "" },
      telegram: { url: "", icon: "" },
      twitter: { url: "", icon: "" },
      facebook: { url: "", icon: "" },
      linkedin: { url: "", icon: "" },
      youtube: { url: "", icon: "" },
    },
    tax_rate_is_active: false,
    tax_rate_type: "product",
    tax_rate_tax_percentage: 0,
  });
  const [groupedSettings, setGroupedSettings] = useState([]);

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      site_name: yup.string().required("نام سایت الزامی است"),
      home_page_title: yup.string().required("عنوان صفحه اصلی الزامی است"),
      copy_right: yup.string().required("متن کپی رایت الزامی است"),
      primary_phone: yup
        .string()
        .matches(/^[0-9+]+$/, "شماره تلفن فقط باید شامل اعداد و علامت + باشد")
        .required("تلفن اصلی الزامی است"),
      secondary_phone: yup
        .string()
        .matches(/^[0-9+]+$/, "شماره تلفن فقط باید شامل اعداد و علامت + باشد"),
      primary_email: yup
        .string()
        .email("ایمیل معتبر وارد کنید")
        .required("ایمیل اصلی الزامی است"),
      secondary_email: yup.string().email("ایمیل معتبر وارد کنید"),
      main_address: yup.string().required("آدرس اصلی الزامی است"),
      social_links: yup.object().shape({
        instagram: yup.object().shape({
          url: yup.string().url("آدرس اینترنتی نامعتبر است"),
        }),
        telegram: yup.object().shape({
          url: yup.string().url("آدرس اینترنتی نامعتبر است"),
        }),
        twitter: yup.object().shape({
          url: yup.string().url("آدرس اینترنتی نامعتبر است"),
        }),
        facebook: yup.object().shape({
          url: yup.string().url("آدرس اینترنتی نامعتبر است"),
        }),
        linkedin: yup.object().shape({
          url: yup.string().url("آدرس اینترنتی نامعتبر است"),
        }),
        youtube: yup.object().shape({
          url: yup.string().url("آدرس اینترنتی نامعتبر است"),
        }),
      }),
      tax_rate_tax_percentage: yup.number().when("tax_rate_is_active", {
        is: true,
        then: (schema) =>
          schema
            .required("درصد مالیات الزامی است")
            .min(0, "درصد مالیات نمی‌تواند منفی باشد")
            .max(100, "درصد مالیات نمی‌تواند بیشتر از 100 باشد"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {};

        settings.forEach((setting) => {
          if (setting.key === "working_hours") {
            payload.working_hours = Object.entries(values.working_hours).map(
              ([day, config]) => ({
                day,
                active: config.active,
                from: config.active ? config.from || null : null,
                till: config.active ? config.till || null : null,
              })
            );
          } else if (setting.key === "social_links") {
            const socialLinksTransformed = {};
            Object.entries(values.social_links).forEach(([platform, data]) => {
              if (data.url || data.icon) {
                socialLinksTransformed[platform] = {
                  url: data.url || null,
                  icon: data.icon || null,
                };
              }
            });
            payload.social_links = socialLinksTransformed;
          } else if (setting.key === "tax_rate") {
            payload.tax_rate = {
              type: values.tax_rate_type,
              tax_percentage: values.tax_rate_tax_percentage,
            };
          } else {
            if (values[setting.key] !== undefined) {
              payload[setting.key] = values[setting.key];
            }
          }
        });

        dispatch(updateSettings(payload));
      } catch (error) {
        console.error("خطا در ذخیره تنظیمات:", error);
      }
    },
    enableReinitialize: true,
  });

  const toggleIconModal = () => setIconModalOpen(!iconModalOpen);

  const handleOpenIconModal = (platformId) => {
    setCurrentTargetPlatform(platformId);
    toggleIconModal();
  };

  const handleIconSelect = (iconClass) => {
    if (currentTargetPlatform) {
      formik.setFieldValue(
        `social_links.${currentTargetPlatform}.icon`,
        iconClass
      );
    }
  };

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings && settings.length > 0) {
      setInitialValues((currentValues) => {
        const newValues = { ...currentValues };

        settings.forEach((setting) => {
          if (setting.key === "working_hours") {
            const workingHoursObject = { ...newValues.working_hours };
            if (Array.isArray(setting.value)) {
              setting.value.forEach((dayData) => {
                if (workingHoursObject.hasOwnProperty(dayData.day)) {
                  workingHoursObject[dayData.day] = {
                    active: dayData.active,
                    from: dayData.from || "",
                    till: dayData.till || "",
                  };
                }
              });
            }
            newValues.working_hours = workingHoursObject;
          } else if (setting.key === "social_links") {
            const socialLinksObject = { ...newValues.social_links };
            if (setting.value && typeof setting.value === "object") {
              for (const platform in setting.value) {
                if (socialLinksObject.hasOwnProperty(platform)) {
                  socialLinksObject[platform] = {
                    url: setting.value[platform].url || "",
                    icon: setting.value[platform].icon || "",
                  };
                }
              }
            }
            newValues.social_links = socialLinksObject;
          } else if (setting.key === "tax_rate") {
            newValues.tax_rate_is_active = setting.is_active;
            if (setting.value && typeof setting.value === "object") {
              newValues.tax_rate_type = setting.value.type || "product";
              newValues.tax_rate_tax_percentage =
                setting.value.tax_percentage || 0;
            }
          } else if (
            (setting.group === "general" || setting.group === "contact") &&
            Object.prototype.hasOwnProperty.call(newValues, setting.key)
          ) {
            newValues[setting.key] =
              setting.value !== null ? setting.value : "";
          }
        });

        return newValues;
      });
    }

    if (settings) {
      const reformedSettingsData = settings?.reduce((acc, setting) => {
        if (!acc[setting.group]) {
          acc[setting.group] = [];
        }
        acc[setting.group].push(setting);
        return acc;
      }, {});
      setGroupedSettings(reformedSettingsData);
    }
  }, [settings]);

  const renderWorkingHoursInputs = () => {
    const days = [
      { id: "saturday", label: "شنبه" },
      { id: "sunday", label: "یکشنبه" },
      { id: "monday", label: "دوشنبه" },
      { id: "tuesday", label: "سه شنبه" },
      { id: "wednesday", label: "چهارشنبه" },
      { id: "thursday", label: "پنجشنبه" },
      { id: "friday", label: "جمعه" },
    ];

    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5" className="mb-4">
            ساعات کاری
          </CardTitle>
          <div>
            <Row className="g-3 d-flex justify-content-around">
              {days.map((day) => (
                <Col key={day.id} xs={12} md={5} className="mb-3">
                  <div className=" form-check form-switch ">
                    <Input
                      type="switch"
                      role="switch"
                      id={`${day.id}-active`}
                      name={`working_hours.${day.id}.active`}
                      checked={
                        formik.values.working_hours?.[day.id]?.active || false
                      }
                      onChange={formik.handleChange}
                      className="ms-2"
                    />
                    <Label
                      for={`${day.id}-active`}
                      className="mb-0 flex-grow-1"
                      style={{ paddingRight: ".5rem" }}
                    >
                      {day.label}
                    </Label>
                  </div>
                  <div className="d-flex flex-column flex-lg-row ">
                    <FormGroup className="me-2 flex-grow-1">
                      <Label for={`${day.id}-from`}>از ساعت</Label>
                      <Input
                        id={`${day.id}-from`}
                        name={`working_hours.${day.id}.from`}
                        type="time"
                        value={
                          formik.values.working_hours?.[day.id]?.from || ""
                        }
                        onChange={formik.handleChange}
                        disabled={
                          !formik.values.working_hours?.[day.id]?.active
                        }
                      />
                    </FormGroup>
                    <FormGroup className="flex-grow-1">
                      <Label for={`${day.id}-till`}>تا ساعت</Label>
                      <Input
                        id={`${day.id}-till`}
                        name={`working_hours.${day.id}.till`}
                        type="time"
                        value={
                          formik.values.working_hours?.[day.id]?.till || ""
                        }
                        onChange={formik.handleChange}
                        disabled={
                          !formik.values.working_hours?.[day.id]?.active
                        }
                      />
                    </FormGroup>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </CardBody>
      </Card>
    );
  };

  const renderSocialLinksInputs = () => {
    const platforms = [
      { id: "instagram", label: "اینستاگرام", icon: "fab fa-instagram" },
      { id: "telegram", label: "تلگرام", icon: "fab fa-telegram" },
      { id: "twitter", label: "توییتر", icon: "fab fa-twitter" },
      { id: "facebook", label: "فیسبوک", icon: "fab fa-facebook" },
      { id: "linkedin", label: "لینکدین", icon: "fab fa-linkedin" },
      { id: "youtube", label: "یوتیوب", icon: "fab fa-youtube" },
    ];

    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5" className="mb-4">
            شبکه های اجتماعی
          </CardTitle>
          {platforms.map((platform) => {
            const urlName = `social_links.${platform.id}.url`;
            const urlTouched = formik.touched.social_links?.[platform.id]?.url;
            const urlError = formik.errors.social_links?.[platform.id]?.url;

            return (
              <FormGroup key={platform.id} className="mb-3">
                <Label for={`social-${platform.id}-url`}>
                  <i className={`${platform.icon} me-2`} />
                  {platform.label}
                </Label>
                <Row>
                  <Col md={5}>
                    <Input
                      id={`social-${platform.id}-url`}
                      name={urlName}
                      type="url"
                      value={
                        formik.values.social_links?.[platform.id]?.url || ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={urlTouched && !!urlError}
                      placeholder={`لینک ${platform.label}`}
                    />
                    {urlTouched && urlError ? (
                      <FormFeedback>{urlError}</FormFeedback>
                    ) : null}
                  </Col>
                  <Col md={5}>
                    <div className="d-flex align-items-center gap-3">
                      <Button
                        outline
                        color="primary"
                        type="button"
                        onClick={() => handleOpenIconModal(platform.id)}
                      >
                        انتخاب آیکون
                      </Button>
                      {formik.values.social_links?.[platform.id]?.icon && (
                        <div className="d-flex align-items-center gap-2 p-2 border rounded">
                          <i
                            className={`${
                              formik.values.social_links[platform.id].icon
                            } fa-2x`}
                          ></i>
                          <code style={{ fontSize: "12px" }}>
                            {formik.values.social_links[platform.id].icon}
                          </code>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            );
          })}
        </CardBody>
      </Card>
    );
  };

  const renderInput = (setting) => {
    if (
      setting.key === "working_hours" ||
      setting.key === "social_links" ||
      setting.group === "finance"
    ) {
      return null;
    }

    const fieldTouched = formik.touched[setting.key];
    const fieldError = formik.errors[setting.key];

    switch (setting.type) {
      case "text":
        return (
          <FormGroup>
            <Label for={setting.key}>{setting.label.replace(/_/g, " ")}</Label>
            <Input
              id={setting.key}
              name={setting.key}
              type="text"
              value={formik.values[setting.key] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={fieldTouched && !!fieldError}
              placeholder={`${setting.label.replace(/_/g, " ")}  وارد کنید`}
            />
            {fieldTouched && fieldError ? (
              <FormFeedback>{fieldError}</FormFeedback>
            ) : null}
          </FormGroup>
        );
      case "select":
        return (
          <FormGroup>
            <Label for={setting.key}>{setting.label.replace(/_/g, " ")}</Label>
            <Input
              id={setting.key}
              name={setting.key}
              type="select"
              value={formik.values[setting.key] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={fieldTouched && !!fieldError}
            >
              <option value="1">Asia/Tehran</option>
            </Input>
            {fieldTouched && fieldError ? (
              <FormFeedback>{fieldError}</FormFeedback>
            ) : null}
          </FormGroup>
        );
      default:
        return null;
    }
  };

  const renderFinanceInputs = (financeSettings) => {
    if (!financeSettings || financeSettings.length === 0) {
      return null;
    }
    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5" className="mb-4">
            مالی
          </CardTitle>
          <Row>
            {financeSettings.map((setting) => {
              const isActiveKey = `${setting.key}_is_active`;
              return (
                <Col md={12} key={setting.key}>
                  <FormGroup>
                    <div className=" form-check form-switch ">
                      <Input
                        type="switch"
                        role="switch"
                        id={isActiveKey}
                        name={isActiveKey}
                        checked={formik.values[isActiveKey] || false}
                        onChange={formik.handleChange}
                        className="ms-2"
                      />
                      <Label
                        for={isActiveKey}
                        className="mb-0 flex-grow-1"
                        style={{ paddingRight: "2.5rem" }}
                      >
                        {setting.label}
                      </Label>
                    </div>
                    {setting.key === "tax_rate" ? (
                      <Row>
                        <Col md={6}>
                          <Label>نوع مالیات</Label>
                          <Input
                            name="tax_rate_type"
                            type="select"
                            value={formik.values.tax_rate_type || "product"}
                            onChange={formik.handleChange}
                            disabled={!formik.values[isActiveKey]}
                          >
                            <option value="product">بر اساس محصول</option>
                            <option value="order">بر اساس سفارش</option>
                          </Input>
                        </Col>
                        <Col md={6}>
                          <Label>درصد مالیات (%)</Label>
                          <Input
                            name="tax_rate_tax_percentage"
                            type="number"
                            value={formik.values.tax_rate_tax_percentage || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={
                              formik.touched.tax_rate_tax_percentage &&
                              !!formik.errors.tax_rate_tax_percentage
                            }
                            disabled={!formik.values[isActiveKey]}
                          />
                          {formik.touched.tax_rate_tax_percentage &&
                          formik.errors.tax_rate_tax_percentage ? (
                            <FormFeedback>
                              {formik.errors.tax_rate_tax_percentage}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </Row>
                    ) : (
                      <Input
                        id={setting.key}
                        name={setting.key}
                        type={setting.type === "int" ? "number" : "text"}
                        min="0"
                        value={formik.values[setting.key] || ""}
                        onChange={formik.handleChange}
                        placeholder="مقدار را وارد کنید"
                        disabled={!formik.values[isActiveKey]}
                      />
                    )}
                  </FormGroup>
                </Col>
              );
            })}
          </Row>
        </CardBody>
      </Card>
    );
  };

  const SettingsSkeleton = () => (
    <>
      <Card className="mb-4">
        <CardBody>
          <SkeletonLoader height="24px" width="150px" className="mb-4" />
          <Row>
            {[...Array(6)].map((_, i) => (
              <Col md={4} key={i} className="mb-3">
                <SkeletonLoader height="16px" width="80px" className="mb-2" />
                <SkeletonLoader height="38px" />
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
      <Card className="mb-4">
        <CardBody>
          <SkeletonLoader height="24px" width="150px" className="mb-4" />
          <Row>
            {[...Array(7)].map((_, i) => (
              <Col md={12} key={i} className="mb-3">
                <Row>
                  <Col xs={3}>
                    <SkeletonLoader height="38px" />
                  </Col>
                  <Col xs={4}>
                    <SkeletonLoader height="38px" />
                  </Col>
                  <Col xs={4}>
                    <SkeletonLoader height="38px" />
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
      <Card className="mb-4">
        <CardBody>
          <SkeletonLoader height="24px" width="150px" className="mb-4" />
          <Row>
            {[...Array(6)].map((_, i) => (
              <Col md={12} key={i} className="mb-3">
                <Row>
                  <Col xs={7}>
                    <SkeletonLoader height="38px" />
                  </Col>
                  <Col xs={5}>
                    <SkeletonLoader height="38px" />
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-end mt-4">
        <SkeletonLoader height="38px" width="120px" />
      </div>
    </>
  );

  useEffect(() => {
    if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
      const firstErrorKey = Object.keys(formik.errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorKey}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [formik.submitCount, formik.errors]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="تنظیمات" />

        {loading ? (
          <SettingsSkeleton />
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            {groupedSettings &&
              Object.entries(groupedSettings).map(([group, groupSettings]) => (
                <div key={group}>
                  {group === "footer" && (
                    <>
                      {renderWorkingHoursInputs()}
                      {renderSocialLinksInputs()}
                    </>
                  )}

                  {group !== "footer" && group !== "finance" && (
                    <Card className="mb-4">
                      <CardBody>
                        <CardTitle tag="h5" className="mb-4">
                          {group.replace(/_/g, " ")}
                        </CardTitle>
                        <Row>
                          {groupSettings.map((setting) => (
                            <Col
                              key={setting.id}
                              md={4}
                              xs={12}
                              className="mb-3"
                            >
                              {renderInput(setting)}
                            </Col>
                          ))}
                        </Row>
                      </CardBody>
                    </Card>
                  )}

                  {group === "finance" && renderFinanceInputs(groupSettings)}
                </div>
              ))}

            <div className="d-flex justify-content-end mt-4">
              {console.log(formik)}
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" color="primary">
                ذخیره تغییرات
              </Button>
            </div>
            <IconPickerModal
              isOpen={iconModalOpen}
              toggle={toggleIconModal}
              onSelect={handleIconSelect}
            />
          </Form>
        )}
      </Container>
    </div>
  );
};

export default EcommerceSettings;
