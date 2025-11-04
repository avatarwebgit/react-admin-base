import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
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
import { getSliders } from "../../../store/e-commerce/actions";
import "../../../styles/categories.scss";
import CreatSliderModal from "./CreatSliderModal";
import UpdateSliderModal from "./UpdateSliderModal";
import SliderRow from "./SliderRow";
import NoData from "../../../components/Common/NoData";
import { useSort } from "../../../hooks/useSort";

const EcommerceSliders = () => {
  document.title = 'تنظیمات اسلایدر'
  const sliders = useSelector((state) => state.ecommerce.sliders.items);
  const { sliderLoading } = useSelector((state) => state.ecommerce);

  
  const { items: sortedSliders } = useSort(sliders, {
    key: "display_order",
    direction: "asc",
  });

  const [createSliderOpen, setCreateSliderOpen] = useState(false);
  const [updateSliderOpen, setUpdateSliderOpen] = useState(false);
  const [selectedSliderId, setSelectedSliderId] = useState(null);
  const [page, setPage] = useState(1);

  const toggleCreateModal = () => setCreateSliderOpen(!createSliderOpen);
  const toggleUpdateModal = () => setUpdateSliderOpen(!updateSliderOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSliders(page));
  }, []);

  useEffect(() => {
    console.log(sliders);
  }, [sliders]);

  return (
    <React.Fragment>
      <div className="page-content slider-main-container">
        <Container fluid>
          <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="اسلایدرها" />

          <Row className="d-flex align-items-center justify-content-end my-3 btn-fit-content">
            <Button color="primary" onClick={() => setCreateSliderOpen(true)}>
              <i
                className="mdi mdi-plus-circle-outline"
                style={{ color: "#fff" }}
              ></i>
              <span>ایجاد اسلایدر جدید</span>
            </Button>
          </Row>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">لیست اسلایدرها</CardTitle>
                  {sliderLoading && (
                    <div className="w-full d-flex align-items-center justify-content-center">
                      <Spinner color="primary" size={"sm"} />
                    </div>
                  )}

                  {sliders.length <= 0 && !sliderLoading && <NoData />}

                  {!sliderLoading && sliders.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col" className="text-center">
                              ردیف
                            </th>
                            <th scope="col" className="text-center">
                              عنوان
                            </th>
                            <th scope="col" className="text-center">
                              اولویت نمایش
                            </th>
                            <th scope="col" className="text-center">
                              تصاویر دسکتاپ
                            </th>
                            <th scope="col" className="text-center">
                              تصاویر موبایل
                            </th>
                            <th scope="col" className="text-center">
                              عملیات
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedSliders &&
                            sortedSliders.map((slider, index) => (
                              <SliderRow
                                slider={slider}
                                index={index}
                                key={slider.id}
                                isUpdateModalOpen={setUpdateSliderOpen}
                                sendLabelId={setSelectedSliderId}
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
      </div>

      <CreatSliderModal isOpen={createSliderOpen} toggle={toggleCreateModal} />
      <UpdateSliderModal
        isOpen={updateSliderOpen}
        toggle={toggleUpdateModal}
        sliderId={selectedSliderId}
      />
    </React.Fragment>
  );
};

export default EcommerceSliders;
