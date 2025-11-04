import React, { useRef, useState } from "react";

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
import "../../../styles/categories.scss";

import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import NoData from "../../../components/Common/NoData";
import {
  deleteCategory,
  getCategories,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import CategoryFilters from "./CategoryFIlters";
import CategoryRow from "./CategoryRow";
import CategorySummary from "./CategorySummary";
import CreateCategoryModal from "./CreateCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
const EcommerceCategories = () => {
  const [searchParams] = useSearchParams();

  const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [deletItemsIds, setDeletItemsIds] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const categories = useSelector((state) => state.ecommerce.categories.items);
  const pagination = useSelector(
    (state) => state.ecommerce.categories.pagination
  );
  const { categoryLoading } = useSelector((state) => state.ecommerce);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryCartRef = useRef(null);

  const toggleCreateCategoryModal = () =>
    setCreateCategoryModalOpen(!createCategoryModalOpen);

  const toggleUpdateCategoryModal = () =>
    setIsUpdateModalOpen(!isUpdateModalOpen);

  const handleGoToMusurements = () => {
    navigate("/ecommerce-measurements");
  };

  const handleDeleteItems = () => {
    dispatch(deleteCategory({ ids: deletItemsIds }));
    setDeletItemsIds([]);
    toggle();
  };

  const handlePaginationChange = (page) => {
    const per_page = searchParams.get("per_page") || 15;
    dispatch(getCategories({ page, per_page }));
  };

  const handleAddId = (status, id) => {
    if (status) {
      setDeletItemsIds((prev) => [...prev, id]);
    } else {
      setDeletItemsIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  // useEffect(() => {
  //   if (categories.length > 0 && categoryCartRef.current) {
  //     scrollToElement(categoryCartRef, 100);
  //   }
  // }, [categories]);

  const toggle = () => setDeleteModal(!deleteModal);

  return (
    <React.Fragment>
      <div className="page-content category-main-container">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem=" دسته بندی" />

          <Row>
            <Col className="col-12">
              <CategorySummary />
              <CategoryFilters />
              <Card className="scroll-to">
                <CardBody>
                  <Row
                    className="d-flex align-items-center justify-content-between"
                    dir="ltr"
                  >
                    <Col sm="6">
                      <div className="d-flex flex-column flex-md-row align-items-stretch my-3">
                        <Button
                          type="submit"
                          color="primary"
                          onClick={() => setCreateCategoryModalOpen(true)}
                          className="btn-sm"
                        >
                          <i
                            className="mdi mdi-chart-box-plus-outline"
                            style={{ color: "#fff !important" }}
                          ></i>
                          <span>ایجاد دسته‌بندی</span>
                        </Button>
                        <Button
                          type="submit"
                          color="primary"
                          className="mx-3 btn-sm"
                          onClick={() => handleGoToMusurements()}
                        >
                          <i
                            className="mdi mdi-tape-measure"
                            style={{ color: "#fff !important" }}
                          ></i>
                          <span>واحد های اندازه گیری</span>
                        </Button>
                        <Button
                          type="submit"
                          color="danger"
                          onClick={() => setDeleteModal(true)}
                          disabled={deletItemsIds.length === 0}
                          className="btn-sm"
                        >
                          <i
                            className="mdi mdi-delete"
                            style={{ color: "#fff !important" }}
                          ></i>
                          <span>
                            {deletItemsIds.length > 0 &&
                              `(${deletItemsIds.length})`}
                            &nbsp;
                            {deletItemsIds.length > 1
                              ? "پاک کردن دسته بندی ها"
                              : "پاک کردن دسته بندی"}
                          </span>
                        </Button>
                      </div>
                    </Col>
                    <Col sm="6">
                      <CardTitle className="h4" ref={categoryCartRef}>
                        دسته بندی ها
                      </CardTitle>
                    </Col>
                  </Row>

                  {categoryLoading && (
                    <div className="w-full d-flex flex-column align-items-center justify-content-center">
                      <Spinner color="primary" size={"sm"} />
                      <br />
                      <span>در حال دریافت اطلاعات ...</span>
                    </div>
                  )}

                  {categories.length <= 0 && !categoryLoading && <NoData />}

                  {!categoryLoading && categories.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col">ردیف</th>
                            <th>انتخاب</th>
                            <th scope="col" className="text-center">
                              نام
                            </th>
                            <th scope="col" className="text-center">
                              اولویت
                            </th>
                            <th scope="col" className="text-center action-span">
                              ویرایش
                            </th>
                            <th scope="col" className="text-center">
                              آیکن
                            </th>
                            <th scope="col" className="text-center">
                              بنر
                            </th>
                            <th scope="col" className="text-center">
                              تصویر منو
                            </th>
                            <th scope="col" className="text-center">
                              والد
                            </th>
                            <th scope="col" className="text-center">
                              وضعیت
                            </th>
                            <th scope="col" className="text-center">
                              نمایش در صفحه اصلی
                            </th>
                            <th scope="col" className="text-center">
                              تعرفه های ارسال با پیک فروشگاه
                            </th>
                            <th scope="col" className="text-center">
                              تنظیمات ارسال
                            </th>
                            <th scope="col" className="text-center">
                              فروش
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories &&
                            categories.map((category, i) => {
                              return (
                                <CategoryRow
                                  category={category}
                                  index={
                                    (pagination.current_page - 1) *
                                      pagination.per_page +
                                    i +
                                    1
                                  }
                                  key={category.id}
                                  addToDeleteArray={handleAddId}
                                  editingItemId={setEditingCategoryId}
                                  isEditing={setIsUpdateModalOpen}
                                />
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {!categoryLoading && (
                    <div className="d-flex align-items-center justify-content-center">
                      {pagination && pagination.total > 15 && (
                        <CustomPagination
                          pagination={pagination}
                          onPageChange={handlePaginationChange}
                        />
                      )}
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <CreateCategoryModal
        createCategoryModalOpen={createCategoryModalOpen}
        toggle={toggleCreateCategoryModal}
      />
      <UpdateCategoryModal
        toggle={toggleUpdateCategoryModal}
        categoryId={editingCategoryId}
        isOpen={isUpdateModalOpen}
      />
      <OptionalSizes
        isOpen={deleteModal}
        toggle={toggle}
        center
        size="md"
        title={"حذف دسته بندی"}
      >
        <div className="p-4">
          <h4>{"حذف دسته بندی"}</h4>
          <p className="my-3">{`آیا از ${
            deletItemsIds.length > 1
              ? "پاک کردن دسته بندی ها"
              : "پاک کردن دسته بندی"
          } اطمینان دارید؟`}</p>
          <div className="d-flex justify-content-end gap-2">
            <Button color="primary" onClick={toggle}>
              لغو
            </Button>
            <Button color="danger" onClick={handleDeleteItems}>
              حذف
            </Button>
          </div>
        </div>
      </OptionalSizes>
    </React.Fragment>
  );
};

export default EcommerceCategories;
