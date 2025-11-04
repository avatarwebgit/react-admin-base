import React, { useState, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import SortableList from "react-easy-sort";
import arrayMove from "array-move";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import FaqRow from "./FaqRow";
import CreateFaqModal from "./CreateFaqModal";
import UpdateFaqModal from "./UpdateFaqModal";
import { toast } from "react-toastify";

const initialFaqs = [
  {
    id: 1,
    question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ چیست؟",
    answer:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.",
  },
  {
    id: 2,
    question: "چرا ما از آن استفاده می کنیم؟",
    answer:
      "این یک واقعیت ثابت شده است که خواننده با خواندن محتوای خواندنی یک صفحه از طرح‌بندی آن منحرف می‌شود. نکته استفاده از لورم ایپسوم این است که...",
  },
  {
    id: 3,
    question: "از کجا آمده است؟",
    answer:
      "برخلاف تصور رایج، لورم ایپسوم صرفاً یک متن تصادفی نیست. ریشه در قطعه‌ای از ادبیات کلاسیک لاتین از سال ۴۵ قبل از میلاد دارد و آن را بیش از ۲۰۰۰ سال قدمت می‌دهد.",
  },
];

const Faqs = () => {
  document.title = "مدیریت پرسش‌های متداول";
  const [faqs, setFaqs] = useState(initialFaqs);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const onSortEnd = useCallback((oldIndex, newIndex) => {
    setFaqs((prevFaqs) => arrayMove(prevFaqs, oldIndex, newIndex));
  }, []);

  const handleAddFaq = (newFaq) => {
    setFaqs((prev) => [...prev, { ...newFaq, id: Date.now() }]);
    toast.success("پرسش و پاسخ جدید با موفقیت اضافه شد.");
  };

  const handleUpdateFaq = (updatedFaq) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === updatedFaq.id ? updatedFaq : faq))
    );
    toast.success("پرسش و پاسخ با موفقیت ویرایش شد.");
  };

  const handleDeleteFaq = (faqId) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== faqId));
    toast.error("پرسش و پاسخ حذف شد.");
  };

  const handleEditClick = (faq) => {
    setSelectedFaq(faq);
    setUpdateModalOpen(true);
  };

  const handleSaveChanges = () => {
    console.log("Saving new FAQ order:", faqs);
    toast.success("ترتیب پرسش و پاسخ‌ها ذخیره شد.");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="تنظیمات صفحه اصلی"
            breadcrumbItem="پرسش‌های متداول"
          />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <CardTitle tag="h4" className="mb-0">
                      لیست پرسش‌ها و پاسخ‌ها
                    </CardTitle>
                    <div>
                      <Button
                        color="primary"
                        onClick={() => setCreateModalOpen(true)}
                      >
                        <i className="bx bx-plus me-1"></i> افزودن پرسش و پاسخ
                      </Button>
                    </div>
                  </div>

                  <p className="card-title-desc">
                    برای مرتب‌سازی، آیتم‌ها را از طریق دستگیره سمت چپ بکشید و
                    رها کنید.
                  </p>

                  <div className="faq-list">
                    <SortableList
                      onSortEnd={onSortEnd}
                      className="list"
                      draggedItemClassName="dragged"
                      dragHandle=".drag-handle"
                    >
                      {faqs.map((faq) => (
                        <FaqRow
                          key={faq.id}
                          faq={faq}
                          onEdit={handleEditClick}
                          onDelete={handleDeleteFaq}
                        />
                      ))}
                    </SortableList>
                  </div>
                </CardBody>
                <div className="d-flex justify-content-end flex-wrap gap-2 m-3">
                  <Button
                    color="primary"
                    className="me-2"
                    onClick={handleSaveChanges}
                  >
                    <i className="bx bx-save me-1"></i> ذخیره ترتیب
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <CreateFaqModal
        isOpen={createModalOpen}
        toggle={() => setCreateModalOpen(false)}
        onAdd={handleAddFaq}
      />
      {selectedFaq && (
        <UpdateFaqModal
          isOpen={updateModalOpen}
          toggle={() => setUpdateModalOpen(false)}
          faq={selectedFaq}
          onUpdate={handleUpdateFaq}
        />
      )}
      <style>{`
        .dragged {
            opacity: 0.5;
            border: 2px dashed #007bff;
        }
        .faq-actions .btn-icon {
            width: 32px;
            height: 32px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Faqs;
