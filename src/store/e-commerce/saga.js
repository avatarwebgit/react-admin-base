import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import {
  ADD_ATTRIBUTE,
  ADD_ATTRIBUTE_GROUP,
  ADD_ATTRIBUTE_GROUP_SUCCESS,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_VALUE,
  ADD_ATTRIBUTE_VALUE_SUCCESS,
  ADD_BRAND,
  ADD_BRAND_SUCCESS,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CITY_PRICE,
  ADD_COUPON,
  ADD_DISCOUNT,
  ADD_LABEL,
  ADD_LABEL_SUCCESS,
  ADD_MEASUREMENT,
  ADD_MEASUREMENT_SUCCESS,
  ADD_NEW_CUSTOMER,
  ADD_NEW_ORDER,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_VARIANT,
  ADD_PRODUCT_VARIANT_SUCCESS,
  ADD_SLIDER,
  ADD_SLIDER_SUCCESS,
  ADD_USER,
  ADD_USER_SUCCESS,
  ATTRIBUTE_ERROR,
  ATTRIBUTE_GROUP_ERROR,
  ATTRIBUTE_VALUE_ERROR,
  BRAND_ERROR,
  CATEGORY_ERROR,
  CATEGORY_FILTERS,
  CITY_PRICE_ERROR,
  COUPON_ERROR,
  DELETE_ATTRIBUTE,
  DELETE_ATTRIBUTE_GROUP,
  DELETE_ATTRIBUTE_GROUP_SUCCESS,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_VALUE,
  DELETE_ATTRIBUTE_VALUE_SUCCESS,
  DELETE_BRAND,
  DELETE_BRAND_SUCCESS,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CITY_PRICE,
  DELETE_COUPON,
  DELETE_CUSTOMER,
  DELETE_DISCOUNT,
  DELETE_LABEL,
  DELETE_MEASUREMENT,
  DELETE_MEASUREMENT_SUCCESS,
  DELETE_ORDER,
  DELETE_PRODUCT,
  DELETE_PRODUCT_IMAGE,
  DELETE_PRODUCT_IMAGE_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_VARIANT,
  DELETE_PRODUCT_VARIANT_SUCCESS,
  DELETE_SLIDER,
  DELETE_SLIDER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELIVERY_METHOD_SETTINGS_ERROR,
  DISCOUNT_ERROR,
  GET_ALL_CATEGORIES,
  // ATTRIBUTES GROUPS
  GET_ATTRIBUTE_GROUPS,
  // ATTRIBUTE VALUES
  GET_ATTRIBUTE_VALUES,
  // ATTRIBUTES
  GET_ATTRIBUTES,
  GET_BRANDS,
  GET_CART_DATA,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CITY_PRICE,
  // COUPONS
  GET_COUPONS,
  GET_CUSTOMERS,
  GET_DASHBOARD,
  GET_DELIVERY_METHODS,
  GET_DELIVERY_METHODS_SETTINGS,
  // DISCOUNTS
  GET_DISCOUNTS,
  GET_LABELS,
  GET_LABELS_SUCCESS,
  GET_MEASUREMENTS,
  GET_ORDERS,
  GET_PAYMENT_METHODS,
  GET_PRODCUT_IMAGE_SUCCESS,
  GET_PRODUCT_ATTRIBUTE,
  GET_PRODUCT_COMMENTS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_IMAGE,
  // PRODUCT VARIANTS
  GET_PRODUCT_VARIANTS,
  GET_PRODUCTS,
  GET_PROVINCES,
  GET_SETTINGS_REQUEST,
  GET_SHOPS,
  GET_SLIDERS,
  GET_USERS,
  LABEL_ERROR,
  MEASUREMENT_ERROR,
  ON_ADD_COMMENT,
  ON_ADD_REPLY,
  ON_LIKE_COMMENT,
  ON_LIKE_REPLY,
  PAYMENT_METHOD_ERROR,
  PRODUCT_ATTRIBUTE_ERROR,
  PRODUCT_ERROR,
  PRODUCT_FILTERS,
  PRODUCT_VARIANT_ERROR,
  PROVINCES_ERROR,
  RESET_EDITING_PRODUCT,
  SHOW_ATTRIBUTE,
  SHOW_ATTRIBUTE_GROUP,
  SHOW_ATTRIBUTE_VALUE,
  SHOW_BRAND,
  SHOW_CATEGORY,
  SHOW_COUPON,
  SHOW_DELIVERY_METHOD,
  SHOW_DISCOUNT,
  SHOW_LABEL,
  SHOW_MEASUREMENT,
  SHOW_PAYMENT_METHOD,
  SHOW_PRODUCT,
  SHOW_PRODUCT_VARIANT,
  SHOW_SLIDER,
  SHOW_USER,
  SLIDER_ERROR,
  UPDATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE_GROUP,
  UPDATE_ATTRIBUTE_GROUP_SUCCESS,
  UPDATE_ATTRIBUTE_SUCCESS,
  UPDATE_ATTRIBUTE_VALUE,
  UPDATE_ATTRIBUTE_VALUE_SUCCESS,
  UPDATE_BRAND,
  UPDATE_BRAND_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_COUPON,
  UPDATE_CUSTOMER,
  UPDATE_DELIVERY_METHOD,
  UPDATE_DELIVERY_METHOD_SETTINGS,
  UPDATE_DELIVERY_METHOD_SETTINGS_SUCCESS,
  UPDATE_DELIVERY_METHOD_SUCCESS,
  UPDATE_DISCOUNT,
  UPDATE_LABEL,
  UPDATE_LABEL_SUCCESS,
  UPDATE_MEASUREMENT,
  UPDATE_MEASUREMENT_SUCCESS,
  UPDATE_ORDER,
  UPDATE_PAYMENT_METHOD,
  UPDATE_PRODCUT_IMAGE_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ATTRIBUTE,
  UPDATE_PRODUCT_ATTRIBUTE_SUCCESS,
  UPDATE_PRODUCT_IMAGE,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_VARIANT,
  UPDATE_PRODUCT_VARIANT_SUCCESS,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SLIDER,
  UPDATE_SLIDER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  USER_ERROR,
} from "./actionTypes";

