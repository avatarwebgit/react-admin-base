import { Col, Input, Row } from "reactstrap";
import {
  CheckIcon,
  CrossIcon,
  EditIcon,
} from "../../../components/Common/icons";
import ImageWithModal from "../../../components/Common/ImageWithModal";

const CategoryRow = ({
  category,
  index,
  addToDeleteArray,
  isEditing,
  editingItemId,
}) => {
  const handleProceedUpdate = () => {
    isEditing(true);
    editingItemId(category.id);
  };

  return (
    category && (
      <tr>
        <td className="text-nowrap" scope="row">
          {index}
        </td>
        <td className="text-nowrap" scope="row">
          <Input
            id="is_active"
            name="is_active"
            type="checkbox"
            onChange={(e) => addToDeleteArray(e.target.checked, category.id)}
          />
        </td>
        <td>{category.name}</td>
        <td colSpan="1"> {category.display_order}</td>{" "}
        <td colSpan="1">
          {
            <Row>
              <Col sm="12">
                <div onClick={handleProceedUpdate}>{EditIcon}</div>
              </Col>
            </Row>
          }
        </td>
        <td colSpan="1">
          <ImageWithModal src="https://laico.co/wp-content/uploads/2022/06/kidsbedset-i2-300x300.jpg" thumbnailSize="40px" className="m-auto"/>
        </td>
        <td colSpan="1">
          <ImageWithModal src="https://laico.co/wp-content/uploads/2022/06/kidsbedset-i2-300x300.jpg" thumbnailSize="40px" className="m-auto"/>
        </td>
        <td colSpan="1">
          <ImageWithModal src="https://laico.co/wp-content/uploads/2022/06/kidsbedset-i2-300x300.jpg" thumbnailSize="40px" className="m-auto"/>
        </td>
        <td colSpan="1"> {category.parent ? category.parent.name : "-"}</td>
        <td colSpan="1">{category.is_active ? CheckIcon : CrossIcon}</td>
        <td colSpan="1">{category.is_active ? CheckIcon : CrossIcon}</td>
        <td colSpan="1"> {}</td>
        <td colSpan="1"> {}</td>
        <td colSpan="1"> {}</td>
      </tr>
    )
  );
};

export default CategoryRow;
