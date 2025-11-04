import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { showAttributeValue } from "../../../store/e-commerce/actions";
import "../../../styles/categories.scss";

import NoData from "../../../components/Common/NoData";
import { useSort } from "../../../hooks/useSort";
import AttributeValueRow from "./AttibuteValueRow";
import CreateAttributeValueModal from "./CreateAttibuteValueModal";
import UpdateAttributeValueModal from "./UpdateAttibuteValueModal";

const EcommerceAttributeValues = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const attributeValues = useSelector(
    (state) => state.ecommerce.attributeValueDetails[id] || []
  );

  const {
    items: sortedAttributeValues,
  } = useSort(attributeValues, { key: "display_order", direction: "asc" });

  const { attributeValueLoading } = useSelector((state) => state.ecommerce);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(showAttributeValue(id));
    }
  }, [dispatch, id]);

  const handleGoToTechnical = () => {
    navigate("/ecommerce-technical");
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="مقادیر ویژگی" />
        <Row className="py-3">
          <Col
            sm="12"
            className="d-flex align-items-center justify-content-end"
          >
            <Button
              color="primary"
              className="mx-3"
              onClick={handleGoToTechnical}
            >
              <i className="mdi mdi-arrow-left"></i>
              <span>مشخصات فنی</span>
            </Button>
            <Button color="primary" onClick={() => setCreateModalOpen(true)}>
              <i
                className="mdi mdi-chart-box-plus-outline"
                style={{ color: "#fff" }}
              ></i>
              <span>ایجاد مقدار ویژگی جدید</span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle className="h4">مقادیر ویژگی</CardTitle>
                {attributeValueLoading && (
                  <div className="w-full d-flex align-items-center justify-content-center">
                    <Spinner color="primary" size={"sm"} />
                  </div>
                )}

                {attributeValues?.length <= 0 && !attributeValueLoading && (
                  <NoData />
                )}

                {!attributeValueLoading && attributeValues.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th className="text-center">ردیف</th>
                          <th className="text-center">مقدار</th>
                          <th className="text-center"> تصویر</th>
                          <th className="text-center"> اولویت نمایش</th>
                          <th className="text-center"> فعال</th>
                          <th className="text-center">عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attributeValues &&
                          sortedAttributeValues.map((item, i) => (
                            <AttributeValueRow
                              key={item.id}
                              attributeValue={item}
                              index={i}
                              parentId={id}
                              setUpdateModalOpen={setUpdateModalOpen}
                              setSelectedId={setSelectedId}
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
        <CreateAttributeValueModal
          isOpen={createModalOpen}
          toggle={() => setCreateModalOpen(!createModalOpen)}
          parentId={id}
        />
        <UpdateAttributeValueModal
          isOpen={updateModalOpen}
          toggle={() => setUpdateModalOpen(!updateModalOpen)}
          attributeValueId={selectedId}
          parentId={id}
        />
      </Container>
    </div>
  );
};

export default EcommerceAttributeValues;
