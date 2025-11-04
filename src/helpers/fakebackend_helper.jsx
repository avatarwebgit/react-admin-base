import axios from "axios";
import { del, get, post, put, patch, bulkDelete } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
const postFakeRegister = (data) => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then((response) => {
      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((err) => {
      let message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "متاسفانه! صفحه مورد نظر شما یافت نشد";
            break;
          case 500:
            message =
              "متاسفانه! مشکلی پیش آمد، لطفاً با تیم پشتیبانی ما تماس بگیرید";
            break;
          case 401:
            message = "گواهی نامه نامعتبر";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
const postFakeLogin = (data) => post(url.POST_FAKE_LOGIN, data);

// postForgetPwd
const postFakeForgetPwd = (data) => post(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
const postJwtProfile = (data) => post(url.POST_EDIT_JWT_PROFILE, data);

const postFakeProfile = (data) => post(url.POST_EDIT_PROFILE, data);

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((err) => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "متاسفانه! صفحه مورد نظر شما یافت نشد";
            break;
          case 500:
            message =
              "متاسفانه! مشکلی پیش آمد، لطفاً با تیم پشتیبانی ما تماس بگیرید";
            break;
          case 401:
            message = "گواهی نامه نامعتبر";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
const postJwtLogin = (data) => post(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
const postJwtForgetPwd = (data) =>
  post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data) => post(url.SOCIAL_LOGIN, data);

// get Products
// export const getProducts = () => get(url.GET_PRODUCTS);

//dashboard

export const getDashboarDataUrl = (data) => get(url.DASHBOARD, data);

// categories CRUD

export const getCategoriesUrl = (data) => {
  return get(`${url.GET_CATEGORIES}`, data);
};

export const showCategorysUrl = (id) => get(`${url.SHOW_CATEGORIES}/${id}`);

export const addCategoryUrl = (data) => post(url.ADD_CATEGORIES, data);

export const updateCategoryUrl = (data) =>
  post(`${url.UPDATE_CATEGORIES}/${data.id}?_method=patch`, data.formData);

export const deleteCategoryUrl = (data) =>
  bulkDelete(`${url.DELETE_CATEGORIES}`, data);

// Measurements CRUD

export const getMeasurementsUrl = (data) => {
  return get(`${url.GET_MEASUREMENT}`, data);
};

export const showMeasurementUrl = (id) => get(`${url.SHOW_MEASUREMENT}/${id}`);

export const addMeasurementUrl = (data) => post(url.ADD_MEASUREMENT, data);

export const updateMeasurementUrl = (data) =>
  patch(`${url.UPDATE_MEASUREMENT}/${data.id}`, data);

export const deleteMeasurementsUrl = (id) =>
  del(`${url.DELETE_MEASUREMENT}/${id}`);

// Brands CRUD

export const getBrandsUrl = (data) => {
  return get(`${url.GET_BRANDS}`, data);
};

export const showBrandUrl = (id) => get(`${url.SHOW_BRAND}/${id}`);

export const addBrandUrl = (data) => post(url.ADD_BRAND, data);

export const updateBrandUrl = (data) =>
  post(`${url.UPDATE_BRAND}/${data.id}_method=patch`, data.formData);

export const deleteBrandsUrl = (id) => del(`${url.DELETE_BRAND}/${id}`);

// Labels CRUD

export const getLabelUrl = (data) => {
  return get(`${url.GET_LABELS}`, data);
};

export const showLabelUrl = (id) => get(`${url.SHOW_LABEL}/${id}`);

export const addLabelUrl = (data) => post(url.ADD_LABEL, data);

export const updateLabelUrl = (data) =>
  patch(`${url.UPDATE_LABEL}/${data.id}`, data);

export const deleteLabelUrl = (id) => del(`${url.DELETE_LABEL}/${id}`);

//  Products CRUD

export const getProductUrl = (data) => {
  return get(`${url.GET_PRODUCTS}`, data);
};

export const showProductUrl = (id) => get(`${url.SHOW_PRODUCT}/${id}`);

export const addProductUrl = (data) => post(url.ADD_PRODUCT, data);

export const updateProductUrl = (data) =>
  patch(`${url.UPDATE_PRODUCT}/${data.id}`, data);

export const deleteProductUrl = (id) => del(`${url.DELETE_PRODUCT}/${id}`);

//  Attributes CRUD

export const getAttributeUrl = (page = 1) =>
  get(`${url.GET_ATTRIBUTE}?page=${page}`, { page });

export const showAttributeUrl = (id) => get(`${url.SHOW_ATTRIBUTE}/${id}`);

export const addAttributeUrl = (data) => post(url.ADD_ATTRIBUTE, data);

export const updateAttributeUrl = (data) =>
  patch(`${url.UPDATE_ATTRIBUTE}/${data.id}`, data);

export const deleteAttributeUrl = (id) => del(`${url.DELETE_ATTRIBUTE}/${id}`);

//  Attribute groups CRUD

export const getAttributeGroupUrl = (page = 1) =>
  get(`${url.GET_ATTRIBUTE_GROUP}?page=${page}`, { page });

export const showAttributeGroupUrl = (id) =>
  get(`${url.SHOW_ATTRIBUTE_GROUP}/${id}`);

export const addAttributeGroupUrl = (data) =>
  post(url.ADD_ATTRIBUTE_GROUP, data);

export const updateAttributeGroupUrl = (data) =>
  patch(`${url.UPDATE_ATTRIBUTE_GROUP}/${data.id}`, data);

export const deleteAttributeGroupUrl = (id) =>
  del(`${url.DELETE_ATTRIBUTE_GROUP}/${id}`);

// ATTRIBUTE VALUES CRUD
export const getAttributeValueUrl = (page = 1) =>
  get(`${url.GET_ATTRIBUTE_VALUE}?page=${page}`, { page });

export const showAttributeValueUrl = (id) =>
  get(`${url.SHOW_ATTRIBUTE_VALUE}/${id}`);

export const addAttributeValueUrl = (data) =>
  post(url.ADD_ATTRIBUTE_VALUE, data);

export const updateAttributeValueUrl = (data) =>
  patch(`${url.UPDATE_ATTRIBUTE_VALUE}/${data.id}`, data);

export const deleteAttributeValueUrl = (id) =>
  del(`${url.DELETE_ATTRIBUTE_VALUE}/${id}`);

// PRODUCT VARIANTS CRUD
export const getProductVariantUrl = (action) =>
  get(
    `${url.GET_PRODUCTS}/${action.payload.id}/variants?page=${action.payload.page}&per_page=1000`
  );

export const showProductVariantUrl = (id) =>
  get(`${url.SHOW_PRODUCT_VARIANT}/${id}`);

export const addProductVariantUrl = (data) =>
  post(url.ADD_PRODUCT_VARIANT, data);

export const updateProductVariantUrl = (data) =>
  patch(`${url.UPDATE_PRODUCT_VARIANT}/${data.id}`, data);

export const deleteProductVariantUrl = (id) =>
  del(`${url.DELETE_PRODUCT_VARIANT}/${id}`);

// SETTINGS CRUD
export const getSettingUrl = (page = 1) =>
  get(`${url.GET_SETTING}?page=${page}`, { page });

export const showSettingUrl = (id) => get(`${url.SHOW_SETTING}/${id}`);

export const addSettingUrl = (data) => post(url.ADD_SETTING, data);

export const updateSettingUrl = (data) => patch(`${url.UPDATE_SETTING}`, data);

export const deleteSettingUrl = (id) => del(`${url.DELETE_SETTING}/${id}`);

// DISCOUNTS CRUD
export const getDiscountUrl = (page = 1) =>
  get(`${url.GET_DISCOUNT}?page=${page}`, { page });

export const showDiscountUrl = (id) => get(`${url.SHOW_DISCOUNT}/${id}`);

export const addDiscountUrl = (data) => post(url.ADD_DISCOUNT, data);

export const updateDiscountUrl = (data) =>
  patch(`${url.UPDATE_DISCOUNT}/${data.id}`, data);

export const deleteDiscountUrl = (id) => del(`${url.DELETE_DISCOUNT}/${id}`);

// COUPONS CRUD
export const getCouponUrl = (page = 1) =>
  get(`${url.GET_COUPON}?page=${page}`, { page });

export const showCouponUrl = (id) => get(`${url.SHOW_COUPON}/${id}`);

export const addCouponUrl = (data) => post(url.ADD_COUPON, data);

export const updateCouponUrl = (data) =>
  patch(`${url.UPDATE_COUPON}/${data.id}`, data);

export const deleteCouponUrl = (id) => del(`${url.DELETE_COUPON}/${id}`);

// SLIDERS CRUD
export const getSliderUrl = (page = 1) =>
  get(`${url.GET_SLIDER}?page=${page}`, { page });

export const showSliderUrl = (id) => get(`${url.SHOW_SLIDER}/${id}`);

export const addSliderUrl = (data, config) =>
  post(url.ADD_SLIDER, data, config);

export const updateSliderUrl = (id, data, config) =>
  post(`${url.UPDATE_SLIDER}/${id}?_method=patch`, data, config);

export const deleteSliderUrl = (id) => del(`${url.DELETE_SLIDER}/${id}`);

// USERS CRUD
export const getUserUrl = (page = 1) =>
  get(`${url.GET_USER}?page=${page}`, { page });

export const showUserUrl = (id) => get(`${url.SHOW_USER}/${id}`);

export const addUserUrl = (data) => post(url.ADD_USER, data);

export const updateUserUrl = (data) =>
  patch(`${url.UPDATE_USER}/${data.id}`, data);

export const deleteUserUrl = (id) => del(`${url.DELETE_USER}/${id}`);

// prodcut attribute CRUD
export const updateProductAttributeUrl = (id, data) =>
  post(url.UPDATE_PRODUCT_ATTRIBUTE, data);

export const getProductAttributeUrl = (id) =>
  get(`${url.CREATE_PRODUCT_ATTRIBUTE}/${id}`);

// PAYMENT METHODS CRUD
export const getPaymentMethodsUrl = (page = 1) =>
  get(`${url.GET_PAYMENT_METHOD}?page=${page}`, { page });

export const showPaymentMethodsUrl = (id) =>
  get(`${url.SHOW_PAYMENT_METHOD}/${id}`);

export const updatePaymentMethodsUrl = (data) =>
  patch(`${url.UPDATE_PAYMENT_METHOD}/${data.id}`, data);

// DELIVERY METHODS CRUD
export const getDeliveryMethodsUrl = (page = 1) =>
  get(`${url.GET_DELIVERY_METHOD}?page=${page}`, { page });

export const showDeliveryMethodsUrl = (id) =>
  get(`${url.SHOW_DELIVERY_METHOD}/${id}`);

export const updateDeliveryMethodsUrl = (data) =>
  patch(`${url.UPDATE_DELIVERY_METHOD}/${data.id}`, data);

// DELIVERY METHOD SETTINGS CRUD
export const getDeliveryMethodSettingsUrl = (page = 1) =>
  get(`${url.GET_DELIVERY_METHOD_SETTINGS}?page=${page}`, { page });

export const showDeliveryMethodSettingsUrl = (id) =>
  get(`${url.SHOW_DELIVERY_METHOD_SETTING}/${id}`);

export const updateDeliveryMethodSettingsUrl = (data) =>
  put(`${url.UPDATE_DELIVERY_METHOD_SETTING}`, data);

// MAIL CRUD
export const getMailSettingsUrl = (page = 1) =>
  get(url.get_MAIL_SETTINGS, { page });

export const updateMailSettingsUrl = (data) =>
  patch(url.UPDATE_MAIL_SETTINGS, data);

// proviences CRUD
export const getProvincessUrl = (page = 1) => get(url.PROVIECES, { page });

// product images CRUD
export const getCityPriceUrl = (data, config) => {
  const page = data.page || 1;
  const per_page = data.per_page || 100;
  return get(
    `${url.INDEX_DELIVERY_PRICES}/${data.id}?page=${page}&per_page=${per_page}`,
    data,
    config
  );
};

export const createCityPriceUrl = (data) =>
  post(url.CREATE_DELIVERY_PRICES, data);

export const deleteCityPriceUrl = (data) =>
  bulkDelete(url.DELETE_PRODUCT_IMSGES, data);

// product images CRUD
export const createProductImageUrl = (data, config) =>
  post(url.GET_PRODUCT_IMSGES, data, config);

export const updateProductImageUrl = (data) =>
  patch(`${url.UPDATE_PRODUCT_IMAGES}/${data.id}`, data);

export const deleteProductImageUrl = (data) =>
  bulkDelete(url.DELETE_PRODUCT_IMSGES, data);

// get Product detail
export const getProductDetail = (id) =>
  get(`${url.DELETE_CATEGORIES}/${id}`, { params: { id } });

// get Events
export const getEvents = () => get(url.GET_EVENTS);

// add Events
export const addNewEvent = (event) => post(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = (event) => put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = (event) =>
  del(url.DELETE_EVENT, { headers: { event } });

// get Categories
// export const getCategories = () => get(url.GET_CATEGORIES);

//Email Chart
export const getDashboardEmailChart = (chartType) =>
  get(`${url.GET_DASHBOARD_EMAILCHART}/${chartType}`, { param: chartType });

// get chats
export const getChats = () => get(url.GET_CHATS);

// get groups
export const getGroups = () => get(url.GET_GROUPS);

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS);

// get messages
export const getMessages = (roomId) =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// post messages
export const getselectedmails = (selectedmails) =>
  post(url.GET_SELECTED_MAILS, selectedmails);

//post setfolderonmails
export const setfolderonmails = (selectedmails, folderId, activeTab) =>
  post(url.SET_FOLDER_SELECTED_MAILS, { selectedmails, folderId, activeTab });

// get orders
export const getOrders = () => get(url.GET_ORDERS);

// add order
export const addNewOrder = (order) => post(url.ADD_NEW_ORDER, order);

// update order
export const updateOrder = (order) => put(url.UPDATE_ORDER, order);

// delete order
export const deleteOrder = (order) =>
  del(url.DELETE_ORDER, { headers: { order } });

// get cart data
export const getCartData = () => get(url.GET_CART_DATA);

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS);

// add CUSTOMER
export const addNewCustomer = (customer) =>
  post(url.ADD_NEW_CUSTOMER, customer);

// update CUSTOMER
export const updateCustomer = (customer) => put(url.UPDATE_CUSTOMER, customer);

// delete CUSTOMER
export const deleteCustomer = (customer) =>
  del(url.DELETE_CUSTOMER, { headers: { customer } });

// get shops
export const getShops = () => get(url.GET_SHOPS);

// get wallet
export const getWallet = () => get(url.GET_WALLET);

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS);

// get crypto product
export const getCryptoProduct = () => get(url.GET_CRYPTO_PRODUCTS);

// get invoices
export const getInvoices = () => get(url.GET_INVOICES);

// get invoice details
export const getInvoiceDetail = (id) =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } });

// get jobs
export const getJobList = () => get(url.GET_JOB_LIST);

// get Apply Jobs
export const getApplyJob = () => get(url.GET_APPLY_JOB);

// get project
export const getProjects = () => get(url.GET_PROJECTS);

// get project details
export const getProjectsDetails = (id) =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } });

