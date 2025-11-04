import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalHeader,
  FormFeedback,
} from "reactstrap";
import Select from "react-select";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import { addCityPrice, getProvinces } from "../../../store/e-commerce/actions";
import { useSelector } from "react-redux";
import { mapToOptions } from "../../../helpers/helperFunctions";
import { useDispatch } from "react-redux";
import SelectLoading from "../../../components/Common/SelectLoading";

const CreateCityCityShippingFee = ({
  isOpen,
  toggle,
  existingProvinces,
  deliveryMethodId,
  closeModal,
}) => {
  const [availableProvinces, setAvailableProvinces] = useState([]);

  const { provinces, provincesLoading, cityPriceCreated, cityPriceLoading } =
    useSelector((state) => state.ecommerce);

  const dispatch = useDispatch();

  useEffect(() => {
    if (provinces && Array.isArray(provinces)) {
      const filtered = provinces.filter(
        (p) => !existingProvinces.some((ep) => ep.id === p.id)
      );

      const options = mapToOptions(provinces);
      setAvailableProvinces(options);
    }
  }, [provinces]);

  const formik = useFormik({
    initialValues: {
      province_id: "",
      price: "",
    },
    validationSchema: yup.object({
      province_id: yup.number(),
      price: yup
        .string()
        .required("تعرفه الزامی است")
        .matches(/^[0-9,]+$/, "فقط اعداد و ویرگول مجاز است"),
    }),
    onSubmit: (values) => {
      const payload = {
        page: 1,
        per_page: 50,
        id: deliveryMethodId,
        items: [{ delivery_method_id: deliveryMethodId, ...values }],
      };
      dispatch(addCityPrice(payload));
    },
  });

  useEffect(() => {
    if (cityPriceCreated) {
      formik.resetForm();
      closeModal();
    }
  }, [cityPriceCreated]);

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  return (
    <OptionalSizes isOpen={isOpen} toggle={toggle} size="md" center>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <Label htmlFor="province_id">استان</Label>
            <Select
              id="province_id"
              name="province_id"
              options={availableProvinces}
              classNamePrefix="select2-selection"
              placeholder="انتخاب استان..."
              onChange={(option) =>
                formik.setFieldValue("province_id", option.value)
              }
              onBlur={() => formik.setFieldTouched("province_id", true)}
              onFocus={() => dispatch(getProvinces())}
              isLoading={provincesLoading}
              loadingMessage={() => <SelectLoading />}
              styles={{
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#fff",
                  zIndex: 9999,
                }),
                menuList: (base) => ({
                  ...base,
                  backgroundColor: "#fff",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#f8f9fa" : "#fff",
                  color: "#000",
                  cursor: "pointer",
                }),
              }}
            />
            {formik.touched.province_id && formik.errors.province_id ? (
              <div
                classprovince_id="text-danger mt-1"
                style={{ fontSize: "0.75rem" }}
              >
                {formik.errors.province_id}
              </div>
            ) : null}
          </FormGroup>
          <FormGroup className="mb-3">
            <Label htmlFor="price">تعرفه (تومان)</Label>
            <Input
              id="price"
              name="price"
              type="text"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.price && !!formik.errors.price}
            />
            <FormFeedback>{formik.errors.price}</FormFeedback>
          </FormGroup>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button color="secondary" onClick={toggle}>
              انصراف
            </Button>
            <Button
              color="primary"
              type="submit"
              className="d-flex align-items-center"
            >
              {cityPriceLoading && <div className="loader me-2"></div>}
              افزودن
            </Button>
          </div>
        </Form>
      </ModalBody>
    </OptionalSizes>
  );
};

export default CreateCityCityShippingFee;
