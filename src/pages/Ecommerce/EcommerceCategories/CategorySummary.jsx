import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Row, Spinner } from "reactstrap";
import {
  getAllCategories,
  getCategories,
} from "../../../store/e-commerce/actions";

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

const CategorySummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allCategories = useSelector(
    (state) => state.ecommerce.allCategories.items
  );
  const { AllCategoryLoading } = useSelector((state) => state.ecommerce);

  const [stats, setStats] = useState({
    all: 0,
    active: 0,
    inactive: 0,
    root: 0,
  });

  useEffect(() => {
    dispatch(getAllCategories({ per_page: 100 }));
  }, [dispatch]);

  useEffect(() => {
    if (allCategories && allCategories.length > 0) {
      setStats({
        all: allCategories.length,
        active: allCategories.filter((c) => c.is_active).length,
        inactive: allCategories.filter((c) => !c.is_active).length,
        root: allCategories.filter((c) => !c.parent).length,
      });
    }
  }, [allCategories]);

  const handleFilter = (filters) => {
    const params = new URLSearchParams();
    if (filters.is_active !== undefined) {
      params.set("is_active", filters.is_active);
    }

    navigate(`?${params.toString()}`, { replace: true });

    // Dispatch with default sorting/pagination + new filter
    dispatch(
      getCategories({
        page: 1,
        per_page: 15,
        sort_by: "display_order",
        sort_dir: "asc",
        ...filters,
      })
    );
  };

  const handleClearFilters = () => {
    navigate("", { replace: true });
    dispatch(
      getCategories({
        page: 1,
        per_page: 15,
        sort_by: "display_order",
        sort_dir: "asc",
      })
    );
  };

  return (
    <Row>
      <StatCard
        title="تمام دسته بندی ها"
        value={stats.all}
        icon="bx-archive"
        color="primary"
        onClick={handleClearFilters}
        loading={AllCategoryLoading}
      />
      <StatCard
        title="دسته بندی های فعال"
        value={stats.active}
        icon="bx-check-circle"
        color="success"
        onClick={() => handleFilter({ is_active: "1" })}
        loading={AllCategoryLoading}
      />
      <StatCard
        title="دسته بندی های غیرفعال"
        value={stats.inactive}
        icon="bx-block"
        color="warning"
        onClick={() => handleFilter({ is_active: "0" })}
        loading={AllCategoryLoading}
      />
      <StatCard
        title="دسته بندی های اصلی"
        value={stats.root}
        icon="bx-git-merge"
        color="info"
        onClick={null} // Not clickable as there is no specific filter for it
        loading={AllCategoryLoading}
      />
    </Row>
  );
};

export default CategorySummary;
