import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import * as yup from "yup";

//Import Breadcrumb
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  getDeliveryMethods,
  getDeliveryMethodSettings,
  updateDeliveryMethodSetting,
} from "../../../store/e-commerce/actions";
import ShippingRow from "./ShippingRow";
import ShippingTimeSettings from "./ShippingTimeSettings";
import ShippingUpdateModal from "./ShippingUpdateModal";
import NoData from "../../../components/Common/NoData";

const EcommerceShippingConfig = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({ isOpen: false, id: null });
  const [initialValues, setInitialValues] = useState({
    holidays: [],
    shipping_methods_for_timing: [],
    sent_times: [],
    send_after_days: 0,
    available_days: 0,
    free_shipping_min: 1000000,
    free_shipping_delivery_methods: [],
  });

  const methods = useSelector((state) => state.ecommerce.deliveryMethods.items);
  const {
    deliveryMethodLoading,
    deliveryMethodSettingsLoading,
    deliveryMethodSettings,
  } = useSelector((state) => state.ecommerce);

  useEffect(() => {
    console.log(deliveryMethodSettings);
  }, [deliveryMethodSettings]);

  useEffect(() => {
    dispatch(getDeliveryMethods());
    dispatch(getDeliveryMethodSettings());
  }, [dispatch]);

  const toggleModal = (id = null) => {
    setModal({ isOpen: !modal.isOpen, id });
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      send_after_days: yup.number().min(0, "مقدار باید مثبت باشد"),
      available_days: yup.number().min(1, "حداقل 1 روز باید باشد"),
      free_shipping_min: yup.number().min(0, "مقدار باید مثبت باشد"),
      sent_times: yup
        .array()
        .of(yup.string().matches(/^\d{1,2}-\d{1,2}$/, "فرمت باید HH-HH باشد")),
    }),
    onSubmit: (values) => {
      dispatch(updateDeliveryMethodSetting(values));
    },
  });

  useEffect(() => {
    if (
      deliveryMethodSettings &&
      Object.keys(deliveryMethodSettings).length > 0
    ) {
      setInitialValues({
        // holidays: deliveryMethodSettings.holidays || [],
        shipping_methods_for_timing:
          deliveryMethodSettings.shipping_methods_for_timing || [],
        sent_times: deliveryMethodSettings.sent_times || [],
        send_after_days: deliveryMethodSettings.send_after_days || 0,
        available_days: deliveryMethodSettings.available_days || 0,
        free_shipping_min: deliveryMethodSettings.free_shipping_min || 1000000,
        free_shipping_delivery_methods:
          deliveryMethodSettings?.free_shipping_delivery_methods?.map((p) =>
            String(p.id)
          ) || [],
      });
    }
  }, [deliveryMethodSettings]);

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="تنظیمات ارسال" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h4">وضعیت روش های ارسال</CardTitle>
                  {deliveryMethodLoading && (
                    <div className="w-full d-flex align-items-center justify-content-center">
                      <Spinner color="primary" size={"sm"} />
                    </div>
                  )}

                  {methods.length <= 0 && !deliveryMethodLoading && <NoData />}

                  {!deliveryMethodLoading && methods.length > 0 && (
                    <div className="table-responsive">
                      <Table className="table table-bordered table-striped text-center">
                        <thead>
                          <tr>
                            <th>روش ارسال</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {methods.map((method) => (
                            <ShippingRow
                              key={method.id}
                              method={method}
                              onEdit={() => toggleModal(method.id)}
                            />
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </CardBody>
              </Card>
              {methods.length <= 0 && !deliveryMethodSettingsLoading && (
                <NoData />
              )}

              <ShippingTimeSettings
                formik={formik}
                methods={methods}
                isLoading={deliveryMethodSettingsLoading}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {modal.isOpen && (
        <ShippingUpdateModal modal={modal} toggle={toggleModal} />
      )}
    </React.Fragment>
  );
};

export default EcommerceShippingConfig;
