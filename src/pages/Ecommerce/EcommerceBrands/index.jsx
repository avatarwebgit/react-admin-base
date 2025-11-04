import { useEffect, useState } from "react";
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
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import NoData from "../../../components/Common/NoData";
import { getBrands } from "../../../store/e-commerce/actions";
import "../../../styles/categories.scss";
import Brand from "./BrandRow";
import CreateBrandModal from "./CreateBrandModal";
import UpdateBrandModal from "./UpdateBrandModal";
import { useSort } from "../../../hooks/useSort";

const EcommerceBrands = () => {
  const brands = useSelector((state) => state.ecommerce.brands.items);
  const { brandLoading } = useSelector((state) => state.ecommerce);

  const { items: sortedbrands } = useSort(brands, {
    key: "display_order",
    direction: "asc",
  });

  const [createBrandModalOpen, setCreateBrandModalOpen] = useState(false);
  const [updateBrandModalOpen, setUpdateBrandModalOpen] = useState(false);
  const [updateBrandId, setUpdateBrandId] = useState(null);
  const [page, setPage] = useState(1);

  const toggleCreateBrandModal = () =>
    setCreateBrandModalOpen(!createBrandModalOpen);
  const toggleUpdateBrandModal = () =>
    setUpdateBrandModalOpen(!updateBrandModalOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands(page));
  }, [dispatch, page]);

  return (
    <div className="page-content category-main-container">
      <Container fluid>
        <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="برند" />
        <Row
          className="d-flex align-items-center justify-content-between my-3"
          dir="ltr"
        >
          <Col sm="3">
            <Button
              type="submit"
              color="primary"
              onClick={() => setCreateBrandModalOpen(true)}
            >
              <i
                className="mdi mdi-chart-box-plus-outline"
                style={{ color: "#fff !important" }}
              ></i>
              <span>ایجاد برند جدید</span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle className="h4">برند ها </CardTitle>
                {brandLoading && (
                  <div className="w-full d-flex align-items-center justify-content-center">
                    <Spinner color="primary" size={"sm"} />
                  </div>
                )}

                {brands.length <= 0 && !brandLoading && <NoData />}

                {!brandLoading && brands.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">ردیف</th>
                          <th scope="col" className="text-center">
                            نام
                          </th>
                          <th scope="col" className="text-center">
                            آیکون
                          </th>
                          <th scope="col" className="text-center">
                            بنر
                          </th>
                          <th scope="col" className="text-center action-span">
                            عملیات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedbrands.map((brand, i) => (
                          <Brand
                            data={brand}
                            index={i}
                            key={brand.id}
                            isEditing={setUpdateBrandModalOpen}
                            brandId={setUpdateBrandId}
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

      <CreateBrandModal
        isOpen={createBrandModalOpen}
        toggle={toggleCreateBrandModal}
      />

      <UpdateBrandModal
        isOpen={updateBrandModalOpen}
        toggle={toggleUpdateBrandModal}
        brandId={updateBrandId}
      />
    </div>
  );
};

export default EcommerceBrands;
