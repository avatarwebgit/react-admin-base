import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
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
import { addAttributeGroup } from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import { useSelector } from "react-redux";

const CreateAttributeGroupModal = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();

  const { attributeGroupCreated } = useSelector((state) => state.ecommerce);

  const formik = useFormik({
    initialValues: {
      name: "",
      display_order: 1,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام گروه را وارد کنید"),
      display_order: yup
        .number()
        .min(1, "حداقل اولویت نمایش باید 1 باشد")
        .max(37700, "حد اکثر اولویت نمایش 37700 میباشد"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(addAttributeGroup(values));
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (attributeGroupCreated) {
      toggle();
      formik.resetForm();
    }
  }, [attributeGroupCreated]);

  return (
    <OptionalSizes center size="lg" isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">ایجاد گروه ویژگی جدید</CardTitle>
                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="name">نام گروه</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="نام گروه"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          invalid={formik.touched.name && !!formik.errors.name}
                        />
                        <FormFeedback>{formik.errors.name}</FormFeedback>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="display_order">اولویت نمایش</Label>
                        <Input
                          id="display_order"
                          name="display_order"
                          type="text"
                          placeholder=" اولویت نمایش"
                          value={formik.values.display_order}
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.display_order &&
                            !!formik.errors.display_order
                          }
                        />
                        <FormFeedback>
                          {formik.errors.display_order}
                        </FormFeedback>
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex flex-wrap gap-2">
                    <Button type="submit" color="primary">
                      ایجاد گروه
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

export default CreateAttributeGroupModal;