import {
  addCustomerFail,
  addCustomerSuccess,
  addOrderFail,
  addOrderSuccess,
  deleteCustomerFail,
  deleteCustomerSuccess,
  deleteOrderFail,
  deleteOrderSuccess,
  getCartDataFail,
  getCartDataSuccess,
  getCategories,
  getCityPrice,
  getCustomersFail,
  getCustomersSuccess,
  getOrdersFail,
  getOrdersSuccess,
  getProduct,
  getProductAttributeSuccess,
  getProductCommentsFail,
  getProductCommentsSuccess,
  getProductDetailFail,
  getProductDetailSuccess,
  getProducts,
  getProvincesSuccess,
  getShopsFail,
  getShopsSuccess,
  onAddCityPriceuccess,
  onAddCommentFail,
  onAddCommentSuccess,
  onAddReplyFail,
  onAddReplySuccess,
  onGetAllCategoriesSuccess,
  onGetAttributeGroupsSuccess,
  onGetAttributesSuccess,
  onGetAttributeValuesSuccess,
  onGetBrandsSuccess,
  onGetCategoriesSuccess,
  onGetCategorySuccess,
  onGetCityPriceSuccess,
  onGetCouponsSuccess,
  onGetDashboardDataSuccess,
  onGetDeliveryMethodSettingsSuccess,
  onGetDeliveryMethodsSuccess,
  onGetDiscountsSuccess,
  onGetLabelsSuccess,
  onGetMeasurementsSuccess,
  onGetMeasurementSuccess,
  onGetPaymentMethodsSuccess,
  onGetProductsSuccess,
  onGetProductVariantsSuccess,
  onGetSettingsSuccess,
  onGetSlidersSuccess,
  onGetUsersSuccess,
  onLikeCommentFail,
  onLikeCommentSuccess,
  onLikeReplyFail,
  onLikeReplySuccess,
  onShowAttributeGroupSuccess,
  onShowAttributeSuccess,
  onShowAttributeValueSuccess,
  onShowBrandSuccess,
  onShowCouponSuccess,
  onShowDeliveryMethodSettingSuccess,
  onShowDeliveryMethodSuccess,
  onShowDiscountSuccess,
  onShowLabelSuccess,
  onShowPaymentMethodSuccess,
  onShowProductSuccess,
  onShowProductVariantSuccess,
  onShowSliderSuccess,
  onShowUserSuccess,
  setCategoryFiltersAction,
  setProductFiltersAction,
  updateCustomerFail,
  updateCustomerSuccess,
  updateOrderFail,
  updateOrderSuccess,
} from "./actions";

import {
  addAttributeGroupUrl,
  addAttributeUrl,
  addAttributeValueUrl,
  addBrandUrl,
  addCategoryUrl,
  addCouponUrl,
  addDiscountUrl,
  addLabelUrl,
  addMeasurementUrl,
  addNewCustomer,
  addNewOrder,
  addProductUrl,
  addProductVariantUrl,
  addSliderUrl,
  addUserUrl,
  createCityPriceUrl,
  createProductImageUrl,
  deleteAttributeGroupUrl,
  deleteAttributeUrl,
  deleteAttributeValueUrl,
  deleteBrandsUrl,
  deleteCategoryUrl,
  deleteCityPriceUrl,
  deleteCouponUrl,
  deleteCustomer,
  deleteDiscountUrl,
  deleteLabelUrl,
  deleteMeasurementsUrl,
  deleteOrder,
  deleteProductImageUrl,
  deleteProductUrl,
  deleteProductVariantUrl,
  deleteSliderUrl,
  deleteUserUrl,
  getAttributeGroupUrl,
  getAttributeUrl,
  // Attribute Value URLs
  getAttributeValueUrl,
  getBrandsUrl,
  getCartData,
  getCategoriesUrl,
  getCityPriceUrl,
  // Coupon URLs
  getCouponUrl,
  getCustomers,
  getDashboarDataUrl,
  getDeliveryMethodSettingsUrl,
  getDeliveryMethodsUrl,
  // Discount URLs
  getDiscountUrl,
  getLabelUrl,
  getMeasurementsUrl,
  getOrders,
  getPaymentMethodsUrl,
  getProductAttributeUrl,
  getProductComents as getProductComentsApi,
  getProductDetail,
  getProductUrl,
  // Product Variant URLs
  getProductVariantUrl,
  getProvincessUrl,
  // Setting URLs
  getSettingUrl,
  getShops,
  getSliderUrl,
  getUserUrl,
  onAddComment as onAddCommentApi,
  onAddReply as onAddReplyApi,
  onLikeComment as onLikeCommentApi,
  onLikeReply as onLikeReplyApi,
  showAttributeGroupUrl,
  showAttributeUrl,
  showAttributeValueUrl,
  showBrandUrl,
  showCategorysUrl,
  showCouponUrl,
  showDeliveryMethodSettingsUrl,
  showDeliveryMethodsUrl,
  showDiscountUrl,
  showLabelUrl,
  showMeasurementUrl,
  showPaymentMethodsUrl,
  showProductUrl,
  showProductVariantUrl,
  showSliderUrl,
  showUserUrl,
  updateAttributeGroupUrl,
  updateAttributeUrl,
  updateAttributeValueUrl,
  updateBrandUrl,
  updateCategoryUrl,
  updateCouponUrl,
  updateCustomer,
  updateDeliveryMethodSettingsUrl,
  updateDeliveryMethodsUrl,
  updateDiscountUrl,
  updateLabelUrl,
  updateMeasurementUrl,
  updateOrder,
  updatePaymentMethodsUrl,
  updateProductAttributeUrl,
  updateProductImageUrl,
  updateProductUrl,
  updateProductVariantUrl,
  updateSettingUrl,
  updateSliderUrl,
  updateUserUrl,
} from "../../helpers/fakebackend_helper";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SHOW_DELIVERY_METHOD_SETTING } from "../../helpers/url_helper";

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(getProductDetail, productId);
    yield put(getProductDetailSuccess(response));
  } catch (error) {
    yield put(getProductDetailFail(error));
  }
}

function* fetchOrders() {
  try {
    const response = yield call(getOrders);
    yield put(getOrdersSuccess(response));
  } catch (error) {
    yield put(getOrdersFail(error));
  }
}

function* fetchCartData() {
  try {
    const response = yield call(getCartData);
    yield put(getCartDataSuccess(response));
  } catch (error) {
    yield put(getCartDataFail(error));
  }
}

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers);
    yield put(getCustomersSuccess(response));
  } catch (error) {
    yield put(getCustomersFail(error));
  }
}

