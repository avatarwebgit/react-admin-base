import React, { useState } from "react";
import { Card, CardBody, Col, Row, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, icon, color, onClick, loading }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    cursor: onClick ? "pointer" : "default",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    ...(isHovered && onClick
      ? {
          transform: "translateY(-3px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }
      : {}),
  };
  return (
    <Col md={3} sm={6}>
      <Card
        className="stat-card"
        onClick={onClick}
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={-1}
      >
        <CardBody>
          <div className="d-flex">
            <div className="flex-grow-1 stat-card-mobile-padding ">
              <p className="text-muted fw-medium mb-2">{title}</p>
              <h4 className="mb-0">
                {loading ? <Spinner size="sm" color={color} /> : value}
              </h4>
            </div>
            <div className="flex-shrink-0 align-self-center">
              <div
                className={`avatar-sm rounded-3 bg-soft-${color} mini-stat-icon`}
              >
                <span className={`avatar-title rounded-3 bg-${color}`}>
                  <i className={`bx ${icon} font-size-24`}></i>
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const ProductSummary = () => {
  const navigate = useNavigate();

  const handleFilter = (filters) => {
    const params = new URLSearchParams();
    if (filters.is_active !== undefined) {
      params.set("is_active", filters.is_active);
    }
    if (filters.isSpecialOffer !== undefined) {
      params.set("isSpecialOffer", filters.isSpecialOffer);
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleClearFilters = () => {
    navigate("", { replace: true });
  };

  const stats = {
    all: 1452,
    active: 1387,
    inactive: 65,
    special: 92,
  };

  const loading = false; // Static component

  return (
    <Row>
      <StatCard
        title="تمام محصولات"
        value={stats.all}
        icon="bx-archive"
        color="primary"
        onClick={handleClearFilters}
        loading={loading}
      />
      <StatCard
        title="محصولات فعال"
        value={stats.active}
        icon="bx-check-circle"
        color="success"
        onClick={() => handleFilter({ is_active: "1" })}
        loading={loading}
      />
      <StatCard
        title="محصولات غیرفعال"
        value={stats.inactive}
        icon="bx-block"
        color="warning"
        onClick={() => handleFilter({ is_active: "0" })}
        loading={loading}
      />
      <StatCard
        title="پیشنهادات ویژه"
        value={stats.special}
        icon="bx-star"
        color="info"
        onClick={() => handleFilter({ isSpecialOffer: "1" })}
        loading={loading}
      />
    </Row>
  );
};

export default ProductSummary;
