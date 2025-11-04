import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CityPrice from "./CityPrice";
import CreateCityCityShippingFee from "./CreateCityCityShippingFee";
import { useDispatch } from "react-redux";
import {
  addCityPrice,
  deleteCityPrice,
  getCityPrice,
} from "../../../store/actions";
import NoData from "../../../components/Common/NoData";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";

const CityShippingFee = () => {
  const { id } = useParams();

  const [deleteItemIds, setDeleteItemIds] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { provinces, cityPriceLoading } = useSelector(
    (state) => state.ecommerce
  );
  const { provinces: prices = [] } = useSelector(
    (state) => state.ecommerce.cityPrices
  );

  const toggleCreateModal = () => setCreateModalOpen(!createModalOpen);
  const closeCreateModal = () => setCreateModalOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCityPrice({ page: 1, per_page: 50, id }));
  }, [dispatch]);

  const handleUpdateDeleteItemIds = (id) => {
    setDeleteItemIds((prevDeleteItemIds) => {
      const idExists = prevDeleteItemIds.includes(id);

      if (idExists) {
        return prevDeleteItemIds.filter((itemId) => itemId !== id);
      } else {
        return [...prevDeleteItemIds, id];
      }
    });
  };

  const toggle = () => setDeleteModal(!deleteModal);

  const handleDeleteItems = () => {
    const refactoredItems = deleteItemIds.map((itemId) => ({
      delivery_method_id: itemId,
      province_id: +id,
    }));
    const payload = { items: refactoredItems };
    dispatch(deleteCityPrice(payload));
  };

  const handleUpdateProvincePrice = (pId, price) => {
    const payload = {
      page: 1,
      per_page: 50,
      id,
      items: [
        {
          delivery_method_id: +id,
          province_id: +pId,
          price: +price,
        },
      ],
    };
    dispatch(addCityPrice(payload));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="" />
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader className="py-3">
                <h3 className="card-title mb-0">استان ها</h3>
              </CardHeader>
              <CardBody className="py-4">
                <div className="mb-4 d-flex justify-content-end">
                  {deleteItemIds.length > 0 && (
                    <Button
                      color="danger "
                      size="sm"
                      className="mx-2"
                      onClick={toggle}
                    >
                      <i className="mdi mdi-trash-can me-1"></i>
                      حذف ({deleteItemIds.length}) مورد
                    </Button>
                  )}
                  <Button color="primary" size="sm" onClick={toggleCreateModal}>
                    <i className="mdi mdi-plus me-1"></i>
                    افزودن استان
                  </Button>
                </div>

                {cityPriceLoading && (
                  <div className="w-full d-flex align-items-center justify-content-center">
                    <Spinner color="primary" size={"sm"} />
                  </div>
                )}

                {prices.length <= 0 && !cityPriceLoading && <NoData />}

                {!cityPriceLoading && prices.length > 0 && (
                  <div className="table-responsive">
                    <Table bordered striped className="text-center">
                      <thead>
                        <tr>
                          <th>ردیف</th>
                          <th>انتخاب</th>
                          <th>استان</th>
                          <th>تعرفه (تومان)</th>
                          <th>عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(prices || []).map((province, index) => (
                          <CityPrice
                            key={province.id}
                            province={province}
                            index={index}
                            onAddToDelete={handleUpdateDeleteItemIds}
                            onUpdate={(id, price) =>
                              handleUpdateProvincePrice(id, price)
                            }
                          />
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <CreateCityCityShippingFee
          isOpen={createModalOpen}
          toggle={toggleCreateModal}
          closeModal={closeCreateModal}
          deliveryMethodId={id}
          existingProvinces={provinces}
        />
      </Container>

      <OptionalSizes
        isOpen={deleteModal}
        toggle={toggle}
        center
        size="md"
        title={"حذف  استان"}
      >
        <div className="p-4">
          <h4>{"حذف  استان"}</h4>
          <p className="my-3">{`آیا از ${
            deleteItemIds.length > 1 ? "پاک کردن  استان ها" : "پاک کردن  استان"
          } اطمینان دارید؟`}</p>
          <div className="d-flex justify-content-end gap-2">
            <Button color="primary" onClick={toggle}>
              لغو
            </Button>
            <Button color="danger" onClick={handleDeleteItems}>
              حذف
            </Button>
          </div>
        </div>
      </OptionalSizes>
    </div>
  );
};

export default CityShippingFee;
