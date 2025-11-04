import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 Button,
 Card,
 CardBody,
 CardTitle,
 Col,
 Container,
 Form,
 FormFeedback,
 Input,
 Label,
 Row,
} from 'reactstrap';
import * as yup from 'yup';
import {
 showDiscount,
 updateDiscount,
} from '../../../store/e-commerce/actions';
import OptionalSizes from '../../Ui/UiModal/OptionalSizes';

const UpdateDiscountModal = ({ discountId, isOpen, toggle }) => {
 const discountDetails = useSelector(
  state => state.ecommerce.discountDetails[discountId],
 );

 const [initialValues, setInitialValues] = useState({
  code: '',
  amount: '',
  type: 'percentage',
  start_date: '',
  end_date: '',
 });

 const dispatch = useDispatch();

 useEffect(() => {
  if (discountDetails) {
   setInitialValues(discountDetails);
  }
  if (!discountDetails && discountId !== null) {
   dispatch(showDiscount(discountId));
  }
 }, [isOpen, discountId, discountDetails]);

 const formik = useFormik({
  initialValues,
  enableReinitialize: true,
  validationSchema: yup.object().shape({
   code: yup.string().required('کد تخفیف الزامی است'),
   amount: yup.number().required('مقدار تخفیف الزامی است'),
   type: yup.string().required('نوع تخفیف الزامی است'),
   start_date: yup.string().required('تاریخ شروع الزامی است'),
   end_date: yup.string().required('تاریخ پایان الزامی است'),
  }),
  onSubmit: async values => {
   try {
    const payload = {
     id: discountId,
     code: values.code,
     amount: values.amount,
     type: values.type,
     start_date: values.start_date,
     end_date: values.end_date,
    };

    dispatch(updateDiscount(payload));
    toggle();
    formik.resetForm();
   } catch (error) {
    console.error('خطا در بروزرسانی تخفیف:', error);
    const errorMessage =
     error?.response?.data?.message ||
     error?.message ||
     'مشکلی در بروزرسانی تخفیف وجود دارد';
    toast.error(errorMessage);
   }
  },
 });

 return (
  <OptionalSizes center={true} size={'xl'} isOpen={isOpen} toggle={toggle}>
   <Container fluid>
    <Row>
     <Col xs='12'>
      <Card>
       <CardBody>
        <CardTitle tag='h4'>ویرایش تخفیف</CardTitle>
        <p className='card-title-desc mb-4'>اطلاعات زیر را ویرایش کنید</p>

        <Form onSubmit={formik.handleSubmit} autoComplete='off'>
         <Row>
          <Col sm='6'>
           <div className='mb-3'>
            <Label htmlFor='code'>کد تخفیف</Label>
            <Input
             id='code'
             name='code'
             type='text'
             placeholder='کد تخفیف'
             value={formik.values.code}
             onChange={formik.handleChange}
             invalid={formik.touched.code && formik.errors.code}
            />
            {formik.errors.code && formik.touched.code && (
             <FormFeedback type='invalid'>{formik.errors.code}</FormFeedback>
            )}
           </div>
          </Col>
          <Col sm='6'>
           <div className='mb-3'>
            <Label htmlFor='amount'>مقدار تخفیف</Label>
            <Input
             id='amount'
             name='amount'
             type='number'
             placeholder='مقدار'
             value={formik.values.amount}
             onChange={formik.handleChange}
             invalid={formik.touched.amount && formik.errors.amount}
            />
            {formik.errors.amount && formik.touched.amount && (
             <FormFeedback type='invalid'>{formik.errors.amount}</FormFeedback>
            )}
           </div>
          </Col>
         </Row>
         <Row>
          <Col sm='6'>
           <div className='mb-3'>
            <Label htmlFor='type'>نوع تخفیف</Label>
            <Input
             id='type'
             name='type'
             type='select'
             value={formik.values.type}
             onChange={formik.handleChange}>
             <option value='percentage'>درصدی</option>
             <option value='fixed'>مقدار ثابت</option>
            </Input>
           </div>
          </Col>
          <Col sm='6'>
           <div className='mb-3'>
            <Label htmlFor='start_date'>تاریخ شروع</Label>
            <Input
             id='start_date'
             name='start_date'
             type='date'
             value={formik.values.start_date}
             onChange={formik.handleChange}
             invalid={formik.touched.start_date && formik.errors.start_date}
            />
            {formik.errors.start_date && formik.touched.start_date && (
             <FormFeedback type='invalid'>
              {formik.errors.start_date}
             </FormFeedback>
            )}
           </div>
          </Col>
         </Row>
         <Row>
          <Col sm='6'>
           <div className='mb-3'>
            <Label htmlFor='end_date'>تاریخ پایان</Label>
            <Input
             id='end_date'
             name='end_date'
             type='date'
             value={formik.values.end_date}
             onChange={formik.handleChange}
             invalid={formik.touched.end_date && formik.errors.end_date}
            />
            {formik.errors.end_date && formik.touched.end_date && (
             <FormFeedback type='invalid'>
              {formik.errors.end_date}
             </FormFeedback>
            )}
           </div>
          </Col>
         </Row>
         <div className='d-flex flex-wrap gap-2'>
          <Button type='submit' color='primary' disabled={formik.isSubmitting}>
           ذخیره تغییرات
          </Button>
          <Button type='button' color='secondary' onClick={toggle}>
           لغو
          </Button>
         </div>
        </Form>
       </CardBody>
      </Card>
     </Col>
    </Row>
   </Container>
  </OptionalSizes>
 );
};

export default UpdateDiscountModal;