function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(updateCustomer, customer);
    yield put(updateCustomerSuccess(response));
    toast.success("به روز رسانی مشتری با موفقیت", { autoClose: 2000 });
  } catch (error) {
    yield put(updateCustomerFail(error));
    toast.error("به روز رسانی مشتری ناموفق بود", { autoClose: 2000 });
  }
}

function* onDeleteCustomer({ payload: customer }) {
  try {
    const response = yield call(deleteCustomer, customer);
    yield put(deleteCustomerSuccess(response));
    toast.success("مشتری با موفقیت حذف شد", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteCustomerFail(error));
    toast.error("حذف مشتری انجام نشد", { autoClose: 2000 });
  }
}

function* onAddNewCustomer({ payload: customer }) {
  try {
    const response = yield call(addNewCustomer, customer);
    yield put(addCustomerSuccess(response));
    toast.success("مشتری با موفقیت اضافه شد", { autoClose: 2000 });
  } catch (error) {
    yield put(addCustomerFail(error));
    toast.error("مشتری اضافه نشد", { autoClose: 2000 });
  }
}

function* fetchShops() {
  try {
    const response = yield call(getShops);
    yield put(getShopsSuccess(response));
  } catch (error) {
    yield put(getShopsFail(error));
  }
}

function* onUpdateOrder({ payload: order }) {
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrderSuccess(response));
    toast.success("سفارش به روز رسانی با موفقیت انجام شد", { autoClose: 2000 });
  } catch (error) {
    yield put(updateOrderFail(error));
    toast.error("سفارش به روز رسانی انجام نشد", { autoClose: 2000 });
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order);
    yield put(deleteOrderSuccess(response));
    toast.success("سفارش حذف با موفقیت انجام شد", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteOrderFail(error));
    toast.error("سفارش حذف نشد", { autoClose: 2000 });
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    const response = yield call(addNewOrder, order);
    yield put(addOrderSuccess(response));
    toast.success("سفارش با موفقیت اضافه شد", { autoClose: 2000 });
  } catch (error) {
    yield put(addOrderFail(error));
    toast.error("سفارش اضافه شد ناموفق بود", { autoClose: 2000 });
  }
}

function* getProductComents() {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(getProductComentsApi);
    yield put(getProductCommentsSuccess(response));
  } catch (error) {
    yield put(getProductCommentsFail(error));
  }
}

function* onLikeComment({ payload: { commentId, productId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeCommentApi, commentId, productId);
    yield put(onLikeCommentSuccess(response));
  } catch (error) {
    yield put(onLikeCommentFail(error));
  }
}

function* onLikeReply({ payload: { commentId, productId, replyId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeReplyApi, commentId, productId, replyId);
    yield put(onLikeReplySuccess(response));
  } catch (error) {
    yield put(onLikeReplyFail(error));
  }
}

function* onAddReply({ payload: { commentId, productId, replyText } }) {
  try {
    const response = yield call(onAddReplyApi, commentId, productId, replyText);
    yield put(onAddReplySuccess(response));
  } catch (error) {
    yield put(onAddReplyFail(error));
  }
}

function* onAddComment({ payload: { productId, commentText } }) {
  try {
    const response = yield call(onAddCommentApi, productId, commentText);
    yield put(onAddCommentSuccess(response));
  } catch (error) {
    yield put(onAddCommentFail(error));
  }
}

// ========================
// DASHBOARD SAGA HANDLERS
// ========================

function* fetchDashboard(action) {
  try {
    const response = yield call(getDashboarDataUrl, action.payload);
    yield put(onGetDashboardDataSuccess(response.data));
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CATEGORY_ERROR, payload: error.message });
  }
}

// ========================
// CATEGORY SAGA HANDLERS
// ========================
function* addCategory(action) {
  try {
    const response = yield call(addCategoryUrl, action.payload);
    const categoryFilters = yield select(
      (state) => state.ecommerce.categoryFilters
    );
    yield put({ type: ADD_CATEGORY_SUCCESS });
    yield put(getCategories(categoryFilters));
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CATEGORY_ERROR, payload: error.message });
  }
}

function* updateCategory(action) {
  try {
    const response = yield call(updateCategoryUrl, action.payload);
    const categoryFilters = yield select(
      (state) => state.ecommerce.categoryFilters
    );
    yield put({ type: UPDATE_CATEGORY_SUCCESS });
    yield put(getCategories(categoryFilters));

    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CATEGORY_ERROR, payload: error.message });
  }
}

function* deleteCategory(action) {
  try {
    const response = yield call(deleteCategoryUrl, action.payload);
    const categoryFilters = yield select(
      (state) => state.ecommerce.categoryFilters
    );
    yield put({ type: DELETE_CATEGORY_SUCCESS });
    yield put(getCategories(categoryFilters));
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CATEGORY_ERROR, payload: error.message });
  }
}

function* fetchCategories(action) {
  try {
    const response = yield call(getCategoriesUrl, action.payload);
    yield put({ type: GET_CATEGORIES_SUCCESS });
    yield put(onGetCategoriesSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CATEGORY_ERROR, payload: error.message });
  }
}

function* fetchAllCategories(action) {
  try {
    const response = yield call(getCategoriesUrl, action.payload);
    yield put(onGetAllCategoriesSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CATEGORY_ERROR, payload: error.message });
  }
}

function* showCategory(action) {
  try {
    const response = yield call(showCategorysUrl, action.payload);
    yield put(onGetCategorySuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CATEGORY_ERROR, payload: error.message });
  }
}

function* setCategoriesFilters(action) {
  try {
    yield put(setCategoryFiltersAction(action.payload));
  } catch (err) {
    console.log(err);
  }
}

// ============================
// MEASUREMENT SAGA HANDLERS
// ============================
function* fetchMeasurements(action) {
  const page = action.payload?.page || 1;
  const per_page = action.payload?.per_page || 100;
  try {
    const response = yield call(getMeasurementsUrl, { page, per_page });
    yield put(onGetMeasurementsSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: MEASUREMENT_ERROR, payload: error.message });
  }
}

function* showMeasurement(action) {
  try {
    const response = yield call(showMeasurementUrl, action.payload);
    yield put(onGetMeasurementSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: MEASUREMENT_ERROR, payload: error.message });
  }
}

function* addMeasurement(action) {
  try {
    const response = yield call(addMeasurementUrl, action.payload);
    yield put({ type: ADD_MEASUREMENT_SUCCESS });
    yield put({ type: GET_MEASUREMENTS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: MEASUREMENT_ERROR, payload: error.message });
  }
}

