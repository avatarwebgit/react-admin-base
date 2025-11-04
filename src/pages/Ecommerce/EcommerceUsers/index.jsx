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
import { getUsers } from "../../../store/e-commerce/actions";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import CreateUserModal from "./CreateUserModal";
import UserRow from "./UserRow";
import UpdateUserModal from "./UpdateUserModal";
import NoData from "../../../components/Common/NoData";

const EcommerceUsers = () => {
  const users = useSelector((state) => state.ecommerce.users.items);
  const { userLoading } = useSelector((state) => state.ecommerce);
  const usersPagination = useSelector(
    (state) => state.ecommerce.users.pagination
  );

  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [updateUserOpen, setUpdateUserOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const toggleCreateModal = () => setCreateUserOpen(!createUserOpen);
  const toggleUpdateModal = () => setUpdateUserOpen(!updateUserOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUsers();
  }, [dispatch]);

  const handleGetUsers = (page) => {
    dispatch(getUsers(page));
  };

  return (
    <React.Fragment>
      <div className="page-content users-main-container">
        <Container fluid>
          <Breadcrumbs
            title="تجارت الکترونیک"
            breadcrumbItem="مدیریت کاربران"
          />
          <Row
            className="d-flex align-items-center justify-content-between"
            dir="ltr"
          >
            <Col sm="6">
              <div className="d-flex align-items-center my-3">
                <Button
                  type="submit"
                  color="primary"
                  onClick={() => setCreateUserOpen(true)}
                  dir="rtl"
                >
                  <i
                    className="mdi mdi-account-plus"
                    style={{ color: "#fff !important" }}
                  ></i>
                  <span>ایجاد کاربر جدید</span>
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">لیست کاربران</CardTitle>

                  {userLoading && (
                    <div className="w-full d-flex align-items-center justify-content-center">
                      <Spinner color="primary" size={"sm"} />
                    </div>
                  )}

                  {users.length <= 0 && !userLoading && <NoData />}

                  {users.length > 0 && !userLoading && (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col" className="text-center">
                              ردیف
                            </th>
                            <th scope="col" className="text-center">
                              نام کامل
                            </th>
                            <th scope="col" className="text-center">
                              ایمیل
                            </th>
                            <th scope="col" className="text-center">
                              نقش
                            </th>
                            <th scope="col" className="text-center">
                              وضعیت
                            </th>
                            <th scope="col" className="text-center">
                              تاریخ ثبت نام
                            </th>
                            <th scope="col" className="text-center action-span">
                              عملیات
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users &&
                            users.map((user, i) => {
                              return (
                                <UserRow
                                  user={user}
                                  index={i}
                                  key={user.id}
                                  isUpdateModalOpen={setUpdateUserOpen}
                                  sendUserId={setSelectedUserId}
                                />
                              );
                            })}
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

      {usersPagination && users.length > 10 && (
        <CustomPagination
          pagination={usersPagination}
          onPageChange={handleGetUsers}
        />
      )}

      <CreateUserModal isOpen={createUserOpen} toggle={toggleCreateModal} />

      <UpdateUserModal
        isOpen={updateUserOpen}
        toggle={toggleUpdateModal}
        userId={selectedUserId}
      />
    </React.Fragment>
  );
};

export default EcommerceUsers;