// get tasks
export const getTasks = () => get(url.GET_TASKS);

// add CardData Kanban
export const addCardData = (cardData) => post(url.ADD_CARD_DATA, cardData);

// update jobs
export const updateCardData = (card) => put(url.UPDATE_CARD_DATA, card);

// delete Kanban
export const deleteKanban = (kanban) =>
  del(url.DELETE_KANBAN, { headers: { kanban } });

// get contacts
export const getUsers = () => get(url.GET_USERS);

// add user
export const addNewUser = (user) => post(url.ADD_NEW_USER, user);

// update user
export const updateUser = (user) => put(url.UPDATE_USER, user);

// delete user
export const deleteUser = (user) => del(url.DELETE_USER, { headers: { user } });

// add jobs
export const addNewJobList = (job) => post(url.ADD_NEW_JOB_LIST, job);

// update jobs
export const updateJobList = (job) => put(url.UPDATE_JOB_LIST, job);

// delete jobs
export const deleteJobList = (job) =>
  del(url.DELETE_JOB_LIST, { headers: { job } });

// Delete Apply Jobs
export const deleteApplyJob = (data) =>
  del(url.DELETE_APPLY_JOB, { headers: { data } });

/** PROJECT */

// update user
export const updateProject = (project) => put(url.UPDATE_PROJECT, project);

