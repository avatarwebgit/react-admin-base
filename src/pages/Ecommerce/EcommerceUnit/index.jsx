import { update } from "lodash";
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
import { getMeasurements } from "../../../store/e-commerce/actions";

import CreateUnitModal from "./CreateUnitModal";
import UnitRow from "./UnitRow";
import UpdateUnitModal from "./UpdateUnitModal";
import NoData from "../../../components/Common/NoData";
import { useSort } from "../../../hooks/useSort";

const EcommerceMeasurements = () => {
  const measurements = useSelector(
    (state) => state.ecommerce.measurements.items
  );

  const { unitLoading } = useSelector((state) => state.ecommerce);

  
    const { items: sortedUnits } = useSort(measurements, {
      key: "display_order",
      direction: "asc",
    });
  

  const [createUnitModalOpen, setCreateUnitModalOpen] = useState(false);
  const [UpdateUnitModalOpen, setUpdateUnitModalOpen] = useState(false);
  const [updateUnitId, setUpdateUnitId] = useState(null);

  const [page] = useState(1);
  const dispatch = useDispatch();

  const toggleCreateUnitModal = () =>
    setCreateUnitModalOpen(!createUnitModalOpen);
  const toggleUpdateBrandModal = () =>
    setUpdateUnitModalOpen(!UpdateUnitModalOpen);

  useEffect(() => {
    dispatch(getMeasurements(page));
  }, [dispatch, page]);

  return (
    <div className="page-content category-main-container">
      <Container fluid>
        <Breadcrumbs
          title="تجارت الکترونیک"
          breadcrumbItem="واحد اندازه گیری"
        />

        <Row
          className="d-flex align-items-center justify-content-start"
          dir="ltr"
        >
          <Button
            color="primary"
            className="my-3"
            onClick={() => setCreateUnitModalOpen(true)}
            style={{ width: "fit-content" }}
          >
            <i
              className="mdi mdi-chart-box-plus-outline"
              style={{ color: "#fff !important" }}
            />
            <span>ایجاد واحد جدید</span>
          </Button>
        </Row>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle className="h4">واحد اندازه گیری</CardTitle>
                {unitLoading && (
                  <div className="w-full d-flex align-items-center justify-content-center">
                    <Spinner color="primary" size={"sm"} />
                  </div>
                )}

                {measurements.length <= 0 && !unitLoading && <NoData />}

                {measurements.length > 0 && !unitLoading && (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">ردیف</th>
                          <th scope="col" className="text-center">
                            نام
                          </th>
                          <th scope="col" className="text-center">
                            سمبل
                          </th>
                          <th scope="col" className="text-center action-span">
                            عملیات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedUnits?.map((unit, i) => (
                          <UnitRow
                            key={unit.id}
                            unit={unit}
                            index={i}
                            isEditing={setUpdateUnitModalOpen}
                            unitId={setUpdateUnitId}
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

      <CreateUnitModal
        isOpen={createUnitModalOpen}
        toggle={toggleCreateUnitModal}
      />
      <UpdateUnitModal
        isOpen={UpdateUnitModalOpen}
        toggle={toggleUpdateBrandModal}
        unitId={updateUnitId}
      />
    </div>
  );
};

export default EcommerceMeasurements;
