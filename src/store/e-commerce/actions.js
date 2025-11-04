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
  ADD_CITY_PRICE_SUCCESS,
  ADD_COUPON,
  ADD_COUPON_SUCCESS,
  ADD_CUSTOMER_FAIL,
  ADD_CUSTOMER_SUCCESS,
  ADD_DISCOUNT,
  ADD_DISCOUNT_SUCCESS,
  ADD_LABEL,
  ADD_LABEL_SUCCESS,
  ADD_MEASUREMENT,
  ADD_MEASUREMENT_SUCCESS,
  ADD_NEW_CUSTOMER,
  ADD_NEW_ORDER,
  ADD_ORDER_FAIL,
  ADD_ORDER_SUCCESS,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_VARIANT,
  ADD_PRODUCT_VARIANT_SUCCESS,
  ADD_SLIDER,
  ADD_SLIDER_SUCCESS,
  ADD_TECHNICAL,
  ADD_TECHNICAL_SUCCESS,
  ADD_USER,
  ADD_USER_SUCCESS,
  CATEGORY_FILTERS,
  CATEGORY_FILTERS_SUCCESS,
  DELETE_ATTRIBUTE,
  DELETE_ATTRIBUTE_GROUP,
  DELETE_ATTRIBUTE_GROUP_SUCCESS,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_VALUE,
  DELETE_ATTRIBUTE_VALUE_SUCCESS,
  DELETE_BRAND,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CITY_PRICE,
  DELETE_CITY_PRICE_SUCCESS,
  DELETE_COUPON,
  DELETE_COUPON_SUCCESS,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_DISCOUNT,
  DELETE_DISCOUNT_SUCCESS,
  DELETE_LABEL,
  DELETE_LABEL_SUCCESS,
  DELETE_MEASUREMENT,
  DELETE_ORDER,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_IMAGE,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_VARIANT,
  DELETE_PRODUCT_VARIANT_SUCCESS,
  DELETE_SLIDER,
  DELETE_SLIDER_SUCCESS,
  DELETE_TECHNICAL,
  DELETE_TECHNICAL_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_SUCCESS,
  // ATTRIBUTES
  GET_ATTRIBUTES,
  GET_ATTRIBUTES_SUCCESS,
  // ATTRIBUTES GROUPS
  GET_ATTRIBUTE_GROUPS,
  GET_ATTRIBUTE_GROUPS_SUCCESS,
  // ATTRIBUTE VALUES
  GET_ATTRIBUTE_VALUES,
  GET_ATTRIBUTE_VALUES_SUCCESS,
  GET_BRANDS,
  GET_BRANDS_SUCCESS,
  GET_CART_DATA,
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CITY_PRICE,
  GET_CITY_PRICE_SUCCESS,
  // COUPONS
  GET_COUPONS,
  GET_COUPONS_SUCCESS,
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  GET_DASHBOARD,
  GET_DASHBOARD_SUCCESS,
  GET_DELIVERY_METHODS,
  GET_DELIVERY_METHODS_SETTINGS,
  GET_DELIVERY_METHODS_SETTINGS_SUCCESS,
  GET_DELIVERY_METHODS_SUCCESS,
  // DISCOUNTS
  GET_DISCOUNTS,
  GET_DISCOUNTS_SUCCESS,
  GET_LABELS,
  GET_LABELS_SUCCESS,
  GET_MEASUREMENTS,
  GET_MEASUREMENTS_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_PAYMENT_METHODS,
  GET_PAYMENT_METHODS_SUCCESS,
  GET_PRODCUT_IMAGE_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_ATTRIBUTE,
  GET_PRODUCT_ATTRIBUTE_SUCCESS,
  GET_PRODUCT_COMMENTS,
  GET_PRODUCT_COMMENTS_FAIL,
  GET_PRODUCT_COMMENTS_SUCCESS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_IMAGE,
  // PRODUCT VARIANTS
  GET_PRODUCT_VARIANTS,
  GET_PRODUCT_VARIANTS_SUCCESS,
  GET_PROVINCES,
  GET_PROVINCES_SUCCESS,
  // SETTINGS
  GET_SETTINGS_REQUEST,
  GET_SETTINGS_SUCCESS,
  GET_SHOPS,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  // COUPONS
  GET_SLIDERS,
  GET_SLIDERS_SUCCESS,
  // TECHNICALS
  GET_TECHNICALS,
  GET_TECHNICALS_SUCCESS,
  GET_USERS,
  GET_USERS_SUCCESS,
  ON_ADD_COMMENT,
  ON_ADD_COMMENT_FAIL,
  ON_ADD_COMMENT_SUCCESS,
  ON_ADD_REPLY,
  ON_ADD_REPLY_FAIL,
  ON_ADD_REPLY_SUCCESS,
  ON_LIKE_COMMENT,
  ON_LIKE_COMMENT_FAIL,
  ON_LIKE_COMMENT_SUCCESS,
  ON_LIKE_REPLY,
  ON_LIKE_REPLY_FAIL,
  ON_LIKE_REPLY_SUCCESS,
  PRODUCT_ATTRIBUTE_ERROR,
  PRODUCT_FILTERS,
  PRODUCT_FILTERS_SUCCESS,
  RESET_EDITING_PRODUCT,
  SHOW_ATTRIBUTE,
  SHOW_ATTRIBUTE_GROUP,
  SHOW_ATTRIBUTE_GROUP_SUCCESS,
  SHOW_ATTRIBUTE_SUCCESS,
  SHOW_ATTRIBUTE_VALUE,
  SHOW_ATTRIBUTE_VALUE_SUCCESS,
  SHOW_BRAND,
  SHOW_BRAND_SUCCESS,
  SHOW_CATEGORY,
  SHOW_CATEGORY_SUCCESS,
  SHOW_CITY_PRICE,
  SHOW_CITY_PRICE_SUCCESS,
  SHOW_COUPON,
  SHOW_COUPON_SUCCESS,
  SHOW_DELIVERY_METHOD,
  SHOW_DELIVERY_METHOD_SETTINGS,
  SHOW_DELIVERY_METHOD_SETTINGS_SUCCESS,
  SHOW_DELIVERY_METHOD_SUCCESS,
  SHOW_DISCOUNT,
  SHOW_DISCOUNT_SUCCESS,
  SHOW_LABEL,
  SHOW_LABEL_SUCCESS,
  SHOW_MEASUREMENT,
  SHOW_MEASUREMENT_SUCCESS,
  SHOW_PAYMENT_METHOD,
  SHOW_PAYMENT_METHOD_SUCCESS,
  SHOW_PRODUCT,
  SHOW_PRODUCT_SUCCESS,
  SHOW_PRODUCT_VARIANT,
  SHOW_PRODUCT_VARIANT_SUCCESS,
  SHOW_SLIDER,
  SHOW_SLIDER_SUCCESS,
  SHOW_TECHNICAL,
  SHOW_TECHNICAL_SUCCESS,
  SHOW_USER,
  SHOW_USER_SUCCESS,
  TECHNICAL_ERROR,
  UPDATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE_GROUP,
  UPDATE_ATTRIBUTE_GROUP_SUCCESS,
  UPDATE_ATTRIBUTE_SUCCESS,
  UPDATE_ATTRIBUTE_VALUE,
  UPDATE_ATTRIBUTE_VALUE_SUCCESS,
  UPDATE_BRAND,
  UPDATE_CATEGORY,
  UPDATE_CITY_PRICE,
  UPDATE_CITY_PRICE_SUCCESS,
  UPDATE_COMMENT_STATUS,
  UPDATE_COUPON,
  UPDATE_COUPON_SUCCESS,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_DELIVERY_METHOD,
  UPDATE_DELIVERY_METHOD_SETTINGS,
  UPDATE_DELIVERY_METHOD_SETTINGS_SUCCESS,
  UPDATE_DELIVERY_METHOD_SUCCESS,
  UPDATE_DISCOUNT,
  UPDATE_DISCOUNT_SUCCESS,
  UPDATE_LABEL,
  UPDATE_LABEL_SUCCESS,
  UPDATE_MEASUREMENT,
  UPDATE_ORDER,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD_SUCCESS,
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
  UPDATE_TECHNICAL,
  UPDATE_TECHNICAL_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
} from "./actionTypes";

