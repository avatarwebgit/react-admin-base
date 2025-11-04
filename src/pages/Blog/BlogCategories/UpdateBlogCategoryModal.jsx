import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
// import { updateBlogCategory, showBlogCategory } from '../../../../store/blog/actions';

const UpdateBlogCategoryModal = ({ isOpen, toggle, categoryId }) => {
  const dispatch = useDispatch();
  const categoryDetails = {
    id: 1,
    name: "تکنولوژی",
    slug: "technology",
    description: "اخبار تکنولوژی",
  }; 

  const formik = useFormik({
    initialValues: { name: "", slug: "", description: "" },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("نام دسته بندی الزامی است."),
      slug: yup.string().required("اسلاگ الزامی است."),
      description: yup.string(),
    }),
    onSubmit: (values) => {
      // dispatch(updateBlogCategory({ id: categoryId, ...values }));
      console.log("Updating blog category", { id: categoryId, ...values });
      toast.success("دسته بندی با موفقیت ویرایش شد!");
      toggle();
    },
  });

  useEffect(() => {
    if (isOpen && categoryId) {
      //   dispatch(showBlogCategory(categoryId));
    }
  }, [isOpen, categoryId, dispatch]);

  useEffect(() => {
    if (categoryDetails) {
      formik.setValues({
        name: categoryDetails.name || "",
        slug: categoryDetails.slug || "",
        description: categoryDetails.description || "",
      });
    }
  }, [categoryDetails]);

  return (
    <OptionalSizes center={true} size={"lg"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">ویرایش دسته بندی بلاگ</CardTitle>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <Label htmlFor="name">نام</Label>
                    <Input
                      id="name"
                      type="text"
                      {...formik.getFieldProps("name")}
                      invalid={formik.touched.name && !!formik.errors.name}
                    />
                    <FormFeedback>{formik.errors.name}</FormFeedback>
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="slug">اسلاگ (نامک)</Label>
                    <Input
                      id="slug"
                      type="text"
                      {...formik.getFieldProps("slug")}
                      invalid={formik.touched.slug && !!formik.errors.slug}
                    />
                    <FormFeedback>{formik.errors.slug}</FormFeedback>
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="description">توضیحات</Label>
                    <Input
                      id="description"
                      type="textarea"
                      {...formik.getFieldProps("description")}
                    />
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={formik.isSubmitting}
                    >
                      ویرایش
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

export default UpdateBlogCategoryModal;