function* updateMeasurement(action) {
  try {
    const response = yield call(updateMeasurementUrl, action.payload);
    yield put({ type: UPDATE_MEASUREMENT_SUCCESS });
    yield put({ type: GET_MEASUREMENTS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: MEASUREMENT_ERROR, payload: error.message });
  }
}

function* deleteMeasurement(action) {
  try {
    const response = yield call(deleteMeasurementsUrl, action.payload);
    yield put({ type: DELETE_MEASUREMENT_SUCCESS });
    yield put({ type: GET_MEASUREMENTS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: MEASUREMENT_ERROR, payload: error.message });
  }
}

// ========================
// BRAND SAGA HANDLERS
// ========================
function* fetchBrands(action) {
  const page = action.payload?.page || 1;
  const per_page = action.payload?.per_page || 100;
  try {
    const response = yield call(getBrandsUrl, { page, per_page });
    yield put(onGetBrandsSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: BRAND_ERROR, payload: error.message });
  }
}

function* showBrand(action) {
  try {
    const response = yield call(showBrandUrl, action.payload);
    yield put(onShowBrandSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: BRAND_ERROR, payload: error.message });
  }
}

function* addBrand(action) {
  try {
    const response = yield call(addBrandUrl, action.payload);
    yield put({ type: ADD_BRAND_SUCCESS });
    yield put({ type: GET_BRANDS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: BRAND_ERROR, payload: error.message });
  }
}

function* updateBrand(action) {
  try {
    const response = yield call(updateBrandUrl, action.payload);
    yield put({ type: UPDATE_BRAND_SUCCESS });
    yield put({ type: GET_BRANDS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: BRAND_ERROR, payload: error.message });
  }
}

function* deleteBrand(action) {
  try {
    const response = yield call(deleteBrandsUrl, action.payload);
    yield put({ type: DELETE_BRAND_SUCCESS });
    yield put({ type: GET_BRANDS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: BRAND_ERROR, payload: error.message });
  }
}

// =======================
// LABEL SAGA HANDLERS
// =======================
function* fetchLabels(action) {
  const page = action.payload?.page || 1;
  const per_page = action.payload?.per_page || 100;

  try {
    const response = yield call(getLabelUrl, { page, per_page });
    yield put(onGetLabelsSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: LABEL_ERROR, payload: error.message });
  }
}

function* showLabel(action) {
  try {
    const response = yield call(showLabelUrl, action.payload);
    yield put(onShowLabelSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: LABEL_ERROR, payload: error.message });
  }
}

function* addLabel(action) {
  try {
    const response = yield call(addLabelUrl, action.payload);
    yield put({ type: ADD_LABEL_SUCCESS });
    yield put({ type: GET_LABELS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: LABEL_ERROR, payload: error.message });
  }
}

function* updateLabel(action) {
  try {
    const response = yield call(updateLabelUrl, action.payload);
    yield put({ type: UPDATE_LABEL_SUCCESS });
    yield put({ type: GET_LABELS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: LABEL_ERROR, payload: error.message });
  }
}

function* deleteLabel(action) {
  try {
    const response = yield call(deleteLabelUrl, action.payload);
    yield put({ type: GET_LABELS_SUCCESS });
    yield put({ type: GET_LABELS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: LABEL_ERROR, payload: error.message });
  }
}

// =========================
// PRODUCT SAGA HANDLERS
// =========================
function* fetchProducts(action) {
  try {
    const response = yield call(getProductUrl, action.payload);
    yield put(onGetProductsSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_ERROR, payload: error.message });
  }
}

function* showProduct(action) {
  try {
    const response = yield call(showProductUrl, action.payload);
    yield put(onShowProductSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_ERROR, payload: error.message });
  }
}

function* addProduct(action) {
  try {
    const response = yield call(addProductUrl, action.payload);
    yield put({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_ERROR, payload: error.message });
  }
}

function* updateProduct(action) {
  try {
    const response = yield call(updateProductUrl, action.payload);
    const productFilters = yield select(
      (state) => state.ecommerce.productFilters
    );
    yield put({
      type: UPDATE_PRODUCT_SUCCESS,
    });
    yield put(getProducts(productFilters));
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_ERROR, payload: error.message });
  }
}

function* deleteProduct(action) {
  try {
    const response = yield call(deleteProductUrl, action.payload);
    const productFilters = yield select(
      (state) => state.ecommerce.productFilters
    );
    yield put({ type: DELETE_PRODUCT_SUCCESS });
    yield put(getProducts(productFilters));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_ERROR, payload: error.message });
  }
}

function* setProductFilters(action) {
  try {
    yield put(setProductFiltersAction(action.payload));
  } catch (err) {
    console.log(err);
  }
}

function* resetEditingProduct(action) {
  try {
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_ERROR, payload: error.message });
  }
}

// =========================
// ATTRIBUTE SAGA HANDLERS
// =========================
function* fetchAttributes(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getAttributeUrl, page);
    yield put(onGetAttributesSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_ERROR, payload: error.message });
  }
}

function* showAttribute(action) {
  try {
    const response = yield call(showAttributeUrl, action.payload);
    yield put(onShowAttributeSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_ERROR, payload: error.message });
  }
}

function* addAttribute(action) {
  try {
    const response = yield call(addAttributeUrl, action.payload);
    yield put({
      type: ADD_ATTRIBUTE_SUCCESS,
    });
    yield put({ type: GET_ATTRIBUTES });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_ERROR, payload: error.message });
  }
}

function* updateAttribute(action) {
  try {
    const response = yield call(updateAttributeUrl, action.payload);
    yield put({
      type: UPDATE_ATTRIBUTE_SUCCESS,
    });
    // toast.success(response.message);
    yield put({ type: GET_ATTRIBUTES });
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_ERROR, payload: error.message });
  }
}

function* deleteAttribute(action) {
  try {
    const response = yield call(deleteAttributeUrl, action.payload);
    yield put({
      type: DELETE_ATTRIBUTE_SUCCESS,
    });
    yield put({ type: GET_ATTRIBUTES });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_ERROR, payload: error.message });
  }
}

