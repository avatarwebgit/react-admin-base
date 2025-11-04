import { useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { deleteSlider } from "../../../store/e-commerce/actions";
import ImageWithModal from "../../../components/Common/ImageWithModal";
import { openDeleteModal } from "../../../store/_global/actions";
import { DELETE_SLIDER } from "../../../store/e-commerce/actionTypes";

const SliderRow = ({ slider, index, isUpdateModalOpen, sendLabelId }) => {
  const isLoading = useSelector((state) => state.ecommerce.loading);
  const dispatch = useDispatch();

  const handleDeleteSlider = () => {
    console.log(slider);
    dispatch(
      openDeleteModal({
        message: `از  حذف  اسلایدر ${slider.title} اطمینان دارید؟`,
        actionType: DELETE_SLIDER,
        id: slider.id,
        title: "حذف",
      })
    );
  };

  const handleOpenUpdateModal = () => {
    isUpdateModalOpen(true);
    sendLabelId(slider.id);
  };

  // Fallback image source
  const fallbackImage = "https://via.placeholder.com/150";

  return (
    <tr key={slider.id}>
      <td className="text-center">{index + 1}</td>
      <td className="text-center">
        <div>
          <span>{slider.title}</span>
        </div>
      </td>
      <td className="text-center">{slider.display_order}</td>
      <td className="text-center">
        <div className="d-flex flex-column align-items-center">
          <small className="text-muted">پس زمینه:</small>
          <ImageWithModal
            src={slider.background_image || fallbackImage}
            title="تصویر پس زمینه"
            alt="تصویر پس زمینه"
            thumbnailSize="80px"
            className="img-thumbnail my-1"
          />
          <small className="text-muted">جلوه تصویری:</small>
          <ImageWithModal
            src={slider.foreground_image || fallbackImage}
            title="تصویر جلوه"
            alt="تصویر جلوه"
            thumbnailSize="80px"
            className="img-thumbnail my-1"
          />
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column align-items-center">
          <small className="text-muted">پس زمینه:</small>
          <ImageWithModal
            src={slider.background_image_mobile || fallbackImage}
            title="تصویر پس زمینه موبایل"
            alt="تصویر پس زمینه موبایل"
            thumbnailSize="80px"
            className="img-thumbnail my-1"
          />
          <small className="text-muted">جلوه تصویری:</small>
          <ImageWithModal
            src={slider.foreground_image_mobile || fallbackImage}
            title="تصویر جلوه موبایل"
            alt="تصویر جلوه موبایل"
            thumbnailSize="80px"
            className="img-thumbnail my-1"
          />
        </div>
      </td>
      <td className="text-center h-full">
        <Row>
          <Col sm="12">
            <Row className="d-flex align-items-center justify-content-center">
              <Col sm="4">
                <button
                  onClick={handleOpenUpdateModal}
                  id="edit-btn"
                  style={{ background: "transparent", border: "none" }}
                >
                  <i
                    className="bx bx-edit-alt fs-2 color-green pointer"
                    style={{ color: "green", cursor: "pointer" }}
                  ></i>
                </button>
              </Col>
              <Col sm="4">
                <button
                  onClick={handleDeleteSlider}
                  style={{ background: "transparent", border: "none" }}
                  disabled={isLoading}
                >
                  <i
                    className="mid mdi mdi-delete-outline fs-2 pointer"
                    style={{ color: "red", cursor: "pointer" }}
                  ></i>
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

export default SliderRow;
