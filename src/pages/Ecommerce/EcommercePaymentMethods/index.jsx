import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { getPaymentMethods } from "../../../store/e-commerce/actions";

import PaymentMethodRow from "./PaymentMethodRow";
import UpdatePaymentMethodModal from "./UpdatePaymentMethod";
import NoData from "../../../components/Common/NoData";

const EcommercePaymentMethods = () => {
  const { items: paymentMethods, pagination } = useSelector(
    (state) => state.ecommerce.paymentMethods
  );

  const { isloading } = useSelector((state) => state.ecommerce);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="تجارت الکترونیک"
          breadcrumbItem="درگاه های پرداخت"
        />
        
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle className="h4">لیست درگاه های پرداخت</CardTitle>
                <div className="table-responsive">
                  {paymentMethods.length === 0 && !isloading ? (
                    <NoData />
                  ) : (
                    <table className="table table-bordered table-striped table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th className="text-center">ردیف</th>
                          <th className="text-center">نام درگاه</th>
                          <th className="text-center">درصد کارمزد</th>
                          <th className="text-center">اولویت نمایش</th>
                          <th className="text-center">توضیحات کوتاه</th>
                          <th className="text-center">فعال</th>
                          <th className="text-center">عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentMethods &&
                          paymentMethods.map((item, i) => (
                            <PaymentMethodRow
                              key={item.id}
                              paymentMethod={item}
                              index={i}
                              setUpdateModalOpen={setUpdateModalOpen}
                              setSelectedId={setSelectedId}
                            />
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <UpdatePaymentMethodModal
          isOpen={updateModalOpen}
          toggle={() => setUpdateModalOpen(!updateModalOpen)}
          paymentMethodId={selectedId}
        />
      </Container>
    </div>
  );
};

export default EcommercePaymentMethods;
