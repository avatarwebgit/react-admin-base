import React from "react";

const ToolboxItem = ({ name, type, icon, isLayout = false }) => {
  const style = {
    padding: "5px 15px",
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

const Toolbox = () => {
  return (
    <>
      <ToolboxItem name="متن" type="text" icon="mdi-format-text" />
      <ToolboxItem name="دکمه" type="button" icon="mdi-gesture-tap-button" />
      <ToolboxItem name="تصویر" type="image" icon="mdi-image-outline" />
      <ToolboxItem
        name="متن غنی"
        type="rich-text"
        icon="mdi-file-document-edit-outline"
      />
      <ToolboxItem name="جدول" type="table" icon="mdi-table" />
      <ToolboxItem
        name="اسلایدر تصویر"
        type="slider"
        icon="mdi-view-carousel"
      />
      <ToolboxItem name="ویدیو" type="video" icon="mdi-youtube" />
      <ToolboxItem name="آیکون" type="icon" icon="mdi-star-circle-outline" />
      <ToolboxItem name="فیلد ورودی" type="input" icon="mdi-form-textbox" />
      <ToolboxItem name="منو/انتخاب" type="select" icon="mdi-form-select" />
      <ToolboxItem name="ناحیه متنی" type="textarea" icon="mdi-form-textarea" />
      <ToolboxItem name="کد HTML" type="html" icon="mdi-code-tags" />
      <ToolboxItem
        name="فاصله‌گذار"
        type="spacer"
        icon="mdi-arrow-expand-vertical"
      />
      <ToolboxItem name="جداکننده" type="divider" icon="mdi-minus" />
    </>
  );
};

export default Toolbox;
