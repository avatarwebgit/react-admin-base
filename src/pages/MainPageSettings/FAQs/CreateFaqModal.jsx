import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";

const CreateFaqModal = ({ isOpen, toggle, onAdd }) => {
  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema: yup.object({
      question: yup.string().required("متن پرسش الزامی است"),
      answer: yup.string().required("متن پاسخ الزامی است"),
    }),
    onSubmit: (values) => {
      onAdd(values);
      formik.resetForm();
      toggle();
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>افزودن پرسش و پاسخ جدید</ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup className="mb-3">
            <Label htmlFor="question">پرسش</Label>
            <Input
              id="question"
              name="question"
              type="text"
              placeholder="پرسش را وارد کنید"
              value={formik.values.question}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.question && !!formik.errors.question}
            />
            <FormFeedback>{formik.errors.question}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="answer">پاسخ</Label>
            <Input
              id="answer"
              name="answer"
              type="textarea"
              rows="5"
              placeholder="پاسخ را وارد کنید"
              value={formik.values.answer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.answer && !!formik.errors.answer}
            />
            <FormFeedback>{formik.errors.answer}</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            انصراف
          </Button>
          <Button color="primary" type="submit">
            افزودن
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CreateFaqModal;
