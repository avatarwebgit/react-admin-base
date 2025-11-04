import React from "react";
import { Card, CardBody, CardTitle, Col, Input, Label, Row } from "reactstrap";
import TagInput from "../../components/Common/TagInput";

const Meta = ({ formik }) => {
  if (!formik) {
    console.warn("Meta component: formik prop is required");
    return null;
  }

  const { values, setFieldValue } = formik;

  const metaValues = values?.meta || {
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    canonical: "",
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">متا دیتا</CardTitle>
        <p className="card-title-desc mb-3">تنظیمات متا دیتا </p>

        <Row>
          <Col sm={6}>
            <div className="mb-3">
              <Label htmlFor="meta.meta_title">Meta Title</Label>
              <Input
                id="meta.meta_title"
                name="meta.meta_title"
                type="text"
                placeholder="عنوان متا"
                value={metaValues.meta_title || ""}
                onChange={(e) =>
                  setFieldValue("meta.meta_title", e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <Label htmlFor="meta.canonical">Canonical Tag</Label>
              <Input
                id="meta.canonical"
                name="meta.canonical"
                type="text"
                placeholder="canonical"
                value={metaValues.canonical || ""}
                onChange={(e) =>
                  setFieldValue("meta.canonical", e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <Label htmlFor="meta_keywords">Meta Keywords</Label>
              <TagInput
                tags={metaValues.meta_keywords || []}
                setTags={(tags) => setFieldValue("meta.meta_keywords", tags)}
                placeholder="کلمات کلیدی متا"
              />
            </div>
          </Col>

          <Col sm={6}>
            <div className="mb-3">
              <Label htmlFor="meta.meta_description">Meta Description</Label>
              <Input
                name="meta.meta_description"
                id="meta.meta_description"
                tag="textarea"
                rows={5}
                placeholder="توضیحات متا"
                value={metaValues.meta_description || ""}
                onChange={(e) =>
                  setFieldValue("meta.meta_description", e.target.value)
                }
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Meta;
