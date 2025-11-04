import React, { useEffect, useMemo, useState } from "react";
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

import moment from "moment";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import DeleteModal from "../../../components/Common/DeleteModal";
import Spinners from "../../../components/Common/Spinner";
import EcommerceOrdersModal from "./EcommerceOrdersModal";
import OrderFilters from "./OrderFilters";
import OrderModal from "./OrderModal";
import OrderRow from "./OrderRow";
import {
  addNewOrder as onAddNewOrder,
  deleteOrder as onDeleteOrder,
  getOrders as onGetOrders,
  updateOrder as onUpdateOrder,
} from "/src/store/actions";

const EcommerceOrder = () => {
  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [order, setOrder] = useState(null);
  const [transaction, setTransaction] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.ecommerce);
  console.log(orders);
  const [isLoading, setLoading] = useState(loading);

  const [filters, setFilters] = useState({
    orderId: "",
    billingName: "",
    orderDate: [],
    paymentStatus: "",
    paymentMethod: "",
    price: 0,
  });
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [maxOrderPrice, setMaxOrderPrice] = useState(1000);

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders());
    } else if (orders && orders.length > 0) {
      const maxPrice = Math.max(...orders.map((o) => parseFloat(o.total)));
      const roundedMax = Math.ceil(maxPrice / 100) * 100;
      setMaxOrderPrice(roundedMax);
      setFilters((prev) => ({ ...prev, price: roundedMax }));
      setFilteredOrders(orders);
    }
  }, [dispatch, orders]);

  const stats = useMemo(() => {
    if (orders && orders.length > 0) {
      return {
        total: orders.length,
        successful: orders.filter((o) => o.paymentStatus === "پرداخت شده")
          .length,
        completed: orders.filter((o) => o.paymentStatus === "پرداخت شده")
          .length,
        cancelled: orders.filter((o) => o.paymentStatus === "بازپرداخت").length,
      };
    }
    return { total: 0, successful: 0, completed: 0, cancelled: 0 };
  }, [orders]);

  const toggle = () => setModal(!modal);
  const toggleViewModal = () => setViewModal(!viewModal);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates) => {
    setFilters((prev) => ({ ...prev, orderDate: dates }));
  };

  const applyFilters = () => {
    let tempOrders = [...orders];

    if (filters.orderId) {
      tempOrders = tempOrders.filter((o) =>
        o.orderId.toLowerCase().includes(filters.orderId.toLowerCase())
      );
    }
    if (filters.billingName) {
      tempOrders = tempOrders.filter((o) =>
        o.billingName.toLowerCase().includes(filters.billingName.toLowerCase())
      );
    }
    if (filters.paymentStatus) {
      tempOrders = tempOrders.filter(
        (o) => o.paymentStatus === filters.paymentStatus
      );
    }
    if (filters.paymentMethod) {
      tempOrders = tempOrders.filter(
        (o) => o.paymentMethod === filters.paymentMethod
      );
    }
    if (filters.orderDate && filters.orderDate.length === 2) {
      const startDate = new Date(filters.orderDate[0]);
      const endDate = new Date(filters.orderDate[1]);
      endDate.setHours(23, 59, 59, 999); // Include the whole end day

      tempOrders = tempOrders.filter((o) => {
        const orderDate = new Date(
          moment(o.orderDate, "DD MMMM, YYYY").format("YYYY-MM-DD")
        );
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    if (filters.price < maxOrderPrice) {
      tempOrders = tempOrders.filter(
        (o) => parseFloat(o.total) <= parseFloat(filters.price)
      );
    }

    setFilteredOrders(tempOrders);
  };

  const clearFilters = () => {
    setFilters({
      orderId: "",
      billingName: "",
      orderDate: [],
      paymentStatus: "",
      paymentMethod: "",
      price: maxOrderPrice,
    });
    setFilteredOrders(orders);
  };

  const handleEditOrder = (arg) => {
    setOrder(arg);
    setIsEdit(true);
    toggle();
  };

  const handleAddOrder = () => {
    setOrder(null);
    setIsEdit(false);
    toggle();
  };

  const handleDeleteOrderClick = (arg) => {
    setOrder(arg);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (order && order.id) {
      dispatch(onDeleteOrder(order.id));
      setDeleteModal(false);
      setOrder(null);
    }
  };

  const handleViewOrder = (arg) => {
    setTransaction(arg);
    toggleViewModal();
  };

  const onOrderSubmit = (values, isEditMode) => {
    const getBadgeClass = (paymentStatus) => {
      switch (paymentStatus) {
        case "پرداخت شده":
          return "success";
        case "شارژ مجدد":
          return "danger";
        case "بازپرداخت":
          return "warning";
        default:
          return "success";
      }
    };

    const orderData = {
      ...values,
      badgeClass: getBadgeClass(values.paymentStatus),
    };

    if (isEditMode) {
      orderData.id = order ? order.id : 0;
      dispatch(onUpdateOrder(orderData));
    } else {
      orderData.id = Math.floor(Math.random() * (30 - 20)) + 20;
      dispatch(onAddNewOrder(orderData));
    }
  };

  const handlePaginationChange = (page) => {
    // dispatch(getorder(page));
    console.log(page);
  };

  return (
    <React.Fragment>
      <EcommerceOrdersModal
        isOpen={viewModal}
        toggle={toggleViewModal}
        transaction={transaction}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="سفارشات" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <>
              <Row>
                <Col md={3}>
                  <Card className="stat-card total-orders">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-truncate font-size-14 mb-2">
                            مجموع سفارشات
                          </p>
                          <h4 className="mb-2">{stats.total}</h4>
                        </div>
                        <div className="avatar-sm">
                          <span className="avatar-title bg-light text-primary rounded-3">
                            <i className="mdi mdi-cart-outline font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="stat-card successful-orders">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-truncate font-size-14 mb-2">
                            سفارشات موفق
                          </p>
                          <h4 className="mb-2">{stats.successful}</h4>
                        </div>
                        <div className="avatar-sm">
                          <span className="avatar-title bg-light text-success rounded-3">
                            <i className="mdi mdi-check-circle-outline font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="stat-card completed-orders">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-truncate font-size-14 mb-2">
                            تکمیل شده
                          </p>
                          <h4 className="mb-2">{stats.completed}</h4>
                        </div>
                        <div className="avatar-sm">
                          <span className="avatar-title bg-light text-info rounded-3">
                            <i className="mdi mdi-package-variant-closed font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="stat-card cancelled-orders">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-truncate font-size-14 mb-2">
                            لغو شده
                          </p>
                          <h4 className="mb-2">{stats.cancelled}</h4>
                        </div>
                        <div className="avatar-sm">
                          <span className="avatar-title bg-light text-danger rounded-3">
                            <i className="mdi mdi-cancel font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <OrderFilters
                isOpen={isFilterOpen}
                toggle={toggleFilter}
                filters={filters}
                maxPrice={maxOrderPrice}
                onFilterChange={handleFilterChange}
                onDateChange={handleDateChange}
                onApplyFilters={applyFilters}
                onClearFilters={clearFilters}
              />

              <Row>
                <Col xs="12">
                  <Card className="card-orders-list">
                    <CardBody>
                      <Row className="mb-2">
                        <Col sm="6">
                          <CardTitle className="h4">لیست سفارشات</CardTitle>
                        </Col>
                        <Col sm="6">
                          <div className="text-sm-end">
                            <Button
                              type="button"
                              color="primary"
                              className="waves-effect waves-light"
                              onClick={handleAddOrder}
                            >
                              <i className="mdi mdi-plus me-1"></i> افزودن سفارش
                              جدید
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <table className="table align-middle table-nowrap table-check">
                          <thead className="table-light">
                            <tr>
                              <th
                                style={{ width: "20px" }}
                                className="align-middle"
                              >
                                <div className="form-check font-size-16">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="checkAll"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="checkAll"
                                  ></label>
                                </div>
                              </th>
                              <th className="align-middle">شماره سفارش</th>
                              <th className="align-middle">نام صورتحساب</th>
                              <th className="align-middle">تاریخ</th>
                              <th className="align-middle">مجموع</th>
                              <th className="align-middle">وضعیت پرداخت</th>
                              <th className="align-middle"> وضعیت سفارش</th>
                              <th className="align-middle">روش پرداخت</th>
                              <th className="align-middle text-center">
                                عملیات
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredOrders && filteredOrders.length > 0 ? (
                              filteredOrders.map((order) => (
                                <OrderRow
                                  key={order.id}
                                  order={order}
                                  onEdit={handleEditOrder}
                                  onDelete={handleDeleteOrderClick}
                                  onView={handleViewOrder}
                                />
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  هیچ سفارشی یافت نشد.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          )}
          {/* <CustomPagination
            pagination={order.pagination}
            onPageChange={handlePaginationChange}
          /> */}
          <OrderModal
            isOpen={modal}
            toggle={toggle}
            order={order}
            isEdit={isEdit}
            onOrderSubmit={onOrderSubmit}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceOrder;
