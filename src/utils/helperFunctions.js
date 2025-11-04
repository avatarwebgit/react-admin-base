import { useEffect, useRef, useState } from "react";

export const formatPersianCurrency = (value) => {
  if (!value) return "";
  const numericValue = value.toString().replace(/\D/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseCurrencyInput = (value) => {
  if (!value) return "";
  return value.replace(/,/g, "");
};

export const generateSlug = (text) => {
  return text.trim().replace(/\s+/g, "_").toLowerCase();
};

export const roundPrice = (price) => {
  if (!price) return 0;
  return Math.round(Number(+price));
};

export const groupItemsByKey = (
  items,
  groupByKey,
  labelKey = "name",
  valueKey = "id"
) => {
  const grouped = {};

  items.forEach((item) => {
    const groupValue = getNestedValue(item, groupByKey) || "دسته‌بندی اصلی";

    if (!grouped[groupValue]) {
      const parent = getNestedValue(item, "parent");
      grouped[groupValue] = {
        items: [],
        parent: parent,
      };
    }
    grouped[groupValue].items.push(item);
  });

  return Object.keys(grouped).map((groupName) => {
    const groupData = grouped[groupName];
    return {
      label: groupName,
      value: groupData.parent ? groupData.parent.id : null,
      options: groupData.items.map((item) => ({
        value: getNestedValue(item, valueKey),
        label: getNestedValue(item, labelKey),
        originalItem: item,
      })),
    };
  });
};

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
};

export const buildQueryParams = (filters) => {
  const params = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params[key] = value;
    }
  });

  return params;
};
export function scrollToElement(ref, offset = 0) {
  if (!ref.current) return;

  const elementPosition =
    ref.current.getBoundingClientRect().top + window.pageYOffset;
  const scrollPosition = elementPosition - offset;

  window.scrollTo({
    top: scrollPosition,
    behavior: "smooth",
  });
}

export function useCountUp(end, start = 0, duration = 2000, formatter) {
  const [display, setDisplay] = useState(start);
  const raf = useRef();
  const startTime = useRef(null);
  const lastValue = useRef(start);

  useEffect(() => {
    cancelAnimationFrame(raf.current);
    startTime.current = null;

    // Custom 3-phase easing
    const customEase = (t) => {
      if (t < 0.3) {
        // slow start (easeInCubic)
        const p = t / 0.3;
        return 0.5 * p * p * p;
      } else if (t < 0.8) {
        // fast middle (almost linear but eased)
        const p = (t - 0.3) / 0.5;
        return 0.5 + 0.4 * (1 - Math.pow(1 - p, 2));
      } else {
        // gentle ease-out (slow finish)
        const p = (t - 0.8) / 0.2;
        return 0.9 + 0.1 * (1 - Math.pow(1 - p, 3));
      }
    };

    const step = (now) => {
      if (!startTime.current) startTime.current = now;
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = customEase(progress);
      const current = start + (end - start) * eased;

      if (Math.round(current) !== Math.round(lastValue.current)) {
        lastValue.current = current;
        setDisplay(current);
      }

      if (progress < 1) raf.current = requestAnimationFrame(step);
      else setDisplay(end);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [end, start, duration]);

  return formatter ? formatter(display) : Math.round(display).toLocaleString();
}