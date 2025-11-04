import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import {
  CheckIcon,
  CopyIcon,
  CrossIcon,
  DeleteIcon,
  EditIcon,
  FillIcon,
  GearIcon,
  PlusIcon,
} from "../../../components/Common/icons";

import { getCategory, updateProduct } from "../../../store/e-commerce/actions";
import { DELETE_PRODUCT } from "../../../store/e-commerce/actionTypes";
import { openDeleteModal } from "../../../store/_global/actions";

const ProductRow = ({ data, index, isEditing, productId }) => {
  const categories = useSelector((state) => state.ecommerce.categories.items);
  const { isLoading } = useSelector((state) => state.ecommerce);

  const [updateProductModalOpen, setUpdateProductModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateProductModalOpen) {
      dispatch(getCategory(category.id));
    }
    if (categories) {
      setCategoryOptions(
        categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    }
  }, [categories, updateProductModalOpen]);

  const handleUpdateProductActivityStatus = () => {
    const payload = { ...data, id: data.id, is_active: !data.is_active };
    dispatch(
      updateProduct({
        ...payload,
        original_price: +data.original_price,
      })
    );
  };

  const handleDeleteProduct = () => {
    dispatch(
      openDeleteModal({
        message: `آیا از پاک کردن محصول  " ${data.name} " اطمینان دارید؟`,
        actionType: DELETE_PRODUCT,
        id: data.id,
        title: "حذف محصول",
      })
    );
  };

  const handleOpenEditModal = () => {
    isEditing(true);
    productId(data.id);
  };

  return (
    data && (
      <tr>
        <td className="text-nowrap" scope="row">
          {index}
        </td>
        <td>{data.name}</td>

        <td colSpan="1"> {}</td>
        <td colSpan="1"> {data.display_order}</td>
        <td className="text-nowrap" scope="row">
          {[...new Set(data.categories?.map((cat) => cat.name))].map((name) => (
            <span key={name}>
              {name}
              <br />
            </span>
          )) || "-"}
        </td>
        <td colSpan="1">
          <button
            id="edit-btn"
            style={{ background: "transparent", border: "none" }}
            onClick={handleOpenEditModal}
          >
            {EditIcon}
          </button>
        </td>
        <td colSpan="1"> {}</td>
        <td colSpan="1">
          <Link to={`/ecommerce-products/gallery/${data.id}`}>
            <i className="bx bx-images fs-4 text-secondary"></i>
          </Link>
        </td>
        <td colSpan="1">
          <Link to={`/ecommerce-products/attributes/${data.id}`}>
            {GearIcon}
          </Link>
        </td>
        <td colSpan="1">
          <Link to={`/ecommerce-products/variants/${data.id}`}>{FillIcon}</Link>
        </td>
        <td colSpan="1">
          <button id="edit-btn">{PlusIcon}</button>
        </td>
        <td colSpan="1">
          <button onClick={handleUpdateProductActivityStatus}>
            {data.is_active ? CheckIcon : CrossIcon}
          </button>
        </td>
        <td colSpan="1">
          <button onClick={handleUpdateProductActivityStatus}>
            {data.is_active ? CheckIcon : CrossIcon}
          </button>
        </td>

        <td colSpan="1"> {}</td>
        <td colSpan="1"> {}</td>
        <td colSpan="1">
          {Intl.NumberFormat("fa-IR").format(data.original_price)} تومان
        </td>
        <td colSpan="1">
          <button id={`copyButton-${data.id}`} className="primary">
            {CopyIcon}
          </button>
          <UncontrolledTooltip target={`copyButton-${data.id}`} placement="top">
            کپی کردن محصول
          </UncontrolledTooltip>

          <button
            id={`deleteButton-${data.id}`}
            className="primary"
            onClick={handleDeleteProduct}
          >
            {DeleteIcon}
          </button>
          <UncontrolledTooltip
            target={`deleteButton-${data.id}`}
            placement="top"
          >
            حذف محصول
          </UncontrolledTooltip>
        </td>
      </tr>
    )
  );
};

export default ProductRow;
