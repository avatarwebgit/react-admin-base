import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../styles/categories.scss";
import { getCoupons } from "../../../store/e-commerce/actions";
import CreateCouponModal from "./CreateCouponModal";
import CouponRow from "./CouponRow";
import UpdateCouponModal from "./UpdateCouponModal";
import { useSort } from "../../../hooks/useSort";

const EcommerceCoupons = () => {
  const coupons = useSelector((state) => state.ecommerce.coupons.items);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  const { items: sortedCoupons } = useSort(coupons, {
    key: "display_order",
    direction: "asc",
  });

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="کوپن ها" />
        <Row
          className="d-flex align-items-center justify-content-start"
          dir="ltr"
        >
          <Col sm="2">
            <Button
              color="primary"
              onClick={() => setCreateModalOpen(true)}
              className="my-3"
            >
              <span>ایجاد کوپن جدید</span>
              <i
                className="mdi mdi-chart-box-plus-outline"
                style={{ color: "#fff" }}
              ></i>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle className="h4">مدیریت کوپن ها</CardTitle>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th className="text-center">ردیف</th>
                        <th className="text-center">کد کوپن</th>
                        <th className="text-center">میزان تخفیف</th>
                        <th className="text-center">تاریخ انقضا</th>
                        <th className="text-center">محدودیت استفاده</th>
                        <th className="text-center">حداقل خرید</th>
                        <th className="text-center">کاربران اختصاص یافته</th>
                        <th className="text-center">وضعیت</th>
                        <th className="text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCoupons.map((coupon, i) => (
                        <CouponRow
                          key={coupon.id}
                          coupon={coupon}
                          index={i}
                          setUpdateModalOpen={setUpdateModalOpen}
                          setSelectedId={setSelectedId}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <CreateCouponModal
          isOpen={createModalOpen}
          toggle={() => setCreateModalOpen(!createModalOpen)}
        />
        <UpdateCouponModal
          isOpen={updateModalOpen}
          toggle={() => setUpdateModalOpen(!updateModalOpen)}
          couponId={selectedId}
        />
      </Container>
    </div>
  );
};

export default EcommerceCoupons;