export const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsFail = (error) => ({
  type: GET_PRODUCTS_FAIL,
  payload: error,
});

export const getProductDetail = (productId) => ({
  type: GET_PRODUCT_DETAIL,
  productId,
});

export const getProductDetailSuccess = (products) => ({
  type: GET_PRODUCT_DETAIL_SUCCESS,
  payload: products,
});

export const getProductDetailFail = (error) => ({
  type: GET_PRODUCT_DETAIL_FAIL,
  payload: error,
});

export const getOrders = () => ({
  type: GET_ORDERS,
});

export const getOrdersSuccess = (orders) => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
});

export const getOrdersFail = (error) => ({
  type: GET_ORDERS_FAIL,
  payload: error,
});

export const addNewOrder = (order) => ({
  type: ADD_NEW_ORDER,
  payload: order,
});

export const addOrderSuccess = (order) => ({
  type: ADD_ORDER_SUCCESS,
  payload: order,
});

export const addOrderFail = (error) => ({
  type: ADD_ORDER_FAIL,
  payload: error,
});

export const updateOrder = (order) => ({
  type: UPDATE_ORDER,
  payload: order,
});

export const updateOrderSuccess = (order) => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: order,
});

export const updateOrderFail = (error) => ({
  type: UPDATE_ORDER_FAIL,
  payload: error,
});

