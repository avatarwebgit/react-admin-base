import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
  FormGroup,
} from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import allLocales from "@fullcalendar/core/locales-all";

const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
function gregorianToJalali(gy, gm, gd) {
  let gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm =
    days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { jy, jm, jd };
}

function parseYMDHM(value) {
  if (!value || typeof value !== "string") return null;
  const parts = value.split(" ");
  if (parts.length < 2) return null;

  const dateString = parts[0];
  const timeString = parts[1];

  const dateParts = dateString.split(/\/|-/);
  const timeParts = timeString.split(":");

  if (dateParts.length !== 3 || timeParts.length < 2) return null;

  const y = parseInt(dateParts[0], 10);
  const m = parseInt(dateParts[1], 10);
  const d = parseInt(dateParts[2], 10);
  const h = parseInt(timeParts[0], 10);
  const min = parseInt(timeParts[1], 10);

  if ([y, m, d, h, min].some(isNaN)) {
    return null;
  }

  const date = new Date(y, m - 1, d, h, min);

  if (
    isNaN(date.getTime()) ||
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }

  return date;
}

function extractYMD(value) {
  if (!value) return null;

  let date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === "string") {
    date = parseYMDHM(value);
  }

  if (date && !isNaN(date.getTime())) {
    return {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      min: date.getMinutes(),
    };
  }

  return null;
}

const pad2 = (n) => String(n).padStart(2, "0");

function toJalaliDisplay(value) {
  const parts = extractYMD(value);
  if (!parts) return "";
  const { jy, jm, jd } = gregorianToJalali(parts.y, parts.m, parts.d);
  return `${jy}/${pad2(jm)}/${pad2(jd)} ${pad2(parts.h)}:${pad2(parts.min)}`;
}

function formatYMDHM(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const min = date.getMinutes();
  return `${y}/${m}/${d} ${h}:${min}`;
}

