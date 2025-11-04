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
import NoData from "../../../components/Common/NoData";
// import { getBlogCategories } from "../../../store/blog/actions";
import CreateBlogCategoryModal from "./CreateBlogCategoryModal";
import UpdateBlogCategoryModal from "./UpdateBlogCategoryModal";
import BlogCategoryRow from "./BlogCategoryRow";
import { Link, useNavigate } from "react-router-dom";

// Mock data
const mockCategories = [
  { id: 1, name: "تکنولوژی", slug: "technology", post_count: 10 },
  { id: 2, name: "برنامه نویسی", slug: "programming", post_count: 5 },
];

const BlogCategories = () => {
  document.title = "دسته بندی های بلاگ";
  // const categories = useSelector(state => state.blog.categories.items);
  // const isLoading = useSelector(state => state.blog.loading);
  const [categories, setCategories] = useState(mockCategories);
  const [isLoading, setIsLoading] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getBlogCategories());
  }, [dispatch]);

  const handleGoToBlogs = () => {
    navigate("/blogs");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="بلاگ" breadcrumbItem="دسته بندی ها" />
          <Row
            className="d-flex align-items-center justify-content-between"
            dir="ltr"
          >
            <Col sm="6">
              <div className="d-flex align-items-center my-3">
                <Button
                  type="submit"
                  color="primary"
                  onClick={() => setCreateModalOpen(true)}
                >
                  <i
                    className="mdi mdi-chart-box-plus-outline"
                    style={{ color: "#fff !important" }}
                  ></i>
                  <span>ایجاد دسته بندی جدید</span>
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle>دسته بندی های بلاگ</CardTitle>
                  {categories.length === 0 && !isLoading ? (
                    <NoData />
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">نام</th>
                            <th className="text-center">اسلاگ</th>
                            <th className="text-center">تعداد پست ها</th>
                            <th className="text-center">عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((cat, index) => (
                            <BlogCategoryRow
                              key={cat.id}
                              category={cat}
                              index={index}
                              setUpdateModalOpen={setUpdateModalOpen}
                              setSelectedCategoryId={setSelectedCategoryId}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <CreateBlogCategoryModal
        isOpen={createModalOpen}
        toggle={() => setCreateModalOpen(false)}
      />
      <UpdateBlogCategoryModal
        isOpen={updateModalOpen}
        toggle={() => setUpdateModalOpen(false)}
        categoryId={selectedCategoryId}
      />
    </React.Fragment>
  );
};

export default BlogCategories;