export const deleteOrder = (order) => ({
  type: DELETE_ORDER,
  payload: order,
});

export const deleteOrderSuccess = (order) => ({
  type: DELETE_ORDER_SUCCESS,
  payload: order,
});

export const deleteOrderFail = (error) => ({
  type: DELETE_ORDER_FAIL,
  payload: error,
});

export const getCartData = () => ({
  type: GET_CART_DATA,
});

export const getCartDataSuccess = (cartData) => ({
  type: GET_CART_DATA_SUCCESS,
  payload: cartData,
});

export const getCartDataFail = (error) => ({
  type: GET_CART_DATA_FAIL,
  payload: error,
});

export const getCustomers = () => ({
  type: GET_CUSTOMERS,
});

export const getCustomersSuccess = (customers) => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: customers,
});

export const getCustomersFail = (error) => ({
  type: GET_CUSTOMERS_FAIL,
  payload: error,
});

export const addNewCustomer = (customer) => ({
  type: ADD_NEW_CUSTOMER,
  payload: customer,
});

export const addCustomerSuccess = (customer) => ({
  type: ADD_CUSTOMER_SUCCESS,
  payload: customer,
});

export const addCustomerFail = (error) => ({
  type: ADD_CUSTOMER_FAIL,
  payload: error,
});

export const updateCustomer = (customer) => ({
  type: UPDATE_CUSTOMER,
  payload: customer,
});

export const updateCustomerSuccess = (customer) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
});

export const updateCustomerFail = (error) => ({
  type: UPDATE_CUSTOMER_FAIL,
  payload: error,
});

export const deleteCustomer = (customer) => ({
  type: DELETE_CUSTOMER,
  payload: customer,
});

export const deleteCustomerSuccess = (customer) => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customer,
});

export const deleteCustomerFail = (error) => ({
  type: DELETE_CUSTOMER_FAIL,
  payload: error,
});

export const getShops = () => ({
  type: GET_SHOPS,
});

export const getShopsSuccess = (shops) => ({
  type: GET_SHOPS_SUCCESS,
  payload: shops,
});

export const getShopsFail = (error) => ({
  type: GET_SHOPS_FAIL,
  payload: error,
});

export const getProductCommentsSuccess = (comments) => ({
  type: GET_PRODUCT_COMMENTS_SUCCESS,
  payload: comments,
});

export const getProductCommentsFail = (error) => ({
  type: GET_PRODUCT_COMMENTS_FAIL,
  payload: error,
});

export const onLikeComment = (commentId, productId) => ({
  type: ON_LIKE_COMMENT,
  payload: { commentId, productId },
});

export const onLikeCommentSuccess = (comments) => ({
  type: ON_LIKE_COMMENT_SUCCESS,
  payload: comments,
});

export const onLikeCommentFail = (error) => ({
  type: ON_LIKE_COMMENT_FAIL,
  payload: error,
});

export const onLikeReply = (commentId, productId, replyId) => ({
  type: ON_LIKE_REPLY,
  payload: { commentId, productId, replyId },
});

export const onLikeReplySuccess = (comments) => ({
  type: ON_LIKE_REPLY_SUCCESS,
  payload: comments,
});

export const onLikeReplyFail = (error) => ({
  type: ON_LIKE_REPLY_FAIL,
  payload: error,
});

export const onAddReply = (commentId, productId, replyText) => ({
  type: ON_ADD_REPLY,
  payload: { commentId, productId, replyText },
});

export const onAddReplySuccess = (comments) => ({
  type: ON_ADD_REPLY_SUCCESS,
  payload: comments,
});

export const onAddReplyFail = (error) => ({
  type: ON_ADD_REPLY_FAIL,
  payload: error,
});

export const onAddComment = (productId, commentText) => ({
  type: ON_ADD_COMMENT,
  payload: { productId, commentText },
});

export const onAddCommentSuccess = (comments) => ({
  type: ON_ADD_COMMENT_SUCCESS,
  payload: comments,
});

export const onAddCommentFail = (error) => ({
  type: ON_ADD_COMMENT_FAIL,
  payload: error,
});

// DASHBOARD

export const getDashboardData = () => ({
  type: GET_DASHBOARD,
});

export const onGetDashboardDataSuccess = (data) => ({
  type: GET_DASHBOARD_SUCCESS,
  payload:data
});

