import React from 'react';
import { Col, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { deleteDiscount } from '../../../store/e-commerce/actions';
import { useSelector } from 'react-redux';

const DiscountRow = ({
 discount,
 index,
 isUpdateModalOpen,
 sendDiscountId,
}) => {
 const isLoading = useSelector(state => state.ecommerce.loading);
 const dispatch = useDispatch();

 const handleDeleteDiscount = () => {
  dispatch(deleteDiscount(discount.id));
 };

 const handleOpenUpdateModal = () => {
  isUpdateModalOpen(true);
  sendDiscountId(discount.id);
 };

 return (
  <>
   {discount && (
    <tr>
     <td className='text-nowrap' scope='row'>
      {index + 1}
     </td>
     <td>{discount.code}</td>
     <td>{discount.amount}</td>
     <td>{discount.type === 'percentage' ? 'درصدی' : 'مقدار ثابت'}</td>
     <td>{discount.start_date}</td>
     <td>{discount.end_date}</td>
     <td colSpan='1'>
      <Row>
       <Col sm='12'>
        <Row className='d-flex align-items-center justify-content-center'>
         <Col sm='4'>
          <button
           onClick={handleOpenUpdateModal}
           id='edit-btn'
           style={{ background: 'transparent', border: 'none' }}>
           <i
            className='bx bx-edit-alt fs-2 color-green pointer'
            style={{ color: 'green', cursor: 'pointer' }}></i>
          </button>
         </Col>
         <Col sm='4'>
          <button
           onClick={handleDeleteDiscount}
           style={{ background: 'transparent', border: 'none' }}
           disabled={isLoading}>
           <i
            className='bx bxs-trash-alt fs-2 color-green pointer'
            style={{ color: 'red', cursor: 'pointer' }}></i>
          </button>
         </Col>
        </Row>
       </Col>
      </Row>
     </td>
    </tr>
   )}
  </>
 );
};

export default DiscountRow;
