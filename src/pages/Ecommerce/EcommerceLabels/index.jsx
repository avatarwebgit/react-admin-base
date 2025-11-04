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
import NoData from "../../../components/Common/NoData";
import "../../../styles/categories.scss";

import { useSelector } from "react-redux";
import { getLabels } from "../../../store/e-commerce/actions";

import CreateLabelModal from "./CreateLabelModal";
import LabelRow from "./labelRow";
import UpdateLabelModal from "./UpdateLabelModal";
import { useSort } from "../../../hooks/useSort";
const EcommerceLabels = () => {
  const labels = useSelector((state) => state.ecommerce.labels?.items || []);
  const { labelLoading } = useSelector((state) => state.ecommerce);

  const [createLabelOpen, setCreateLabelOpen] = useState(false);
  const [updateLabelOpen, setUpdateLabelOpen] = useState(false);
  const [selectedLabelId, setSelectedLabelId] = useState(null);
  const [page, setPage] = useState(1);

  const { items: sortedLabels } = useSort(labels, {
    key: "display_order",
    direction: "asc",
  });

  const toggleCreateModal = () => setCreateLabelOpen(!createLabelOpen);
  const toggleUpdateModal = () => setUpdateLabelOpen(!updateLabelOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLabels({ page, per_page: 15 }));
  }, []);

  return (
    <React.Fragment>
      <div className="page-content category-main-container">
        <Container fluid>
          <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="لیبل " />
          <Row
            className="d-flex align-items-center my-3 justify-content-between"
            dir="ltr"
          >
            <Col sm="3">
              <Button
                type="submit"
                color="primary"
                onClick={() => setCreateLabelOpen(true)}
              >
                <i
                  className="mdi mdi-chart-box-plus-outline"
                  style={{ color: "#fff !important" }}
                ></i>
                <span>ایجاد لیبل جدید</span>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4"> لیبل ها </CardTitle>
                  {labelLoading && (
                    <div className="w-full d-flex align-items-center justify-content-center">
                      <Spinner color="primary" size={"sm"} />
                    </div>
                  )}

                  {labels.length <= 0 && !labelLoading && <NoData />}

                  {!labelLoading && labels.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col" className="text-center">
                              ردیف
                            </th>
                            <th scope="col" className="text-center">
                              متن
                            </th>
                            <th scope="col" className="text-center">
                              رنگ متن
                            </th>
                            <th scope="col" className="text-center action-span">
                              رنگ پس زمینه
                            </th>
                            <th scope="col" className="text-center action-span">
                              عملیات
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {labels &&
                            sortedLabels.map((label, i) => {
                              return (
                                <LabelRow
                                  label={label}
                                  index={i}
                                  key={label.id}
                                  isUpdateModalOpen={setUpdateLabelOpen}
                                  sendLabelId={setSelectedLabelId}
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
      <CreateLabelModal isOpen={createLabelOpen} toggle={toggleCreateModal} />
      <UpdateLabelModal
        isOpen={updateLabelOpen}
        toggle={toggleUpdateModal}
        labelId={selectedLabelId}
      />
    </React.Fragment>
  );
};

export default EcommerceLabels;