// =========================
// ATTRIBUTE GROUPS SAGA  HANDLERS
// =========================
function* fetchAttributeGroups(action) {
  try {
    const page = action.payload || 1;
    const response = yield call(getAttributeGroupUrl, page);
    yield put(onGetAttributeGroupsSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    yield put({ type: ATTRIBUTE_GROUP_ERROR, payload: error.message });
  }
}

function* fetchAttributeGroup(action) {
  try {
    const response = yield call(showAttributeGroupUrl, action.payload);
    yield put(onShowAttributeGroupSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    yield put({ type: ATTRIBUTE_GROUP_ERROR, payload: error.message });
  }
}

function* createAttributeGroup(action) {
  try {
    const response = yield call(addAttributeGroupUrl, action.payload);
    yield put({
      type: ADD_ATTRIBUTE_GROUP_SUCCESS,
    });
    yield put({ type: GET_ATTRIBUTE_GROUPS });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    yield put({ type: ATTRIBUTE_GROUP_ERROR, payload: error.message });
  }
}

function* modifyAttributeGroup(action) {
  try {
    const response = yield call(updateAttributeGroupUrl, action.payload);
    yield put({
      type: UPDATE_ATTRIBUTE_GROUP_SUCCESS,
    });
    yield put({ type: GET_ATTRIBUTE_GROUPS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    yield put({ type: ATTRIBUTE_GROUP_ERROR, payload: error.message });
  }
}

function* removeAttributeGroup(action) {
  try {
    const response = yield call(deleteAttributeGroupUrl, action.payload);
    yield put({
      type: DELETE_ATTRIBUTE_GROUP_SUCCESS,
    });
    yield put({ type: GET_ATTRIBUTE_GROUPS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    yield put({ type: ATTRIBUTE_GROUP_ERROR, payload: error.message });
  }
}

// =========================
// ATTRIBUTE VALUE SAGA HANDLERS
// =========================
function* fetchAttributeValues(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getAttributeValueUrl, page);
    yield put(onGetAttributeValuesSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_VALUE_ERROR, payload: error.message });
  }
}

function* showAttributeValue(action) {
  try {
    const response = yield call(showAttributeValueUrl, action.payload);
    yield put(
      onShowAttributeValueSuccess({
        data: response.data,
        id: action.payload,
      })
    );
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_VALUE_ERROR, payload: error.message });
  }
}

function* addAttributeValue(action) {
  try {
    const response = yield call(addAttributeValueUrl, action.payload);
    yield put({
      type: ADD_ATTRIBUTE_VALUE_SUCCESS,
    });
    yield put({
      type: SHOW_ATTRIBUTE_VALUE,
      payload: action.payload.attribute_id,
    });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_VALUE_ERROR, payload: error.message });
  }
}

function* updateAttributeValue(action) {
  try {
    const response = yield call(updateAttributeValueUrl, action.payload);
    yield put({
      type: UPDATE_ATTRIBUTE_VALUE_SUCCESS,
    });
    yield put({
      type: SHOW_ATTRIBUTE_VALUE,
      payload: action.payload.attribute_id,
    });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_VALUE_ERROR, payload: error.message });
  }
}

function* deleteAttributeValue(action) {
  try {
    const response = yield call(
      deleteAttributeValueUrl,
      action.payload.valueId
    );
    yield put({
      type: DELETE_ATTRIBUTE_VALUE_SUCCESS,
    });
    yield put({
      type: SHOW_ATTRIBUTE_VALUE,
      payload: action.payload.parentId,
    });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: ATTRIBUTE_VALUE_ERROR, payload: error.message });
  }
}

// =========================
// PRODUCT VARIANT SAGA HANDLERS
// =========================
function* fetchProductVariants(action) {
  const page = action.payload?.page || 1;
  try {
    const response = yield call(getProductVariantUrl, action);
    yield put(
      onGetProductVariantsSuccess({
        id: action.payload.id,
        items: response.data,
      })
    );
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_VARIANT_ERROR, payload: error.message });
  }
}

function* showProductVariant(action) {
  try {
    const response = yield call(showProductVariantUrl, action.payload);

    yield put(
      onShowProductVariantSuccess({ data: response.data, id: action.payload })
    );
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_VARIANT_ERROR, payload: error.message });
  }
}

function* addProductVariant(action) {
  try {
    const response = yield call(addProductVariantUrl, action.payload);

    yield put({
      type: ADD_PRODUCT_VARIANT_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: GET_PRODUCT_VARIANTS,
      payload: { id: +action.payload.product_id },
    });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_VARIANT_ERROR, payload: error.message });
  }
}

function* updateProductVariant(action) {
  try {
    const response = yield call(updateProductVariantUrl, action.payload);
    yield put({
      type: UPDATE_PRODUCT_VARIANT_SUCCESS,
    });
    yield put({
      type: GET_PRODUCT_VARIANTS,
      payload: { id: action.payload.product_id },
    });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_VARIANT_ERROR, payload: error.message });
  }
}

function* deleteProductVariant(action) {
  try {
    const response = yield call(deleteProductVariantUrl, action.payload.id);
    yield put({
      type: DELETE_PRODUCT_VARIANT_SUCCESS,
    });
    yield put({
      type: GET_PRODUCT_VARIANTS,
      payload: { id: action.payload.productId },
    });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PRODUCT_VARIANT_ERROR, payload: error.message });
  }
}

// =========================
// DISCOUNT SAGA HANDLERS
// =========================
function* fetchDiscounts(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getDiscountUrl, page);
    yield put(onGetDiscountsSuccess(response.data));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DISCOUNT_ERROR, payload: error.message });
  }
}

function* showDiscount(action) {
  try {
    const response = yield call(showDiscountUrl, action.payload);
    yield put(onShowDiscountSuccess(response.data));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DISCOUNT_ERROR, payload: error.message });
  }
}

function* addDiscount(action) {
  try {
    const response = yield call(addDiscountUrl, action.payload);
    yield put({ type: GET_DISCOUNTS });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DISCOUNT_ERROR, payload: error.message });
  }
}

function* updateDiscount(action) {
  try {
    const response = yield call(updateDiscountUrl, action.payload);
    yield put({ type: GET_DISCOUNTS });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DISCOUNT_ERROR, payload: error.message });
  }
}

function* deleteDiscount(action) {
  try {
    const response = yield call(deleteDiscountUrl, action.payload);
    yield put({ type: GET_DISCOUNTS });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DISCOUNT_ERROR, payload: error.message });
  }
}

// =========================
// COUPON SAGA HANDLERS
// =========================
function* fetchCoupons(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getCouponUrl, page);
    yield put(onGetCouponsSuccess(response.data));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: COUPON_ERROR, payload: error.message });
  }
}

function* showCoupon(action) {
  try {
    const response = yield call(showCouponUrl, action.payload);
    yield put(onShowCouponSuccess(response.data));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: COUPON_ERROR, payload: error.message });
  }
}