// delete user
export const deleteProject = (project) =>
  del(url.DELETE_PROJECT, { headers: { project } });

export const getUserProfile = () => get(url.GET_USER_PROFILE);

// get maillist
export const getMailsLists = (filter) =>
  post(url.GET_MAILS_LIST, { params: filter });

//update mail
export const deleteMail = (mail) => del(url.DELETE_MAIL, { headers: { mail } });
export const trashMail = (mail) => del(url.TRASH_MAIL, { headers: { mail } });
export const staredMail = (mail) => del(url.STARED_MAIL, { headers: { mail } });
export const getMailsListsId = (id) =>
  get(`${url.GET_MAILS_ID}/${id}`, { params: { id } });

// get folderlist
export const selectFolders = () => get(url.SELECT_FOLDER);

// post messages
export const addMessage = (message) => post(url.ADD_MESSAGE, message);
// delete message
export const deleteMessage = (data) =>
  del(url.DELETE_MESSAGE, { headers: { data } });

export const walletBalanceData = (roomId) =>
  get(`${url.GET_WALLET_DATA}/${roomId}`, { params: { roomId } });

export const getStatisticData = (roomId) =>
  get(`${url.GET_STATISTICS_DATA}/${roomId}`, { params: { roomId } });

export const visitorData = (roomId) =>
  get(`${url.GET_VISITOR_DATA}/${roomId}`, { params: { roomId } });

export const topSellingData = (month) =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } });

export const getEarningChartsData = (month) =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } });

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS);

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  });
};
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  });
};

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  });
};

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  });
};

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
};
