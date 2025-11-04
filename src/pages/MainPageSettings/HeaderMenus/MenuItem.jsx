import React, { useState, useRef } from "react";
import { Button } from "reactstrap";

const MenuItem = ({
  item,
  path,
  onEdit,
  onDelete,
  setDraggedItemId,
  draggedItemId,
  handleDrop,
}) => {
  const [dropPosition, setDropPosition] = useState(null);
  const itemRef = useRef(null);
  const depth = path.length - 1;

  const onDragStart = (e) => {
    e.dataTransfer.setData("text/plain", item.id);
    e.stopPropagation();
    setDraggedItemId(item.id);
    // Use timeout to allow browser to render the drag image before applying class
    setTimeout(() => {
      if (itemRef.current) {
        itemRef.current.classList.add("dragging");
      }
    }, 0);
  };

  const onDragEnd = () => {
    if (itemRef.current) {
      itemRef.current.classList.remove("dragging");
    }
    setDraggedItemId(null);
    setDropPosition(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedItemId === item.id) return;

    const rect = itemRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;

    if (y < height * 0.25) {
      setDropPosition("before");
    } else if (y > height * 0.75) {
      setDropPosition("after");
    } else if (depth < 2) {
      // Max 3 levels (0, 1, 2)
      setDropPosition("inside");
    } else {
      setDropPosition("after"); // Default to dropping after if nesting is too deep
    }
  };

  const onDragLeave = () => {
    setDropPosition(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropPosition) {
      const droppedItemId = e.dataTransfer.getData("text/plain");
      handleDrop(droppedItemId, item.id, dropPosition);
    }
    setDropPosition(null);
  };

  return (
    <div
      ref={itemRef}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="menu-item-container"
    >
      <div
        className={`menu-item drop-indicator-${dropPosition}`}
        style={{
          marginRight: `${depth * 40}px`,
          maxWidth: `calc(100% - ${depth * 40}px)`,
        }}
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="menu-item-content">
          <span className="drag-handle" aria-label="کشیدن برای جابجایی">
            &#x2630;
          </span>
          {depth === 0 && item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="menu-item-image"
            />
          )}
          <span className="fw-bold">{item.title}</span>
          <small className="text-muted">{item.link}</small>
        </div>
        <div className="menu-item-actions">
          <Button
            outline
            color="primary"
            size="sm"
            onClick={() => onEdit(item)}
          >
            ویرایش
          </Button>
          <Button
            outline
            color="danger"
            size="sm"
            onClick={() => onDelete(item.id)}
          >
            حذف
          </Button>
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <div className="menu-item-children">
          {item.children.map((child, index) => (
            <MenuItem
              key={child.id}
              item={child}
              path={[...path, index]}
              onEdit={onEdit}
              onDelete={onDelete}
              setDraggedItemId={setDraggedItemId}
              draggedItemId={draggedItemId}
              handleDrop={handleDrop}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