function* addCoupon(action) {
  console.log(action);
  try {
    const response = yield call(addCouponUrl, action.payload);
    yield put({ type: GET_COUPONS });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: COUPON_ERROR, payload: error.message });
  }
}

function* updateCoupon(action) {
  try {
    const response = yield call(updateCouponUrl, action.payload);
    yield put({ type: GET_COUPONS });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: COUPON_ERROR, payload: error.message });
  }
}

function* deleteCoupon(action) {
  console.log(action);
  try {
    const response = yield call(deleteCouponUrl, action.payload);
    yield put({ type: GET_COUPONS });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: COUPON_ERROR, payload: error.message });
  }
}

// =========================
// SLIDER SAGA HANDLERS
// =========================

function* fetchSliders(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getSliderUrl, page);
    yield put(onGetSlidersSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: SLIDER_ERROR, payload: error.message });
  }
}

function* showSlider(action) {
  try {
    const response = yield call(showSliderUrl, action.payload);
    yield put(onShowSliderSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: SLIDER_ERROR, payload: error.message });
  }
}

function* addSlider(action) {
  try {
    const response = yield call(
      addSliderUrl,
      action.payload.formData,
      action.payload.config
    );
    yield put({ type: ADD_SLIDER_SUCCESS });
    yield put({ type: GET_SLIDERS });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: SLIDER_ERROR, payload: error.message });
  }
}

function* updateSlider(action) {
  try {
    const response = yield call(
      updateSliderUrl,
      action.payload.id,
      action.payload.formData,
      action.payload.config
    );
    yield put({ type: UPDATE_SLIDER_SUCCESS });
    yield put({ type: GET_SLIDERS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: SLIDER_ERROR, payload: error.message });
  }
}

function* deleteSlider(action) {
  try {
    const response = yield call(deleteSliderUrl, action.payload);
    yield put({ type: DELETE_SLIDER_SUCCESS });
    yield put({ type: GET_SLIDERS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: SLIDER_ERROR, payload: error.message });
  }
}

// =========================
// USERS SAGA HANDLERS
// =========================

function* fetchUsers(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getUserUrl, page);
    yield put(onGetUsersSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: USER_ERROR, payload: error.message });
  }
}

function* showUser(action) {
  try {
    const response = yield call(showUserUrl, action.payload);
    yield put(onShowUserSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: USER_ERROR, payload: error.message });
  }
}

function* addUser(action) {
  try {
    const response = yield call(addUserUrl, action.payload);
    yield put({ type: ADD_USER_SUCCESS });
    yield put({ type: GET_USERS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: USER_ERROR, payload: error.message });
  }
}

function* updateUser(action) {
  try {
    const response = yield call(updateUserUrl, action.payload);
    yield put({ type: UPDATE_USER_SUCCESS });
    yield put({ type: GET_USERS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: USER_ERROR, payload: error.message });
  }
}

function* deleteUser(action) {
  try {
    const response = yield call(deleteUserUrl, action.payload);
    yield put({ type: DELETE_USER_SUCCESS });
    yield put({ type: GET_USERS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: USER_ERROR, payload: error.message });
  }
}

// =========================
// PRODUCT ATTRIBUTE SAGA HANDLERS
// =========================

function* updateProductAttribute(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateProductAttributeUrl, id, data);
    yield put({
      type: UPDATE_PRODUCT_ATTRIBUTE_SUCCESS,
    });

    yield put({
      type: GET_PRODUCT_ATTRIBUTE,
      payload: id,
    });
    // yield put(updateProductAttributeSuccess(response.data));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    yield put({
      type: PRODUCT_ATTRIBUTE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
}

function* getProductAttribute(action) {
  try {
    const response = yield call(getProductAttributeUrl, action.payload);
    console.log(response);
    const data = response.data;
    console.log(data);
    const payload = {
      product: { id: data.id, name: data.name },
      attributes: data.attributes,
    };
    console.log(payload);
    yield put(getProductAttributeSuccess(payload));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    yield put({
      type: PRODUCT_ATTRIBUTE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
}

// =========================
// PAYMENT METHODS  SAGA HANDLERS
// =========================

function* fetchPaymentMethods(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getPaymentMethodsUrl, page);
    yield put(onGetPaymentMethodsSuccess(response.data));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PAYMENT_METHOD_ERROR, payload: error.message });
  }
}

function* showPaymentMethod(action) {
  try {
    const response = yield call(showPaymentMethodsUrl, action.payload);
    yield put(onShowPaymentMethodSuccess(response.data));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PAYMENT_METHOD_ERROR, payload: error.message });
  }
}

function* updatePaymentMethod(action) {
  try {
    const response = yield call(updatePaymentMethodsUrl, action.payload);
    yield put({ type: GET_PAYMENT_METHODS });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PAYMENT_METHOD_ERROR, payload: error.message });
  }
}

// =========================
// DELIVERY METHODS  SAGA HANDLERS
// =========================

function* fetchDeliveryMethods(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getDeliveryMethodsUrl, page);
    yield put(onGetDeliveryMethodsSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DELIVERY_METHOD_ERROR, payload: error.message });
  }
}

function* showDeliveryMethod(action) {
  try {
    const response = yield call(showDeliveryMethodsUrl, action.payload);
    yield put(onShowDeliveryMethodSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DELIVERY_METHOD_ERROR, payload: error.message });
  }
}

function* updateDeliveryMethod(action) {
  try {
    const response = yield call(updateDeliveryMethodsUrl, action.payload);
    yield put({ type: UPDATE_DELIVERY_METHOD_SUCCESS });
    yield put({ type: GET_DELIVERY_METHODS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DELIVERY_METHOD_ERROR, payload: error.message });
  }
}

// =========================
// DELIVERY METHOD SETTINGS  SAGA HANDLERS
// =========================

function* fetchDeliveryMethodSettings(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getDeliveryMethodSettingsUrl, page);
    yield put(onGetDeliveryMethodSettingsSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DELIVERY_METHOD_SETTINGS_ERROR, payload: error.message });
  }
}

function* showDeliveryMethodSetting(action) {
  try {
    const response = yield call(showDeliveryMethodSettingsUrl, action.payload);
    yield put(onShowDeliveryMethodSettingSuccess(response.data));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DELIVERY_METHOD_SETTINGS_ERROR, payload: error.message });
  }
}

