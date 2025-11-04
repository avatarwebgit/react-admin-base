import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import { findComponentById, generateHtml } from "./utils";
import IconPickerModal from "./components/common/IconPickerModal";

const PageMaker = () => {

  const [pageComponents, setPageComponents] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pageConfig, setPageConfig] = useState({
    title: "صفحه جدید",
    backgroundColor: "#ffffff",
    slug: "",
    displayOrder: 0,
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
  });
  const [dropIndicator, setDropIndicator] = useState(null);
  const [resizingState, setResizingState] = useState({ isResizing: false });
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [iconTargetId, setIconTargetId] = useState(null);

  const handleUpdate = (id, newProps) => {
    const found = findComponentById(pageComponents, id);
    if (found) {
      const { component, path } = found;
      const updatedComponent = {
        ...component,
        ...newProps,
        style: { ...component.style, ...newProps.style },
      };

      let newPageComponents = JSON.parse(JSON.stringify(pageComponents));

      if (path.length === 1) {
        newPageComponents[path[0]] = updatedComponent;
      } else {
        newPageComponents[path[0]].columns[path[1]][path[2]] = updatedComponent;
      }

      setPageComponents(newPageComponents);
      setSelectedComponent(updatedComponent);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleColumnDragOver = (e, sectionId, colIndex) => {
    e.preventDefault();
    e.stopPropagation();

    const columnElement = e.currentTarget;
    const children = Array.from(columnElement.children).filter((el) =>
      el.classList.contains("draggable-component")
    );

    if (children.length === 0) {
      if (
        !dropIndicator ||
        dropIndicator.sectionId !== sectionId ||
        dropIndicator.colIndex !== colIndex ||
        dropIndicator.dropIndex !== 0
      ) {
        setDropIndicator({ sectionId, colIndex, dropIndex: 0 });
      }
      return;
    }

    let closest = { element: null, distance: Infinity };
    children.forEach((child) => {
      const box = child.getBoundingClientRect();
      const offsetX = e.clientX - box.left - box.width / 2;
      const offsetY = e.clientY - box.top - box.height / 2;
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      if (distance < closest.distance) {
        closest = { element: child, distance };
      }
    });

    let dropIndex = children.length;
    if (closest.element) {
      const closestIndex = children.indexOf(closest.element);
      const box = closest.element.getBoundingClientRect();
      if (e.clientX < box.left + box.width / 2) {
        dropIndex = closestIndex;
      } else {
        dropIndex = closestIndex + 1;
      }
    }

    if (
      !dropIndicator ||
      dropIndicator.sectionId !== sectionId ||
      dropIndicator.colIndex !== colIndex ||
      dropIndicator.dropIndex !== dropIndex
    ) {
      setDropIndicator({ sectionId, colIndex, dropIndex });
    }
  };

  const handleDrop = (e, sectionId, colIndex) => {
    e.preventDefault();
    e.stopPropagation();

    const action = e.dataTransfer.getData("action");
    const componentType = e.dataTransfer.getData("componentType");
    const isLayout = e.dataTransfer.getData("isLayout") === "true";
    const dropIndex = dropIndicator ? dropIndicator.dropIndex : 0;
    setDropIndicator(null);

    if (isLayout && sectionId === undefined) {
      let columns = [];
      let layout = null;

      switch (componentType) {
        case "section-1":
          columns = [[]];
          layout = [12];
          break;
        case "section-2":
          columns = [[], []];
          layout = [6, 6];
          break;
        case "section-3":
          columns = [[], [], []];
          layout = [4, 4, 4];
          break;
        case "section-4":
          columns = [[], [], [], []];
          layout = [3, 3, 3, 3];
          break;
        case "section-sidebar-left":
          columns = [[], []];
          layout = [4, 8];
          break;
        case "section-sidebar-right":
          columns = [[], []];
          layout = [8, 4];
          break;
        case "section-sidebar-left-quarter":
          columns = [[], []];
          layout = [3, 9];
          break;
        case "section-sidebar-right-quarter":
          columns = [[], []];
          layout = [9, 3];
          break;
        case "section-three-center-wide":
          columns = [[], [], []];
          layout = [3, 6, 3];
          break;
      }

      if (layout) {
        const newSection = {
          id: `section-${Date.now()}`,
          type: "section",
          columns: columns,
          layout: layout,
          style: {
            width: "100%",
            minHeight: "100px",
            position: "relative",
            padding: "10px",
          },
        };
        setPageComponents([...pageComponents, newSection]);
      }
      return;
    }

    if (action === "move") {
      const componentId = e.dataTransfer.getData("componentId");
      if (!componentId || sectionId === undefined) return;

      let draggedComponent = null;
      const tempComponents = JSON.parse(JSON.stringify(pageComponents));

      for (const section of tempComponents) {
        for (const col of section.columns) {
          const index = col.findIndex((c) => c.id === componentId);
          if (index > -1) {
            [draggedComponent] = col.splice(index, 1);
            break;
          }
        }
        if (draggedComponent) break;
      }

      if (draggedComponent) {
        const targetSectionIndex = tempComponents.findIndex(
          (s) => s.id === sectionId
        );
        if (
          targetSectionIndex > -1 &&
          tempComponents[targetSectionIndex].columns[colIndex]
        ) {
          tempComponents[targetSectionIndex].columns[colIndex].splice(
            dropIndex,
            0,
            draggedComponent
          );
          setPageComponents(tempComponents);
          setSelectedComponent(draggedComponent);
        }
      }
    } else if (action === "add" && !isLayout && sectionId !== undefined) {
      const newId = `${componentType}-${Date.now()}`;
      let newComponent;
      const baseComponent = {
        id: newId,
        type: componentType,
        style: { padding: "10px", margin: "5px" },
      };

      switch (componentType) {
        case "text":
          newComponent = {
            ...baseComponent,
            content: "متن نمونه",
            style: {
              ...baseComponent.style,
              fontSize: "16px",
              color: "#333333",
            },
          };
          break;
        case "button":
          newComponent = {
            ...baseComponent,
            content: "دکمه",
            style: {
              ...baseComponent.style,
              backgroundColor: "#007bff",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            },
            link: "#",
          };
          break;
        case "image":
          newComponent = {
            ...baseComponent,
            src: "https://via.placeholder.com/150",
            alt: "تصویر جایگزین",
            style: {
              ...baseComponent.style,
              padding: "0",
              margin: "0",
              width: "150px",
              height: "150px",
            },
          };
          break;
        case "rich-text":
          newComponent = {
            ...baseComponent,
            content: "<h3>عنوان نمونه</h3><p>این یک پاراگراف است.</p>",
          };
          break;
        case "table":
          newComponent = {
            ...baseComponent,
            header: ["هدر ۱", "هدر ۲"],
            rows: [["سلول ۱", "سلول ۲"]],
            style: {
              ...baseComponent.style,
              width: "100%",
              borderCollapse: "collapse",
            },
            cellStyle: { border: "1px solid #ddd", padding: "8px" },
          };
          break;
        case "slider":
          newComponent = {
            ...baseComponent,
            slides: [
              { src: "https://via.placeholder.com/600x200?text=Slide+1" },
              { src: "https://via.placeholder.com/600x200?text=Slide+2" },
            ],
            autoplay: true,
            swapTime: 3000,
            style: {
              ...baseComponent.style,
              height: "200px",
            },
          };
          break;
        case "video":
          newComponent = {
            ...baseComponent,
            src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            style: { ...baseComponent.style, width: "560px", height: "315px" },
          };
          break;
        case "spacer":
          newComponent = { ...baseComponent, style: { height: "20px" } };
          break;
        case "divider":
          newComponent = {
            ...baseComponent,
            style: { height: "1px", backgroundColor: "#ccc", margin: "10px 0" },
          };
          break;
        case "icon":
          newComponent = {
            ...baseComponent,
            iconClass: "mdi mdi-star",
            style: {
              ...baseComponent.style,
              fontSize: "48px",
              color: "#333333",
            },
          };
          break;
        case "input":
          newComponent = {
            ...baseComponent,
            inputType: "text",
            placeholder: "مقدار ورودی...",
          };
          break;
        case "textarea":
          newComponent = { ...baseComponent, placeholder: "متن طولانی..." };
          break;
        case "html":
          newComponent = {
            ...baseComponent,
            content: "<!-- کد HTML خود را اینجا قرار دهید -->",
          };
          break;
        case "select":
          newComponent = {
            ...baseComponent,
            label: "عنوان منو",
            options: ["گزینه ۱", "گزینه ۲", "گزینه ۳"],
            style: { ...baseComponent.style, width: "200px" },
          };
          break;
        default:
          return;
      }

      const newPageComponents = [...pageComponents];
      const sectionIndex = newPageComponents.findIndex(
        (s) => s.id === sectionId
      );
      if (sectionIndex > -1) {
        newPageComponents[sectionIndex].columns[colIndex].splice(
          dropIndex,
          0,
          newComponent
        );
        setPageComponents(newPageComponents);
      }
    }
  };

  const handleComponentDragStart = (e, componentId) => {
    e.stopPropagation();
    e.dataTransfer.setData("action", "move");
    e.dataTransfer.setData("componentId", componentId);
  };

  const handleResizeStart = (e, componentId, direction) => {
    e.preventDefault();
    e.stopPropagation();
    const target = document.querySelector(`[data-id="${componentId}"]`);
    if (!target) return;
    const found = findComponentById(pageComponents, componentId);
    if (!found) return;

    setResizingState({
      isResizing: true,
      componentId,
      direction,
      initialX: e.clientX,
      initialY: e.clientY,
      initialWidth: target.offsetWidth,
      initialHeight: target.offsetHeight,
      initialTop: parseInt(found.component.style.top, 10) || 0,
      initialLeft: parseInt(found.component.style.left, 10) || 0,
      initialMarginLeft: parseInt(found.component.style.marginLeft, 10) || 0,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!resizingState.isResizing) return;

      const dx = e.clientX - resizingState.initialX;
      const dy = e.clientY - resizingState.initialY;
      const found = findComponentById(
        pageComponents,
        resizingState.componentId
      );

      if (!found) return;

      const newPageComponents = JSON.parse(JSON.stringify(pageComponents));
      const { component, path } = found;

      if (component.type === "section") {
        let sectionToUpdate = newPageComponents[path[0]];
        const newStyle = { ...sectionToUpdate.style };

        const canvas = document.querySelector(".canvas");
        if (!canvas) return;
        const parentStyle = getComputedStyle(canvas);
        const parentPaddingX =
          parseFloat(parentStyle.paddingLeft) +
          parseFloat(parentStyle.paddingRight);
        const maxWidth = canvas.clientWidth - parentPaddingX;

        // Vertical resizing
        if (resizingState.direction.includes("bottom")) {
          const newMinHeight = Math.max(50, resizingState.initialHeight + dy);
          newStyle.minHeight = `${newMinHeight}px`;
          delete newStyle.height;
        }

        // Horizontal resizing (only for multi-column)
        if (sectionToUpdate.columns.length > 1) {
          if (resizingState.direction.includes("right")) {
            const currentMarginLeft = parseFloat(newStyle.marginLeft || 0);
            let newWidth = resizingState.initialWidth + dx;
            newWidth = Math.max(
              200,
              Math.min(newWidth, maxWidth - currentMarginLeft)
            );
            newStyle.width = `${newWidth}px`;
          }
          if (resizingState.direction.includes("left")) {
            let newWidth = resizingState.initialWidth - dx;
            let newMarginLeft = resizingState.initialMarginLeft + dx;

            if (newMarginLeft < 0) {
              newWidth += newMarginLeft; // Absorb the negative margin into width
              newMarginLeft = 0;
            }

            if (newMarginLeft + newWidth > maxWidth) {
              newWidth = maxWidth - newMarginLeft;
            }

            newStyle.width = `${Math.max(200, newWidth)}px`;
            newStyle.marginLeft = `${newMarginLeft}px`;
          }
        }

        // Clean up conflicting properties to prevent jumps
        delete newStyle.left;
        delete newStyle.top;

        sectionToUpdate.style = newStyle;
        setPageComponents(newPageComponents);
      } else {
        const componentToUpdate =
          newPageComponents[path[0]].columns[path[1]][path[2]];

        const targetElement = document.querySelector(
          `[data-id="${resizingState.componentId}"]`
        );
        const parentColumn = targetElement?.parentElement;

        if (!parentColumn) return;

        const columnRect = parentColumn.getBoundingClientRect();
        const columnStyle = getComputedStyle(parentColumn);
        const paddingX =
          parseFloat(columnStyle.paddingLeft) +
          parseFloat(columnStyle.paddingRight);

        const maxW = columnRect.width - paddingX;

        let newWidth = resizingState.initialWidth;
        let newHeight = resizingState.initialHeight;

        if (resizingState.direction.includes("right"))
          newWidth = resizingState.initialWidth + dx;
        if (resizingState.direction.includes("left"))
          newWidth = resizingState.initialWidth - dx;
        if (resizingState.direction.includes("bottom"))
          newHeight = resizingState.initialHeight + dy;
        if (resizingState.direction.includes("top"))
          newHeight = resizingState.initialHeight - dy;

        // Corner resizing (maintain aspect ratio for images)
        if (
          component.type === "image" &&
          resizingState.direction.includes("-")
        ) {
          const aspectRatio =
            resizingState.initialWidth / resizingState.initialHeight;
          if (
            resizingState.direction.includes("right") ||
            resizingState.direction.includes("left")
          ) {
            newWidth = Math.abs(
              resizingState.direction.includes("right")
                ? resizingState.initialWidth + dx
                : resizingState.initialWidth - dx
            );
            newHeight = newWidth / aspectRatio;
          } else {
            newHeight = Math.abs(
              resizingState.direction.includes("bottom")
                ? resizingState.initialHeight + dy
                : resizingState.initialHeight - dy
            );
            newWidth = newHeight * aspectRatio;
          }
        }

        newWidth = Math.min(Math.max(20, newWidth), maxW);
        newHeight = Math.max(20, newHeight);

        const newStyle = { ...componentToUpdate.style };

        if (
          resizingState.direction.includes("right") ||
          resizingState.direction.includes("left") ||
          resizingState.direction.includes("-")
        ) {
          newStyle.width = `${newWidth}px`;
        }
        if (
          resizingState.direction.includes("top") ||
          resizingState.direction.includes("bottom") ||
          resizingState.direction.includes("-")
        ) {
          newStyle.height = `${newHeight}px`;
        }

        componentToUpdate.style = newStyle;
        setPageComponents(newPageComponents);
      }
    };
    const handleMouseUp = () =>
      resizingState.isResizing && setResizingState({ isResizing: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizingState, pageComponents]);

  const selectComponent = (e, component) => {
    e && e.stopPropagation();

    // Avoid re-selecting the same component, which can be inefficient
    if (
      selectedComponent &&
      component &&
      selectedComponent.id === component.id
    ) {
      return;
    }

    setSelectedComponent(component);

    // When a component is selected, automatically switch to the 'Settings' tab
    if (component) {
      setActiveTab("3");
    }
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleUpdate(id, { src: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSliderImageUpload = (e, id, slideIndex) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const found = findComponentById(pageComponents, id);
        if (found && found.component.type === "slider") {
          const newSlides = [...found.component.slides];
          if (newSlides[slideIndex]) {
            newSlides[slideIndex].src = reader.result;
          }
          handleUpdate(id, { slides: newSlides });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteComponent = (id) => {
    const newPageComponents = JSON.parse(JSON.stringify(pageComponents));
    for (const section of newPageComponents) {
      for (const col of section.columns) {
        const index = col.findIndex((c) => c.id === id);
        if (index > -1) {
          col.splice(index, 1);
          setPageComponents(newPageComponents);
          setSelectedComponent(null);
          return;
        }
      }
    }
  };

  const deleteSection = (id) => {
    setPageComponents(pageComponents.filter((s) => s.id !== id));
    setSelectedComponent(null);
  };

  const handleExport = () => {
    const html = generateHtml(pageComponents, pageConfig);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleOpenIconPicker = (componentId) => {
    setIconTargetId(componentId);
    setIsIconPickerOpen(true);
  };

  const handleIconSelect = (iconClass) => {
    if (iconTargetId) {
      handleUpdate(iconTargetId, { iconClass });
    }
    setIsIconPickerOpen(false);
    setIconTargetId(null);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="mb-3">
          <Col></Col>
          <Col className="text-end">
            <Button
              color="secondary"
              className="me-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? "پنهان کردن نوار کناری" : "نمایش نوار کناری"}
            </Button>
            <Button color="primary" onClick={handleExport}>
              خروجی HTML
            </Button>
          </Col>
        </Row>
        <Row>
          <Col
            md={isSidebarOpen ? 8 : 12}
            style={{
              height: "calc(100vh - 120px)",
              overflowY: "auto",
              padding: 0,
            }}
          >
            <Canvas
              pageComponents={pageComponents}
              pageConfig={pageConfig}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              selectComponent={selectComponent}
              selectedComponent={selectedComponent}
              handleComponentDragStart={handleComponentDragStart}
              deleteComponent={deleteComponent}
              deleteSection={deleteSection}
              handleColumnDragOver={handleColumnDragOver}
              dropIndicator={dropIndicator}
              setDropIndicator={setDropIndicator}
              handleResizeStart={handleResizeStart}
              handleUpdate={handleUpdate}
            />
          </Col>
          {isSidebarOpen && (
            <Col md="4">
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedComponent={selectedComponent}
                handleUpdate={handleUpdate}
                handleImageUpload={handleImageUpload}
                handleSliderImageUpload={handleSliderImageUpload}
                pageConfig={pageConfig}
                setPageConfig={setPageConfig}
                handleOpenIconPicker={handleOpenIconPicker}
              />
            </Col>
          )}
        </Row>
      </Container>
      <IconPickerModal
        isOpen={isIconPickerOpen}
        toggle={() => setIsIconPickerOpen(false)}
        onIconSelect={handleIconSelect}
      />
    </div>
  );
};

export default PageMaker;
