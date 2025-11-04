import React from "react";
import { Button, Input, Label } from "reactstrap";
import LiveSlider from "./LiveSlider";

const RenderedComponent = ({
  component,
  isSelected,
  selectComponent,
  handleComponentDragStart,
  deleteComponent,
  handleResizeStart,
  handleUpdate,
}) => {
  if (component.type === "placeholder") {
    return (
      <div
        style={{
          height: "10px",
          background: "rgba(0,123,255,0.5)",
          margin: "5px 0",
          borderRadius: "2px",
        }}
      />
    );
  }

  const deleteButton = (
    <Button
      color="danger"
      size="sm"
      style={{
        position: "absolute",
        top: "2px",
        right: "2px",
        zIndex: 10,
        padding: "2px 6px",
        lineHeight: 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        deleteComponent(component.id);
      }}
    >
      <i className="mdi mdi-trash-can-outline"></i>
    </Button>
  );

  const resizeHandleStyle = {
    position: "absolute",
    width: "8px",
    height: "8px",
    backgroundColor: "#007bff",
    border: "1px solid white",
    zIndex: 20,
  };

  const resizeHandles = [
    {
      direction: "top",
      cursor: "ns-resize",
      style: { top: "-4px", left: "50%", transform: "translateX(-50%)" },
    },
    {
      direction: "bottom",
      cursor: "ns-resize",
      style: { bottom: "-4px", left: "50%", transform: "translateX(-50%)" },
    },
    {
      direction: "left",
      cursor: "ew-resize",
      style: { left: "-4px", top: "50%", transform: "translateY(-50%)" },
    },
    {
      direction: "right",
      cursor: "ew-resize",
      style: { right: "-4px", top: "50%", transform: "translateY(-50%)" },
    },
    {
      direction: "top-left",
      cursor: "nwse-resize",
      style: { top: "-4px", left: "-4px" },
    },
    {
      direction: "top-right",
      cursor: "nesw-resize",
      style: { top: "-4px", right: "-4px" },
    },
    {
      direction: "bottom-left",
      cursor: "nesw-resize",
      style: { bottom: "-4px", left: "-4px" },
    },
    {
      direction: "bottom-right",
      cursor: "nwse-resize",
      style: { bottom: "-4px", right: "-4px" },
    },
  ];

  const Wrapper = ({ children, isResizable = true, extraStyles = {} }) => {
    const componentStyle = {
      ...component.style,
      ...extraStyles,
      position: "relative",
      cursor: "pointer",
    };
    if (isSelected) {
      componentStyle.border = "2px dashed #007bff";
    }

    return (
      <div
        className="draggable-component"
        data-id={component.id}
        style={componentStyle}
        onClick={(e) => selectComponent(e, component)}
        draggable="true"
        onDragStart={(e) => handleComponentDragStart(e, component.id)}
      >
        {children}
        {isSelected && deleteButton}
        {isSelected &&
          isResizable &&
          resizeHandles.map((handle) => (
            <div
              key={handle.direction}
              style={{
                ...resizeHandleStyle,
                cursor: handle.cursor,
                ...handle.style,
              }}
              onMouseDown={(e) =>
                handleResizeStart(e, component.id, handle.direction)
              }
            />
          ))}
      </div>
    );
  };

  switch (component.type) {
    case "text":
      return (
        <Wrapper>
          <div
            dangerouslySetInnerHTML={{
              __html: component.content.replace(/\n/g, "<br />"),
            }}
          ></div>
        </Wrapper>
      );
    case "button":
      return (
        <Wrapper>
          <button
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "transparent",
            }}
          >
            {component.content}
          </button>
        </Wrapper>
      );
    case "image":
      return (
        <Wrapper extraStyles={{ overflow: "hidden" }}>
          <img
            src={component.src}
            alt={component.alt}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </Wrapper>
      );
    case "rich-text":
      return (
        <Wrapper>
          <div dangerouslySetInnerHTML={{ __html: component.content }} />
        </Wrapper>
      );
    case "table":
      return (
        <Wrapper>
          <table style={{ width: "100%", height: "100%" }}>
            <thead>
              <tr>
                {component.header.map((h, i) => (
                  <th
                    key={i}
                    style={component.cellStyle}
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newHeader = [...component.header];
                      newHeader[i] = e.currentTarget.textContent;
                      handleUpdate(component.id, { header: newHeader });
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {component.rows.map((row, rI) => (
                <tr key={rI}>
                  {row.map((cell, cI) => (
                    <td
                      key={cI}
                      style={component.cellStyle}
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newRows = JSON.parse(
                          JSON.stringify(component.rows)
                        );
                        newRows[rI][cI] = e.currentTarget.textContent;
                        handleUpdate(component.id, { rows: newRows });
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Wrapper>
      );
    case "slider":
      return (
        <Wrapper>
          <LiveSlider
            slides={component.slides}
            autoplay={component.autoplay}
            swapTime={component.swapTime}
          />
        </Wrapper>
      );
    case "video":
      return (
        <Wrapper>
          <div
            style={{
              textAlign: "center",
              background: "#eee",
              padding: "10px",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className="mdi mdi-youtube" style={{ fontSize: "24px" }}></i>
            <div>ویدیوی جایگذاری شده</div>
          </div>
        </Wrapper>
      );
    case "spacer":
      return (
        <Wrapper>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(108, 117, 125, 0.2)",
            }}
          />
        </Wrapper>
      );
    case "divider":
      return (
        <Wrapper>
          <hr
            style={{
              ...component.style,
              margin: 0,
              height: "100%",
              width: "100%",
            }}
          />
        </Wrapper>
      );
    case "icon":
      return (
        <Wrapper isResizable={false}>
          <i
            className={component.iconClass}
            style={{
              fontSize: component.style.fontSize,
              color: component.style.color,
            }}
          />
        </Wrapper>
      );
    case "input":
      return (
        <Wrapper>
          <Input
            type={component.inputType}
            placeholder={component.placeholder}
            disabled
            style={{ width: "100%", height: "100%" }}
          />
        </Wrapper>
      );
    case "textarea":
      return (
        <Wrapper>
          <Input
            type="textarea"
            placeholder={component.placeholder}
            style={{ width: "100%", height: "100%", resize: "none" }}
          />
        </Wrapper>
      );
    case "html":
      return (
        <Wrapper>
          <div
            style={{
              textAlign: "center",
              background: "#f0f0f0",
              padding: "10px",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className="mdi mdi-code-tags" style={{ fontSize: "24px" }}></i>
            <div>بلوک HTML</div>
          </div>
        </Wrapper>
      );
    case "select":
      return (
        <Wrapper>
          <Label
            htmlFor={component.id}
            style={{ display: "block", marginBottom: "5px" }}
          >
            {component.label}
          </Label>
          <Input
            id={component.id}
            type="select"
            style={{ width: "100%", height: "auto" }}
          >
            {component.options.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </Input>
        </Wrapper>
      );
    default:
      return null;
  }
};

export default RenderedComponent;
