import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Collapse,
  Input,
  Label,
  Row,
} from "reactstrap";
import SelectLoading from "../../../components/Common/SelectLoading";
import {
  getAllCategories,
  getCategories,
  setCategoryFiltersAction,
} from "../../../store/e-commerce/actions";
import { persianStyles } from "../../../utils/selectFormat";

// Import icons
import {
  GlobeIcon,
  CheckCircleIcon,
  BlockIcon,
  ListOlIcon,
  HashIcon,
  CalendarIcon,
  SortUpIcon,
  SortDownIcon,
  ListUlIcon,
  FilterAltIcon,
  SearchAltIcon,
  GridAltIcon,
  LinkAltIcon,
  SortAltIcon,
  TransferAltIcon,
  ShowIcon,
  HideIcon,
  TrashIcon,
  GitMergeIcon,
} from "../../../components/Common/icons";

const CategoryFilters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /** ---------- Select Options with Boxicons ---------- **/
  const statusOptions = [
    {
      value: "",
      label: (
        <span>
          {GlobeIcon}
          <span className="me-1"></span>همه
        </span>
      ),
    },
    {
      value: "1",
      label: (
        <span>
          {CheckCircleIcon}
          <span className="me-1"></span>فعال
        </span>
      ),
    },
    {
      value: "0",
      label: (
        <span>
          {BlockIcon}
          <span className="me-1"></span>غیرفعال
        </span>
      ),
    },
  ];

  const sortByOptions = [
    {
      value: "display_order",
      label: (
        <span>
          {ListOlIcon}
          <span className="me-1"></span>اولویت نمایش
        </span>
      ),
    },
    {
      value: "id",
      label: (
        <span>
          {HashIcon}
          <span className="me-1"></span>شناسه
        </span>
      ),
    },
    {
      value: "created_at",
      label: (
        <span>
          {CalendarIcon}
          <span className="me-1"></span>تاریخ ایجاد
        </span>
      ),
    },
  ];

  const sortDirOptions = [
    {
      value: "asc",
      label: (
        <span>
          {SortUpIcon}
          <span className="me-1"></span>صعودی
        </span>
      ),
    },
    {
      value: "desc",
      label: (
        <span>
          {SortDownIcon}
          <span className="me-1"></span>نزولی
        </span>
      ),
    },
  ];

  const perPageOptions = [
    {
      value: 15,
      label: (
        <span>
          {ListUlIcon}
          <span className="me-1"></span>15
        </span>
      ),
    },
    {
      value: 30,
      label: (
        <span>
          {ListUlIcon}
          <span className="me-1"></span>30
        </span>
      ),
    },
    {
      value: 50,
      label: (
        <span>
          {ListUlIcon}
          <span className="me-1"></span>50
        </span>
      ),
    },
    {
      value: 100,
      label: (
        <span>
          {ListUlIcon}
          <span className="me-1"></span>100
        </span>
      ),
    },
  ];

  const categories = useSelector(
    (state) => state.ecommerce.allCategories.items
  );
  const { AllCategoryLoading } = useSelector((state) => state.ecommerce);

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    name: "",
    slug: "",
    is_active: "",
    children_of: "",
    sort_by: "display_order",
    sort_dir: "asc",
    per_page: 15,
  });
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const urlFilters = {
      search: searchParams.get("search") || "",
      name: searchParams.get("name") || "",
      slug: searchParams.get("slug") || "",
      is_active: searchParams.get("is_active") || "",
      children_of: searchParams.get("children_of") || "",
      sort_by: searchParams.get("sort_by") || "display_order",
      sort_dir: searchParams.get("sort_dir") || "asc",
      per_page: searchParams.get("per_page") || 15,
    };
    setFilters(urlFilters);
    dispatch(setCategoryFiltersAction(urlFilters));
    dispatch(getCategories(urlFilters));
  }, [searchParams]);

  useEffect(() => {
    if (categories) {
      const categoryOpts = categories
        .filter((c) => !c.parent)
        .sort((a, b) => a.display_order - b.display_order)
        .map((category, index) => ({
          value: category.id,
          label: `${category.name}`,
          display_order: category.display_order,
        }));

      setCategoryOptions(categoryOpts);
    }
  }, [categories]);

  useEffect(() => {
    if (filters.search.trim() === "") return;
    dispatch(setCategoryFiltersAction(filters));
    const debounceTimer = setTimeout(() => {
      updateURL(filters);
      dispatch(getCategories({ page: 1, per_page: 15, ...filters }));
    }, 800);
    return () => clearTimeout(debounceTimer);
  }, [filters.search]);

  /** ---------- Handlers ---------- **/
  const toggle = () => setIsOpen((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const updateURL = (filtersToApply) => {
    const params = new URLSearchParams();
    Object.entries(filtersToApply).forEach(([key, value]) => {
      if (
        value !== "" &&
        value !== "display_order" &&
        value !== "asc" &&
        value !== 15
      ) {
        params.append(key, value);
      }
    });
    const queryString = params.toString();
    navigate(`?${queryString}`, { replace: true });
  };

  const handleApplyFilters = () => {
    updateURL(filters);
    dispatch(getCategories({ page: 1, per_page: 15, ...filters }));
  };

  const handleClearFilters = () => {
    const cleared = {
      search: "",
      name: "",
      slug: "",
      is_active: "",
      children_of: "",
      sort_by: "display_order",
      sort_dir: "asc",
      per_page: 15,
    };
    setFilters(cleared);
    navigate("", { replace: true });
    dispatch(getCategories(cleared));
  };

  /** ---------- Render ---------- **/
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <CardTitle className="h4 mb-0">
            {FilterAltIcon}
            <span className="align-middle me-1"></span>
            فیلتر دسته بندی ها
          </CardTitle>
          <Button color="primary" onClick={toggle} className="btn btn-sm">
            {isOpen ? "پنهان کردن فیلتر" : "نمایش فیلتر"}
            <span className="m-auto d-flex align-items-center">
              {isOpen ? HideIcon : ShowIcon}
            </span>
          </Button>
        </div>

        <Collapse isOpen={isOpen} className="filter-collapse mt-3">
          <div className="p-3 border rounded">
            <Row className="g-3">
              <Col md={4} sm={6}>
                <Label htmlFor="search-filter">
                  {SearchAltIcon}
                  <span className="align-middle me-1"></span>
                  جستجو
                </Label>
                <Input
                  id="search-filter"
                  name="search"
                  placeholder="جستجو در نام، اسلاگ..."
                  value={filters.search}
                  onChange={handleInputChange}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label htmlFor="name-filter">
                  {GridAltIcon}
                  <span className="align-middle me-1"></span>
                  نام دسته بندی
                </Label>
                <Input
                  id="name-filter"
                  name="name"
                  placeholder="نام دسته بندی"
                  value={filters.name}
                  onChange={handleInputChange}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label htmlFor="slug-filter">
                  {LinkAltIcon}
                  <span className="align-middle me-1"></span>
                  اسلاگ
                </Label>
                <Input
                  id="slug-filter"
                  name="slug"
                  placeholder="اسلاگ"
                  value={filters.slug}
                  onChange={handleInputChange}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label htmlFor="status-filter">
                  {CheckCircleIcon}
                  <span className="align-middle me-1"></span>
                  وضعیت
                </Label>
                <Select
                  id="status-filter"
                  name="is_active"
                  options={statusOptions}
                  placeholder="انتخاب وضعیت..."
                  value={
                    statusOptions.find(
                      (opt) => opt.value === filters.is_active
                    ) || null
                  }
                  onChange={(option) => handleSelectChange("is_active", option)}
                  styles={persianStyles}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label htmlFor="parent-filter">
                  {GitMergeIcon}
                  <span className="align-middle me-1"></span>
                  دسته بندی والد
                </Label>
                <Select
                  id="parent-filter"
                  name="children_of"
                  options={categoryOptions}
                  placeholder="انتخاب والد..."
                  value={
                    categoryOptions.find(
                      (opt) => opt.value === +filters.children_of
                    ) || null
                  }
                  onChange={(option) =>
                    handleSelectChange("children_of", option)
                  }
                  onFocus={() => {
                    dispatch(getAllCategories({ page: 1, per_page: 100 }));
                    const parents = categories.filter((c) => !c.parent);
                  }}
                  isLoading={AllCategoryLoading}
                  loadingMessage={() => <SelectLoading />}
                  classNamePrefix="select2-selection"
                  styles={persianStyles}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label htmlFor="sort_by-filter">
                  {SortAltIcon}
                  <span className="align-middle me-1"></span>
                  مرتب سازی بر اساس
                </Label>
                <Select
                  id="sort_by-filter"
                  name="sort_by"
                  options={sortByOptions}
                  value={sortByOptions.find(
                    (opt) => opt.value === filters.sort_by
                  )}
                  onChange={(option) => handleSelectChange("sort_by", option)}
                  styles={persianStyles}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label htmlFor="sort_dir-filter">
                  {TransferAltIcon}
                  <span className="align-middle me-1"></span>
                  جهت مرتب سازی
                </Label>
                <Select
                  id="sort_dir-filter"
                  name="sort_dir"
                  options={sortDirOptions}
                  value={sortDirOptions.find(
                    (opt) => opt.value === filters.sort_dir
                  )}
                  onChange={(option) => handleSelectChange("sort_dir", option)}
                  styles={persianStyles}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label htmlFor="per_page-filter">
                  {ListUlIcon}
                  <span className="align-middle me-1"></span>
                  تعداد در صفحه
                </Label>
                <Select
                  id="per_page-filter"
                  name="per_page"
                  options={perPageOptions}
                  value={perPageOptions.find(
                    (opt) => opt.value == filters.per_page
                  )}
                  onChange={(option) => handleSelectChange("per_page", option)}
                  styles={persianStyles}
                />
              </Col>
            </Row>

            <div className="mt-4 d-flex justify-content-end gap-2">
              <Button
                color="primary"
                className="btn-sm"
                onClick={handleApplyFilters}
              >
                اعمال فیلتر
                <span className="d-flex align-items-center">
                  {FilterAltIcon}
                </span>
              </Button>
              <Button
                color="secondary"
                className="btn-sm"
                onClick={handleClearFilters}
              >
                پاک کردن فیلترها
                <span className="d-flex align-items-center">{TrashIcon}</span>
              </Button>
            </div>
          </div>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default CategoryFilters;
