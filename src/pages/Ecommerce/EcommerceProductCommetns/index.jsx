import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Badge,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CustomPagination from "../../../components/Common/CustomPagination";
import { openDeleteModal } from "../../../store/_global/actions";
import {
  getProductComments,
  updateCommentStatus,
} from "../../../store/e-commerce/actions";
import { DELETE_COMMENT } from "../../../store/e-commerce/actionTypes";
import CommentRow from "./CommentRow";
import CommentViewModal from "./CommentViewModal";
import NoData from "../../../components/Common/NoData";

const EcommerceComments = () => {
  const [page, setPage] = useState(1);
  const [deleteItemsIds, setDeleteItemsIds] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const comments = useSelector((state) => state.ecommerce.comments.items);
  const pagination = useSelector(
    (state) => state.ecommerce.comments.pagination
  );
  const dispatch = useDispatch();

  const toggleViewModal = () => setViewModalOpen(!viewModalOpen);

  const handleDeleteItems = () => {
    dispatch(
      openDeleteModal({
        message: `آیا از حذف ${
          deleteItemsIds.length > 1 ? "نظرات انتخاب شده" : "این نظر"
        } اطمینان دارید؟`,
        actionType: DELETE_COMMENT,
        ids: deleteItemsIds,
        bulkDelete: true,
        title: "حذف نظر",
      })
    );
    setDeleteItemsIds([]);
  };

  const handleStatusChange = (commentId, newStatus) => {
    dispatch(updateCommentStatus(commentId, newStatus));
  };

  const handleViewComment = (comment) => {
    setSelectedComment(comment);
    setViewModalOpen(true);
  };

  useEffect(() => {
    dispatch(getProductComments(page, statusFilter));
  }, [page, statusFilter]);

  const handlePaginationChange = (page) => {
    setPage(page);
    dispatch(getProductComments(page, statusFilter));
  };

  const handleAddId = (status, id) => {
    if (status) {
      setDeleteItemsIds((prev) => [...prev, id]);
    } else {
      setDeleteItemsIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge color="success">تایید شده</Badge>;
      case "pending":
        return <Badge color="warning">در انتظار بررسی</Badge>;
      case "rejected":
        return <Badge color="danger">رد شده</Badge>;
      default:
        return <Badge color="secondary">نامشخص</Badge>;
    }
  };

  return (
    <React.Fragment>
      <div className="page-content comments-main-container">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="نظرات محصولات" />

          <Row
            className="d-flex align-items-center justify-content-between"
            dir="ltr"
          >
            <Col sm="6">
              <div className="d-flex align-items-center my-3">
                <Button
                  color="danger"
                  onClick={handleDeleteItems}
                  disabled={deleteItemsIds.length === 0}
                  style={{ width: "220px" }}
                >
                  <i
                    className="mdi mdi-delete"
                    style={{ color: "#fff !important" }}
                  ></i>
                  <span>
                    {deleteItemsIds.length > 0 && `(${deleteItemsIds.length})`}
                    &nbsp;
                    {deleteItemsIds.length > 1 ? "حذف نظرات" : "حذف نظر"}
                  </span>
                </Button>
              </div>
            </Col>

            <Col sm="3">
              <div className="filter-section">
                <select
                  className="form-control"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  dir="rtl"
                >
                  <option value="all">همه نظرات</option>
                  <option value="pending">در انتظار بررسی</option>
                  <option value="approved">تایید شده</option>
                  <option value="rejected">رد شده</option>
                </select>
              </div>
            </Col>

            <Col sm="3">
              <form className="app-search d-none d-lg-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control bg-white"
                    placeholder="جستجو در نظرات..."
                    dir="rtl"
                  />
                  <span className="bx bx-search-alt" />
                </div>
              </form>
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">مدیریت نظرات محصولات</CardTitle>

                  <div className="stats-summary mb-3">
                    <Row>
                      <Col md="3">
                        <div className="stat-card">
                          <h6>کل نظرات</h6>
                          <span className="stat-number">
                            {pagination?.total || 0}
                          </span>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="stat-card">
                          <h6>در انتظار بررسی</h6>
                          <span className="stat-number text-warning">
                            {comments?.filter((c) => c.status === "pending")
                              .length || 0}
                          </span>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="stat-card">
                          <h6>تایید شده</h6>
                          <span className="stat-number text-success">
                            {comments?.filter((c) => c.status === "approved")
                              .length || 0}
                          </span>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="stat-card">
                          <h6>رد شده</h6>
                          <span className="stat-number text-danger">
                            {comments?.filter((c) => c.status === "rejected")
                              .length || 0}
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">ردیف</th>
                          <th>انتخاب</th>
                          <th scope="col" className="text-center">
                            کاربر
                          </th>
                          <th scope="col" className="text-center">
                            محصول
                          </th>
                          <th scope="col" className="text-center">
                            امتیاز
                          </th>
                          <th scope="col" className="text-center">
                            وضعیت
                          </th>
                          <th scope="col" className="text-center">
                            تاریخ
                          </th>
                          <th scope="col" className="text-center">
                            متن نظر
                          </th>
                          <th scope="col" className="text-center action-span">
                            عملیات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comments && comments.length > 0 ? (
                          comments.map((comment, i) => (
                            <CommentRow
                              comment={comment}
                              index={i + 1}
                              key={comment.id}
                              addToDeleteArray={handleAddId}
                              onStatusChange={handleStatusChange}
                              onViewComment={handleViewComment}
                              getStatusBadge={getStatusBadge}
                            />
                          ))
                        ) : (
                          <tr>
                            <td colSpan={12}>
                              <NoData />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {pagination && comments.length > 0 && (
                    <CustomPagination
                      pagination={pagination}
                      onPageChange={handlePaginationChange}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <CommentViewModal
        isOpen={viewModalOpen}
        toggle={toggleViewModal}
        comment={selectedComment}
        onStatusChange={handleStatusChange}
        getStatusBadge={getStatusBadge}
      />
    </React.Fragment>
  );
};

export default EcommerceComments;
