import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Label, Row } from "reactstrap";
import * as yup from "yup";
import { DeleteIcon, EditIcon } from "../../../components/Common/icons";
import { openDeleteModal } from "../../../store/_global/actions";
import {
  getMeasurement,
  updateMeasurement,
} from "../../../store/e-commerce/actions";
import { DELETE_MEASUREMENT } from "../../../store/e-commerce/actionTypes";

const Unit = ({ unit, index, isEditing, unitId }) => {
  const unitDetail = useSelector((state) => state.ecommerce.measurement);
  const { isLoading } = useSelector((state) => state.ecommerce);

  const [createUnitModalOpen, setCreateUnitModalOpen] = useState(false);

  const [initialValues, setInitialValues] = useState(null);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("لطفا نام واحد را وارد کنید"),
      symbol: yup.string().required("لطفا نماد واحد را وارد کنید"),
    }),
    onSubmit: async (values) => {
      const cleanValues = {
        name: values.name?.trim(),
        symbol: values.symbol?.trim(),
      };

      const cleanInitial = {
        name: initialValues.name?.trim(),
        symbol: initialValues.symbol?.trim(),
      };

      const noChange =
        JSON.stringify(cleanValues) === JSON.stringify(cleanInitial);

      if (noChange) {
        toast.info("هیچ تغییری اعمال نشده است.");
        return;
      }

      const payload = {
        ...cleanValues,
        id: unit.id,
      };
      try {
        dispatch(updateMeasurement(payload));
        setCreateUnitModalOpen(false);
        formik.resetForm();
      } catch (error) {}
    },
  });

  const toggle = () => setCreateUnitModalOpen(!createUnitModalOpen);

  useEffect(() => {
    if (createUnitModalOpen) {
      dispatch(getMeasurement(unit.id));
    }
  }, [createUnitModalOpen]);

  useEffect(() => {
    setInitialValues(unitDetail);
  }, [unitDetail]);

  const handleDeleteItems = () => {
    dispatch(
      openDeleteModal({
        message: `آیا از پاک کردن واحد اندازه گیری ${unit.name} اطمینان دارید؟`,
        actionType: DELETE_MEASUREMENT,
        id: unit.id,
        title: "حذف واحد اندازه گیری",
      })
    );
  };

  const handleOpenEditModal = () => {
    isEditing(true);
    unitId(unit.id);
  };

  return (
    unit && (
      <tr>
        <td className="text-nowrap" scope="row">
          {index}
        </td>
        <td>{unit.name}</td>
        <td>{unit.symbol}</td>
        <td colSpan="1">
          <Row>
            <Col sm="12">
              <Row className="d-flex align-items-center justify-content-center">
                <Col sm="4">
                  <button
                    onClick={handleOpenEditModal}
                    id="edit-btn"
                    style={{ background: "transparent", border: "none" }}
                  >
                    {EditIcon}
                  </button>
                </Col>
                <Col sm="4">
                  <button
                    onClick={() => handleDeleteItems()}
                    style={{ background: "transparent", border: "none" }}
                    disabled={isLoading}
                  >
                    {DeleteIcon}
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </td>
      </tr>
    )
  );
};

export default Unit;
