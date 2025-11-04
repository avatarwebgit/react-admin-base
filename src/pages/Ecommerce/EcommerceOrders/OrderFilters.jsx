import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Collapse,
  Input,
  Label,
  Row,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const OrderFilters = ({
  isOpen,
  toggle,
  filters,
  onFilterChange,
  onDateChange,
  onApplyFilters,
  onClearFilters,
}) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <CardTitle className="h4 mb-0">فیلتر سفارشات</CardTitle>
          <Button color="primary" onClick={toggle} className="btn-sm">
            {isOpen ? "پنهان کردن فیلتر" : "نمایش فیلتر"}
            <i
              className={`mdi ${
                isOpen ? "mdi-chevron-up" : "mdi-chevron-down"
              } ms-1`}
            ></i>
          </Button>
        </div>
        <Collapse isOpen={isOpen} className="filter-collapse">
          <div className="p-3 border rounded">
            <Row className="g-3">
              <Col md={3}>
                <Label htmlFor="userTypeFilter">نوع کاربر</Label>
                <Input
                  id="userTypeFilter"
                  type="select"
                  name="userType"
                  value={filters.userType}
                  onChange={onFilterChange}
                >
                  <option value="">همه کاربران</option>
                  {/* Add other user types if available */}
                </Input>
              </Col>
              <Col md={3}>
                <Label htmlFor="userSearchFilter">جستجوی کاربر</Label>
                <Input
                  id="userSearchFilter"
                  name="userSearch"
                  placeholder="نام، کد ملی یا شماره تماس..."
                  value={filters.userSearch}
                  onChange={onFilterChange}
                />
              </Col>
              <Col md={3}>
                <Label htmlFor="saleTypeFilter">نوع فروش</Label>
                <Input
                  id="saleTypeFilter"
                  type="select"
                  name="saleType"
                  value={filters.saleType}
                  onChange={onFilterChange}
                >
                  <option value="">همه انواع</option>
                  {/* Add other sale types if available */}
                </Input>
              </Col>
              <Col md={3}>
                <Label htmlFor="statusFilter">وضعیت سفارش</Label>
                <Input
                  id="statusFilter"
                  type="select"
                  name="orderStatus"
                  value={filters.orderStatus}
                  onChange={onFilterChange}
                >
                  <option value="">همه وضعیت‌ها</option>
                  <option>پرداخت شده</option>
                  <option>شارژ مجدد</option>
                  <option>بازپرداخت</option>
                </Input>
              </Col>
              <Col md={3}>
                <Label htmlFor="fromDateFilter">از تاریخ</Label>
                <Flatpickr
                  id="fromDateFilter"
                  className="form-control"
                  name="fromDate"
                  placeholder="انتخاب تاریخ شروع"
                  options={{ dateFormat: "Y-m-d" }}
                  value={filters.fromDate}
                  onChange={(date) => onDateChange("fromDate", date[0])}
                />
              </Col>
              <Col md={3}>
                <Label htmlFor="toDateFilter">تا تاریخ</Label>
                <Flatpickr
                  id="toDateFilter"
                  className="form-control"
                  name="toDate"
                  placeholder="انتخاب تاریخ پایان"
                  options={{ dateFormat: "Y-m-d" }}
                  value={filters.toDate}
                  onChange={(date) => onDateChange("toDate", date[0])}
                />
              </Col>
              <Col md={3}>
                <Label htmlFor="minAmountFilter">حداقل مبلغ</Label>
                <Input
                  id="minAmountFilter"
                  name="minAmount"
                  type="number"
                  placeholder="0"
                  value={filters.minAmount}
                  onChange={onFilterChange}
                />
              </Col>
              <Col md={3}>
                <Label htmlFor="maxAmountFilter">حداکثر مبلغ</Label>
                <Input
                  id="maxAmountFilter"
                  name="maxAmount"
                  type="number"
                  placeholder="حداکثر مبلغ"
                  value={filters.maxAmount}
                  onChange={onFilterChange}
                />
              </Col>
            </Row>
            <div className="mt-4 d-flex justify-content-end gap-2">
              <Button color="primary" onClick={onApplyFilters}>
                اعمال فیلتر
              </Button>
              <Button color="secondary" onClick={onClearFilters}>
                پاک کردن فیلتر
              </Button>
            </div>
          </div>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default OrderFilters;
