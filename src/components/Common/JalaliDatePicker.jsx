import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, Label } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import allLocales from "@fullcalendar/core/locales-all";

// --- Jalali helpers ---
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

const pad2 = (n) => String(n).padStart(2, "0");

function parseYMDHM(value) {
  if (!value || typeof value !== "string") return null;
  const normalizedValue = value.replace(/[\/-]/g, "-");
  const parts = normalizedValue.split(" ");
  if (parts.length < 1) return null;

  const dateParts = parts[0].split("-");
  if (dateParts.length !== 3) return null;

  const y = parseInt(dateParts[0], 10);
  const m = parseInt(dateParts[1], 10);
  const d = parseInt(dateParts[2], 10);

  let h = 0,
    min = 0;
  if (parts.length > 1) {
    const timeParts = parts[1].split(":");
    if (timeParts.length >= 2) {
      h = parseInt(timeParts[0], 10);
      min = parseInt(timeParts[1], 10);
    }
  }

  if ([y, m, d, h, min].some(isNaN)) return null;

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
  return `${y}-${pad2(m)}-${pad2(d)} ${pad2(h)}:${pad2(min)}`;
}

const JalaliDatePicker = ({
  label,
  name,
  value,
  setFieldValue,
  touched,
  error,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const initialTimeParts = useMemo(() => extractYMD(value), [value]);
  const [time, setTime] = useState({
    hours: pad2(initialTimeParts?.h ?? 0),
    minutes: pad2(initialTimeParts?.min ?? 0),
  });

  useEffect(() => {
    setTime({
      hours: pad2(initialTimeParts?.h ?? 0),
      minutes: pad2(initialTimeParts?.min ?? 0),
    });
  }, [initialTimeParts]);

  const wrapRef = useRef(null);
  const faLocale = allLocales.find((locale) => locale.code === "fa");
  const dateObj = useMemo(() => parseYMDHM(value), [value]);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (
        showCalendar &&
        wrapRef.current &&
        !wrapRef.current.contains(e.target)
      ) {
        setShowCalendar(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showCalendar]);

  const handleDateSelect = (selectInfo) => {
    const date = new Date(selectInfo.startStr);
    date.setHours(parseInt(time.hours, 10));
    date.setMinutes(parseInt(time.minutes, 10));
    setFieldValue(name, formatYMDHM(date));
    setShowCalendar(false);
  };

  const handleTimeChange = (e) => {
    const { name: timeName, value: timeValue } = e.target;
    const newTime = { ...time, [timeName]: timeValue };
    setTime(newTime);
    if (value) {
      const date = parseYMDHM(value);
      if (date) {
        date.setHours(parseInt(newTime.hours, 10));
        date.setMinutes(parseInt(newTime.minutes, 10));
        setFieldValue(name, formatYMDHM(date));
      }
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => pad2(i));
  const minutes = Array.from({ length: 60 }, (_, i) => pad2(i));

  return (
    <div className="mb-3 position-relative" ref={wrapRef}>
      <Label htmlFor={name}>{label}</Label>
      <div className="d-flex align-items-center">
        <Input
          readOnly
          id={name}
          name={name}
          type="text"
          placeholder={`انتخاب ${label}`}
          value={toJalaliDisplay(value)}
          onClick={() => setShowCalendar((s) => !s)}
          invalid={touched && !!error}
        />
        {value && (
          <span
            role="button"
            className="text-danger ms-2"
            onClick={() => setFieldValue(name, "")}
          >
            ×
          </span>
        )}
      </div>
      {showCalendar && (
        <div
          className="border rounded bg-white shadow position-absolute"
          style={{
            zIndex: 1000,
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            width: "100%",
            minWidth: 300,
          }}
        >
          <div className="p-2 d-flex gap-2">
            <div>
              <Label>ساعت</Label>
              <Input
                type="select"
                name="hours"
                value={time.hours}
                onChange={handleTimeChange}
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
                value={time.minutes}
                onChange={handleTimeChange}
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
            initialDate={dateObj || undefined}
            locale={faLocale}
            direction="rtl"
            selectable
            select={handleDateSelect}
            headerToolbar={{
              start: "title",
              center: "",
              end: "today prev,next",
            }}
          />
        </div>
      )}
      {touched && error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </div>
  );
};

export default JalaliDatePicker;
