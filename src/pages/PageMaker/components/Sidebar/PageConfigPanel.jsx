import React from "react";
import { Card, CardBody, CardTitle, FormGroup, Label, Input } from "reactstrap";
import TagInput from "../common/TagInput";

const PageConfigPanel = ({ pageConfig, setPageConfig }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">پیکربندی کلی صفحه</CardTitle>
        <FormGroup>
          <Label>عنوان صفحه</Label>
          <Input
            value={pageConfig.title}
            onChange={(e) =>
              setPageConfig({ ...pageConfig, title: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>رنگ پس‌زمینه</Label>
          <Input
            type="color"
            value={pageConfig.backgroundColor}
            onChange={(e) =>
              setPageConfig({ ...pageConfig, backgroundColor: e.target.value })
            }
          />
        </FormGroup>
        <hr />
        <CardTitle tag="h6">تنظیمات انتشار</CardTitle>
        <FormGroup>
          <Label>اسلاگ (Slug)</Label>
          <Input
            value={pageConfig.slug}
            onChange={(e) =>
              setPageConfig({
                ...pageConfig,
                slug: e.target.value.trim().toLowerCase().replace(/\s+/g, "-"),
              })
            }
            placeholder="e.g., about-us"
          />
        </FormGroup>
        <FormGroup>
          <Label>اولویت نمایش</Label>
          <Input
            type="number"
            value={pageConfig.displayOrder}
            onChange={(e) =>
              setPageConfig({
                ...pageConfig,
                displayOrder: parseInt(e.target.value, 10) || 0,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>وضعیت</Label>
          <Input
            type="select"
            value={pageConfig.status}
            onChange={(e) =>
              setPageConfig({ ...pageConfig, status: e.target.value })
            }
          >
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشر شده</option>
            <option value="archived">بایگانی شده</option>
          </Input>
        </FormGroup>
        <hr />
        <CardTitle tag="h6">تنظیمات SEO</CardTitle>
        <FormGroup>
          <Label>عنوان متا (Meta Title)</Label>
          <Input
            value={pageConfig.metaTitle}
            onChange={(e) =>
              setPageConfig({ ...pageConfig, metaTitle: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>توضیحات متا (Meta Description)</Label>
          <Input
            type="textarea"
            value={pageConfig.metaDescription}
            onChange={(e) =>
              setPageConfig({ ...pageConfig, metaDescription: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>کلمات کلیدی متا (Meta Keywords)</Label>
          <TagInput
            tags={pageConfig.metaKeywords}
            setTags={(newTags) =>
              setPageConfig({ ...pageConfig, metaKeywords: newTags })
            }
          />
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default PageConfigPanel;
