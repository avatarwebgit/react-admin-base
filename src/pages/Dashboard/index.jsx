import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

import classNames from "classnames";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

//import action
import {
  getDashboardData,
  getChartsData as onGetChartsData,
} from "../../store/actions";

import modalimage2 from "../../assets/images/product/img-4.png";
import modalimage1 from "../../assets/images/product/img-7.png";

// Pages Components
import ActivityComp from "./ActivityComp";
import SocialSource from "./SocialSource";
import TopCities from "./TopCities";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import Earning from "./Earning";
import LatestTranactions from "./LatestTranaction";
import { color } from "echarts";
import { useCountUp } from "../../utils/helperFunctions";

const Dashboard = (props) => {
  const [modal, setmodal] = useState(false);

  const { dashboardData } = useSelector((state) => state.ecommerce);

  const DashboardProperties = createSelector(
    (state) => state.Dashboard,
    (dashboard) => ({
      chartsData: dashboard.chartsData,
    })
  );

  const { chartsData } = useSelector(DashboardProperties);

  const reports = [
    {
      title: "محصولات",
      iconClass: "bx-copy-alt",
      description: dashboardData.product_count || 0,
      color: "#42A5F5",
      url: "/ecommerce-products",
    },

    {
      title: "کاربران",
      iconClass: "bx-archive-in",
      description: dashboardData.user_count || 0,
      color: "#FFB74D",
      url: "/users",
    },
    {
      title: "سفارشات",
      iconClass: "bx-purchase-tag-alt",
      description: dashboardData.order_count || 0,
      color: "#81C784",
      url: "/ecommerce-orders",
    },
  ];

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("Year");

  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  const onChangeChartPeriod = (pType) => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetChartsData("Year"));
    dispatch(getDashboardData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("داشبورد")}
          />

          <Row>
            {" "}
            <Col xl="8">
              <Row>
                {/* Reports Render */}
                {(reports || [])?.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Link className="d-flex " to={report.url}>
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4
                              className="mb-0 text-black"
                            
                            >
                              {useCountUp(report.description, 0, 3000)}
                            </h4>
                          </div>
                          <div className="avatar-sm rounded-circle align-self-center mini-stat-icon">
                            <span
                              className="avatar-title rounded-circle "
                              style={{ background: `${report.color}` }}
                            >
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </Link>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">بازدید </h4>
                    <div className="ms-auto">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "Week" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("Week");
                            }}
                            id="one_month"
                          >
                            هفته
                          </Link>{" "}
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "Month" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("Month");
                            }}
                            id="one_month"
                          >
                            ماه
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "Year" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("Year");
                            }}
                            id="one_month"
                          >
                            سال
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="clearfix"></div> */}
                  <StackedColumnChart
                    periodData={periodData}
                    dataColors='["--bs-primary", "--bs-warning", "--bs-success"]'
                  />
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              {/* <WelcomeComp /> */}
              <Earning />
            </Col>
          </Row>

          {/* <Row>
            <Col xl="4">
              <SocialSource />
            </Col>
            <Col xl="4">
              <ActivityComp />
            </Col>

            <Col xl="4">
              <TopCities />
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <LatestTranactions />
            </Col>
          </Row> */}
        </Container>
      </div>

      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal);
        }}
      >
        <div>
          <ModalHeader
            toggle={() => {
              setmodal(!modal);
            }}
          >
            جزئیات سفارش
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              شناسه محصول: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              نام صورتحساب: <span className="text-primary">ناهید میرآقایی</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">محصول</th>
                    <th scope="col">نام محصول</th>
                    <th scope="col">قیمت</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          هدفون بی سیم (مشکی)
                        </h5>
                        <p className="text-muted mb-0">تومان 225 x 1</p>
                      </div>
                    </td>
                    <td> 255.000 تومان</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          هودی (آبی)
                        </h5>
                        <p className="text-muted mb-0">تومان 145.000 x 1</p>
                      </div>
                    </td>
                    <td> 145.000 تومان</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">مجموع فرعی:</h6>
                    </td>
                    <td>تومان 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">حمل و نقل دریایی:</h6>
                    </td>
                    <td>رایگان</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">مجموع:</h6>
                    </td>
                    <td>تومان 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal);
              }}
            >
              بستن
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
