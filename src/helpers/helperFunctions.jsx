export const emptyToNull = (value) => {
  if (value === "") return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return value;
};

export function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const mapToOptions = (data) =>
  data?.map((item) => ({
    value: item.id,
    label: item.name,
  })) ?? [];
