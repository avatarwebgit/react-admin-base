import React, { useEffect, useState } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";
import ImageWithModal from "../../../components/Common/ImageWithModal";
import { useDispatch } from "react-redux";
import { updateProductImage } from "../../../store/e-commerce/actions";

const ImageEditModal = ({ isOpen, toggle, image, productId }) => {
  const dispatch = useDispatch();

  const [altText, setAltText] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isMain, setIsMain] = useState(false);

  useEffect(() => {
    if (image) {
      setAltText(image.alt || "");
      setDisplayOrder(image.display_order || 0);
      setIsMain(Boolean(image.is_main));
    }
  }, [image]);

  const handleSubmit = () => {
    const payload = {
      is_main: isMain,
      display_order: +displayOrder,
      alt: altText,
      id: image.id,
      productId,
    };

    dispatch(updateProductImage(payload));
    toggle();
  };

  const handleToggle = () => {
    if (isOpen && image) {
      setAltText(image.alt || "");
      setDisplayOrder(image.display_order || 0);
      setIsMain(Boolean(image.is_main));
    }
    toggle();
  };

  if (!image) return null;

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} centered>
      <ModalHeader toggle={handleToggle}>ویرایش تصویر</ModalHeader>
      <ModalBody>
        <div className="img-fluid rounded mb-3 d-flex align-items-center justify-content-center">
          <ImageWithModal
            className="card-img-top"
            src={image.url}
            alt={image.alt}
            thumbnailSize="200px"
          />
        </div>

        <FormGroup>
          <Label for="altText">متن جایگزین (Alt Text)</Label>
          <Input
            id="altText"
            name="altText"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="متن جایگزین تصویر را وارد کنید"
          />
        </FormGroup>

        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="displayOrder">اولویت نمایش</Label>
              <Input
                id="displayOrder"
                name="displayOrder"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                placeholder="0"
              />
            </FormGroup>
          </Col>

          <Col md="6" className="d-flex align-items-center pt-3">
            <FormGroup switch>
              <input
                type="checkbox"
                id="isMain"
                checked={isMain}
                onClick={(e) => {
                  console.log("Switch changed:", !e.target.checked);
                  setIsMain(!e.target.checked);
                }}
              />
              <Label check for="isMain">
                تصویر اصلی
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={handleToggle}>
          انصراف
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          ذخیره تغییرات
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageEditModal;
