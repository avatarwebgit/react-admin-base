import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Progress,
  Row,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ImageWithModal from "../../../components/Common/ImageWithModal";
import {
  createProductImages,
  deleteProductImage,
  getProduct,
} from "../../../store/e-commerce/actions";
import ImageEditModal from "./ImageEditModal";
import OptionalSizes from "../../Ui/UiModal/OptionalSizes";
import { useSort } from "../../../hooks/useSort";
import NoData from "../../../components/Common/NoData";

const ProductImageGalleryPage = () => {
  document.title = "مدیریت گالری تصاویر محصول";

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.ecommerce.productDetails[id]);
  const { productLoading } = useSelector((state) => state.ecommerce);

  const [primaryImageFile, setPrimaryImageFile] = useState([]);
  const [otherImageFiles, setOtherImageFiles] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedImageForEdit, setSelectedImageForEdit] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [userClosedModal, setUserClosedModal] = useState(false);

  const [primaryImage, setPrimaryImage] = useState(null);
  const [otherImages, setOtherImages] = useState(null);

  const { items: sortedOtherImages } = useSort(otherImages, {
    key: "display_order",
    direction: "desc",
  });

  useEffect(() => {
    if (product) {
      setPrimaryImage(product?.images?.find((img) => img.is_main) || null);
      setOtherImages(product?.images?.filter((img) => !img.is_main) || []);
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const handleOpenEditModal = (image) => {
    setSelectedImageForEdit(image);
    setEditModalOpen(true);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleAcceptedFiles = (files, type) => {
    const formattedFiles = files.map((file) =>
      Object.assign(file, {
        image: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    if (type === "primary") {
      setPrimaryImageFile(formattedFiles);
    } else {
      setOtherImageFiles((prev) => [...prev, ...formattedFiles]);
    }
  };

  const handleRemovePrimaryImage = () => {
    setPrimaryImageFile([]);
  };

  const handleRemoveOtherImage = (index) => {
    const newImages = [...otherImageFiles];
    newImages.splice(index, 1);
    setOtherImageFiles(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allImages = [...primaryImageFile, ...otherImageFiles];

    const formData = new FormData();
    formData.append("imageable_id", id);
    formData.append("imageable_type", "product");
    allImages.forEach((file, index) => {
      formData.append(`images[${index}][image]`, file);
      formData.append(`images[${index}][is_main]`, 0);
      formData.append(`images[${index}][display_order]`, 0);
    });

    dispatch(
      createProductImages({
        productId: id,
        formData,
        config: {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        },
      })
    );

    setOtherImageFiles([]);
    setProgressModalOpen(true);
  };

  useEffect(() => {
    if (uploadProgress === 100) {
      setTimeout(() => setUserClosedModal(false), 500);
    }

    if (userClosedModal) return;

    if (uploadProgress >= 100 || uploadProgress <= 0) {
      setProgressModalOpen(false);
    } else {
      setProgressModalOpen(true);
    }
  }, [uploadProgress, userClosedModal]);

  const handleDeleteItem = (image) => {
    const payload = {
      imageable_type: "product",
      image_ids: [image.id],
      imageable_id: +id,
      product_id: +id,
    };

    dispatch(deleteProductImage(payload));
  };

  const toggleProgressModal = () => {
    setProgressModalOpen(!progressModalOpen);
    setUploadProgress(0);
    setUserClosedModal(true);
  };

  const handleSetPrimaryImage = () => {};

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="محصولات" breadcrumbItem="گالری تصاویر" />

          <Card>
            <CardBody>
              <div className="mb-4">
                <h4 className="card-title d-flex align-items-center justify-content-between">
                  ویرایش تصاویر محصول : {product?.name || "..."}
                  <Button className="p-0 btn btn-primary" color="primary">
                    <Link
                      className="d-flex align-items-center justify-content-center text-white py-2 px-4"
                      to={"/ecommerce-products"}
                    >
                      لیست محصولات
                      <i class="bx bx-left-arrow-alt fs-5 ms-2"></i>
                    </Link>
                  </Button>
                </h4>
              </div>
              <hr />

              {primaryImage && (
                <Row>
                  <div className="col-12 col-md-12 mb-3">
                    <h5>تصویر اصلی :</h5>
                  </div>
                  <div className="col-12 col-md-3 mb-4">
                    <Card className="d-flex align-items-center justify-content-center">
                      <ImageWithModal
                        className="card-img-top"
                        src={primaryImage.url}
                        alt={primaryImage.alt}
                        thumbnailSize="200px"
                      />
                      <div className="d-flex">
                        <div className="card-body text-center">
                          <Button
                            color="info"
                            size="sm"
                            onClick={() => handleOpenEditModal(primaryImage)}
                          >
                            ویرایش
                          </Button>
                        </div>
                        <div className="card-body text-center">
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDeleteItem(primaryImage)}
                          >
                            حذف
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Row>
              )}

              <hr />
              <Row>
                <div className="col-12 col-md-12 mb-3">
                  <h5>تصاویر :</h5>
                </div>
                {productLoading && <Spinner size={"sm"} color={"primary"} />}

                {!productLoading && product?.images.length === 0 && (
                  <NoData title={"برای این محصول تصویری ثبت نشده"} />
                )}

                {!productLoading &&
                  sortedOtherImages.length > 0 &&
                  sortedOtherImages.map((image, index) => (
                    <div className="col-md-3 mb-3" key={image.id}>
                      <Card className="d-flex align-items-center justify-content-center">
                        <ImageWithModal
                          className="card-img-top"
                          src={image.url}
                          alt={image.alt}
                          thumbnailSize="200px"
                        />
                        <div className="d-flex flex-column gap-1 p-3">
                          <Button
                            color="info"
                            size="sm"
                            onClick={() => handleOpenEditModal(image)}
                          >
                            ویرایش
                          </Button>
                          <Button
                            color="info"
                            size="sm"
                            onClick={() => handleSetPrimaryImage(image)}
                          >
                            تصویر شاخص
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDeleteItem(image)}
                          >
                            حذف
                          </Button>
                        </div>
                      </Card>
                    </div>
                  ))}
              </Row>

              <hr />

              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* <Col md="4">
                    <Label>انتخاب تصویر اصلی</Label>
                    <Dropzone
                      onDrop={(acceptedFiles) =>
                        handleAcceptedFiles(acceptedFiles, "primary")
                      }
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>فایل را اینجا رها کنید یا کلیک کنید.</h4>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    {primaryImageFile.map((file, index) => (
                      <Card className="mt-2 dz-preview" key={index}>
                        <div className="d-flex align-items-center p-2">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm bg-light rounded p-2">
                              <img
                                src={file.image}
                                alt={file.name}
                                className="img-fluid rounded d-block"
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <div className="pt-1">
                              <h5 className="fs-md mb-1">{file.name}</h5>
                              <p className="fs-sm text-muted mb-0">
                                {file.formattedSize}
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ms-3">
                            <Button
                              color="danger"
                              size="sm"
                              onClick={handleRemovePrimaryImage}
                            >
                              حذف
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </Col> */}
                  <Col md="4">
                    <Label>انتخاب تصویر(ها) </Label>
                    <Dropzone
                      onDrop={(acceptedFiles) =>
                        handleAcceptedFiles(acceptedFiles, "other")
                      }
                      multiple={true}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>فایل ها را اینجا رها کنید یا کلیک کنید.</h4>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <ul className="list-unstyled mb-0 mt-2" id="file-previews">
                      {otherImageFiles.map((file, index) => (
                        <li className="mt-2 dz-image-preview" key={index}>
                          <Card>
                            <div className="d-flex flex-wrap gap-2 p-2">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm bg-light rounded p-2">
                                  <img
                                    data-dz-thumbnail=""
                                    className="img-fluid rounded d-block"
                                    src={file.image}
                                    alt={file.name}
                                  />
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <div className="pt-1">
                                  <h5 className="fs-md mb-1" data-dz-name>
                                    {file.name}
                                  </h5>
                                  <p className="fs-sm text-muted mb-0">
                                    {file.formattedSize}
                                  </p>
                                </div>
                              </div>
                              <div className="flex-shrink-0 ms-3">
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => handleRemoveOtherImage(index)}
                                >
                                  حذف
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </li>
                      ))}
                    </ul>
                  </Col>

                  <Col md="4">
                    <Label htmlFor="video_gallery">ویدئو گالری</Label>
                    <Input
                      type="text"
                      name="video_gallery"
                      id="video_gallery"
                      placeholder="لینک ویدیو"
                    />
                  </Col>
                </Row>

                <Button
                  className="btn m-2"
                  color="primary"
                  type="submit"
                  disabled={otherImageFiles.length === 0}
                >
                  ذخیره گالری
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
      <OptionalSizes
        isOpen={progressModalOpen}
        toggle={toggleProgressModal}
        center
        title={"وضعیت آپلود"}
        size="md"
      >
        {uploadProgress > 0 && (
          <div className="mt-4">
            <Progress
              animated
              striped
              dir="rtl"
              color={uploadProgress < 100 ? "info" : "success"}
              value={uploadProgress}
            >
              {uploadProgress}%
            </Progress>
          </div>
        )}
      </OptionalSizes>
      <ImageEditModal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        image={selectedImageForEdit}
        productId={id}
      />
    </>
  );
};

export default ProductImageGalleryPage;
