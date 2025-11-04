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
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import {
  showAttributeGroup,
  updateAttributeGroup,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";

const UpdateAttributeGroupModal = ({ groupId, isOpen, toggle }) => {
  const dispatch = useDispatch();

  const groupDetails = useSelector(
    (state) => state.ecommerce.attributeGroupDetails[groupId]
  );

  const { singleAttributeGroupLoading, attributeGroupUpdateStatus } =
    useSelector((state) => state.ecommerce);

  const [initialValues, setInitialValues] = useState({
    name: "",
    display_order: 1,
  });

  useEffect(() => {
    if (groupId && !groupDetails) {
      dispatch(showAttributeGroup(groupId));
    }
    if (groupDetails) {
      setInitialValues(groupDetails);
    }
  }, [groupId, groupDetails]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام گروه را وارد کنید"),
      display_order: yup
        .number()
        .min(1, "حداقل اولویت نمایش باید 1 باشد")
        .max(37700, "حد اکثر اولویت نمایش 37700 میباشد"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(updateAttributeGroup(values));
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (attributeGroupUpdateStatus) {
      toggle();
      formik.resetForm();
    }
  }, [attributeGroupUpdateStatus]);

  return (
    <OptionalSizes center size="lg" isOpen={isOpen} toggle={toggle}>
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {singleAttributeGroupLoading ? (
                  <div className="update-loading-wrapper d-flex flex-column">
                    <Spinner color="primary" size={"md"} />
                    <br />
                    <span>درحال بارگذاری اطلاعات ...</span>
                  </div>
                ) : (
                  <>
                    <CardTitle tag="h4">ویرایش گروه ویژگی</CardTitle>
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
                              invalid={
                                formik.touched.name && !!formik.errors.name
                              }
                            />
                            <FormFeedback>{formik.errors.name}</FormFeedback>
                          </div>
                        </Col>{" "}
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="display_order">ترتیب نمایش</Label>
                            <Input
                              id="display_order"
                              name="display_order"
                              type="text"
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
                          ذخیره تغییرات
                        </Button>
                        <Button
                          type="button"
                          color="secondary"
                          onClick={toggle}
                        >
                          انصراف
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </OptionalSizes>
  );
};

export default UpdateAttributeGroupModal;
