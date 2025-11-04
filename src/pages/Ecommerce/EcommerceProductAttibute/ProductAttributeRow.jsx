import React, { useRef, useState, useEffect } from "react";
import { AccordionBody, Button, Col, Row } from "reactstrap";
import { Token, Typeahead } from "react-bootstrap-typeahead";
import { useSelector } from "react-redux";

const ProductAttributeRow = ({
  item,
  handleDeleteAttribute,
  onValueSelection,
  setAttributeCreationData,
  setCreateModalOpen,
  onRefreshValues,
}) => {
  const typeaheadRef = useRef(null);
  const [localValues, setLocalValues] = useState(item.values || []);
  const { attributeValueLoading } = useSelector((state) => state.ecommerce);

  // Sync local state with props
  useEffect(() => {
    setLocalValues(item.values || []);
  }, [item.values]);

  const handleChange = (selectedItems) => {
    const processedSelection = selectedItems.map((selection) => {
      if (selection.customOption) {
        return {
          id: `new-${selection.label}-${Date.now()}`,
          label: selection.label,
          isCustom: true,
        };
      }
      return selection;
    });

    // Update local state immediately for UI responsiveness
    setLocalValues(processedSelection);

    // Also update parent state
    onValueSelection(item.id, processedSelection);
  };

  const handleInitiateCreateValue = (valueLabel) => {
    const creationData = {
      attributeId: item.id,
      value: valueLabel,
      title: `افزودن مقدار ${valueLabel} به ویژگی ${item.value}`,
    };
    setAttributeCreationData(creationData);
    setCreateModalOpen(true);
  };

  // Handle focus on typeahead to refresh values
  const handleFocus = () => {
    if (onRefreshValues && item.id) {
      onRefreshValues(item.id);
    }
  };

  // Handle accordion expand to refresh values
  const handleAccordionClick = () => {
    if (onRefreshValues && item.id) {
      onRefreshValues(item.id);
    }
  };

  return (
    <AccordionBody accordionId={item.id}>
      <Row dir="rtl">
        <Col sm="3">نام</Col>
        <Col sm="9">مقادیر</Col>
      </Row>
      <Row dir="rtl">
        <Col sm="3">{item.value}</Col>
        <Col sm="9">
          <Typeahead
            ref={typeaheadRef}
            id={`variant-typeahead-${item.id}`}
            labelKey="label"
            multiple
            allowNew
            // isLoading={attributeValueLoading}
            newSelectionPrefix="مقدار جدید: "
            options={item.options || []}
            placeholder="مقدار را انتخاب یا وارد کنید..."
            selected={localValues}
            onChange={handleChange}
            onFocus={handleFocus}
            filterBy={(option, props) => {
              return !props.selected.some(
                (selected) => selected.id === option.id
              );
            }}
            renderToken={(option, { onRemove }, index) => (
              <Token key={index} option={option} onRemove={onRemove}>
                <div className="d-flex align-items-center">
                  <span>{option.label}</span>
                  {option.isCustom && (
                    <Button
                      type="button"
                      className="btn-sm btn-success ms-2 py-0 px-1"
                      title={`افزودن این مقدار به ویژگی ${item.value}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInitiateCreateValue(option.label);
                      }}
                    >
                      +
                    </Button>
                  )}
                  <span
                    className="ms-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(option);
                    }}
                    style={{
                      cursor: "pointer",
                      color: "#dc3545",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                    title="حذف"
                  >
                    ×
                  </span>
                </div>
              </Token>
            )}
          />
        </Col>
      </Row>
      <Button
        className="mt-3"
        type="button"
        color="danger"
        onClick={() => handleDeleteAttribute(item.id)}
      >
        <i
          className="mdi mdi-delete-outline"
          style={{ color: "#fff !important" }}
        ></i>
        <span>پاک کردن ویژگی</span>
      </Button>
    </AccordionBody>
  );
};

export default ProductAttributeRow;
