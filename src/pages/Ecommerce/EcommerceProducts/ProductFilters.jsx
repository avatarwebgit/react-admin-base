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
  getBrands,
  getProducts,
  setProductFiltersAction,
} from "../../../store/e-commerce/actions";
import { groupItemsByKey } from "../../../utils/helperFunctions";
import { formatGroupLabel, persianStyles } from "../../../utils/selectFormat";

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
  BoxIcon,
  LinkAltIcon,
  BarcodeIcon,
  GridAltIcon,
  PurchaseTagIcon,
  PackageIcon,
  GiftIcon,
  InfiniteIcon,
  SortAltIcon,
  TransferAltIcon,
  ShowIcon,
  HideIcon,
  TrashIcon,
} from "../../../components/Common/icons";

const ProductFilters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const booleanOptions = [
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
          <span className="me-1"></span>بله
        </span>
      ),
    },
    {
      value: "0",
      label: (
        <span>
          {BlockIcon}
          <span className="me-1"></span>خیر
        </span>
      ),
    },
  ];

  const activeStatusOptions = [
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

  const { categories, brands, categoryLoading, brandLoading } = useSelector(
    (state) => ({
      categories: state.ecommerce.allCategories.items,
      brands: state.ecommerce.brands.items,
      categoryLoading: state.ecommerce.categoryLoading,
      brandLoading: state.ecommerce.brandLoading,
    })
  );

  const getInitialFilters = () => ({
    search: searchParams.get("search") || "",
    name: searchParams.get("name") || "",
    slug: searchParams.get("slug") || "",
    sku: searchParams.get("sku") || "",
    is_active: searchParams.get("is_active") || "",
    isSpecialOffer: searchParams.get("isSpecialOffer") || "",
    isUnlimited: searchParams.get("isUnlimited") || "",
    categories: searchParams.getAll("categories[]") || [],
    brand: searchParams.get("brand") || "",
    stockFrom: searchParams.get("stockFrom") || "",
    stockTo: searchParams.get("stockTo") || "",
    sort_by: searchParams.get("sort_by") || "display_order",
    sort_dir: searchParams.get("sort_dir") || "asc",
    per_page: parseInt(searchParams.get("per_page")) || 15,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters());
  const [groupedCategoryOptions, setGroupedCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    dispatch(getAllCategories({ page: 1, per_page: 100 }));
    dispatch(getBrands({ per_page: 100 }));
  }, [dispatch]);

  useEffect(() => {
    const urlFilters = getInitialFilters();
    setFilters(urlFilters);
    dispatch(setProductFiltersAction(urlFilters));
    dispatch(getProducts(urlFilters));
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      const grouped = groupItemsByKey(categories, "parent.name");
      setGroupedCategoryOptions(grouped);
    }
  }, [categories]);

  useEffect(() => {
    if (brands.length > 0) {
      setBrandOptions(brands.map((b) => ({ value: b.id, label: b.name })));
    }
  }, [brands]);

  useEffect(() => {
    if (filters.search === searchParams.get("search")) return;
    dispatch(setProductFiltersAction(filters));
    const debounceTimer = setTimeout(() => {
      updateURL({ ...filters, page: 1 });
    }, 800);
    return () => clearTimeout(debounceTimer);
  }, [filters.search]);

  const toggle = () => setIsOpen((prev) => !prev);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    if (Array.isArray(selectedOption)) {
      setFilters((prev) => ({
        ...prev,
        [name]: selectedOption.map((o) => o.value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: selectedOption ? selectedOption.value : "",
      }));
    }
  };

  const updateURL = (filtersToApply) => {
    const params = new URLSearchParams();
    Object.entries(filtersToApply).forEach(([key, value]) => {
      if (key === "categories" && Array.isArray(value)) {
        value.forEach((val) => params.append("categories[]", val));
      } else if (value !== "" && value !== null && value !== undefined) {
        if (key === "sort_by" && value === "display_order") return;
        if (key === "sort_dir" && value === "asc") return;
        if (key === "per_page" && value == 15) return;
        if (key === "page" && value == 1) return;
        params.append(key, value);
      }
    });
    const queryString = params.toString();
    navigate(`?${queryString}`, { replace: true });
  };

  const handleApplyFilters = () => updateURL({ ...filters, page: 1 });
  const handleClearFilters = () => navigate("", { replace: true });

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <CardTitle className="h4 mb-0 d-flex align-items-center">
            <span className=" align-middle me-1">
              {FilterAltIcon}
              <span> فیلتر محصولات </span>
            </span>
            {Object.keys(searchParams).length === 0 && (
              <div className="pulse" />
            )}
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
              <Col md={12}>
                <Label>
                  {SearchAltIcon}
                  <span className="align-middle me-1"></span>
                  جستجو
                </Label>
                <Input
                  name="search"
                  placeholder="جستجو در نام، اسلاگ، SKU..."
                  value={filters.search}
                  onChange={handleInputChange}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {BoxIcon}
                  <span className="align-middle me-1"></span>نام محصول
                </Label>
                <Input
                  name="name"
                  placeholder="نام محصول"
                  value={filters.name}
                  onChange={handleInputChange}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {LinkAltIcon}
                  <span className="align-middle me-1"></span>اسلاگ
                </Label>
                <Input
                  name="slug"
                  placeholder="اسلاگ"
                  value={filters.slug}
                  onChange={handleInputChange}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {BarcodeIcon}
                  <span className="align-middle me-1"></span>SKU
                </Label>
                <Input
                  name="sku"
                  placeholder="SKU"
                  value={filters.sku}
                  onChange={handleInputChange}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {GridAltIcon}
                  <span className="align-middle me-1"></span>
                  دسته بندی ها
                </Label>
                <Select
                  name="categories"
                  isMulti
                  placeholder="انتخاب دسته بندی..."
                  options={groupedCategoryOptions}
                  styles={persianStyles}
                  formatGroupLabel={formatGroupLabel}
                  isLoading={categoryLoading}
                  onFocus={() => dispatch(getAllCategories({ per_page: 100 }))}
                  loadingMessage={() => <SelectLoading />}
                  value={filters.categories
                    .map((catId) => {
                      for (const group of groupedCategoryOptions) {
                        const option = group.options.find(
                          (opt) => opt.value == catId
                        );
                        if (option) return option;
                      }
                      return null;
                    })
                    .filter(Boolean)}
                  onChange={(option) =>
                    handleSelectChange("categories", option)
                  }
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {PurchaseTagIcon}
                  <span className="align-middle me-1"></span>
                  برند
                </Label>
                <Select
                  name="brand"
                  isClearable
                  placeholder="انتخاب برند..."
                  options={brandOptions}
                  styles={persianStyles}
                  isLoading={brandLoading}
                  onFocus={() => dispatch(getBrands({ per_page: 1000 }))}
                  loadingMessage={() => <SelectLoading />}
                  value={
                    brandOptions.find((opt) => opt.value == filters.brand) ||
                    null
                  }
                  onChange={(option) => handleSelectChange("brand", option)}
                />
              </Col>

              <Col md={4} sm={6}>
                <Row>
                  <Col xs={6}>
                    <Label>
                      {PackageIcon}
                      <span className="align-middle me-1"></span>
                      موجودی از
                    </Label>
                    <Input
                      name="stockFrom"
                      type="number"
                      placeholder="مثلا: 0"
                      value={filters.stockFrom}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col xs={6}>
                    <Label>
                      {PackageIcon}
                      <span className="align-middle me-1"></span>
                      موجودی تا
                    </Label>
                    <Input
                      name="stockTo"
                      type="number"
                      placeholder="مثلا: 100"
                      value={filters.stockTo}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {CheckCircleIcon}
                  <span className="align-middle me-1"></span>فعال
                </Label>
                <Select
                  name="is_active"
                  options={activeStatusOptions}
                  styles={persianStyles}
                  value={
                    activeStatusOptions.find(
                      (opt) => opt.value === filters.is_active
                    ) || activeStatusOptions[0]
                  }
                  onChange={(option) => handleSelectChange("is_active", option)}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {GiftIcon}
                  <span className="align-middle me-1"></span>پیشنهاد ویژه
                </Label>
                <Select
                  name="isSpecialOffer"
                  options={booleanOptions}
                  styles={persianStyles}
                  value={
                    booleanOptions.find(
                      (opt) => opt.value === filters.isSpecialOffer
                    ) || booleanOptions[0]
                  }
                  onChange={(option) =>
                    handleSelectChange("isSpecialOffer", option)
                  }
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {InfiniteIcon}
                  <span className="align-middle me-1"></span>
                  موجودی نامحدود
                </Label>
                <Select
                  name="isUnlimited"
                  options={booleanOptions}
                  styles={persianStyles}
                  value={
                    booleanOptions.find(
                      (opt) => opt.value === filters.isUnlimited
                    ) || booleanOptions[0]
                  }
                  onChange={(option) =>
                    handleSelectChange("isUnlimited", option)
                  }
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {SortAltIcon}
                  <span className="align-middle me-1"></span>
                  مرتب سازی بر اساس
                </Label>
                <Select
                  name="sort_by"
                  options={sortByOptions}
                  styles={persianStyles}
                  value={
                    sortByOptions.find(
                      (opt) => opt.value === filters.sort_by
                    ) || sortByOptions[0]
                  }
                  onChange={(option) => handleSelectChange("sort_by", option)}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {TransferAltIcon}
                  <span className="align-middle me-1"></span>
                  جهت مرتب سازی
                </Label>
                <Select
                  name="sort_dir"
                  options={sortDirOptions}
                  styles={persianStyles}
                  value={
                    sortDirOptions.find(
                      (opt) => opt.value === filters.sort_dir
                    ) || sortDirOptions[0]
                  }
                  onChange={(option) => handleSelectChange("sort_dir", option)}
                />
              </Col>

              <Col md={4} sm={6}>
                <Label>
                  {ListUlIcon}
                  <span className="align-middle me-1"></span>
                  تعداد در صفحه
                </Label>
                <Select
                  name="per_page"
                  options={perPageOptions}
                  styles={persianStyles}
                  value={
                    perPageOptions.find(
                      (opt) => opt.value == filters.per_page
                    ) || perPageOptions[0]
                  }
                  onChange={(option) => handleSelectChange("per_page", option)}
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

export default ProductFilters;
