import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDeleteModal } from "../../../store/_global/actions";
import { EditIcon, DeleteIcon } from "../../../components/Common/icons";

const BlogCategoryRow = ({
  category,
  index,
  setUpdateModalOpen,
  setSelectedCategoryId,
}) => {
  const isLoading = useSelector((state) => state.blog?.loading || false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      openDeleteModal({
        message: `آیا از حذف دسته بندی "${category.name}" اطمینان دارید؟`,
        actionType: "DELETE_BLOG_CATEGORY", // Hypothetical
        id: category.id,
        title: "حذف دسته بندی بلاگ",
      })
    );
  };

  const handleOpenUpdateModal = () => {
    setSelectedCategoryId(category.id);
    setUpdateModalOpen(true);
  };

  return (
    <tr>
      <td className="text-center">{index + 1}</td>
      <td>{category.name}</td>
      <td>{category.slug}</td>
      <td className="text-center">{category.post_count}</td>
      <td>
        <div className="d-flex gap-2 justify-content-center">
          <button
            onClick={handleOpenUpdateModal}
            style={{ background: "transparent", border: "none" }}
          >
            {EditIcon}
          </button>
          <button
            onClick={handleDelete}
            style={{ background: "transparent", border: "none" }}
            disabled={isLoading}
          >
            {DeleteIcon}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogCategoryRow;