// CATEGORIES
export const getCategories = (data) => ({
  type: GET_CATEGORIES,
  payload: data,
});

export const onGetCategoriesSuccess = (data) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: data,
});

export const getCategory = (id) => ({
  type: SHOW_CATEGORY,
  payload: id,
});

export const onGetCategorySuccess = (id) => ({
  type: SHOW_CATEGORY_SUCCESS,
  payload: id,
});

export const getAllCategories = (id) => ({
  type: GET_ALL_CATEGORIES,
  payload: id,
});

export const onGetAllCategoriesSuccess = (id) => ({
  type: GET_ALL_CATEGORIES_SUCCESS,
  payload: id,
});

export const addCategories = (data) => ({
  type: ADD_CATEGORY,
  payload: data,
});

export const onAddCategoriesSuccess = (data) => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: data,
});

export const updateCategoryAction = (data) => ({
  type: UPDATE_CATEGORY,
  payload: data,
});

export const onUpdateCategoriesSuccess = (data) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: data,
});

export const updateCategory = (data) => ({
  type: UPDATE_CATEGORY,
  payload: data,
});

export const deleteCategory = (data) => ({
  type: DELETE_CATEGORY,
  payload: data,
});

export const onDeleteCategorySuccess = (data) => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: data,
});

export const categoryFiltersAction = () => ({
  type: CATEGORY_FILTERS,
});

export const setCategoryFiltersAction = (filters) => ({
  type: CATEGORY_FILTERS_SUCCESS,
  payload: filters,
});

//  Measurements
export const getMeasurements = (data) => ({
  type: GET_MEASUREMENTS,
  payload: data,
});

export const onGetMeasurementsSuccess = (data) => ({
  type: GET_MEASUREMENTS_SUCCESS,
  payload: data,
});

export const getMeasurement = (id) => ({
  type: SHOW_MEASUREMENT,
  payload: id,
});

export const onGetMeasurementSuccess = (data) => ({
  type: SHOW_MEASUREMENT_SUCCESS,
  payload: data,
});

export const addMeasurement = (data) => ({
  type: ADD_MEASUREMENT,
  payload: data,
});

export const onAddMeasurementSuccess = (data) => ({
  type: ADD_MEASUREMENT_SUCCESS,
  payload: data,
});

export const updateMeasurement = (data) => ({
  type: UPDATE_MEASUREMENT,
  payload: data,
});

export const deleteMeasurement = (data) => ({
  type: DELETE_MEASUREMENT,
  payload: data,
});

//  Brands
export const getBrands = (data) => ({
  type: GET_BRANDS,
  payload: data,
});

export const onGetBrandsSuccess = (data) => ({
  type: GET_BRANDS_SUCCESS,
  payload: data,
});

export const showBrand = (id) => ({
  type: SHOW_BRAND,
  payload: id,
});

export const onShowBrandSuccess = (data) => ({
  type: SHOW_BRAND_SUCCESS,
  payload: data,
});

export const addBrand = (data) => ({
  type: ADD_BRAND,
  payload: data,
});

export const onAddBrandSuccess = (data) => ({
  type: ADD_BRAND_SUCCESS,
  payload: data,
});

export const updateBrand = (data) => ({
  type: UPDATE_BRAND,
  payload: data,
});

export const deleteBrand = (data) => ({
  type: DELETE_BRAND,
  payload: data,
});

//  Lebels
export const getLabels = (data) => ({
  type: GET_LABELS,
  payload: data,
});

export const onGetLabelsSuccess = (data) => ({
  type: GET_LABELS_SUCCESS,
  payload: data,
});

export const showLabel = (id) => ({
  type: SHOW_LABEL,
  payload: id,
});

export const onShowLabelSuccess = (data) => ({
  type: SHOW_LABEL_SUCCESS,
  payload: data,
});

export const addLabel = (data) => ({
  type: ADD_LABEL,
  payload: data,
});

export const onAddLabelSuccess = (data) => ({
  type: ADD_LABEL_SUCCESS,
  payload: data,
});

export const updateLabel = (data) => ({
  type: UPDATE_LABEL,
  payload: data,
});

export const onUpdateLabelSuccess = (data) => ({
  type: UPDATE_LABEL_SUCCESS,
  payload: data,
});

export const deleteLabel = (data) => ({
  type: DELETE_LABEL,
  payload: data,
});

export const deleteLabelSuccess = (data) => ({
  type: DELETE_LABEL_SUCCESS,
  payload: data,
});

// Products
export const getProducts = (page = 1) => ({
  type: GET_PRODUCTS,
  payload: page,
});

export const onGetProductsSuccess = (data) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: data,
});

