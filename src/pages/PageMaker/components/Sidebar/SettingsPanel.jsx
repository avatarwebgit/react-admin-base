import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";

const GeneralSettings = ({ selectedComponent, handleUpdate }) => {
  if (!selectedComponent || !selectedComponent.style) return null;
  const { id, style } = selectedComponent;
  const updateStyle = (prop, value) =>
    handleUpdate(id, { style: { ...style, [prop]: value } });

  return (
    <>
      <hr />
      <CardTitle tag="h6">استایل‌های عمومی</CardTitle>
      <FormGroup>
        <Label>فاصله داخلی (Padding)</Label>
        <Input
          type="text"
          placeholder="مثال: 10px یا 10px 20px"
          value={style.padding || ""}
          onChange={(e) => updateStyle("padding", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>فاصله خارجی (Margin)</Label>
        <Input
          type="text"
          placeholder="مثال: 10px یا 10px 0"
          value={style.margin || ""}
          onChange={(e) => updateStyle("margin", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>رنگ پس‌زمینه</Label>
        <Input
          type="color"
          value={style.backgroundColor || ""}
          onChange={(e) => updateStyle("backgroundColor", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>گوشه‌های مدور (Border Radius)</Label>
        <Input
          type="text"
          placeholder="مثال: 4px"
          value={style.borderRadius || ""}
          onChange={(e) => updateStyle("borderRadius", e.target.value)}
        />
      </FormGroup>
      <Label>حاشیه (Border)</Label>
      <Row>
        <Col md={4}>
          <Input
            type="text"
            placeholder="عرض"
            value={style.borderWidth || ""}
            onChange={(e) => updateStyle("borderWidth", e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Input
            type="select"
            value={style.borderStyle || ""}
            onChange={(e) => updateStyle("borderStyle", e.target.value)}
          >
            <option value="">- استایل -</option>
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </Input>
        </Col>
        <Col md={4}>
          <Input
            type="color"
            value={style.borderColor || ""}
            onChange={(e) => updateStyle("borderColor", e.target.value)}
          />
        </Col>
      </Row>
    </>
  );
};

const SettingsPanel = ({
  selectedComponent,
  handleUpdate,
  handleImageUpload,
  handleSliderImageUpload,
  handleOpenIconPicker,
}) => {
  if (!selectedComponent) {
    return (
      <Card>
        <CardBody>
          <p className="text-muted text-center">
            برای مشاهده تنظیمات، یک المان را از بوم طراحی انتخاب کنید.
          </p>
        </CardBody>
      </Card>
    );
  }

  const { id, type, style } = selectedComponent;
  const updateStyle = (prop, value) =>
    handleUpdate(id, { style: { ...style, [prop]: value } });

  const renderSettingsForType = () => {
    switch (type) {
      case "section":
        return null; // Section specific settings can go here if any
      case "text":
        return (
          <>
            <FormGroup>
              <Label>محتوا</Label>
              <Input
                type="textarea"
                value={selectedComponent.content}
                onChange={(e) => handleUpdate(id, { content: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>اندازه فونت</Label>
              <Input
                type="text"
                placeholder="مثال: 16px"
                value={style.fontSize || ""}
                onChange={(e) => updateStyle("fontSize", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>رنگ</Label>
              <Input
                type="color"
                value={style.color || "#333333"}
                onChange={(e) => updateStyle("color", e.target.value)}
              />
            </FormGroup>
          </>
        );
      case "button":
        return (
          <>
            <FormGroup>
              <Label>متن دکمه</Label>
              <Input
                type="text"
                value={selectedComponent.content}
                onChange={(e) => handleUpdate(id, { content: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>لینک</Label>
              <Input
                type="text"
                value={selectedComponent.link}
                onChange={(e) => handleUpdate(id, { link: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>رنگ متن</Label>
              <Input
                type="color"
                value={style.color || ""}
                onChange={(e) => updateStyle("color", e.target.value)}
              />
            </FormGroup>
          </>
        );
      case "image":
        return (
          <>
            <FormGroup>
              <Label>منبع تصویر</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, id)}
              />
              <Input
                className="mt-2"
                type="text"
                value={selectedComponent.src}
                onChange={(e) => handleUpdate(id, { src: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>متن جایگزین</Label>
              <Input
                type="text"
                value={selectedComponent.alt}
                onChange={(e) => handleUpdate(id, { alt: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>عرض</Label>
              <Input
                type="text"
                placeholder="مثال: 150px یا 100%"
                value={style.width || ""}
                onChange={(e) => updateStyle("width", e.target.value)}
              />
            </FormGroup>
          </>
        );
      case "rich-text":
        return (
          <FormGroup>
            <Label>محتوا</Label>
            <Editor
              tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@7/tinymce.min.js"
              value={selectedComponent.content}
              init={{
                height: 300,
                menubar: false,
                plugins: "lists link image code directionality",
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code | rtl ltr",
                directionality: "rtl",
              }}
              onEditorChange={(content) => handleUpdate(id, { content })}
            />
          </FormGroup>
        );
      case "table":
        return (
          <>
            <Button
              size="sm"
              onClick={() =>
                handleUpdate(id, {
                  header: [...selectedComponent.header, "جدید"],
                })
              }
            >
              افزودن ستون
            </Button>
            <Button
              size="sm"
              className="ms-2"
              onClick={() =>
                handleUpdate(id, {
                  rows: [
                    ...selectedComponent.rows,
                    Array(selectedComponent.header.length).fill("جدید"),
                  ],
                })
              }
            >
              افزودن سطر
            </Button>
            <hr />
            {selectedComponent.header.map((h, i) => (
              <FormGroup key={`h-${i}`}>
                <Label>هدر {i + 1}</Label>
                <Input
                  value={h}
                  onChange={(e) => {
                    const newHeader = [...selectedComponent.header];
                    newHeader[i] = e.target.value;
                    handleUpdate(id, { header: newHeader });
                  }}
                />
              </FormGroup>
            ))}
            {selectedComponent.rows.map((row, rowIndex) => (
              <div key={`r-${rowIndex}`} className="mb-2 p-2 border rounded">
                <h6>سطر {rowIndex + 1}</h6>
                {row.map((cell, cellIndex) => (
                  <Input
                    key={`c-${cellIndex}`}
                    className="mb-1"
                    value={cell}
                    onChange={(e) => {
                      const newRows = JSON.parse(
                        JSON.stringify(selectedComponent.rows)
                      );
                      newRows[rowIndex][cellIndex] = e.target.value;
                      handleUpdate(id, { rows: newRows });
                    }}
                  />
                ))}
              </div>
            ))}
          </>
        );
      case "slider":
        return (
          <>
            <CardTitle tag="h6">اسلایدها</CardTitle>
            {selectedComponent.slides.map((slide, index) => (
              <div key={index} className="mb-2 p-2 border rounded">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Label className="mb-0 fw-bold">اسلاید {index + 1}</Label>
                  <Button
                    color="danger"
                    outline
                    size="sm"
                    style={{ border: "none" }}
                    onClick={() => {
                      const newSlides = selectedComponent.slides.filter(
                        (_, i) => i !== index
                      );
                      handleUpdate(id, { slides: newSlides });
                    }}
                  >
                    <i
                      className="mdi mdi-trash-can-outline"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </Button>
                </div>
                <FormGroup>
                  <Label>آدرس تصویر</Label>
                  <Input
                    type="text"
                    value={slide.src}
                    onChange={(e) => {
                      const newSlides = [...selectedComponent.slides];
                      newSlides[index].src = e.target.value;
                      handleUpdate(id, { slides: newSlides });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>یا آپلود تصویر جدید</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSliderImageUpload(e, id, index)}
                  />
                </FormGroup>
              </div>
            ))}
            <Button
              color="success"
              size="sm"
              onClick={() => {
                const newSlides = [
                  ...selectedComponent.slides,
                  { src: "https://via.placeholder.com/600x200" },
                ];
                handleUpdate(id, { slides: newSlides });
              }}
            >
              افزودن اسلاید
            </Button>
            <hr />
            <CardTitle tag="h6">تنظیمات پخش</CardTitle>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={selectedComponent.autoplay}
                  onChange={(e) =>
                    handleUpdate(id, { autoplay: e.target.checked })
                  }
                />{" "}
                پخش خودکار
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>زمان تعویض اسلاید (میلی‌ثانیه)</Label>
              <Input
                type="number"
                value={selectedComponent.swapTime}
                onChange={(e) =>
                  handleUpdate(id, {
                    swapTime: parseInt(e.target.value, 10) || 3000,
                  })
                }
                disabled={!selectedComponent.autoplay}
              />
            </FormGroup>
          </>
        );
      case "video":
        return (
          <FormGroup>
            <Label>آدرس ویدیو (Embed)</Label>
            <Input
              type="text"
              value={selectedComponent.src}
              onChange={(e) => handleUpdate(id, { src: e.target.value })}
              placeholder="https://www.youtube.com/embed/..."
            />
          </FormGroup>
        );
      case "spacer":
        return (
          <FormGroup>
            <Label>ارتفاع</Label>
            <Input
              type="text"
              placeholder="مثال: 20px"
              value={style.height || ""}
              onChange={(e) => updateStyle("height", e.target.value)}
            />
          </FormGroup>
        );
      case "divider":
        return (
          <>
            <FormGroup>
              <Label>ارتفاع</Label>
              <Input
                type="text"
                placeholder="مثال: 1px"
                value={style.height || ""}
                onChange={(e) => updateStyle("height", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>رنگ</Label>
              <Input
                type="color"
                value={style.backgroundColor || ""}
                onChange={(e) => updateStyle("backgroundColor", e.target.value)}
              />
            </FormGroup>
          </>
        );
      case "icon":
        return (
          <>
            <FormGroup>
              <Label>آیکون</Label>
              <div className="d-flex align-items-center">
                <div
                  className="p-2 border rounded me-2"
                  style={{ minWidth: "40px", textAlign: "center" }}
                >
                  <i
                    className={selectedComponent.iconClass}
                    style={{ fontSize: "24px" }}
                  />
                </div>
                <Button
                  color="primary"
                  outline
                  onClick={() => handleOpenIconPicker(id)}
                >
                  تغییر آیکون
                </Button>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>اندازه فونت</Label>
              <Input
                type="text"
                value={style.fontSize || ""}
                onChange={(e) => updateStyle("fontSize", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>رنگ</Label>
              <Input
                type="color"
                value={style.color || ""}
                onChange={(e) => updateStyle("color", e.target.value)}
              />
            </FormGroup>
          </>
        );
      case "input":
        return (
          <>
            <FormGroup>
              <Label>متن جایگزین (Placeholder)</Label>
              <Input
                type="text"
                value={selectedComponent.placeholder}
                onChange={(e) =>
                  handleUpdate(id, { placeholder: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>نوع ورودی</Label>
              <Input
                type="select"
                value={selectedComponent.inputType}
                onChange={(e) =>
                  handleUpdate(id, { inputType: e.target.value })
                }
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="number">Number</option>
              </Input>
            </FormGroup>
          </>
        );
      case "textarea":
        return (
          <FormGroup>
            <Label>متن جایگزین (Placeholder)</Label>
            <Input
              type="textarea"
              value={selectedComponent.placeholder}
              onChange={(e) =>
                handleUpdate(id, { placeholder: e.target.value })
              }
            />
          </FormGroup>
        );
      case "html":
        return (
          <FormGroup>
            <Label>کد HTML</Label>
            <Input
              type="textarea"
              rows="5"
              value={selectedComponent.content}
              onChange={(e) => handleUpdate(id, { content: e.target.value })}
            />
          </FormGroup>
        );
      case "select":
        return (
          <>
            <FormGroup>
              <Label>عنوان (Label)</Label>
              <Input
                type="text"
                value={selectedComponent.label}
                onChange={(e) => handleUpdate(id, { label: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>گزینه‌ها (هر کدام در یک خط)</Label>
              <Input
                type="textarea"
                rows="5"
                value={selectedComponent.options.join("\n")}
                onChange={(e) =>
                  handleUpdate(id, {
                    options: e.target.value.split("\n").filter((o) => o),
                  })
                }
              />
            </FormGroup>
          </>
        );
      default:
        return <p>تنظیماتی برای این کامپوننت موجود نیست.</p>;
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">تنظیمات: {type}</CardTitle>
        <hr />
        {renderSettingsForType()}
        <GeneralSettings
          selectedComponent={selectedComponent}
          handleUpdate={handleUpdate}
        />
      </CardBody>
    </Card>
  );
};

export default SettingsPanel;
