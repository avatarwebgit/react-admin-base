import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 Button,
 Card,
 CardBody,
 CardTitle,
 Col,
 Container,
 Row,
} from 'reactstrap';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { getDiscounts } from '../../../store/e-commerce/actions';
import '../../../styles/categories.scss';
import CreateDiscountModal from './CreateDiscountModal';
import DiscountRow from './DiscountRow';
import UpdateDiscountModal from './UpdateDiscountModal';

const index = () => {
 const discounts = useSelector(state => state.ecommerce.discounts.items);
 const [createDiscountOpen, setCreateDiscountOpen] = useState(false);
 const [updateDiscountOpen, setUpdateDiscountOpen] = useState(false);
 const [selectedDiscountId, setSelectedDiscountId] = useState(null);
 const [page, setPage] = useState(1);

 const toggleCreateModal = () => setCreateDiscountOpen(!createDiscountOpen);
 const toggleUpdateModal = () => setUpdateDiscountOpen(!updateDiscountOpen);

 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getDiscounts(page));
 }, [page]);

 return (
  <React.Fragment>
   <div className='page-content category-main-container'>
    <Container fluid>
     <Breadcrumbs title='تجارت الکترونیک' breadcrumbItem='تخفیف ها' />
     <Row
      className='d-flex align-items-center justify-content-between py-3'
      dir='ltr'>
      <Col sm='3'>
       <Button
        type='submit'
        color='primary'
        onClick={() => setCreateDiscountOpen(true)}>
        <i
         className='mdi mdi-chart-box-plus-outline'
         style={{ color: '#fff !important' }}></i>
        <span>ایجاد تخفیف جدید</span>
       </Button>
      </Col>
     </Row>
     <Row>
      <Col className='col-12'>
       <Card>
        <CardBody>
         <CardTitle className='h4'>تخفیف ها</CardTitle>
         <div className='table-responsive'>
          <table className='table table-bordered table-striped table-nowrap mb-0'>
           <thead>
            <tr>
             <th scope='col' className='text-center'>
              ردیف
             </th>
             <th scope='col' className='text-center'>
              کد تخفیف
             </th>
             <th scope='col' className='text-center'>
              مقدار
             </th>
             <th scope='col' className='text-center'>
              نوع
             </th>
             <th scope='col' className='text-center'>
              تاریخ شروع
             </th>
             <th scope='col' className='text-center'>
              تاریخ پایان
             </th>
             <th scope='col' className='text-center action-span'>
              عملیات
             </th>
            </tr>
           </thead>
           <tbody>
            {discounts &&
             discounts.map((discount, i) => (
              <DiscountRow
               discount={discount}
               index={i}
               key={discount.id}
               isUpdateModalOpen={setUpdateDiscountOpen}
               sendDiscountId={setSelectedDiscountId}
              />
             ))}
           </tbody>
          </table>
         </div>
        </CardBody>
       </Card>
      </Col>
     </Row>
    </Container>
   </div>
   <CreateDiscountModal
    isOpen={createDiscountOpen}
    toggle={toggleCreateModal}
   />
   <UpdateDiscountModal
    isOpen={updateDiscountOpen}
    toggle={toggleUpdateModal}
    discountId={selectedDiscountId}
   />
  </React.Fragment>
 );
};

export default index;