export const getProduct = (id) => ({
  type: SHOW_PRODUCT,
  payload: id,
});

export const onShowProductSuccess = (data) => ({
  type: SHOW_PRODUCT_SUCCESS,
  payload: data,
});

export const addSingleProduct = (data) => ({
  type: ADD_PRODUCT,
  payload: data,
});

export const onAddProductSuccess = (data) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: data,
});

export const resetEditingProduct = () => ({
  type: RESET_EDITING_PRODUCT,
});

export const updateProduct = (data) => ({
  type: UPDATE_PRODUCT,
  payload: data,
});

export const onUpdateProductSuccess = (data) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: data,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const deleteProductSuccess = (id) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: id,
});

export const productFiltersAction = () => ({
  type: PRODUCT_FILTERS,
});

export const setProductFiltersAction = (filters) => ({
  type: PRODUCT_FILTERS_SUCCESS,
  payload: filters,
});

//technicals

export const getTechnicals = (page = 1) => ({
  type: GET_TECHNICALS,
  payload: page,
});

export const onGetTechnicalsSuccess = (data) => ({
  type: GET_TECHNICALS_SUCCESS,
  payload: data,
});

export const showTechnical = (id) => ({
  type: SHOW_TECHNICAL,
  payload: id,
});

export const onShowTechnicalSuccess = (data) => ({
  type: SHOW_TECHNICAL_SUCCESS,
  payload: data,
});

export const addTechnical = (data) => ({
  type: ADD_TECHNICAL,
  payload: data,
});

export const onAddTechnicalSuccess = (data) => ({
  type: ADD_TECHNICAL_SUCCESS,
  payload: data,
});

export const updateTechnical = (data) => ({
  type: UPDATE_TECHNICAL,
  payload: data,
});

export const onUpdateTechnicalSuccess = (data) => ({
  type: UPDATE_TECHNICAL_SUCCESS,
  payload: data,
});

export const deleteTechnical = (id) => ({
  type: DELETE_TECHNICAL,
  payload: id,
});

export const onDeleteTechnicalSuccess = (id) => ({
  type: DELETE_TECHNICAL_SUCCESS,
  payload: id,
});

export const technicalError = (error) => ({
  type: TECHNICAL_ERROR,
  payload: error,
});

// attibutes groups

export const getAttributes = (page = 1) => ({
  type: GET_ATTRIBUTES,
  payload: page,
});

export const onGetAttributesSuccess = (data) => ({
  type: GET_ATTRIBUTES_SUCCESS,
  payload: data,
});

export const showAttribute = (id) => ({
  type: SHOW_ATTRIBUTE,
  payload: id,
});

export const onShowAttributeSuccess = (data) => ({
  type: SHOW_ATTRIBUTE_SUCCESS,
  payload: data,
});

export const addAttribute = (data) => ({
  type: ADD_ATTRIBUTE,
  payload: data,
});

export const onAddAttributeSuccess = (data) => ({
  type: ADD_ATTRIBUTE_SUCCESS,
  payload: data,
});

export const updateAttribute = (data) => ({
  type: UPDATE_ATTRIBUTE,
  payload: data,
});

export const onUpdateAttributeSuccess = (data) => ({
  type: UPDATE_ATTRIBUTE_SUCCESS,
  payload: data,
});

export const deleteAttribute = (id) => ({
  type: DELETE_ATTRIBUTE,
  payload: id,
});

export const onDeleteAttributeSuccess = (id) => ({
  type: DELETE_ATTRIBUTE_SUCCESS,
  payload: id,
});

export const getAttributeGroups = (page = 1) => ({
  type: GET_ATTRIBUTE_GROUPS,
  payload: page,
});

export const onGetAttributeGroupsSuccess = (data) => ({
  type: GET_ATTRIBUTE_GROUPS_SUCCESS,
  payload: data,
});

export const showAttributeGroup = (id) => ({
  type: SHOW_ATTRIBUTE_GROUP,
  payload: id,
});

export const onShowAttributeGroupSuccess = (data) => ({
  type: SHOW_ATTRIBUTE_GROUP_SUCCESS,
  payload: data,
});

export const addAttributeGroup = (data) => ({
  type: ADD_ATTRIBUTE_GROUP,
  payload: data,
});

export const onAddAttributeGroupSuccess = (data) => ({
  type: ADD_ATTRIBUTE_GROUP_SUCCESS,
  payload: data,
});

export const updateAttributeGroup = (data) => ({
  type: UPDATE_ATTRIBUTE_GROUP,
  payload: data,
});

export const onUpdateAttributeGroupSuccess = (data) => ({
  type: UPDATE_ATTRIBUTE_GROUP_SUCCESS,
  payload: data,
});

