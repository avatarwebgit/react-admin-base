import React, { useState, useEffect } from "react";
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
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
// import { updateBlogPost, showBlogPost, getBlogCategories } from "../../../store/blog/actions";
import Meta from "../../Ecommerce/Meta";
import TagInput from "../../../components/Common/TagInput";
import Select from "react-select";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

const UpdateBlogPostModal = ({ isOpen, toggle, postId }) => {
  const dispatch = useDispatch();
  // const postDetails = useSelector(state => state.blog.postDetails[postId]);
  // const categories = useSelector(state => state.blog.categories.items);
  const [postDetails, setPostDetails] = useState({
    id: 1,
    title: "اولین پست بلاگ",
    slug: "first-blog-post",
    content: "این محتوای پست است.",
    category_ids: [1],
    category: "تکنولوژی",
    status: "Published",
    published_at: "1403/01/10",
    tags: ["تک", "اخبار"],
    featured_image: "https://via.placeholder.com/150",
    show_featured_image: true,
    meta: { meta_keywords: [], meta_description: "", meta_title: "" },
  }); // Mock
  const [categories, setCategories] = useState([
    { id: 1, name: "تکنولوژی" },
    { id: 2, name: "برنامه نویسی" },
  ]); // Mock
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isOpen && postId) {
      // dispatch(showBlogPost(postId));
      // dispatch(getBlogCategories());
    }
  }, [isOpen, postId, dispatch]);

  useEffect(() => {
    if (categories) {
      setCategoryOptions(
        categories.map((cat) => ({ value: cat.id, label: cat.name }))
      );
    }
  }, [categories]);

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      content: "",
      category_ids: [],
      tags: [],
      status: "Draft",
      featured_image: null,
      show_featured_image: true,
      meta: {
        meta_keywords: [],
        meta_description: "",
        meta_title: "",
      },
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      title: yup.string().required("عنوان الزامی است"),
      slug: yup.string().required("اسلاگ الزامی است"),
      content: yup.string().required("محتوا الزامی است"),
      category_ids: yup
        .array()
        .min(1, "حداقل یک دسته بندی انتخاب کنید")
        .required("دسته بندی الزامی است"),
      status: yup.string().required("وضعیت الزامی است"),
      show_featured_image: yup.boolean(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "meta" || key === "tags") {
            formData.append(key, JSON.stringify(values[key]));
          } else if (key !== "featured_image") {
            formData.append(key, values[key]);
          }
        });
        if (selectedFile) {
          formData.append("featured_image", selectedFile);
        }
        formData.append("_method", "PATCH");

        // dispatch(updateBlogPost({ id: postId, formData }));
        console.log(
          "Updating blog post",
          Object.fromEntries(formData.entries())
        );
        toast.success("پست بلاگ با موفقیت ویرایش شد!");
        toggle();
      } catch (error) {
        toast.error("ویرایش پست بلاگ با خطا مواجه شد.");
      }
    },
  });

  useEffect(() => {
    if (postDetails) {
      formik.setValues({
        title: postDetails.title || "",
        slug: postDetails.slug || "",
        content: postDetails.content || "",
        category_ids: postDetails.category_ids || [],
        tags: postDetails.tags || [],
        status: postDetails.status || "Draft",
        show_featured_image:
          postDetails.show_featured_image !== undefined
            ? postDetails.show_featured_image
            : true,
        meta: postDetails.meta || {
          meta_keywords: [],
          meta_description: "",
          meta_title: "",
        },
      });
      setImagePreview(postDetails.featured_image);
    }
  }, [postDetails]);

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      });
      setSelectedFile(file);
      setImagePreview(fileWithPreview.preview);
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    formik.setFieldValue("featured_image", null);
  };

  return (
    <OptionalSizes center={true} size={"xl"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">ویرایش پست بلاگ</CardTitle>
                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="title">عنوان</Label>
                        <Input
                          id="title"
                          name="title"
                          type="text"
                          {...formik.getFieldProps("title")}
                          invalid={
                            formik.touched.title && !!formik.errors.title
                          }
                        />
                        <FormFeedback>{formik.errors.title}</FormFeedback>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="slug">اسلاگ (نامک)</Label>
                        <Input
                          id="slug"
                          name="slug"
                          type="text"
                          {...formik.getFieldProps("slug")}
                          invalid={formik.touched.slug && !!formik.errors.slug}
                        />
                        <FormFeedback>{formik.errors.slug}</FormFeedback>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {console.log(import.meta.env.VITE_APP_TINY_API_KEY)}
                    <Col sm="12">
                      <div className="mb-3">
                        <Label htmlFor="content">محتوا</Label>
                        <Editor
                          apiKey={import.meta.env.VITE_APP_TINY_API_KEY}
                          init={{
                            height: 600,
                            menubar: true,
                            plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "image",
                              "charmap",
                              "preview",
                              "anchor",
                              "searchreplace",
                              "visualblocks",
                              "code",
                              "fullscreen",
                              "insertdatetime",
                              "media",
                              "table",
                              "code",
                              "help",
                              "wordcount",
                            ],
                            toolbar:
                              "undo redo | blocks | " +
                              "bold italic forecolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            directionality: "rtl",
                          }}
                          value={formik.values.content}
                          onEditorChange={(content) => {
                            formik.setFieldValue("content", content);
                          }}
                        />
                        {formik.touched.content && formik.errors.content ? (
                          <div className="text-danger mt-1">
                            {formik.errors.content}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <div className="mb-3">
                        <Label htmlFor="category_ids">دسته بندی</Label>
                        <Select
                          id="category_ids"
                          name="category_ids"
                          isMulti
                          placeholder="انتخاب..."
                          options={categoryOptions}
                          value={categoryOptions.filter((opt) =>
                            formik.values.category_ids.includes(opt.value)
                          )}
                          onChange={(options) =>
                            formik.setFieldValue(
                              "category_ids",
                              options ? options.map((opt) => opt.value) : []
                            )
                          }
                        />
                        {formik.touched.category_ids &&
                          formik.errors.category_ids && (
                            <div className="text-danger mt-1">
                              {formik.errors.category_ids}
                            </div>
                          )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="tags">تگ ها</Label>
                        <TagInput
                          tags={formik.values.tags}
                          setTags={(tags) => formik.setFieldValue("tags", tags)}
                        />
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="status">وضعیت</Label>
                        <Input
                          id="status"
                          name="status"
                          type="select"
                          {...formik.getFieldProps("status")}
                        >
                          <option value="Draft">پیش‌نویس</option>
                          <option value="Published">منتشر شده</option>
                        </Input>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <Label>تصویر شاخص</Label>
                      <Dropzone
                        onDrop={handleFileDrop}
                        accept={{ "image/*": [] }}
                        maxFiles={1}
                        multiple={false}
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
                                فایل را اینجا رها کنید یا برای آپلود کلیک کنید.
                              </h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      {imagePreview && (
                        <div className="mt-2 border rounded p-2 d-flex align-items-center">
                          <img
                            src={imagePreview}
                            alt="preview"
                            className="avatar-sm bg-light rounded"
                          />
                          <div className="ms-2 flex-grow-1">
                            <h5 className="fs-md mb-1">
                              {selectedFile ? selectedFile.path : "تصویر فعلی"}
                            </h5>
                            {selectedFile && (
                              <p className="text-muted mb-0">
                                {selectedFile.formattedSize}
                              </p>
                            )}
                          </div>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={removeImage}
                          >
                            حذف
                          </Button>
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col sm="12">
                      <div className="form-check form-switch mb-3">
                        <Input
                          type="switch"
                          name="show_featured_image"
                          id="show_featured_image_update"
                          className="form-check-input"
                          {...formik.getFieldProps("show_featured_image")}
                          checked={formik.values.show_featured_image}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="show_featured_image_update"
                        >
                          نمایش تصویر شاخص در صفحه
                        </Label>
                      </div>
                    </Col>
                  </Row>

                  <Meta formik={formik} />

                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={formik.isSubmitting}
                    >
                      ویرایش پست
                    </Button>
                    <Button type="button" color="secondary" onClick={toggle}>
                      انصراف
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

export default UpdateBlogPostModal;
