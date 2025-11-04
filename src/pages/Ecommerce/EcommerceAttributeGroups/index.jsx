import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import {
  deleteAttributeGroup,
  getAttributeGroups,
} from "../../../store/e-commerce/actions";
import AttributeGroupRow from "./AttributeGroupRow";
import CreateAttributeGroupeModal from "./CreateAttributeGroupeModal";
import UpdateAttributeGroupeModal from "./UpdateAttributeGroupeModal";

import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CustomPagination from "../../../components/Common/CustomPagination";
import NoData from "../../../components/Common/NoData";
import { useSort } from "../../../hooks/useSort";

const index = () => {
  const dispatch = useDispatch();

  const { pagination: attributeGroupsPagination, items: attributeGroups } =
    useSelector((state) => state.ecommerce.attributeGroups);

  const {
    items: sortedAttriubteGroups,
    requestSort,
    sortConfig,
  } = useSort(attributeGroups, { key: "display_order", direction: "asc" });

  const { attributeGroupLoading } = useSelector((state) => state.ecommerce);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetAttributeGroupes();
  }, [dispatch]);

  const handleEdit = (group) => {
    setCurrentGroup(group);
    setEditModalOpen(true);
  };

  const handleGetAttributeGroupes = (page) => {
    dispatch(getAttributeGroups(page));
  };

  const handleGoToAttributes = () => {
    navigate("/ecommerce-technical");
  };

  return (
    <React.Fragment>
      <div className="page-content category-main-container">
        <Container fluid>
          <Breadcrumbs
            title="تجارت الکترونیک"
            breadcrumbItem=" گروه بندی مشخصات فنی "
          />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between mb-3">
                    <CardTitle className="card-title">گروه های ویژگی</CardTitle>
                    <Row
                      className="d-flex align-items-center justify-content-between"
                      dir="ltr"
                    >
                      <Col sm="12">
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
                            <span>ایجاد گروه بندی جدید</span>
                          </Button>
                          <Button
                            type="submit"
                            color="primary"
                            className="mx-3"
                            onClick={handleGoToAttributes}
                          >
                            <i
                              className="mdi mdi-format-list-bulleted-square
          "
                              style={{ color: "#fff !important" }}
                            ></i>
                            <span> مشخصات فنی</span>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {attributeGroupLoading && (
                    <div className="w-full d-flex align-items-center justify-content-center">
                      <Spinner color="primary" size={"sm"} />
                    </div>
                  )}

                  {attributeGroups.length <= 0 && !attributeGroupLoading && (
                    <NoData />
                  )}

                  {!attributeGroupLoading && attributeGroups.length > 0 && (
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>نام</th>
                          <th>ترتیب نمایش</th>
                          <th>عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedAttriubteGroups.map((group, index) => (
                          <AttributeGroupRow
                            key={group.id}
                            group={group}
                            index={index}
                            onEdit={handleEdit}
                            editId={setCurrentGroup}
                          />
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {attributeGroupsPagination && attributeGroups.length > 10 && (
            <CustomPagination
              pagination={attributeGroupsPagination}
              onPageChange={handleGetAttributeGroupes}
            />
          )}

          <CreateAttributeGroupeModal
            isOpen={createModalOpen}
            toggle={() => setCreateModalOpen(false)}
          />

          {currentGroup && (
            <UpdateAttributeGroupeModal
              isOpen={editModalOpen}
              toggle={() => setEditModalOpen(false)}
              groupId={currentGroup}
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default index;
