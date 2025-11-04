import React from "react";
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
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
// import { addBlogCategory } from '../../../../store/blog/actions';

const CreateBlogCategoryModal = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("نام دسته بندی الزامی است."),
      slug: yup.string().required("اسلاگ الزامی است."),
      description: yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      // dispatch(addBlogCategory(values));
      console.log("Creating blog category", values);
      toast.success("دسته بندی با موفقیت ایجاد شد!");
      toggle();
      resetForm();
    },
  });

  return (
    <OptionalSizes center={true} size={"lg"} isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">ایجاد دسته بندی بلاگ</CardTitle>
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
                      ذخیره
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

export default CreateBlogCategoryModal;
