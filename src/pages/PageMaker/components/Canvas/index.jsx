import React from "react";
import RenderedSection from "./RenderedSection";

const Canvas = (props) => {
  const { pageComponents, handleDragOver, handleDrop, pageConfig } = props;
  return (
    <div
      className="canvas"
      style={{
        minHeight: "100%",
        width: "100%",
        backgroundColor: pageConfig.backgroundColor || "#ffffff",
      }}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, undefined, undefined)}
      onClick={() => props.selectComponent(null, null)}
    >
      {pageComponents.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            minHeight: "300px",
          }}
        >
          <p className="text-muted text-center">
            برای شروع، یک طرح‌بندی را از جعبه ابزار بکشید.
          </p>
        </div>
      ) : (
        pageComponents.map((section) => (
          <RenderedSection key={section.id} section={section} {...props} />
        ))
      )}
    </div>
  );
};

export default Canvas;