function* updateDeliveryMethodSetting(action) {
  try {
    const response = yield call(
      updateDeliveryMethodSettingsUrl,
      action.payload
    );
    console.log(response);
    yield put({ type: UPDATE_DELIVERY_METHOD_SETTINGS_SUCCESS });
    yield put({ type: GET_DELIVERY_METHODS_SETTINGS });
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: DELIVERY_METHOD_SETTINGS_ERROR, payload: error.message });
  }
}

// =========================
// DELIVERY CITY PRICE  SAGA HANDLERS
// =========================

function* fetchDeliveryCItyPrice(action) {
  const { page = 1, per_page = 50, id } = action.payload;

  try {
    const response = yield call(getCityPriceUrl, { page, per_page, id });
    yield put(onGetCityPriceSuccess(response.data));
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CITY_PRICE_ERROR, payload: error.message });
  }
}

function* createDeliveryCityPrice(action) {
  const { page = 1, per_page = 50, id } = action.payload;

  try {
    const response = yield call(createCityPriceUrl, action.payload);
    yield put(onAddCityPriceuccess(response.data));
    yield put(getCityPrice({ page, per_page, id }));
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CITY_PRICE_ERROR, payload: error.message });
  }
}

function* deleteDeliveryCityPrice(action) {
  try {
    const response = yield call(deleteCityPriceUrl, action.payload);
    yield put({ type: DELETE_CITY_PRICE });
    yield put({ type: GET_CITY_PRICE });
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: CITY_PRICE_ERROR, payload: error.message });
  }
}

// =========================
// SETTINGS SAGA HANDLERS
// =========================

function* fetchSettings(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getSettingUrl, page);
    yield put(onGetSettingsSuccess(response.data));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
  }
}

function* updateSettings(action) {
  try {
    const response = yield call(updateSettingUrl, action.payload);
    yield put({ type: GET_SETTINGS_REQUEST });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
  }
}

// =========================
// PROVINCES SAGA HANDLERS
// =========================
function* fetchPrivinces(action) {
  const page = action.payload || 1;
  try {
    const response = yield call(getProvincessUrl, page);
    yield put(getProvincesSuccess(response.data));
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PROVINCES_ERROR, payload: error.message });
  }
}

// =========================
// PROVINCES SAGA HANDLERS
// =========================
function* fetchProductImages(action) {
  try {
    const response = yield call(
      createProductImageUrl,
      action.payload.formData,
      action.payload.config
    );
    yield put({ type: GET_PRODCUT_IMAGE_SUCCESS });
    yield put(getProduct(action.payload.productId));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PROVINCES_ERROR, payload: error.message });
  }
}

function* updateProductImgage(action) {
  try {
    const response = yield call(updateProductImageUrl, action.payload);
    yield put({ type: UPDATE_PRODCUT_IMAGE_SUCCESS });
    yield put(getProduct(action.payload.productId));
    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PROVINCES_ERROR, payload: error.message });
  }
}

function* removeProductImages(action) {
  try {
    const response = yield call(deleteProductImageUrl, action.payload);
    yield put({ type: DELETE_PRODUCT_IMAGE_SUCCESS });
    yield put(getProduct(action.payload.product_id));

    // toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response?.data?.message);
    yield put({ type: PROVINCES_ERROR, payload: error.message });
  }
}

