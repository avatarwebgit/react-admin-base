import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import RenderedComponent from "./RenderedComponent";

const RenderedSection = (props) => {
  const {
    section,
    selectedComponent,
    dropIndicator,
    handleDragOver,
    handleDrop,
    handleColumnDragOver,
    setDropIndicator,
    selectComponent,
    deleteSection,
    handleResizeStart,
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const isSelected = selectedComponent && selectedComponent.id === section.id;
  const baseStyle = {
    position: "relative",
    cursor: "pointer",
    ...section.style,
    transition: "border-color 0.2s",
  };

  let borderStyle;
  if (isSelected) {
    borderStyle = "2px solid #28a745";
  } else if (isHovered) {
    borderStyle = "2px dashed #007bff";
  } else {
    borderStyle = "1px solid #ddd";
  }
  const sectionFinalStyle = {
    ...baseStyle,
    border: borderStyle,
    display: "flex",
    flexDirection: "column",
  };

  const resizeHandleStyle = {
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "#007bff",
    border: "1px solid white",
    zIndex: 20,
  };

  const resizeHandles = [];
  // Height handle
  resizeHandles.push({
    direction: "bottom",
    cursor: "ns-resize",
    style: {
      bottom: "-5px",
      left: "50%",
      transform: "translateX(-50%)",
      height: "10px",
      width: "20px",
      borderRadius: "5px",
    },
  });
  // Width handles for multi-column sections
  if (section.columns.length > 1) {
    resizeHandles.push(
      {
        direction: "left",
        cursor: "ew-resize",
        style: {
          left: "-5px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "10px",
          height: "20px",
          borderRadius: "5px",
        },
      },
      {
        direction: "right",
        cursor: "ew-resize",
        style: {
          right: "-5px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "10px",
          height: "20px",
          borderRadius: "5px",
        },
      }
    );
  }

  return (
    <div
      data-id={section.id}
      style={sectionFinalStyle}
      onClick={(e) => selectComponent(e, section)}
      onDragOver={handleDragOver}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isSelected && (
        <Button
          color="danger"
          size="sm"
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            zIndex: 10,
            padding: "0 5px",
            fontSize: "10px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            deleteSection(section.id);
          }}
        >
          حذف بخش
        </Button>
      )}
      <Row style={{ flex: 1 }}>
        {section.columns.map((column, colIndex) => {
          const colWidth = section.layout
            ? section.layout[colIndex]
            : 12 / section.columns.length;
          let columnWithIndicator = [...column];
          let hasDropIndicator = false;
          if (
            dropIndicator &&
            dropIndicator.sectionId === section.id &&
            dropIndicator.colIndex === colIndex
          ) {
            columnWithIndicator.splice(dropIndicator.dropIndex, 0, {
              id: "drop-placeholder",
              type: "placeholder",
            });
            hasDropIndicator = true;
          }
          return (
            <Col
              key={colIndex}
              md={colWidth}
              style={{
                border: "1px dashed #ccc",
                padding: "10px",
                transition: "background-color 0.2s",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                alignContent: "flex-start",
                minHeight: "100px",
              }}
              onDrop={(e) => handleDrop(e, section.id, colIndex)}
              onDragOver={(e) => handleColumnDragOver(e, section.id, colIndex)}
              onDragLeave={() => setDropIndicator(null)}
            >
              {column.length === 0 && !hasDropIndicator && (
                <div
                  style={{
                    color: "#aaa",
                    textAlign: "center",
                    pointerEvents: "none",
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <i className="mdi mdi-plus" style={{ fontSize: "24px" }}></i>
                  <div>المنت را وارد کنید</div>
                </div>
              )}
              {columnWithIndicator.map((comp) => (
                <RenderedComponent
                  key={comp.id}
                  component={comp}
                  isSelected={selectedComponent?.id === comp.id}
                  {...props}
                />
              ))}
            </Col>
          );
        })}
      </Row>
      {(isHovered || isSelected) &&
        resizeHandles.map((handle) => (
          <div
            key={handle.direction}
            style={{
              ...resizeHandleStyle,
              cursor: handle.cursor,
              ...handle.style,
            }}
            onMouseDown={(e) =>
              handleResizeStart(e, section.id, handle.direction)
            }
          />
        ))}
    </div>
  );
};

export default RenderedSection;
