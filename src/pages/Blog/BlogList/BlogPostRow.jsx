import React from "react";
import { Badge } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
// import { deleteBlogPost } from '../../../store/blog/actions'; // Hypothetical action
import { openDeleteModal } from "../../../store/_global/actions"; // Assuming this exists from other modules
import { EditIcon, DeleteIcon } from "../../../components/Common/icons"; // Assuming these exist

const BlogPostRow = ({
  post,
  index,
  setUpdateModalOpen,
  setSelectedPostId,
}) => {
  const isLoading = useSelector((state) => state.blog?.loading || false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    // dispatch(deleteBlogPost(post.id));
    dispatch(
      openDeleteModal({
        message: `آیا از حذف پست "${post.title}" اطمینان دارید؟`,
        actionType: "DELETE_BLOG_POST", // Hypothetical
        id: post.id,
        title: "حذف پست بلاگ",
      })
    );
  };

  const handleOpenUpdateModal = () => {
    setSelectedPostId(post.id);
    setUpdateModalOpen(true);
  };

  const statusBadge = {
    Published: { color: "success", text: "منتشر شده" },
    Draft: { color: "secondary", text: "پیش‌نویس" },
  };

  return (
    <tr>
      <td className="text-center">{index + 1}</td>
      <td className="text-center">
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            style={{
              width: "80px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          "-"
        )}
      </td>
      <td>{post.title}</td>
      <td className="text-center">{post.category}</td>
      <td className="text-center">
        <Badge color={statusBadge[post.status]?.color || "light"}>
          {statusBadge[post.status]?.text || post.status}
        </Badge>
      </td>
      <td className="text-center">{post.published_at}</td>
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

export default BlogPostRow;
