import React, { useState } from "react";
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
  Collapse,
} from "reactstrap";
import { FormikProvider, useFormik, FieldArray } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";

const FooterMenus = () => {
  document.title = "مدیریت منوهای فوتر";

  const [logoFile, setLogoFile] = useState(null);
  const [trustSealFiles, setTrustSealFiles] = useState([]);
  const [collapsedLinks, setCollapsedLinks] = useState({});

  const validationSchema = yup.object({
    address: yup.string(),
    support: yup.object({
      email: yup.string().email("فرمت ایمیل نامعتبر است"),
      phone: yup.string(),
    }),
    socialMedia: yup.object({
      instagram: yup.string().url("آدرس اینترنتی نامعتبر است"),
      twitter: yup.string().url("آدرس اینترنتی نامعتبر است"),
      facebook: yup.string().url("آدرس اینترنتی نامعتبر است"),
      linkedin: yup.string().url("آدرس اینترنتی نامعتبر است"),
      youtube: yup.string().url("آدرس اینترنتی نامعتبر است"),
    }),
    menus: yup.array().of(
      yup.object({
        title: yup.string().required("عنوان منو الزامی است"),
        links: yup.array().of(
          yup.object({
            title: yup.string().required("عنوان لینک الزامی است"),
            url: yup
              .string()
              .url("آدرس اینترنتی نامعتبر است")
              .required("آدرس لینک الزامی است"),
          })
        ),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      logo: null,
      address: "",
      trustSeals: [],
      support: {
        email: "",
        phone: "",
      },
      socialMedia: {
        instagram: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
      },
      menus: [
        { id: 1, title: "", links: [{ title: "", url: "" }] },
        { id: 2, title: "", links: [{ title: "", url: "" }] },
        { id: 3, title: "", links: [{ title: "", url: "" }] },
        { id: 4, title: "", links: [{ title: "", url: "" }] },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const submissionData = {
        ...values,
        logo: logoFile,
        trustSeals: trustSealFiles,
      };
      console.log("Footer Settings Submitted:", submissionData);
      // Here you would typically dispatch an action to save the data
    },
  });

  const toggleLinkCollapse = (menuIndex, linkIndex) => {
    const key = `${menuIndex}-${linkIndex}`;
    setCollapsedLinks((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleLogoDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
        formattedSize: formatBytes(acceptedFiles[0].size),
      });
      setLogoFile(file);
      formik.setFieldValue("logo", file);
    }
  };

  const handleTrustSealsDrop = (acceptedFiles) => {
    const formattedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setTrustSealFiles((prev) => [...prev, ...formattedFiles]);
    formik.setFieldValue("trustSeals", [
      ...formik.values.trustSeals,
      ...formattedFiles,
    ]);
  };

  const socialMediaPlatforms = [
    { name: "instagram", icon: "bxl-instagram", label: "اینستاگرام" },
    { name: "twitter", icon: "bxl-twitter", label: "توییتر" },
    { name: "facebook", icon: "bxl-facebook", label: "فیسبوک" },
    { name: "linkedin", icon: "bxl-linkedin", label: "لینکدین" },
    { name: "youtube", icon: "bxl-youtube", label: "یوتیوب" },
  ];

  const onSortEnd = (oldIndex, newIndex, menuIndex) => {
    const currentLinks = formik.values.menus[menuIndex].links;
    const reorderedLinks = arrayMove(currentLinks, oldIndex, newIndex);
    formik.setFieldValue(`menus[${menuIndex}].links`, reorderedLinks);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="تنظیمات صفحه اصلی" breadcrumbItem="منوهای فوتر" />
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h4">تنظیمات عمومی فوتر</CardTitle>
                      <Row>
                        <Col md="6">
                          <div className="mb-3">
                            <Label>لوگوی فوتر</Label>
                            <Dropzone
                              onDrop={handleLogoDrop}
                              accept={{ "image/*": [] }}
                              maxFiles={1}
                            >
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
                                    <h4>
                                      فایل را اینجا رها کنید یا برای آپلود کلیک
                                      کنید.
                                    </h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            {logoFile && (
                              <div className="dropzone-previews mt-3">
                                <Card className="mt-1 mb-0 shadow-none border">
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          alt={logoFile.name}
                                          src={logoFile.preview}
                                        />
                                      </Col>
                                      <Col>
                                        <Link
                                          to="#"
                                          className="text-muted font-weight-bold"
                                        >
                                          {logoFile.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>
                                            {logoFile.formattedSize}
                                          </strong>
                                        </p>
                                      </Col>
                                      <Col className="col-auto">
                                        <Button
                                          color="danger"
                                          size="sm"
                                          onClick={() => setLogoFile(null)}
                                        >
                                          حذف
                                        </Button>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <Label htmlFor="address">آدرس</Label>
                            <Input
                              type="textarea"
                              id="address"
                              rows="3"
                              {...formik.getFieldProps("address")}
                            />
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="mb-3">
                            <Label>نمادهای اعتماد (Enamad, Visa, etc.)</Label>
                            <Dropzone
                              onDrop={handleTrustSealsDrop}
                              accept={{ "image/*": [] }}
                            >
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
                                    <h4>
                                      فایل ها را اینجا رها کنید یا برای آپلود
                                      کلیک کنید.
                                    </h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            <div
                              className="dropzone-previews mt-3"
                              id="file-previews"
                            >
                              {trustSealFiles.map((f, i) => (
                                <Card
                                  key={i + "-file"}
                                  className="mt-1 mb-0 shadow-none border"
                                >
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          alt={f.name}
                                          src={f.preview}
                                        />
                                      </Col>
                                      <Col>
                                        <Link
                                          to="#"
                                          className="text-muted font-weight-bold"
                                        >
                                          {f.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>{f.formattedSize}</strong>
                                        </p>
                                      </Col>
                                      <Col className="col-auto">
                                        <Button
                                          color="danger"
                                          size="sm"
                                          onClick={() => {
                                            const newFiles = [
                                              ...trustSealFiles,
                                            ];
                                            newFiles.splice(i, 1);
                                            setTrustSealFiles(newFiles);
                                          }}
                                        >
                                          حذف
                                        </Button>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Row>
                        <Col md="12">
                          <CardTitle tag="h4">پشتیبانی</CardTitle>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6">
                              <div className="mb-3">
                                <Label htmlFor="support.email">ایمیل</Label>
                                <Input
                                  id="support.email"
                                  type="email"
                                  {...formik.getFieldProps("support.email")}
                                  invalid={
                                    formik.touched.support?.email &&
                                    !!formik.errors.support?.email
                                  }
                                />
                                <FormFeedback>
                                  {formik.errors.support?.email}
                                </FormFeedback>
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="mb-3">
                                <Label htmlFor="support.phone">تلفن</Label>
                                <Input
                                  id="support.phone"
                                  type="tel"
                                  {...formik.getFieldProps("support.phone")}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Row>
                        <Col md="12">
                          <CardTitle tag="h4">شبکه های اجتماعی</CardTitle>
                        </Col>
                        <Col md="12">
                          <Row>
                            {socialMediaPlatforms.map((platform, index) => (
                              <Col md="6" key={index}>
                                <div className="mb-3">
                                  <Label
                                    htmlFor={`socialMedia.${platform.name}`}
                                  >
                                    <i className={`bx ${platform.icon} me-2`} />
                                    {platform.label}
                                  </Label>
                                  <Input
                                    id={`socialMedia.${platform.name}`}
                                    type="url"
                                    placeholder="https://..."
                                    {...formik.getFieldProps(
                                      `socialMedia.${platform.name}`
                                    )}
                                    invalid={
                                      formik.touched.socialMedia?.[
                                        platform.name
                                      ] &&
                                      !!formik.errors.socialMedia?.[
                                        platform.name
                                      ]
                                    }
                                  />
                                  <FormFeedback>
                                    {formik.errors.socialMedia?.[platform.name]}
                                  </FormFeedback>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <CardTitle tag="h4">منوهای فوتر</CardTitle>
                      <Row>
                        {formik.values.menus.map((menu, menuIndex) => (
                          <Col md="3" key={menu.id}>
                            <div className="mb-3">
                              <Label htmlFor={`menus[${menuIndex}].title`}>
                                عنوان ستون {menuIndex + 1}
                              </Label>
                              <Input
                                id={`menus[${menuIndex}].title`}
                                {...formik.getFieldProps(
                                  `menus[${menuIndex}].title`
                                )}
                                invalid={
                                  formik.touched.menus?.[menuIndex]?.title &&
                                  !!formik.errors.menus?.[menuIndex]?.title
                                }
                              />
                              <FormFeedback>
                                {formik.errors.menus?.[menuIndex]?.title}
                              </FormFeedback>
                            </div>
                            <FieldArray
                              name={`menus[${menuIndex}].links`}
                              render={(arrayHelpers) => (
                                <div>
                                  <SortableList
                                    onSortEnd={(oldIndex, newIndex) =>
                                      onSortEnd(oldIndex, newIndex, menuIndex)
                                    }
                                    className="list"
                                    draggedItemClassName="dragged"
                                  >
                                    {menu.links.map((link, linkIndex) => {
                                      const isCollapsed =
                                        collapsedLinks[
                                          `${menuIndex}-${linkIndex}`
                                        ];
                                      return (
                                        <SortableItem key={linkIndex}>
                                          <div className="border rounded p-2 mb-2 bg-light">
                                            <div className="d-flex align-items-center">
                                              <i
                                                className="bx bx-grid-vertical me-2"
                                                style={{ cursor: "grab" }}
                                              ></i>
                                              <span className="fw-bold flex-grow-1 text-truncate">
                                                {link.title || "لینک جدید"}
                                              </span>
                                              <Button
                                                type="button"
                                                color="light"
                                                size="sm"
                                                className="btn-icon me-1"
                                                onClick={() =>
                                                  toggleLinkCollapse(
                                                    menuIndex,
                                                    linkIndex
                                                  )
                                                }
                                              >
                                                <i
                                                  className={`bx ${
                                                    isCollapsed
                                                      ? "bx-chevron-down"
                                                      : "bx-chevron-up"
                                                  }`}
                                                />
                                              </Button>
                                              <Button
                                                type="button"
                                                color="danger"
                                                size="sm"
                                                className="btn-icon"
                                                onClick={() =>
                                                  arrayHelpers.remove(linkIndex)
                                                }
                                              >
                                                <i className="bx bx-trash" />
                                              </Button>
                                            </div>
                                            <Collapse isOpen={!isCollapsed}>
                                              <div className="pt-2 mt-2 border-top">
                                                <div className="mb-2">
                                                  <Label
                                                    htmlFor={`menus[${menuIndex}].links[${linkIndex}].title`}
                                                  >
                                                    عنوان لینک
                                                  </Label>
                                                  <Input
                                                    id={`menus[${menuIndex}].links[${linkIndex}].title`}
                                                    {...formik.getFieldProps(
                                                      `menus[${menuIndex}].links[${linkIndex}].title`
                                                    )}
                                                    invalid={
                                                      formik.touched.menus?.[
                                                        menuIndex
                                                      ]?.links?.[linkIndex]
                                                        ?.title &&
                                                      !!formik.errors.menus?.[
                                                        menuIndex
                                                      ]?.links?.[linkIndex]
                                                        ?.title
                                                    }
                                                  />
                                                  <FormFeedback>
                                                    {
                                                      formik.errors.menus?.[
                                                        menuIndex
                                                      ]?.links?.[linkIndex]
                                                        ?.title
                                                    }
                                                  </FormFeedback>
                                                </div>
                                                <div className="mb-2">
                                                  <Label
                                                    htmlFor={`menus[${menuIndex}].links[${linkIndex}].url`}
                                                  >
                                                    آدرس لینک
                                                  </Label>
                                                  <Input
                                                    id={`menus[${menuIndex}].links[${linkIndex}].url`}
                                                    {...formik.getFieldProps(
                                                      `menus[${menuIndex}].links[${linkIndex}].url`
                                                    )}
                                                    invalid={
                                                      formik.touched.menus?.[
                                                        menuIndex
                                                      ]?.links?.[linkIndex]
                                                        ?.url &&
                                                      !!formik.errors.menus?.[
                                                        menuIndex
                                                      ]?.links?.[linkIndex]?.url
                                                    }
                                                  />
                                                  <FormFeedback>
                                                    {
                                                      formik.errors.menus?.[
                                                        menuIndex
                                                      ]?.links?.[linkIndex]?.url
                                                    }
                                                  </FormFeedback>
                                                </div>
                                              </div>
                                            </Collapse>
                                          </div>
                                        </SortableItem>
                                      );
                                    })}
                                  </SortableList>
                                  <Button
                                    type="button"
                                    color="secondary"
                                    size="sm"
                                    onClick={() =>
                                      arrayHelpers.push({ title: "", url: "" })
                                    }
                                  >
                                    افزودن لینک
                                  </Button>
                                </div>
                              )}
                            />
                          </Col>
                        ))}
                      </Row>
                    </CardBody>
                  </Card>
                  <div className="d-flex justify-content-end">
                    <Button type="submit" color="primary">
                      ذخیره تغییرات
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </FormikProvider>
        </Container>
      </div>
      <style>{`
        .dragged {
            opacity: 0.5;
            border: 2px dashed #007bff;
        }
      `}</style>
    </React.Fragment>
  );
};

export default FooterMenus;