export const deleteAttributeGroup = (id) => ({
  type: DELETE_ATTRIBUTE_GROUP,
  payload: id,
});

export const onDeleteAttributeGroupSuccess = (id) => ({
  type: DELETE_ATTRIBUTE_GROUP_SUCCESS,
  payload: id,
});

// ATTRIBUTE VALUES

export const getAttributeValues = (page = 1) => ({
  type: GET_ATTRIBUTE_VALUES,
  payload: page,
});

export const onGetAttributeValuesSuccess = (data) => ({
  type: GET_ATTRIBUTE_VALUES_SUCCESS,
  payload: data,
});

export const showAttributeValue = (id) => ({
  type: SHOW_ATTRIBUTE_VALUE,
  payload: id,
});

export const onShowAttributeValueSuccess = (data) => ({
  type: SHOW_ATTRIBUTE_VALUE_SUCCESS,
  payload: data,
});

export const addAttributeValue = (data) => ({
  type: ADD_ATTRIBUTE_VALUE,
  payload: data,
});

export const onAddAttributeValueSuccess = (data) => ({
  type: ADD_ATTRIBUTE_VALUE_SUCCESS,
  payload: data,
});

export const updateAttributeValue = (data) => ({
  type: UPDATE_ATTRIBUTE_VALUE,
  payload: data,
});

export const onUpdateAttributeValueSuccess = (data) => ({
  type: UPDATE_ATTRIBUTE_VALUE_SUCCESS,
  payload: data,
});

export const deleteAttributeValue = (id) => ({
  type: DELETE_ATTRIBUTE_VALUE,
  payload: id,
});

export const onDeleteAttributeValueSuccess = (id) => ({
  type: DELETE_ATTRIBUTE_VALUE_SUCCESS,
  payload: id,
});

// PRODUCT VARIANTS

export const getProductVariants = ({ page = 1, id }) => ({
  type: GET_PRODUCT_VARIANTS,
  payload: { page, id },
});

export const onGetProductVariantsSuccess = (data) => ({
  type: GET_PRODUCT_VARIANTS_SUCCESS,
  payload: data,
});

export const showProductVariant = (id) => ({
  type: SHOW_PRODUCT_VARIANT,
  payload: id,
});

export const onShowProductVariantSuccess = (data) => ({
  type: SHOW_PRODUCT_VARIANT_SUCCESS,
  payload: data,
});

export const addProductVariant = (data) => ({
  type: ADD_PRODUCT_VARIANT,
  payload: data,
});

export const onAddProductVariantSuccess = (data) => ({
  type: ADD_PRODUCT_VARIANT_SUCCESS,
  payload: data,
});

export const updateProductVariant = (data) => ({
  type: UPDATE_PRODUCT_VARIANT,
  payload: data,
});

export const onUpdateProductVariantSuccess = (data) => ({
  type: UPDATE_PRODUCT_VARIANT_SUCCESS,
  payload: data,
});

export const deleteProductVariant = (id) => ({
  type: DELETE_PRODUCT_VARIANT,
  payload: id,
});

export const onDeleteProductVariantSuccess = (id) => ({
  type: DELETE_PRODUCT_VARIANT_SUCCESS,
  payload: id,
});

export const onDeleteSettingSuccess = (id) => ({
  type: DELETE_SETTING_SUCCESS,
  payload: id,
});

// DISCOUNTS

export const getDiscounts = (page = 1) => ({
  type: GET_DISCOUNTS,
  payload: page,
});

export const onGetDiscountsSuccess = (data) => ({
  type: GET_DISCOUNTS_SUCCESS,
  payload: data,
});

export const showDiscount = (id) => ({
  type: SHOW_DISCOUNT,
  payload: id,
});

export const onShowDiscountSuccess = (data) => ({
  type: SHOW_DISCOUNT_SUCCESS,
  payload: data,
});

export const addDiscount = (data) => ({
  type: ADD_DISCOUNT,
  payload: data,
});

export const onAddDiscountSuccess = (data) => ({
  type: ADD_DISCOUNT_SUCCESS,
  payload: data,
});

export const updateDiscount = (data) => ({
  type: UPDATE_DISCOUNT,
  payload: data,
});

export const onUpdateDiscountSuccess = (data) => ({
  type: UPDATE_DISCOUNT_SUCCESS,
  payload: data,
});

export const deleteDiscount = (id) => ({
  type: DELETE_DISCOUNT,
  payload: id,
});

export const onDeleteDiscountSuccess = (id) => ({
  type: DELETE_DISCOUNT_SUCCESS,
  payload: id,
});

// COUPONS

