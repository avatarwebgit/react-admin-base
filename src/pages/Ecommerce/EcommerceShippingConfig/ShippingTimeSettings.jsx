import BootstrapTheme from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import TimeRangeModal from "./TimeRangeModal";
import TimeRangeRow from "./TimeRangeRow";
import allLocales from "@fullcalendar/core/locales-all";

const ShippingTimeSettings = ({ formik, methods, isLoading }) => {
  const [timeModal, setTimeModal] = useState({ isOpen: false, index: null });

  const calendarWrapRef = useRef();

  // --- Jalali helpers ---

  useEffect(() => {
    if (
      !formik.values.delivery_days ||
      formik.values.delivery_days.length === 0
    ) {
      const selectedDays = [];
      const currentYear = moment().year();

      const excludedWeekdays = [4, 5];

      for (let month = 0; month < 36; month++) {
        const daysInMonth = moment([currentYear, month]).daysInMonth();

        for (let day = 1; day <= daysInMonth; day++) {
          const date = moment([currentYear, month, day]);
          const weekday = date.day();

          if (excludedWeekdays.includes(weekday)) {
            const gregorianDate = date.format("YYYY-MM-DD");
            selectedDays.push(gregorianDate);
          }
        }
      }

      formik.setFieldValue("delivery_days", selectedDays);
    }
  }, []);

  const handleEditTime = (index) => {
    setTimeModal({ isOpen: true, index });
  };

  const handleSaveTime = (newTime, index) => {
    const newTimes = [...formik.values.sent_times];
    newTimes[index] = newTime;
    formik.setFieldValue("sent_times", newTimes);
    setTimeModal({ isOpen: false, index: null });
  };

  const handleAddTime = () => {
    formik.setFieldValue("sent_times", [...formik.values.sent_times, "09-17"]);
  };

  const handleRemoveTime = (index) => {
    const newTimes = formik.values.sent_times.filter((_, i) => i !== index);
    formik.setFieldValue("sent_times", newTimes);
  };

  const handleRemoveDate = (jalaliDate) => {
    const currentDays = formik.values.delivery_days || [];
    const newDays = currentDays.filter((d) => d !== jalaliDate);
    formik.setFieldValue("delivery_days", newDays);
  };

  const deliveryEvents = (formik.values.delivery_days || []).map(
    (gregorianDate) => {
      return {
        start: gregorianDate,
        allDay: true,
        // title: "✖",
        backgroundColor: "#ffd1d1ff",
        borderColor: "#cc0000",
        textColor: "white",
        extendedProps: { rawDate: gregorianDate },
        display: "background",
      };
    }
  );

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    const currentDays = formik.values.delivery_days || [];
    const newDays = currentDays.includes(clickedDate)
      ? currentDays.filter((d) => d !== clickedDate)
      : [...currentDays, clickedDate];
    formik.setFieldValue("delivery_days", newDays);
  };

  const faLocale = allLocales.find((locale) => locale.code === "fa");

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h4">تنظیمات زمان ارسال کالا</CardTitle>
          {isLoading ? (
            <div className="w-full d-flex align-items-center justify-content-center">
              <Spinner color="primary" size={"sm"} />
            </div>
          ) : (
            <Form onSubmit={formik.handleSubmit}>
              <Card>
                <Card className="p-3 my-3">
                  <FormGroup>
                    <Label className="fw-bold">انتخاب روزهای ارسال</Label>
                    <div ref={calendarWrapRef}>
                      <FullCalendar
                        height={"400px"}
                        plugins={[
                          BootstrapTheme,
                          dayGridPlugin,
                          interactionPlugin,
                        ]}
                        locale={faLocale}
                        initialView="dayGridMonth"
                        direction="rtl"
                        events={deliveryEvents}
                        dateClick={handleDateClick}
                        headerToolbar={{
                          start: "title",
                          center: "",
                          end: "today prev,next",
                        }}
                        eventContent={(eventInfo) => {
                          return (
                            <div className="d-flex justify-content-start align-items-center w-100">
                              <span>{eventInfo.event.title}</span>{" "}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveDate(
                                    eventInfo.event.extendedProps.rawDate
                                  );
                                }}
                                className="btn btn-sm btn-link text-danger p-0"
                              >
                                ❌
                              </button>
                            </div>
                          );
                        }}
                      />
                    </div>
                    <small className="form-text text-muted mt-2 d-block">
                      روی تاریخ کلیک کنید تا اضافه شود. برای حذف تاریخ روی علامت
                      ❌ کلیک کنید.
                    </small>
                  </FormGroup>
                </Card>
              </Card>

              <Card className="p-3 my-3">
                <FormGroup>
                  <Label className="fw-bold">
                    انتخاب زمان برای کدام روش ها فعال شود؟
                  </Label>
                  <div className="d-flex flex-wrap gap-3 mt-2">
                    {methods.map((method) => (
                      <div className="form-check" key={method.id}>
                        <Input
                          type="checkbox"
                          name="shipping_methods_for_timing"
                          value={String(method.id)}
                          id={`shipping-${method.id}`}
                          checked={formik.values.shipping_methods_for_timing.includes(
                            String(method.id)
                          )}
                          onChange={formik.handleChange}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor={`shipping-${method.id}`}
                        >
                          {method.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <small className="form-text text-muted mt-2 d-block">
                    هر کدام از روش های بالا را که فعال نمایید، کاربر به محض کلیک
                    روی آنها با یک پاپاپ مواجه خواهد شد، که از وی زمان دریافت
                    مرسوله از پیک فروشگاه را درخواست میکند.
                  </small>
                </FormGroup>
              </Card>

              <Card className="p-3 my-3">
                <FormGroup>
                  <Label className="fw-bold">ساعات ارسال</Label>
                  <ul className="list-unstyled mt-2">
                    {formik.values.sent_times.map((time, index) => (
                      <TimeRangeRow
                        key={index}
                        index={index}
                        time={time}
                        onEdit={handleEditTime}
                        onRemove={handleRemoveTime}
                        error={
                          formik.errors.sent_times &&
                          formik.errors.sent_times[index]
                        }
                      />
                    ))}
                  </ul>
                  <Button type="button" color="success" onClick={handleAddTime}>
                    + افزودن ساعت
                  </Button>
                </FormGroup>
              </Card>

              <Card className="p-3 my-3">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="send_after_days" className="fw-bold">
                        چندروز بعد از خرید ارسال انجام میشود
                      </Label>
                      <Input
                        type="number"
                        id="send_after_days"
                        name="send_after_days"
                        {...formik.getFieldProps("send_after_days")}
                      />
                      <small className="form-text text-muted">
                        مشخص کنید تایم هایی که مشتری برای دریافت کالا انتخاب
                        میکند، از چند روز بعد نمایش داده شود؟
                      </small>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="available_days" className="fw-bold">
                        چند روز در بخش سفارشات نمایش داده شود
                      </Label>
                      <Input
                        type="number"
                        id="available_days"
                        name="available_days"
                        {...formik.getFieldProps("available_days")}
                      />
                      <small className="form-text text-muted">
                        مشخص کنید چند تاریخ برای انتخاب به کاربر نمایش داده شود.
                      </small>
                    </FormGroup>
                  </Col>
                </Row>
              </Card>

              <Card className="p-3 my-3">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="free_shipping_min" className="fw-bold">
                        از چه قیمتی به بعد، هزینه ی ارسال رایگان شود؟ (
                        {Intl.NumberFormat("fa-IR").format(
                          formik.values.free_shipping_min
                        )}
                        &nbsp; تومان)
                      </Label>
                      <Input
                        type="number"
                        id="free_shipping_min"
                        name="free_shipping_min"
                        {...formik.getFieldProps("free_shipping_min")}
                      />
                    </FormGroup>
                    </Col>
                    
                  <Col md="12">
                    <FormGroup>
                      <Label className="fw-bold">
                        قانون حذف هزینه ی ارسال برای کدام روش های ارسال اعمال
                        شود؟
                      </Label>
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {methods.map((method) => (
                          <div
                            className="form-check form-switch"
                            key={method.id}
                          >
                            <Input
                              type="checkbox"
                              name="free_shipping_delivery_methods"
                              value={String(method.id)}
                              id={`free-shipping-${method.id}`}
                              checked={formik.values.free_shipping_delivery_methods.includes(
                                String(method.id)
                              )}
                              onChange={formik.handleChange}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor={`free-shipping-${method.id}`}
                            >
                              {method.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Card>

              <Button
                type="submit"
                color="primary"
                className="mt-3 align-self-start"
              >
                ذخیره تنظیمات
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>

      <TimeRangeModal
        isOpen={timeModal.isOpen}
        toggle={() => setTimeModal({ isOpen: false, index: null })}
        time={
          timeModal.index !== null
            ? formik.values.sent_times[timeModal.index]
            : "00-00"
        }
        onSave={(newTime) => handleSaveTime(newTime, timeModal.index)}
      />
    </>
  );
};

export default ShippingTimeSettings;
