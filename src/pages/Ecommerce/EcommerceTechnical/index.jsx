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
import "../../../styles/categories.scss";

import { useSelector } from "react-redux";
import { getAttributes } from "../../../store/e-commerce/actions";

import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import CreaTechnicalModal from "./CreateTechnicalModal";
import TechnicalRow from "./TechnicalRow";
import UpdateTechnicalModal from "./UpdateTechnicalModal";
import NoData from "../../../components/Common/NoData";
import { useSort } from "../../../hooks/useSort";

const EcommerceTechnical = () => {
  const { attributeLoading } = useSelector((state) => state.ecommerce);

  const { items: attributes, pagination: attributesPagination } = useSelector(
    (state) => state.ecommerce.attributes
  );

  const { items: sortedAttributes } = useSort(attributes, {
    key: "display_order",
    direction: "asc",
  });

  const [createTechnicalOpen, setCreateTechnicalOpen] = useState(false);
  const [updateTechnicalOpen, setUpdateTechnicalOpen] = useState(false);
  const [selectedTechnicalId, setSelectedTechnicalId] = useState(null);

  const toggleCreateModal = () => setCreateTechnicalOpen(!createTechnicalOpen);
  const toggleUpdateModal = () => setUpdateTechnicalOpen(!updateTechnicalOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAttributs();
  }, [dispatch]);

  const handleGoToAttributeGroupes = () => {
    navigate("/ecommerce-technical-group");
  };

  const handleGetAttributs = (page) => {
    dispatch(getAttributes(page));
  };

  return (
    <React.Fragment>
      <div className="page-content category-main-container">
        <Container fluid>
          <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="مشخصات فنی " />
          <Row
            className="d-flex align-items-center justify-content-between"
            dir="ltr"
          >
            <Col sm="6">
              <div className="d-flex align-items-center my-3">
                <Button
                  type="submit"
                  color="primary"
                  onClick={() => setCreateTechnicalOpen(true)}
                >
                  <i
                    className="mdi mdi-chart-box-plus-outline"
                    style={{ color: "#fff !important" }}
                  ></i>
                  <span>ایجاد مشخصه فنی جدید</span>
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="mx-3"
                  onClick={handleGoToAttributeGroupes}
                >
                  <i
                    className="mdi mdi-format-list-bulleted-square
"
                    style={{ color: "#fff !important" }}
                  ></i>
                  <span> دسته بندی مشخصات فنی</span>
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4"> مشخصات فنی ها </CardTitle>

                  {attributeLoading && (
                    <div className="w-full d-flex align-items-center justify-content-center">
                      <Spinner color="primary" size={"sm"} />
                    </div>
                  )}

                  {attributes.length <= 0 && !attributeLoading && <NoData />}

                  {!attributeLoading && attributes.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col" className="text-center">
                              ردیف
                            </th>
                            <th scope="col" className="text-center">
                              نام
                            </th>
                            <th scope="col" className="text-center">
                              تصویر
                            </th>
                            <th scope="col" className="text-center action-span">
                              مقادیر
                            </th>
                            <th scope="col" className="text-center action-span">
                              فعال
                            </th>
                            <th scope="col" className="text-center action-span">
                              نمایش در بخش فیلتر
                            </th>
                            {/* <th scope="col" className="text-center action-span">
                              نمایش در لیست محصول
                            </th>

                            <th scope="col" className="text-center action-span">
                              نمایش در باکس محصول
                            </th> */}

                            <th
                              colSpan={3}
                              scope="col"
                              className="text-center action-span"
                            >
                              گروه
                            </th>
                            <th scope="col" className="text-center action-span">
                              عملیات
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {attributes &&
                            sortedAttributes.map((technical, i) => {
                              return (
                                <TechnicalRow
                                  technical={technical}
                                  index={i}
                                  key={technical.id}
                                  isUpdateModalOpen={setUpdateTechnicalOpen}
                                  sendTechnicalId={setSelectedTechnicalId}
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

      {attributesPagination && attributes.length > 10 && (
        <CustomPagination
          pagination={attributesPagination}
          onPageChange={handleGetAttributs}
        />
      )}

      <CreaTechnicalModal
        isOpen={createTechnicalOpen}
        toggle={toggleCreateModal}
      />

      <UpdateTechnicalModal
        isOpen={updateTechnicalOpen}
        toggle={toggleUpdateModal}
        techId={selectedTechnicalId}
        closeModal={() => setUpdateTechnicalOpen(false)}
      />
    </React.Fragment>
  );
};

export default EcommerceTechnical;
