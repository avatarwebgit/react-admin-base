export const formatGroupLabel = (
  data,
  onGroupClick,
  selectedParentIds = []
) => {
  const isSelected = data.value && selectedParentIds.includes(data.value);
  return (
    <div
      onClick={() => onGroupClick && onGroupClick(data)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
        paddingRight: "20px",
        color: "white",
        fontSize: "12px",
        textAlign: "right",
        direction: "rtl",
        cursor: "pointer", 
        backgroundColor: isSelected ? "#4a6572" : "rgba(255,255,255,0.1)", 
        borderRadius: "8px",
      }}
    >
      <span>{data.label}</span>
      <span
        style={{
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "12px",
          padding: "2px 8px",
          fontSize: "12px",
          fontWeight: "normal",
        }}
      >
        {data.options.length} مورد
      </span>
    </div>
  );
};

export const persianStyles = {
  groupHeading: (base) => ({
    ...base,
    backgroundColor: "#4a6572",
    color: "#f9aa33",
    fontWeight: "normal",
    fontSize: "15px",
    padding: "6px 10px 6px 6px",
    borderBottom: "2px solid #344955",
    margin: "0",
    textAlign: "right",
    direction: "rtl",
    fontFamily: "Vazir, Tahoma, sans-serif",
    position: "relative",
    cursor: "pointer",
  }),
  group: (base) => ({
    ...base,
    padding: 0,
    marginBottom: "15px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    border: "1px solid #e1e1e1",
  
  }),
  option: (base, state) => ({
    ...base,
    textAlign: "right",
    padding: "10px 20px 10px 30px", 
    fontFamily: "Vazir, Tahoma, sans-serif",
    fontSize: "12px",
    backgroundColor: state.isSelected
      ? "#62727aff"
      : state.isFocused
      ? "#f0f7ff"
      : "white",
    color: state.isSelected ? "white" : "#333",
    cursor: "pointer",
    paddingRight: "30px",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    borderRadius: "8px",
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: "6px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "black",
    fontFamily: "Vazir, Tahoma, sans-serif",
    fontSize: "13px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "black",
    ":hover": {
      backgroundColor: "#47555dff",
      color: "white",
    },
  }),
};