export const getCoupons = (page = 1) => ({
  type: GET_COUPONS,
  payload: page,
});

export const onGetCouponsSuccess = (data) => ({
  type: GET_COUPONS_SUCCESS,
  payload: data,
});

export const showCoupon = (id) => ({
  type: SHOW_COUPON,
  payload: id,
});

export const onShowCouponSuccess = (data) => ({
  type: SHOW_COUPON_SUCCESS,
  payload: data,
});

export const addCoupon = (data) => ({
  type: ADD_COUPON,
  payload: data,
});

export const onAddCouponSuccess = (data) => ({
  type: ADD_COUPON_SUCCESS,
  payload: data,
});

export const updateCoupon = (data) => ({
  type: UPDATE_COUPON,
  payload: data,
});

export const onUpdateCouponSuccess = (data) => ({
  type: UPDATE_COUPON_SUCCESS,
  payload: data,
});

export const deleteCoupon = (id) => ({
  type: DELETE_COUPON,
  payload: id,
});

export const onDeleteCouponSuccess = (id) => ({
  type: DELETE_COUPON_SUCCESS,
  payload: id,
});

// SLIDERS

export const getSliders = (page = 1) => ({
  type: GET_SLIDERS,
  payload: page,
});

export const onGetSlidersSuccess = (data) => ({
  type: GET_SLIDERS_SUCCESS,
  payload: data,
});

export const showSlider = (id) => ({
  type: SHOW_SLIDER,
  payload: id,
});

export const onShowSliderSuccess = (data) => ({
  type: SHOW_SLIDER_SUCCESS,
  payload: data,
});

export const addSlider = (data) => ({
  type: ADD_SLIDER,
  payload: data,
});

export const onAddSliderSuccess = (data) => ({
  type: ADD_SLIDER_SUCCESS,
  payload: data,
});

export const updateSlider = (data) => ({
  type: UPDATE_SLIDER,
  payload: data,
});

export const onUpdateSliderSuccess = (data) => ({
  type: UPDATE_SLIDER_SUCCESS,
  payload: data,
});

export const deleteSlider = (id) => ({
  type: DELETE_SLIDER,
  payload: id,
});

export const onDeleteSliderSuccess = (id) => ({
  type: DELETE_SLIDER_SUCCESS,
  payload: id,
});

//users

export const getUsers = (page = 1) => ({
  type: GET_USERS,
  payload: page,
});

export const onGetUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  payload: data,
});

export const showUser = (id) => ({
  type: SHOW_USER,
  payload: id,
});

export const onShowUserSuccess = (data) => ({
  type: SHOW_USER_SUCCESS,
  payload: data,
});

export const addUser = (data) => ({
  type: ADD_USER,
  payload: data,
});

export const onAddUserSuccess = (data) => ({
  type: ADD_USER_SUCCESS,
  payload: data,
});

export const updateUser = (data) => ({
  type: UPDATE_USER,
  payload: data,
});

export const onUpdateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: data,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const onDeleteUserSuccess = (id) => ({
  type: DELETE_USER_SUCCESS,
  payload: id,
});

// Action Creators
export const updateProductAttribute = (id, data) => ({
  type: UPDATE_PRODUCT_ATTRIBUTE,
  payload: { id, data },
});

export const updateProductAttributeSuccess = (data) => ({
  type: UPDATE_PRODUCT_ATTRIBUTE_SUCCESS,
  payload: data,
});

export const getProductAttribute = (id) => ({
  type: GET_PRODUCT_ATTRIBUTE,
  payload: id,
});

export const getProductAttributeSuccess = (id) => ({
  type: GET_PRODUCT_ATTRIBUTE_SUCCESS,
  payload: id,
});

export const productAttributeError = (error) => ({
  type: PRODUCT_ATTRIBUTE_ERROR,
  payload: error,
});

//payment methods

export const getPaymentMethods = (page = 1) => ({
  type: GET_PAYMENT_METHODS,
  payload: page,
});

export const onGetPaymentMethodsSuccess = (data) => ({
  type: GET_PAYMENT_METHODS_SUCCESS,
  payload: data,
});

export const showPaymentMethod = (id) => ({
  type: SHOW_PAYMENT_METHOD,
  payload: id,
});

export const onShowPaymentMethodSuccess = (data) => ({
  type: SHOW_PAYMENT_METHOD_SUCCESS,
  payload: data,
});

export const updatePaymentMethod = (data) => ({
  type: UPDATE_PAYMENT_METHOD,
  payload: data,
});

export const onUpdatePaymentMethodSuccess = (data) => ({
  type: UPDATE_PAYMENT_METHOD_SUCCESS,
  payload: data,
});

