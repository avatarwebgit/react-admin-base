import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';

import { deleteAttributeGroup } from '../../../store/e-commerce/actions';
import { openDeleteModal } from '../../../store/actions';
import { DELETE_ATTRIBUTE_GROUP } from '../../../store/e-commerce/actionTypes';
import { DeleteIcon, EditIcon } from '../../../components/Common/icons';

const AttributeGroupRow = ({ group, index, onEdit, editId }) => {
 const { attributeGroupLoading } = useSelector(
   (state) => state.ecommerce.loading
 );

 const dispatch = useDispatch();

 const handleOpenEditModal = () => {
  onEdit();
  editId(group.id);
 };

 const handleDeleteAttributeGroup = () => {
    dispatch(
        openDeleteModal({
          message: `آیا از پاک کردن دسته بندی ویژگی  " ${group.name} " اطمینان دارید؟`,
          actionType: DELETE_ATTRIBUTE_GROUP,
          id: group.id,
          title: "حذف دسته بندی ویژگی",
        })
      );
 };
 return (
   <>
     <tr>
       <th scope="row">{index + 1}</th>
       <td>{group.name}</td>
       <td>{group.display_order}</td>
       <td>
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
                   onClick={handleDeleteAttributeGroup}
                   style={{ background: "transparent", border: "none" }}
                   disabled={attributeGroupLoading}
                 >
                   {DeleteIcon}
                 </button>
               </Col>
             </Row>
           </Col>
         </Row>
       </td>
     </tr>
   </>
 );
};

export default AttributeGroupRow;
