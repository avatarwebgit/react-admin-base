import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";

import { useDispatch } from "react-redux";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import NoData from "../../../components/Common/NoData";
import { getProducts } from "../../../store/actions";
import ProductFilters from "./ProductFilters";
import ProductRow from "./ProductRow";
import ProductUpdateModal from "./ProductUpdateModal";
import ProductSummary from "./ProductsSummary";
const EcommerceProducts = () => {
  const [updateProductModalOpen, setUpdateProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);

  const { items: products, pagination } = useSelector(
    (state) => state.ecommerce.products
  );

  const { productLoading, productFilters } = useSelector(
    (state) => state.ecommerce
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleUpdateModal = () => {
    setUpdateProductModalOpen(!updateProductModalOpen);
  };

  const handleOpenEditModal = () => {
    setUpdateProductModalOpen(true);
  };

  const handlePaginationChange = (page) => {
    dispatch(getProducts({ page, ...productFilters }));
  };

  return (
    <React.Fragment>
      <div className="page-content category-main-container">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem=" محصولات" />

          <ProductSummary />

          <ProductFilters />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Row
                    className="d-flex align-items-center justify-content-between"
                    dir="ltr"
                  >
                    <Col sm="6">
                      <div className="d-flex align-items-center my-3">
                        <Link
                          type="submit"
                          className="btn btn-primary btn-sm d-flex align-items-center"
                          to={"/ecommerce-add-product"}
                        >
                          <i
                            className="mdi mdi-chart-box-plus-outline"
                            style={{ color: "#fff !important" }}
                          ></i>
                          <span>ایجاد محصول</span>
                        </Link>
                        <Link
                          type="submit"
                          className="btn btn-primary btn-sm d-flex align-items-center me-2"
                          to={"/ecommerce-measurements"}
                        >
                          <i
                            className="mdi mdi-tape-measure"
                            style={{ color: "#fff !important" }}
                          ></i>
                          <span>واحد های اندازه گیری</span>
                        </Link>
                      </div>
                    </Col>
                    <Col sm="6">
                      <CardTitle className="h4">محصولات</CardTitle>
                    </Col>
                  </Row>
                  {productLoading && (
                    <div className="w-full d-flex align-items-center justify-content-center">
                      <Spinner color="primary" size={"sm"} />
                    </div>
                  )}

                  {products.length <= 0 && !productLoading && <NoData />}

                  {!productLoading && products.length && (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col">ردیف</th>
                            <th scope="col" className="text-center">
                              نام
                            </th>
                            <th scope="col" className="text-center">
                              کد
                            </th>
                            <th scope="col" className="text-center action-span">
                              اولویت
                            </th>
                            <th scope="col" className="text-center">
                              دسته بندی والد
                            </th>
                            <th scope="col" className="text-center action-span">
                              ویرایش
                            </th>
                            <th scope="col" className="text-center">
                              تصویر اصلی
                            </th>
                            <th scope="col" className="text-center action-span">
                              تصاویر
                            </th>
                            <th scope="col" className="text-center action-span">
                              مشخصات فنی
                            </th>
                            <th scope="col" className="text-center action-span">
                              تنوع کالا
                            </th>
                            <th scope="col" className="text-center action-span">
                              اقلام افزوده
                            </th>
                            <th scope="col" className="text-center action-span">
                              فروش ویژه
                            </th>
                            <th scope="col" className="text-center action-span">
                              موجودی
                            </th>
                            <th scope="col" className="text-center">
                              بازدید
                            </th>
                            <th scope="col" className="text-center">
                              اولویت نمایش
                            </th>
                            <th scope="col" className="text-center">
                              قیمت
                            </th>
                            <th scope="col" className="text-center">
                              عملیات
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {products &&
                            products.map((product, i) => {
                              return (
                                <ProductRow
                                  data={product}
                                  index={
                                    (pagination.current_page - 1) *
                                      pagination.per_page +
                                    i +
                                    1
                                  }
                                  isEditing={handleOpenEditModal}
                                  productId={setEditingProductId}
                                  key={product.id}
                                />
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="d-flex flex-column justify-content-center align-items-center">
                    {pagination && pagination.total > 15 && (
                      <CustomPagination
                        pagination={pagination}
                        onPageChange={handlePaginationChange}
                      />
                    )}
                    <div className="d-flex justify-content-center align-items-center goto-page">
                      <label for="goto-input">برو به صفحه</label>
                      <input
                        type="number"
                        id="goto-input"
                        min={1}
                        max={pagination.last_page}
                        placeholder=" چند؟"
                        value={selectedPage}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          const newValue =
                            value > pagination.last_page
                              ? pagination.last_page
                              : value;
                          setSelectedPage(newValue);
                        }}
                      />
                      <button
                        id="goto-btn"
                        onClick={() => {
                          handlePaginationChange(selectedPage);
                        }}
                      >
                        برو
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ProductUpdateModal
        isOpen={updateProductModalOpen}
        toggle={toggleUpdateModal}
        productId={editingProductId}
      />
    </React.Fragment>
  );
};

export default EcommerceProducts;
