import React from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";
import { useCountUp } from "../../utils/helperFunctions";

const Earning = () => {
  const earningsData = [
    {
      month: "امروز",
      amount: 0,
      percentage: 0,
      previous: "دوره قبل",
      color: "#FF5733",
    },
    {
      month: "دیروز",
      amount: 0,
      percentage: 0,
      previous: "دوره قبل",
      color: "#FF8D1A",
    },
    {
      month: "این ماه",
      amount: 0,
      percentage: 0,
      previous: "دوره قبل",
      color: "#FFC107",
    },
    {
      month: " ماه قبل",
      amount: 0,
      percentage: 0,
      previous: "دوره قبل",
      color: "#4CAF50",
    },
    {
      month: " امسال",
      amount: 0,
      percentage: 0,
      previous: "دوره قبل",
      color: "#2196F3",
    },
  ];
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">شرح درآمد</CardTitle>
          {earningsData.map((data, index) => (
            <Row key={index}>
              <Col sm="6">
                <p className="text-muted">{data.month}</p>
                <h3 >{useCountUp(data.amount, 0,1200)}تومان</h3>
                <p className="text-muted">
                  <span className="text-success me-2">
                    {data.percentage}% <i className="mdi mdi-arrow-up"></i>
                  </span>
                  {data.previous}
                </p>
              </Col>
              <Col sm="6">
                <div className="mt-4 mt-sm-0">
                  <ApexRadial
                    series={[data.percentage]}
                    dataColors={`["${data.color}"]`}
                  />
                </div>
              </Col>
            </Row>
          ))}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Earning;