const Discount = ({ formik }) => {
  const {
    values = { discount: {} },
    touched = {},
    errors = {},
    setFieldValue = () => {},
  } = formik || { discount: {} };
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const initialStartTimeParts = useMemo(
    () => extractYMD(values?.discount?.start_date),
    [values?.discount?.start_date]
  );
  const initialEndTimeParts = useMemo(
    () => extractYMD(values?.discount?.end_date),
    [values?.discount?.end_date]
  );

  const [startTime, setStartTime] = useState({
    hours: pad2(initialStartTimeParts?.h ?? 0),
    minutes: pad2(initialStartTimeParts?.min ?? 0),
  });
  const [endTime, setEndTime] = useState({
    hours: pad2(initialEndTimeParts?.h ?? 0),
    minutes: pad2(initialEndTimeParts?.min ?? 0),
  });

  // Sync local time state if formik value changes from an external source
  useEffect(() => {
    setStartTime({
      hours: pad2(initialStartTimeParts?.h ?? 0),
      minutes: pad2(initialStartTimeParts?.min ?? 0),
    });
  }, [initialStartTimeParts]);

  useEffect(() => {
    setEndTime({
      hours: pad2(initialEndTimeParts?.h ?? 0),
      minutes: pad2(initialEndTimeParts?.min ?? 0),
    });
  }, [initialEndTimeParts]);

  const startWrapRef = useRef(null);
  const endWrapRef = useRef(null);

  const faLocale = allLocales.find((locale) => locale.code === "fa");

  const startDateObj = useMemo(
    () => parseYMDHM(values?.discount?.start_date),
    [values?.discount?.start_date]
  );
  const endDateObj = useMemo(
    () => parseYMDHM(values?.discount?.end_date),
    [values?.discount?.end_date]
  );

  useEffect(() => {
    function onDocMouseDown(e) {
      if (
        showStartCalendar &&
        startWrapRef.current &&
        !startWrapRef.current.contains(e.target)
      ) {
        setShowStartCalendar(false);
      }
      if (
        showEndCalendar &&
        endWrapRef.current &&
        !endWrapRef.current.contains(e.target)
      ) {
        setShowEndCalendar(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setShowStartCalendar(false);
        setShowEndCalendar(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showStartCalendar, showEndCalendar]);

  const handleStartDateSelect = (selectInfo) => {
    const date = new Date(selectInfo.startStr);
    date.setHours(parseInt(startTime.hours, 10));
    date.setMinutes(parseInt(startTime.minutes, 10));
    setFieldValue("discount.start_date", formatYMDHM(date));
    setShowStartCalendar(false);
  };

  const handleEndDateSelect = (selectInfo) => {
    const date = new Date(selectInfo.startStr);
    date.setHours(parseInt(endTime.hours, 10));
    date.setMinutes(parseInt(endTime.minutes, 10));
    setFieldValue("discount.end_date", formatYMDHM(date));
    setShowEndCalendar(false);
  };

  const handleStartTimeChange = (e) => {
    const { name, value } = e.target;
    const newTime = { ...startTime, [name]: value };
    setStartTime(newTime);
    if (values?.discount?.start_date) {
      const date = parseYMDHM(values.discount.start_date);
      if (date) {
        date.setHours(parseInt(newTime.hours, 10));
        date.setMinutes(parseInt(newTime.minutes, 10));
        setFieldValue("discount.start_date", formatYMDHM(date));
      }
    }
  };

  const handleEndTimeChange = (e) => {
    const { name, value } = e.target;
    const newTime = { ...endTime, [name]: value };
    setEndTime(newTime);
    if (values?.discount?.end_date) {
      const date = parseYMDHM(values.discount.end_date);
      if (date) {
        date.setHours(parseInt(newTime.hours, 10));
        date.setMinutes(parseInt(newTime.minutes, 10));
        setFieldValue("discount.end_date", formatYMDHM(date));
      }
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => pad2(i));
  const minutes = Array.from({ length: 60 }, (_, i) => pad2(i));

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">تخفیف</CardTitle>
        <p className="card-title-desc mb-3">تنظیمات تخفیف</p>

        <Row>
          <Col sm={6}>
            <div className="mb-3">
              <Label htmlFor="discount.discount_percent">درصد تخفیف</Label>
              <Input
                id="discount.discount_percent"
                name="discount.discount_percent"
                type="number"
                placeholder="مقدار تخفیف"
                value={values?.discount?.discount_percent ?? ""}
                onChange={(e) => {
                  const val = +e.target.value;
                  setFieldValue("discount.discount_percent", e.target.value);

                  if (val <= 0) {
                    setFieldValue("discount.start_date", "");
                    setFieldValue("discount.end_date", "");
                  }
                }}
                invalid={
                  touched.discount?.discount_percent &&
                  !!errors.discount?.discount_percent
                }
              />
              {touched.discount?.discount_percent &&
                errors.discount?.discount_percent && (
                  <div className="invalid-feedback d-block">
                    {errors.discount.discount_percent}
                  </div>
                )}
            </div>

            <FormGroup switch>
              <Input
                type="checkbox"
                id="discount.is_visible"
                checked={values?.discount?.is_visible || false}
                // onClick={() =>
                //   setFieldValue(
                //     "discount.is_visible",
                //     !values?.discount?.is_visible
                //   )
                // }
                onClick={(e) => {
                  setFieldValue("discount.is_visible", !e.target.checked);
                }}
              />
              <Label check htmlFor="discount.is_visible">
                قابل مشاهده
              </Label>
            </FormGroup>

            <FormGroup switch>
              <Input
                type="checkbox"
                id="discount.has_date_dependency"
                checked={values?.discount?.has_date_dependency || false}
                // onClick={(e) =>
                //   setFieldValue(
                //     "discount.has_date_dependency",
                //     !values?.discount?.has_date_dependency
                //   )
                // }
                onClick={(e) => {
                  console.log(e.target.checked);
                  setFieldValue(
                    "discount.has_date_dependency",
                    !e.target.checked
                  );
                }}
              />
              <Label check htmlFor="discount.has_date_dependency">
                وابسته به روز
              </Label>
            </FormGroup>
          </Col>

          <Col sm={6}>
            <div className="mb-3 position-relative" ref={startWrapRef}>
              <Label htmlFor="discount.start_date">تاریخ شروع</Label>
              <div className="d-flex align-items-center">
                <Input
                  readOnly
                  id="discount.start_date"
                  name="discount.start_date"
                  type="text"
                  placeholder="انتخاب تاریخ شروع"
                  value={toJalaliDisplay(values?.discount?.start_date)}
                  onClick={() => setShowStartCalendar((s) => !s)}
                  invalid={
                    touched.discount?.start_date &&
                    !!errors.discount?.start_date
                  }
                />
                {values?.discount?.start_date && (
                  <span
                    role="button"
                    className="text-danger ms-2"
                    onClick={() => setFieldValue("discount.start_date", "")}
                  >
                    ×
                  </span>
                )}
              </div>
              {showStartCalendar && (
                <div
                  className=" border rounded bg-white shadow position-absolute"
                  style={{
                    zIndex: 1000,
                    top: "calc(100% + 8px)",
                    left: 0,
                    right: 0,
                    width: "100%",
                    minWidth: 600,
                  }}
                >
                  <div className="p-2 d-flex gap-2">
                    <div>
                      <Label>ساعت</Label>
                      <Input
                        type="select"
                        name="hours"
                        value={startTime.hours}
                        onChange={handleStartTimeChange}
                      >
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </Input>
                    </div>
                    <div>
                      <Label>دقیقه</Label>
                      <Input
                        type="select"
                        name="minutes"
                        value={startTime.minutes}
                        onChange={handleStartTimeChange}
                      >
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </div>
                  <FullCalendar
                    plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    initialDate={startDateObj || undefined}
                    locale={faLocale}
                    direction="rtl"
                    selectable
                    select={handleStartDateSelect}
                    headerToolbar={{
                      start: "title",
                      center: "",
                      end: "today prev,next",
                    }}
                    dayCellClassNames={(arg) => {
                      const { jy, jm } = gregorianToJalali(
                        arg.date.getFullYear(),
                        arg.date.getMonth() + 1,
                        arg.date.getDate()
                      );

                      const { jy: vjy, jm: vjm } = gregorianToJalali(
                        arg.view.currentStart.getFullYear(),
                        arg.view.currentStart.getMonth() + 1,
                        arg.view.currentStart.getDate()
                      );

                      return jm === vjm
                        ? ["fc-day-this-month"]
                        : ["fc-day-other-month"];
                    }}
                    dayCellContent={(arg) => {
                      const gy = arg.date.getFullYear();
                      const gm = arg.date.getMonth() + 1;
                      const gd = arg.date.getDate();

                      const { jy, jm, jd } = gregorianToJalali(gy, gm, gd);

                      const gregorianFull = `${gy}/${String(gm).padStart(
                        2,
                        "0"
                      )}/${String(gd).padStart(2, "0")}`;
                      const jalaliFull = `${jy}/${String(jm).padStart(
                        2,
                        "0"
                      )}/${String(jd).padStart(2, "0")}`;

                      return (
                        <div className="d-flex flex-column align-items-end p-1">
                          <div className="jalali-date small fw-bold fc-cell-day">
                            {jd}
                          </div>
                          <div className="jalali-date small  mx-auto fc-cell-jalali-date">
                            {jalaliFull}
                          </div>
                          <div className="gregorian-date small text-muted mx-auto fc-cell-gregorian-date">
                            {gregorianFull}
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
              )}
              {formik.touched?.discount &&
                formik.errors.discount?.start_date && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.discount.start_date}
                  </div>
                )}
            </div>

            <div className="mb-3 position-relative" ref={endWrapRef}>
              <Label htmlFor="discount.end_date">تاریخ پایان</Label>
              <div className="d-flex align-items-center">
                <Input
                  readOnly
                  id="discount.end_date"
                  name="discount.end_date"
                  type="text"
                  placeholder="انتخاب تاریخ پایان"
                  value={toJalaliDisplay(values?.discount?.end_date)}
                  onClick={() => setShowEndCalendar((s) => !s)}
                  invalid={
                    touched.discount?.end_date && !!errors.discount?.end_date
                  }
                />
                {values?.discount?.end_date && (
                  <span
                    role="button"
                    className="text-danger ms-2"
                    onClick={() => setFieldValue("discount.end_date", "")}
                  >
                    ×
                  </span>
                )}
              </div>
              {showEndCalendar && (
                <div
                  className=" border rounded bg-white shadow position-absolute"
                  style={{
                    zIndex: 1000,
                    top: "calc(100% + 8px)",
                    left: 0,
                    right: 0,
                    width: "100%",
                    minWidth: 600,
                  }}
                >
                  <div className="p-2 d-flex gap-2">
                    <div>
                      <Label>ساعت</Label>
                      <Input
                        type="select"
                        name="hours"
                        value={endTime.hours}
                        onChange={handleEndTimeChange}
                      >
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </Input>
                    </div>
                    <div>
                      <Label>دقیقه</Label>
                      <Input
                        type="select"
                        name="minutes"
                        value={endTime.minutes}
                        onChange={handleEndTimeChange}
                      >
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </div>
                  <FullCalendar
                    plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    initialDate={endDateObj || undefined}
                    locale={faLocale}
                    direction="rtl"
                    selectable
                    select={handleEndDateSelect}
                    dayCellClassNames={(arg) => {
                      const { jy, jm } = gregorianToJalali(
                        arg.date.getFullYear(),
                        arg.date.getMonth() + 1,
                        arg.date.getDate()
                      );

                      const { jy: vjy, jm: vjm } = gregorianToJalali(
                        arg.view.currentStart.getFullYear(),
                        arg.view.currentStart.getMonth() + 1,
                        arg.view.currentStart.getDate()
                      );

                      return jm === vjm
                        ? ["fc-day-other-month"]
                        : ["fc-day-this-month"];
                    }}
                    dayCellContent={(arg) => {
                      const gy = arg.date.getFullYear();
                      const gm = arg.date.getMonth() + 1;
                      const gd = arg.date.getDate();

                      const { jy, jm, jd } = gregorianToJalali(gy, gm, gd);

                      const gregorianFull = `${gy}/${String(gm).padStart(
                        2,
                        "0"
                      )}/${String(gd).padStart(2, "0")}`;
                      const jalaliFull = `${jy}/${String(jm).padStart(
                        2,
                        "0"
                      )}/${String(jd).padStart(2, "0")}`;

                      return (
                        <div className="d-flex flex-column align-items-end p-1">
                          <div className="jalali-date small fw-bold fc-cell-day">
                            {jd}
                          </div>
                          <div className="jalali-date small  mx-auto fc-cell-jalali-date">
                            {jalaliFull}
                          </div>
                          <div className="gregorian-date small text-muted mx-auto fc-cell-gregorian-date">
                            {gregorianFull}
                          </div>
                        </div>
                      );
                    }}
                    headerToolbar={{
                      start: "title",
                      center: "",
                      end: "today prev,next",
                    }}
                  />
                </div>
              )}
              {formik.touched?.discount && formik.errors.discount?.end_date && (
                <div className="invalid-feedback d-block">
                  {formik.errors.discount.end_date}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Discount;
