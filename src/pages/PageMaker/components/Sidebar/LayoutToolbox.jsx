import React from "react";

const ToolboxItem = ({ name, type, icon, isLayout = false }) => {
  const style = {
    padding: "10px 15px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    marginBottom: "10px",
    cursor: "grab",
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  };
  return (
    <div
      style={style}
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData("action", "add");
        e.dataTransfer.setData("componentType", type);
        e.dataTransfer.setData("isLayout", isLayout.toString());
      }}
    >
      <i className={`mdi ${icon} me-2`}></i>
      {name}
    </div>
  );
};

const LayoutToolbox = () => {
  return (
    <>
      <ToolboxItem
        name="۱ ستون"
        type="section-1"
        icon="mdi-view-stream"
        isLayout={true}
      />
      <ToolboxItem
        name="۲ ستون"
        type="section-2"
        icon="mdi-view-column"
        isLayout={true}
      />
      <ToolboxItem
        name="۳ ستون"
        type="section-3"
        icon="mdi-view-week"
        isLayout={true}
      />
      <ToolboxItem
        name="۴ ستون"
        type="section-4"
        icon="mdi-view-grid"
        isLayout={true}
      />
      <hr />
      <p className="text-muted">طرح‌بندی‌های نامتقارن</p>
      <ToolboxItem
        name="دو ستون (33/67)"
        type="section-sidebar-left"
        icon="mdi-page-layout-sidebar-left"
        isLayout={true}
      />
      <ToolboxItem
        name="دو ستون (67/33)"
        type="section-sidebar-right"
        icon="mdi-page-layout-sidebar-right"
        isLayout={true}
      />
      <ToolboxItem
        name="دو ستون (25/75)"
        type="section-sidebar-left-quarter"
        icon="mdi-page-layout-sidebar-left"
        isLayout={true}
      />
      <ToolboxItem
        name="دو ستون (75/25)"
        type="section-sidebar-right-quarter"
        icon="mdi-page-layout-sidebar-right"
        isLayout={true}
      />
      <ToolboxItem
        name="سه ستون (عریض وسط)"
        type="section-three-center-wide"
        icon="mdi-view-day-outline"
        isLayout={true}
      />
    </>
  );
};

export default LayoutToolbox;
