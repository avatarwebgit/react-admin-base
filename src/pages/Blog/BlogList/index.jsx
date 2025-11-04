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
// import { getBlogPosts } from '../../store/blog/actions'; // Hypothetical action
import BlogPostRow from "./BlogPostRow";
import CreateBlogPostModal from "./CreateBlogPostModal";
import UpdateBlogPostModal from "./UpdateBlogPostModal";
import CustomPagination from "../../../components/Common/CustomPagination";
import { Link } from "react-router-dom";

// Mock data until Redux is set up
const mockPosts = [
  {
    id: 1,
    title: "اولین پست بلاگ",
    category: "تکنولوژی",
    status: "Published",
    published_at: "1403/01/10",
    featured_image: "https://via.placeholder.com/80x60?text=Post1",
  },
  {
    id: 2,
    title: "پست دوم درباره ریکت",
    category: "برنامه نویسی",
    status: "Draft",
    published_at: "1403/01/15",
    featured_image: "https://via.placeholder.com/80x60?text=Post2",
  },
];

const Blog = () => {
  document.title = "مدیریت بلاگ";
  // const posts = useSelector(state => state.blog.posts.items);
  // const pagination = useSelector(state => state.blog.posts.pagination);
  // const isLoading = useSelector(state => state.blog.loading);
  const [posts, setPosts] = useState(mockPosts);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getBlogPosts());
  }, [dispatch]);

  const handlePageChange = (page) => {
    // dispatch(getBlogPosts(page));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="مدیریت" breadcrumbItem="پست های بلاگ" />
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
                  <span>ایجاد پست جدید</span>
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="mx-3"
                  tag={Link}
                  to="/blog-categories"
                >
                  <i
                    className="mdi mdi-format-list-bulleted-square"
                    style={{ color: "#fff !important" }}
                  ></i>
                  <span>مدیریت دسته بندی ها</span>
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle>پست های بلاگ</CardTitle>

                  {posts.length === 0 && !isLoading ? (
                    <NoData />
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">تصویر شاخص</th>
                            <th className="text-center">عنوان</th>
                            <th className="text-center">دسته بندی</th>
                            <th className="text-center">وضعیت</th>
                            <th className="text-center">تاریخ انتشار</th>
                            <th className="text-center">عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posts.map((post, index) => (
                            <BlogPostRow
                              key={post.id}
                              post={post}
                              index={index}
                              setUpdateModalOpen={setUpdateModalOpen}
                              setSelectedPostId={setSelectedPostId}
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
          {pagination && posts.length > 0 && (
            <CustomPagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </Container>
      </div>

      <CreateBlogPostModal
        isOpen={createModalOpen}
        toggle={() => setCreateModalOpen(false)}
      />
      <UpdateBlogPostModal
        isOpen={updateModalOpen}
        toggle={() => setUpdateModalOpen(false)}
        postId={selectedPostId}
      />
    </React.Fragment>
  );
};

export default Blog;
