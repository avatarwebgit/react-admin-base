import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CustomPagination from "../../../components/Common/CustomPagination";
import NoData from "../../../components/Common/NoData";
import {
  deleteProductVariant,
  getAttributes,
  getProduct,
  getProductVariants,
} from "../../../store/e-commerce/actions";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import CreateProductVariantModal from "./CreateProductVariantModal";
import ProductVariantRow from "./ProductVariantRow";
import UpdateProductVariantModal from "./UpdateProductVariantModal";

const ProductVariants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productVariantLoading } = useSelector((state) => state.ecommerce);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [allAttributes, setAllAttributes] = useState({});
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const {
    productVariants,
    product,
    attributesFromStore,
    attributeValues,
    pagination,
  } = useSelector((state) => ({
    productVariants: state.ecommerce.productVariants[id]?.items || [],
    pagination: state.ecommerce.productVariants[id]?.pagination || [],
    product: state.ecommerce.productDetails[id],
    attributesFromStore: state.ecommerce.attributes.items,
    attributeValues: state.ecommerce.attributeValueDetails,
  }));

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getProductVariants({ id, page: 1 }));
    dispatch(getAttributes());
  }, [dispatch, id]);

  useEffect(() => {
    if (attributesFromStore && attributesFromStore.length > 0) {
      const newAllAttributes = {};
      attributesFromStore.forEach((attr) => {
        const values = attributeValues[attr.id] || [];
        newAllAttributes[attr.id] = {
          name: attr.name,
          values: values.map((val) => ({
            value: val.id,
            label: val.value,
          })),
        };
      });
      setAllAttributes(newAllAttributes);
    }
  }, [attributesFromStore, attributeValues]);

  const formattedVariants = useMemo(() => {
    if (!productVariants || !Object.keys(allAttributes).length)
      return productVariants || [];
    return productVariants.map((variant) => {
      let attributes_string = "N/A";
      if (variant.attributes && typeof variant.attributes === "object") {
        const parts = [];
        for (const [attrId, valueIds] of Object.entries(variant.attributes)) {
          const attrInfo = allAttributes[attrId];
          if (attrInfo && Array.isArray(valueIds)) {
            const valueId = valueIds[0];
            const valueInfo = attrInfo.values.find(
              (v) => String(v.value) === String(valueId)
            );
            if (valueInfo) {
              parts.push(`${attrInfo.name}: ${valueInfo.label}`);
            }
          }
        }
        if (parts.length > 0) {
          attributes_string = parts.join(" / ");
        }
      }
      return { ...variant, attributes_string };
    });
  }, [productVariants, allAttributes]);

  // Group variants by first attribute ID
  const groupedVariants = useMemo(() => {
    const groups = {};

    formattedVariants.forEach((variant) => {
      // Get the first attribute ID
      const firstAttributeId = variant.attributes?.[0]?.id || "no-attribute";
      const firstAttributeName =
        variant.attributes?.[0]?.attribute || "بدون ویژگی";
      const firstAttributeValue = variant.attributes?.[0]?.value || "N/A";

      if (!groups[firstAttributeId]) {
        groups[firstAttributeId] = {
          attributeId: firstAttributeId,
          attributeName: firstAttributeName,
          attributeValue: firstAttributeValue,
          variants: [],
        };
      }

      groups[firstAttributeId].variants.push(variant);
    });

    return Object.values(groups);
  }, [formattedVariants]);

  const handleEdit = (variantId) => {
    setSelectedVariantId(variantId);
    setUpdateModalOpen(true);
  };

  const toggle = () => setDeleteModal(!deleteModal);

  const handleDelet = (variation) => {
    setDeleteItemId(variation);
    toggle();
  };

  const handleDeletItem = () => {
    dispatch(deleteProductVariant({ id: deleteItemId.id, productId: id }));
    toggle();
  };

  const handlePaginationChange = (page) => {
    dispatch(getProductVariants({ id, page }));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="تجارت الکترونیک"
          breadcrumbItem={`تنوع محصول برای ${product?.name || ""}`}
        />
        <Card>
          <CardBody>
            <Row className="mb-3">
              <Col sm="6">
                <CardTitle>لیست تنوع ها</CardTitle>
              </Col>
              <Col sm="6" className="text-sm-end">
                <Button
                  color="primary"
                  onClick={() => setCreateModalOpen(true)}
                >
                  افزودن تنوع جدید
                </Button>
              </Col>
            </Row>
            {productVariantLoading && (
              <div className="w-full d-flex align-items-center justify-content-center">
                <Spinner color="primary" size={"sm"} />
              </div>
            )}

            {productVariants.length <= 0 && !productVariantLoading && (
              <NoData />
            )}

            {!productVariantLoading && productVariants.length > 0 && (
              <div className="table-responsive">
                {groupedVariants.map((group, groupIndex) => (
                  <div key={group.attributeId} className="mb-4">
                    <h5 className="mb-3 text-primary">
                      {group.attributeName}: {group.attributeValue}
                    </h5>
                    <Table className="table-bordered align-middle text-center">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th className="w-40">ویژگی ها</th>
                          <th>قیمت (تومان)</th>
                          <th>کد محصول (SKU)</th>
                          <th>موجودی</th>
                          <th>عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.variants.map((variant, index) => (
                          <ProductVariantRow
                            key={variant.id}
                            variant={variant}
                            index={index}
                            onEdit={handleEdit}
                            onDelete={handleDelet}
                            productId={id}
                          />
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-center">
              {pagination && pagination.total > 15 && (
                <CustomPagination
                  pagination={pagination}
                  onPageChange={handlePaginationChange}
                />
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
      <CreateProductVariantModal
        isOpen={createModalOpen}
        toggle={() => setCreateModalOpen(false)}
        productId={id}
        product={product}
        allAttributes={allAttributes}
      />
      {selectedVariantId && (
        <UpdateProductVariantModal
          isOpen={updateModalOpen}
          toggle={() => setUpdateModalOpen(false)}
          variantId={selectedVariantId}
          productId={id}
          product={product}
          allAttributes={allAttributes}
        />
      )}
      <OptionalSizes
        isOpen={deleteModal}
        toggle={toggle}
        center
        size="md"
        title={"حذف تنوع"}
      >
        <div className="p-4">
          <p>آیا از حذف این تنوع اطمینان دارید؟</p>
          <div className="d-flex justify-content-end gap-2">
            <Button color="primary" onClick={toggle}>
              لغو
            </Button>
            <Button color="danger" onClick={handleDeletItem}>
              حذف
            </Button>
          </div>
        </div>
      </OptionalSizes>
    </div>
  );
};

export default ProductVariants;