// delivery methods

export const getDeliveryMethods = (page = 1) => ({
  type: GET_DELIVERY_METHODS,
  payload: page,
});

export const onGetDeliveryMethodsSuccess = (data) => ({
  type: GET_DELIVERY_METHODS_SUCCESS,
  payload: data,
});

export const showDeliveryMethod = (id) => ({
  type: SHOW_DELIVERY_METHOD,
  payload: id,
});

export const onShowDeliveryMethodSuccess = (data) => ({
  type: SHOW_DELIVERY_METHOD_SUCCESS,
  payload: data,
});

export const updateDeliveryMethod = (data) => ({
  type: UPDATE_DELIVERY_METHOD,
  payload: data,
});

export const onUpdateDeliveryMethodSuccess = (data) => ({
  type: UPDATE_DELIVERY_METHOD_SUCCESS,
  payload: data,
});

// delivery method settings

export const getDeliveryMethodSettings = (page = 1) => ({
  type: GET_DELIVERY_METHODS_SETTINGS,
  payload: page,
});

export const onGetDeliveryMethodSettingsSuccess = (data) => ({
  type: GET_DELIVERY_METHODS_SETTINGS_SUCCESS,
  payload: data,
});

export const showDeliveryMethodSetting = (id) => ({
  type: SHOW_DELIVERY_METHOD_SETTINGS,
  payload: id,
});

export const onShowDeliveryMethodSettingSuccess = (data) => ({
  type: SHOW_DELIVERY_METHOD_SETTINGS_SUCCESS,
  payload: data,
});

export const updateDeliveryMethodSetting = (data) => ({
  type: UPDATE_DELIVERY_METHOD_SETTINGS,
  payload: data,
});

export const onUpdateDeliveryMethodSettingSuccess = (data) => ({
  type: UPDATE_DELIVERY_METHOD_SETTINGS_SUCCESS,
  payload: data,
});

// city price

export const getCityPrice = ({ page = 1, per_page = 50, id }) => ({
  type: GET_CITY_PRICE,
  payload: { page, per_page, id },
});

export const onGetCityPriceSuccess = (data) => ({
  type: GET_CITY_PRICE_SUCCESS,
  payload: data,
});

export const showCityPrice = (id) => ({
  type: SHOW_CITY_PRICE,
  payload: id,
});

export const onShowCityPriceuccess = (data) => ({
  type: SHOW_CITY_PRICE_SUCCESS,
  payload: data,
});

export const addCityPrice = (id) => ({
  type: ADD_CITY_PRICE,
  payload: id,
});

export const onAddCityPriceuccess = (data) => ({
  type: ADD_CITY_PRICE_SUCCESS,
  payload: data,
});

export const updateCityPrice = (data) => ({
  type: UPDATE_CITY_PRICE,
  payload: data,
});

export const onUpdateCityPriceuccess = (data) => ({
  type: UPDATE_CITY_PRICE_SUCCESS,
  payload: data,
});

export const deleteCityPrice = (data) => ({
  type: DELETE_CITY_PRICE,
  payload: data,
});

export const onDeleteCityPriceuccess = (data) => ({
  type: DELETE_CITY_PRICE_SUCCESS,
  payload: data,
});

//settings

export const getSettings = () => ({
  type: GET_SETTINGS_REQUEST,
});

export const updateSettings = (settings) => ({
  type: UPDATE_SETTINGS_REQUEST,
  payload: settings,
});

export const onGetSettingsSuccess = (data) => ({
  type: GET_SETTINGS_SUCCESS,
  payload: data,
});

//comments

export const getProductComments = (page = 1, status = "all") => ({
  type: GET_PRODUCT_COMMENTS,
  payload: { page, status },
});

export const updateCommentStatus = (commentId, status) => ({
  type: UPDATE_COMMENT_STATUS,
  payload: { commentId, status },
});

//provinces
export const getProvinces = (page = 1) => ({
  type: GET_PROVINCES,
  payload: page,
});

export const getProvincesSuccess = (data) => ({
  type: GET_PROVINCES_SUCCESS,
  payload: data,
});

//product images
export const createProductImages = (data) => ({
  type: GET_PRODUCT_IMAGE,
  payload: {
    formData: data.formData,
    config: data.config,
    productId: data.productId,
  },
});

export const createProductImagesSuccess = (page = 1) => ({
  type: GET_PRODCUT_IMAGE_SUCCESS,
  payload: page,
});

export const updateProductImage = (data) => ({
  type: UPDATE_PRODUCT_IMAGE,
  payload: data,
});

export const deleteProductImage = (data) => ({
  type: DELETE_PRODUCT_IMAGE,
  payload: data,
});