function* ecommerceSaga() {
  // =========================
  // Dashboard SAGAS
  // =========================
  yield takeEvery(GET_DASHBOARD, fetchDashboard);

  // =========================
  // CATEGORY SAGAS
  // =========================
  yield takeEvery(SHOW_CATEGORY, showCategory);
  yield takeLatest(GET_CATEGORIES, fetchCategories);
  yield takeEvery(GET_ALL_CATEGORIES, fetchAllCategories);
  yield takeEvery(ADD_CATEGORY, addCategory);
  yield takeEvery(UPDATE_CATEGORY, updateCategory);
  yield takeEvery(DELETE_CATEGORY, deleteCategory);
  yield takeEvery(CATEGORY_FILTERS, setCategoriesFilters);

  // =========================
  // MEASUREMENT SAGAS
  // =========================
  yield takeEvery(SHOW_MEASUREMENT, showMeasurement);
  yield takeEvery(GET_MEASUREMENTS, fetchMeasurements);
  yield takeEvery(ADD_MEASUREMENT, addMeasurement);
  yield takeEvery(UPDATE_MEASUREMENT, updateMeasurement);
  yield takeEvery(DELETE_MEASUREMENT, deleteMeasurement);

  // =========================
  // BRAND SAGAS
  // =========================
  yield takeEvery(GET_BRANDS, fetchBrands);
  yield takeEvery(SHOW_BRAND, showBrand);
  yield takeEvery(ADD_BRAND, addBrand);
  yield takeEvery(UPDATE_BRAND, updateBrand);
  yield takeEvery(DELETE_BRAND, deleteBrand);

  // =========================
  // LABEL SAGAS
  // =========================
  yield takeEvery(GET_LABELS, fetchLabels);
  yield takeEvery(SHOW_LABEL, showLabel);
  yield takeEvery(ADD_LABEL, addLabel);
  yield takeEvery(UPDATE_LABEL, updateLabel);
  yield takeEvery(DELETE_LABEL, deleteLabel);

  // =========================
  // PRODUCT SAGAS
  // =========================
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(SHOW_PRODUCT, showProduct);
  yield takeEvery(ADD_PRODUCT, addProduct);
  yield takeEvery(UPDATE_PRODUCT, updateProduct);
  yield takeEvery(DELETE_PRODUCT, deleteProduct);
  yield takeEvery(PRODUCT_FILTERS, setProductFilters);

  yield takeEvery(RESET_EDITING_PRODUCT, resetEditingProduct);

  // =========================
  // ATTRIBUTE SAGAS
  // =========================
  yield takeEvery(GET_ATTRIBUTES, fetchAttributes);
  yield takeEvery(SHOW_ATTRIBUTE, showAttribute);
  yield takeEvery(ADD_ATTRIBUTE, addAttribute);
  yield takeEvery(UPDATE_ATTRIBUTE, updateAttribute);
  yield takeEvery(DELETE_ATTRIBUTE, deleteAttribute);

  // =========================
  // ATTRIBUTE GROUPS SAGAS
  // =========================
  yield takeEvery(GET_ATTRIBUTE_GROUPS, fetchAttributeGroups);
  yield takeEvery(SHOW_ATTRIBUTE_GROUP, fetchAttributeGroup);
  yield takeEvery(ADD_ATTRIBUTE_GROUP, createAttributeGroup);
  yield takeEvery(UPDATE_ATTRIBUTE_GROUP, modifyAttributeGroup);
  yield takeEvery(DELETE_ATTRIBUTE_GROUP, removeAttributeGroup);

  // =========================
  // ATTRIBUTE VALUE SAGAS
  // =========================
  yield takeEvery(GET_ATTRIBUTE_VALUES, fetchAttributeValues);
  yield takeEvery(SHOW_ATTRIBUTE_VALUE, showAttributeValue);
  yield takeEvery(ADD_ATTRIBUTE_VALUE, addAttributeValue);
  yield takeEvery(UPDATE_ATTRIBUTE_VALUE, updateAttributeValue);
  yield takeEvery(DELETE_ATTRIBUTE_VALUE, deleteAttributeValue);

  // =========================
  // PRODUCT VARIANT SAGAS
  // =========================
  yield takeEvery(GET_PRODUCT_VARIANTS, fetchProductVariants);
  yield takeEvery(SHOW_PRODUCT_VARIANT, showProductVariant);
  yield takeEvery(ADD_PRODUCT_VARIANT, addProductVariant);
  yield takeEvery(UPDATE_PRODUCT_VARIANT, updateProductVariant);
  yield takeEvery(DELETE_PRODUCT_VARIANT, deleteProductVariant);

  // =========================
  // SETTING SAGAS
  // =========================
  yield takeEvery(GET_SETTINGS_REQUEST, fetchSettings);
  yield takeEvery(UPDATE_SETTINGS_REQUEST, updateSettings);

  // =========================
  // DISCOUNT SAGAS
  // =========================
  yield takeEvery(GET_DISCOUNTS, fetchDiscounts);
  yield takeEvery(SHOW_DISCOUNT, showDiscount);
  yield takeEvery(ADD_DISCOUNT, addDiscount);
  yield takeEvery(UPDATE_DISCOUNT, updateDiscount);
  yield takeEvery(DELETE_DISCOUNT, deleteDiscount);

  // =========================
  // DISCOUNT SAGAS
  // =========================
  yield takeEvery(GET_DISCOUNTS, fetchDiscounts);
  yield takeEvery(SHOW_DISCOUNT, showDiscount);
  yield takeEvery(ADD_DISCOUNT, addDiscount);
  yield takeEvery(UPDATE_DISCOUNT, updateDiscount);
  yield takeEvery(DELETE_DISCOUNT, deleteDiscount);

  // =========================
  // COUPON SAGAS
  // =========================
  yield takeEvery(GET_COUPONS, fetchCoupons);
  yield takeEvery(SHOW_COUPON, showCoupon);
  yield takeEvery(ADD_COUPON, addCoupon);
  yield takeEvery(UPDATE_COUPON, updateCoupon);
  yield takeEvery(DELETE_COUPON, deleteCoupon);

  // =========================
  // SLIDERS SAGAS
  // =========================
  yield takeEvery(GET_SLIDERS, fetchSliders);
  yield takeEvery(SHOW_SLIDER, showSlider);
  yield takeEvery(ADD_SLIDER, addSlider);
  yield takeEvery(UPDATE_SLIDER, updateSlider);
  yield takeEvery(DELETE_SLIDER, deleteSlider);

  // =========================
  // USERS SAGAS
  // =========================
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(SHOW_USER, showUser);
  yield takeEvery(ADD_USER, addUser);
  yield takeEvery(UPDATE_USER, updateUser);
  yield takeEvery(DELETE_USER, deleteUser);

  // =========================
  //  PRODUCT ATTRIUBTES SAGAS
  // =========================
  yield takeEvery(UPDATE_PRODUCT_ATTRIBUTE, updateProductAttribute);
  yield takeEvery(GET_PRODUCT_ATTRIBUTE, getProductAttribute);

  // =========================
  //  PAYMENT METHODS SAGAS
  // =========================
  yield takeEvery(GET_PAYMENT_METHODS, fetchPaymentMethods);
  yield takeEvery(UPDATE_PAYMENT_METHOD, updatePaymentMethod);
  yield takeEvery(SHOW_PAYMENT_METHOD, showPaymentMethod);

  // =========================
  //  DELIVERY METHODS SAGAS
  // =========================
  yield takeEvery(GET_DELIVERY_METHODS, fetchDeliveryMethods);
  yield takeEvery(UPDATE_DELIVERY_METHOD, updateDeliveryMethod);
  yield takeEvery(SHOW_DELIVERY_METHOD, showDeliveryMethod);

  // =========================
  //  DELIVERY METHODS SAGAS
  // =========================
  yield takeEvery(GET_DELIVERY_METHODS_SETTINGS, fetchDeliveryMethodSettings);
  yield takeEvery(UPDATE_DELIVERY_METHOD_SETTINGS, updateDeliveryMethodSetting);
  yield takeEvery(SHOW_DELIVERY_METHOD_SETTING, showDeliveryMethodSetting);

  // =========================
  //  DELIVERY METHODS SAGAS
  // =========================
  yield takeEvery(GET_CITY_PRICE, fetchDeliveryCItyPrice);
  yield takeEvery(ADD_CITY_PRICE, createDeliveryCityPrice);
  yield takeEvery(DELETE_CITY_PRICE, deleteDeliveryCityPrice);

  // =========================
  //  PROVINCES SAGAS
  // =========================
  yield takeEvery(GET_PROVINCES, fetchPrivinces);

  // =========================
  //  PRODUCT IMAGES SAGAS
  // =========================
  yield takeEvery(GET_PRODUCT_IMAGE, fetchProductImages);
  yield takeEvery(UPDATE_PRODUCT_IMAGE, updateProductImgage);
  yield takeEvery(DELETE_PRODUCT_IMAGE, removeProductImages);

  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail);
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(GET_CART_DATA, fetchCartData);
  yield takeEvery(GET_CUSTOMERS, fetchCustomers);
  yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer);
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer);
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer);
  yield takeEvery(GET_SHOPS, fetchShops);
  yield takeEvery(ADD_NEW_ORDER, onAddNewOrder);
  yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
  yield takeEvery(GET_PRODUCT_COMMENTS, getProductComents);
  yield takeEvery(ON_LIKE_COMMENT, onLikeComment);
  yield takeEvery(ON_LIKE_REPLY, onLikeReply);
  yield takeEvery(ON_ADD_REPLY, onAddReply);
  yield takeEvery(ON_ADD_COMMENT, onAddComment);
}

export default ecommerceSaga;
