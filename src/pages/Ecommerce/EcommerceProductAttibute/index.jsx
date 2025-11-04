import arrayMove from "array-move";
import { useCallback, useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import SortableList, { SortableItem } from "react-easy-sort";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ProductVariantRow from "./ProductAttributeRow";
import {
  getAttributes,
  getProduct,
  getProductAttribute,
  showAttributeValue,
  updateProductAttribute,
} from "../../../store/e-commerce/actions";

import "../../../styles/categories.scss";
import CreateAttibuteValueModal from "../EcommerceAttributeValues/CreateAttibuteValueModal";

const EcommerceProductAttirbute = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const typeHeaderRef = useRef(null);

  // Redux state
  const attributesInitial = useSelector(
    (state) => state.ecommerce.attributes.items
  );
  const attributeValues = useSelector(
    (state) => state.ecommerce.attributeValueDetails
  );
  const productAttributes = useSelector(
    (state) => state.ecommerce.productAttributes[id]
  );
  const {
    attributeLoading,
    productAttributeLoading,
    productAttributeUpdateStatus,
  } = useSelector((state) => state.ecommerce);

  // Component state
  const [attributesOptions, setAttributesOptions] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [items, setItems] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const [attributeCreationData, setAttributeCreationData] = useState({
    attributeId: null,
    value: "",
    title: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
    dispatch(getAttributes());
    dispatch(getProductAttribute(id));
  }, [dispatch, id]);

  // FIXED: Only run this initialization once
  useEffect(() => {
    const attributesForProduct = productAttributes;
    console.log(attributesForProduct);
    if (!attributesInitial || attributesInitial.length === 0) return;

    // Only initialize once when productAttributes first loads
    if (!isInitialized && productAttributes) {
      if (productAttributes.length === 0) {
        setSelectedAttributes([]);
        setAttributesOptions(
          attributesInitial.map((attr) => ({ id: attr.id, label: attr.name }))
        );
        setIsInitialized(true);
        return;
      }

      const initialSelected = attributesForProduct
        .map((attr) => {
          const attributeInfo = attributesInitial.find((a) => a.id == attr.id);
          if (!attributeInfo) return null;

          const preDefinedValues = (attr.attribute_values || []).map((val) => ({
            id: String(val.id),
            label: val.name || val.value,
          }));

          const customVals = (attr.values || []).map((val) => ({
            id: `custom-${val}-${Date.now()}`,
            label: val,
            isCustom: true,
          }));

          return {
            id: attributeInfo.id,
            label: attributeInfo.name,
            values: [...preDefinedValues, ...customVals],
          };
        })
        .filter(Boolean);

      setSelectedAttributes(initialSelected);

      const selectedIds = new Set(initialSelected.map((a) => a.id));
      setAttributesOptions(
        attributesInitial
          .map((attr) => ({ id: attr.id, label: attr.name }))
          .filter((opt) => !selectedIds.has(opt.id))
      );

      setIsInitialized(true);
    }
  }, [productAttributes, attributesInitial, isInitialized]);

  useEffect(() => {
    if (selectedAttributes.length > 0 && attributeValues) {
      const itemsArray = selectedAttributes.map((attr, index) => {
        const valuesForAttribute = attributeValues[attr.id] || [];
        const options = valuesForAttribute.map((obj) => ({
          label: String(obj.value),
          id: String(obj.id),
        }));

        return {
          id: attr.id,
          value: attr.label,
          options: options,
          display_order: index + 1,
          values: attr.values,
        };
      });

      setItems(itemsArray);
    } else {
      setItems([]);
    }
  }, [selectedAttributes, attributeValues]);

  const toggleAccordion = (id) => {
    const newOpenId = openAccordion === id ? null : id;
    setOpenAccordion(newOpenId);

    if (newOpenId && !attributeValues[newOpenId]) {
      dispatch(showAttributeValue(newOpenId));
    }
  };

  const onSortEnd = (oldIndex, newIndex) => {
    setItems((array) => {
      const newArray = arrayMove(array, oldIndex, newIndex);
      return newArray.map((item, index) => ({
        ...item,
        display_order: index + 1,
      }));
    });

    // Also update selectedAttributes to maintain consistency
    setSelectedAttributes((prev) => {
      const newArray = arrayMove(prev, oldIndex, newIndex);
      return newArray;
    });
  };

  const handleAddAttribute = () => {
    const currentSelections = typeHeaderRef.current?.state?.selected || [];
    if (currentSelections.length === 0) return;

    const newAttribute = {
      id: currentSelections[0].id,
      label: currentSelections[0].label,
      values: [],
    };

    setSelectedAttributes((prev) => [...prev, newAttribute]);
    setAttributesOptions((prev) =>
      prev.filter((op) => op.id !== currentSelections[0].id)
    );
    typeHeaderRef.current?.clear();
  };

  const handleDeleteAttribute = (attributeId) => {
    const deletedAttribute = selectedAttributes.find(
      (a) => a.id === attributeId
    );

    if (deletedAttribute) {
      setAttributesOptions((prev) => [
        ...prev,
        { id: deletedAttribute.id, label: deletedAttribute.label },
      ]);
    }

    // Remove the whole attribute + its values
    setSelectedAttributes((prev) => prev.filter((a) => a.id !== attributeId));

    // Also sync items immediately
    setItems((prev) => prev.filter((i) => i.id !== attributeId));
  };

  const handleValueSelection = (attributeId, values) => {
    setSelectedAttributes((prev) =>
      prev.map((attr) => (attr.id === attributeId ? { ...attr, values } : attr))
    );
  };

  // FIXED: Don't refresh on every focus, only when needed
  const handleRefreshAttributeValues = (attributeId) => {
    // Only fetch if we don't have the values yet
    if (!attributeValues[attributeId]) {
      dispatch(showAttributeValue(attributeId));
    }
  };

  // Handle modal close and refresh data if needed
  const handleModalToggle = () => {
    const wasOpen = createModalOpen;
    setCreateModalOpen(!createModalOpen);

    // If modal was open and is now closing, refresh the attribute values
    if (wasOpen && attributeCreationData.attributeId) {
      setTimeout(() => {
        // Force refresh after creating new value
        dispatch(showAttributeValue(attributeCreationData.attributeId));
      }, 100);
    }
  };

  const handleSubmit = useCallback(() => {
    const attributesPayload = [];

    selectedAttributes.forEach((attr) => {
      const attribute_value_ids = (attr.values || [])
        .filter((v) => !v.isCustom)
        .map((v) => Number(v.id));

      const values = (attr.values || [])
        .filter((v) => v.isCustom)
        .map((v) => v.label);

      attributesPayload.push({
        attribute_id: attr.id,
        ...(attribute_value_ids.length > 0 && {
          attribute_value_ids: attribute_value_ids,
        }),
        ...(values.length > 0 && { values: values }),
      });
    });

    const payload = {
      product_id: Number(id),
      attributes: attributesPayload.length > 0 ? attributesPayload : null,
    };

    console.log(payload);
    dispatch(updateProductAttribute(id, payload));
  }, [selectedAttributes, id]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="تجارت الکترونیک" breadcrumbItem="تنوع محصول" />

        <Row className="py-3 d-flex justify-contet-end" dir="ltr">
          <Col sm="4" dir="rtl">
            <Typeahead
              id="attributes-typeahead"
              labelKey="label"
              ref={typeHeaderRef}
              options={attributesOptions}
              placeholder="جستجو یا انتخاب ویژگی..."
              renderMenuItemChildren={(option) => <div>{option.label}</div>}
              // onFocus={() => dispatch(getAttributes())}
              isLoading={attributeLoading}
            />
          </Col>
          <Col sm="3" className="d-flex">
            <Button color="primary" onClick={handleAddAttribute} dir="rtl">
              <i
                className="mdi mdi-chart-box-plus-outline"
                style={{ color: "#fff" }}
              />
              <span>ویژگی</span>
            </Button>
          </Col>
        </Row>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle className="h4">تنوع محصولات</CardTitle>

                <div className="sortable-accordion-container">
                  <SortableList
                    onSortEnd={onSortEnd}
                    className="list"
                    draggedItemClassName="dragged"
                  >
                    <Accordion open={openAccordion} toggle={toggleAccordion}>
                      {items.map((item) => (
                        <SortableItem key={item.id}>
                          <div className="sortable-accordion-item">
                            <AccordionItem>
                              <AccordionHeader targetId={item.id}>
                                <div
                                  className="drag-handle"
                                  style={{ marginRight: "10px" }}
                                >
                                  ☰
                                </div>
                                {item.value}
                              </AccordionHeader>
                              <ProductVariantRow
                                item={item}
                                handleDeleteAttribute={handleDeleteAttribute}
                                onValueSelection={handleValueSelection}
                                setAttributeCreationData={
                                  setAttributeCreationData
                                }
                                setCreateModalOpen={setCreateModalOpen}
                                onRefreshValues={handleRefreshAttributeValues}
                              />
                            </AccordionItem>
                          </div>
                        </SortableItem>
                      ))}
                    </Accordion>
                  </SortableList>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <CreateAttibuteValueModal
          isOpen={createModalOpen}
          toggle={handleModalToggle}
          creationOrigin="products"
          secondOriginData={attributeCreationData}
        />

        <Row className="d-flex align-items-center justify-content-end">
          <Button
            color="primary"
            style={{ width: "fit-content" }}
            className="d-flex"
            dir="rtl"
            onClick={handleSubmit}
          >
            {productAttributeLoading && <div className="loader me-2" />}
            <span> {productAttributeLoading ? "درحال ذخیره" : "ذخیره"}</span>
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceProductAttirbute;
