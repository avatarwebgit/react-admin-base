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
  ADD_ORDER_FAIL,
  ADD_ORDER_SUCCESS,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_VARIANT,
  ADD_PRODUCT_VARIANT_SUCCESS,
  ADD_SLIDER,
  ADD_SLIDER_SUCCESS,
  ADD_USER,
  ADD_USER_SUCCESS,
  ATTRIBUTE_GROUP_ERROR,
  ATTRIBUTE_VALUE_ERROR,
  CATEGORY_FILTERS_SUCCESS,
  CITY_PRICE_ERROR,
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
  DELETE_CITY_PRICE_SUCCESS,
  DELETE_COUPON,
  DELETE_COUPON_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_DISCOUNT,
  DELETE_DISCOUNT_SUCCESS,
  DELETE_LABEL,
  DELETE_LABEL_SUCCESS,
  DELETE_MEASUREMENT,
  DELETE_MEASUREMENT_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_VARIANT,
  DELETE_PRODUCT_VARIANT_SUCCESS,
  DELETE_SLIDER,
  DELETE_SLIDER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELIVERY_METHOD_ERROR,
  DELIVERY_METHOD_SETTINGS_ERROR,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_SUCCESS,
  // ATTRIBUTES
  GET_ATTRIBUTES,
  GET_ATTRIBUTES_SUCCESS,
  // ATTRIBUTE GROUPS
  GET_ATTRIBUTE_GROUPS,
  GET_ATTRIBUTE_GROUPS_SUCCESS,
  // ATTRIBUTE VALUES
  GET_ATTRIBUTE_VALUES,
  GET_ATTRIBUTE_VALUES_SUCCESS,
  GET_BRANDS,
  GET_BRANDS_SUCCESS,
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CITY_PRICE,
  GET_CITY_PRICE_SUCCESS,
  // COUPONS
  GET_COUPONS,
  GET_COUPONS_SUCCESS,
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
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_PAYMENT_METHODS,
  GET_PAYMENT_METHODS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_ATTRIBUTE,
  GET_PRODUCT_ATTRIBUTE_SUCCESS,
  GET_PRODUCT_COMMENTS_FAIL,
  GET_PRODUCT_COMMENTS_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  // PRODUCT VARIANTS
  GET_PRODUCT_VARIANTS,
  GET_PRODUCT_VARIANTS_SUCCESS,
  GET_PROVINCES,
  GET_PROVINCES_SUCCESS,
  GET_SETTINGS_FAILURE,
  // SETTINGS
  GET_SETTINGS_REQUEST,
  GET_SETTINGS_SUCCESS,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  // COUPONS
  GET_SLIDERS,
  GET_SLIDERS_SUCCESS,
  GET_USERS,
  GET_USERS_SUCCESS,
  ON_ADD_COMMENT_SUCCESS,
  ON_ADD_REPLY_SUCCESS,
  ON_LIKE_COMMENT_SUCCESS,
  ON_LIKE_REPLY_SUCCESS,
  PAYMENT_METHOD_ERROR,
  PRODUCT_ATTRIBUTE_ERROR,
  PRODUCT_ERROR,
  PRODUCT_FILTERS_SUCCESS,
  PROVINCES_ERROR,
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
  SHOW_USER,
  SHOW_USER_SUCCESS,
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
  UPDATE_CITY_PRICE,
  UPDATE_CITY_PRICE_SUCCESS,
  UPDATE_COUPON,
  UPDATE_COUPON_SUCCESS,
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
  UPDATE_MEASUREMENT_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ATTRIBUTE,
  UPDATE_PRODUCT_ATTRIBUTE_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_VARIANT,
  UPDATE_PRODUCT_VARIANT_SUCCESS,
  UPDATE_SETTINGS_FAILURE,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SLIDER,
  UPDATE_SLIDER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  USER_ERROR,
} from "./actionTypes";

const mockComments = [
  {
    id: 1,
    user: {
      id: 101,
      name: "علی محمدی",
      email: "ali.mohammadi@example.com",
    },
    product: {
      id: 1001,
      title: "گوشی موبایل سامسونگ گلکسی S23",
      slug: "samsung-galaxy-s23",
    },
    rating: 5,
    status: "approved",
    comment_text:
      "محصول فوق العاده‌ای هست. کیفیت ساخت عالی و عملکرد بسیار روان. باتری هم طولانی مدت دووم میاره. کاملا راضی هستم.",
    reply_text:
      "از حسن نظر شما سپاسگزاریم. خوشحالیم که محصول مورد پسندتان واقع شده است.",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-16T14:20:00Z",
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "فاطمه زارعی",
      email: "fateme.zarei@example.com",
    },
    product: {
      id: 1002,
      title: "لپ تاپ ایسوس ویوو بوک 15",
      slug: "asus-vivobook-15",
    },
    rating: 4,
    status: "approved",
    comment_text:
      "لپ تاپ سبک و با کیفیتی هست. پردازنده قوی داره ولی رم 8 گیگ برای کارهای سنگین کمی کمه.",
    reply_text: "سپاس از نظر شما. مدل‌های با رم بالاتر نیز در دسترس می‌باشند.",
    created_at: "2024-01-14T16:45:00Z",
    updated_at: "2024-01-15T09:15:00Z",
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "محمد رضایی",
      email: "mohammad.rezaei@example.com",
    },
    product: {
      id: 1003,
      title: "هدفون بی سیم سونی WH-1000XM4",
      slug: "sony-wh-1000xm4",
    },
    rating: 3,
    status: "pending",
    comment_text:
      "نویز کنسلینگ خوبی داره ولی باتری به advertised نمی‌رسه. حدود ۲۵ ساعت بیشتر دووم نمیاره.",
    reply_text: null,
    created_at: "2024-01-16T08:20:00Z",
    updated_at: "2024-01-16T08:20:00Z",
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "سارا حسینی",
      email: "sara.hosseini@example.com",
    },
    product: {
      id: 1004,
      title: "دوربین کانن EOS R6",
      slug: "canon-eos-r6",
    },
    rating: 5,
    status: "approved",
    comment_text:
      "کیفیت عکس‌برداری فوق العاده‌ست. فوکوس خودکار بسیار دقیق و سریع. برای عکاسی حرفه‌ای عالیه.",
    reply_text:
      "ممنون از بازخورد عالیتون. خوشحالیم که محصول مورد رضایت شما قرار گرفته.",
    created_at: "2024-01-13T11:10:00Z",
    updated_at: "2024-01-14T10:30:00Z",
  },
  {
    id: 5,
    user: {
      id: 105,
      name: "رضا کریمی",
      email: "reza.karimi@example.com",
    },
    product: {
      id: 1005,
      title: "ماوس گیمینگ رزر DeathAdder",
      slug: "razer-deathadder",
    },
    rating: 2,
    status: "rejected",
    comment_text:
      "ماوس بعد از یک هفته کارکرد دچار double click شده. کیفیت ساخت ضعیفی داره.",
    reply_text:
      "با عرض پوزش از inconvenience به وجود آمده. لطفا با پشتیبانی تماس بگیرید.",
    created_at: "2024-01-12T14:35:00Z",
    updated_at: "2024-01-13T16:45:00Z",
  },
  {
    id: 6,
    user: {
      id: 106,
      name: "نازنین احمدی",
      email: "nazanin.ahmadi@example.com",
    },
    product: {
      id: 1006,
      title: "کتاب صوتی هنر ظریف رهایی از دغدغه ها",
      slug: "the-subtle-art-book",
    },
    rating: 4,
    status: "pending",
    comment_text:
      "محتوا عالی ولی کیفیت صدای گوینده می‌تونست بهتر باشه. بعضی قسمت‌ها نامفهوم هست.",
    reply_text: null,
    created_at: "2024-01-17T09:50:00Z",
    updated_at: "2024-01-17T09:50:00Z",
  },
  {
    id: 7,
    user: {
      id: 107,
      name: "امیرحسین نجفی",
      email: "amirhossein.najafi@example.com",
    },
    product: {
      id: 1007,
      title: "کنسول پلی استیشن 5",
      slug: "playstation-5",
    },
    rating: 5,
    status: "approved",
    comment_text:
      "گرافیک فوق العاده، لودینگ سریع، کنترلر DualSense تجربه بازی رو کاملا متحول کرده.",
    reply_text: "از انتخاب شما سپاسگزاریم. امیدواریم از گیمینگ لذت ببرید.",
    created_at: "2024-01-11T19:25:00Z",
    updated_at: "2024-01-12T11:40:00Z",
  },
  {
    id: 8,
    user: {
      id: 108,
      name: "مینا قربانی",
      email: "mina.ghorbani@example.com",
    },
    product: {
      id: 1008,
      title: "ماشین لباسشویی ال جی 8 کیلوگرم",
      slug: "lg-washing-machine-8kg",
    },
    rating: 1,
    status: "pending",
    comment_text:
      "بعد از دو ماه استفاده، موتور سوخت. خدمات پس از فروش هم پاسخگو نیست.",
    reply_text: null,
    created_at: "2024-01-18T13:15:00Z",
    updated_at: "2024-01-18T13:15:00Z",
  },
  {
    id: 9,
    user: {
      id: 109,
      name: "حسین مرادی",
      email: "hossein.moradi@example.com",
    },
    product: {
      id: 1009,
      title: "کفش ورزشی نایکی Air Max",
      slug: "nike-air-max",
    },
    rating: 4,
    status: "approved",
    comment_text:
      "کفش بسیار راحت و سبک. برای دویدن عالیه ولی قیمت نسبتا بالایی داره.",
    reply_text: "ممنون از نظر شما. کیفیت مواد اولیه توجیه کننده قیمت می‌باشد.",
    created_at: "2024-01-10T15:40:00Z",
    updated_at: "2024-01-11T10:20:00Z",
  },
  {
    id: 10,
    user: {
      id: 110,
      name: "لیلا موسوی",
      email: "leila.mousavi@example.com",
    },
    product: {
      id: 1010,
      title: "عینک آفتابی ری بن",
      slug: "ray-ban-sunglasses",
    },
    rating: 3,
    status: "rejected",
    comment_text:
      "فریم بعد از یک ماه ترک خورد. کیفیت شیشه خوبه ولی فریم ضعیف هست.",
    reply_text: "با تشکر از گزارش شما. محصولات ما گارانتی مادام العمر دارند.",
    created_at: "2024-01-09T12:05:00Z",
    updated_at: "2024-01-10T14:30:00Z",
  },
];

const INIT_STATE = {
  dashboardData: {},
  products: {
    items: [],
    pagination: [],
  },
  productFilters: {},
  product: {},
  productDetails: [],
  orders: { items: [], pagination: { current_page: 0, last_page: 5 } },
  orderDetails: [],
  cartData: {},
  customers: [],
  shops: [],
  error: {},
  productComments: [],
  categories: {
    items: [],
    pagination: [],
  },
  allCategories: {
    items: [],
    pagination: [],
  },
  categoryFilters: {},
  categoryDetails: [],
  measurements: {
    items: [],
    pagination: [],
  },
  measurementDetails: [],
  brands: {
    items: [],
    pagination: [],
  },
  brandDetails: [],
  sliders: {
    items: [],
    pagination: [],
  },
  sliderDetails: [],
  attributes: {
    items: [],
    pagination: [],
  },
  attributeDetails: [],
  labels: {
    items: [],
  },
  attributeGroups: {
    items: [],
    pagination: [],
  },
  attributeGroupDetails: [],
  labels: {
    items: [],
    pagination: [],
  },
  labelDetails: [],
  coupons: {
    items: [],
    pagination: [],
  },
  couponDetails: [],

  attributeValues: {
    items: [],
    pagination: [],
  },
  attributeValueDetails: [],

  settings: [],
  settingDetails: [],

  users: {
    items: [],
    pagination: [],
  },
  userDetails: [],

  paymentMethods: {
    items: [],
  },
  paymentMethodDetails: [],

  deliveryMethods: {
    items: [],
  },
  deliveryMethodDetails: [],

  deliveryMethodSettings: {
    items: [],
    pagination: [],
  },
  deliveryMethodSettingsDetails: [],

  productVariants: {
    items: [],
    pagination: [],
  },
  productVariantDetails: [],

  productAttributes: {
    items: [],
    pagination: [],
  },
  productAttributesDetails: [],

  discounts: {
    items: [],
    pagination: [],
  },
  discountDetails: [],

  cityPrices: {
    items: [],
    pagination: [],
  },
  cityPricesDetails: [],

  comments: {
    items: [...mockComments],
    pagination: null,
  },

  provinces: [],

  liveEditingProduct: null,

  loading: false,
  loadingProduct: false,

  updated: null,
  updateError: null,

  currentCreatedVariant: null,

  // --- Creation flags ---
  brandCreated: false,
  unitCreated: false,
  labelCreated: false,
  productCreated: false,
  categoryCreated: false,
  productVariantCreated: false,
  productAttributeCreated: false,
  attributeCreated: false,
  attributeGroupCreated: false,
  attributeValueCreated: false,
  attributeValueGroupCreated: false,
  cityPriceGroupCreated: false,
  sliderCreated: false,
  GalleryImageCreated: false,
  userCreated: false,
  deliveryMethodCreated: false,
  deliveryMethodSettingsCreated: false,
  cityPriceCreated: false,

  // --- Update status ---
  brandUpdateStatus: null,
  unitUpdateStatus: null,
  labelUpdateStatus: null,
  productUpdateStatus: null,
  categoryUpdateStatus: null,
  productVariantUpdateStatus: null,
  productAttributeUpdateStatus: null,
  attributeUpdateStatus: null,
  attributeGroupUpdateStatus: null,
  attributeValueUpdateStatus: null,
  cityPriceUpdateStatus: null,
  couponsUpdateStatus: null,
  sliderUpdateStatus: null,
  GalleryImageUpdateStatus: null,
  userUpdateStatus: null,
  deliveryMethodUpdateStatus: null,
  deliveryMethodSettingsUpdateStatus: null,
  cityPriceUpdateStatus: null,

  // --- Loading flags ---
  brandLoading: false,
  unitLoading: false,
  labelLoading: false,
  productLoading: false,
  singleProductLoading: false,
  categoryLoading: false,
  singleCategoryLoading: false,
  AllCategoryLoading: false,
  productVariantLoading: false,
  singleProductVariantLoading: false,
  productAttributeLoading: false,
  attributeLoading: false,
  singleAttributeUpdateStatus: false,
  attributeGroupLoading: false,
  singleAttributeGroupLoading: false,
  attributeValueLoading: false,
  singleAttributeValueLoading: false,
  provincesLoading: false,
  cityPriceLoading: false,
  singleCityPriceLoading: false,
  couponLoading: false,
  singleCouponLoading: false,
  slidersLoading: false,
  singleSlidersLoading: false,
  galleryImageLoading: false,
  singleGalleryImageLoading: false,
  userLoading: false,
  singleUserLoading: false,
  deliveryMethodLoading: false,
  singleDeliveryMethodLoading: false,
  deliveryMethodSettingsLoading: false,
  singleDeliveryMethodSettingsLoading: false,
  cityPriceLoading: false,
  singleCityPriceLoading: false,
};

export const updateStatus = {
  success: "success",
  pending: "pending",
};

const Ecommerce = (state = INIT_STATE, action) => {
  console.log(action, state);
  switch (action.type) {
    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };

    case GET_DASHBOARD:
      return {
        ...state,
      };

    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardData: action.payload,
      };

    case GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: true,
      };

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };

    case ADD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id.toString() === action.payload.id.toString()
            ? { order, ...action.payload }
            : order
        ),
      };

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.id.toString() !== action.payload.toString()
        ),
      };

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CART_DATA_SUCCESS:
      return {
        ...state,
        cartData: action.payload,
      };

    case GET_CART_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        loading: true,
      };

    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [action.payload, ...state.customers],
      };

    case ADD_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id.toString() === action.payload.id.toString()
            ? { customer, ...action.payload }
            : customer
        ),
      };

    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id.toString() !== action.payload.toString()
        ),
      };

    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        shops: action.payload,
        loading: true,
      };

    case GET_SHOPS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PRODUCT_COMMENTS_SUCCESS:
    case ON_LIKE_COMMENT_SUCCESS:
    case ON_LIKE_REPLY_SUCCESS:
    case ON_ADD_REPLY_SUCCESS:
    case ON_ADD_COMMENT_SUCCESS:
      return {
        ...state,
        productComments: action.payload,
      };

    case GET_PRODUCT_COMMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categoryLoading: true,
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        categoryLoading: false,
      };

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        AllCategoryLoading: true,
      };

    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        allCategories: action.payload,
        AllCategoryLoading: false,
      };

    case SHOW_CATEGORY:
      return {
        ...state,
        singleCategoryLoading: true,
      };

    case SHOW_CATEGORY_SUCCESS:
      return {
        ...state,
        singleCategoryLoading: false,
        categoryDetails: {
          ...state.categoryDetails,
          [action.payload.id]: action.payload,
        },
      };

    case ADD_CATEGORY:
      return {
        ...state,
        categoryLoading: true,
        categoryCreated: false,
      };

    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryLoading: false,
        categoryCreated: true,
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        categoryUpdateStatus: false,
      };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryUpdateStatus: true,
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categoryLoading: true,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryLoading: false,
      };

    case CATEGORY_FILTERS_SUCCESS:
      return {
        ...state,
        categoryFilters: action.payload,
      };

    case GET_MEASUREMENTS:
      return {
        ...state,
        unitLoading: true,
      };

    case GET_MEASUREMENTS_SUCCESS:
      return {
        ...state,
        measurements: action.payload,
        unitLoading: false,
      };

    case SHOW_MEASUREMENT:
      return {
        ...state,
        unitLoading: true,
      };

    case SHOW_MEASUREMENT_SUCCESS:
      return {
        ...state,
        unitLoading: false,
        measurementDetails: {
          ...state.unitDetails,
          [action.payload.id]: action.payload,
        },
      };

    case ADD_MEASUREMENT:
      return {
        ...state,
        unitLoading: true,
        unitCreated: false,
      };

    case ADD_MEASUREMENT_SUCCESS:
      return {
        ...state,
        unitLoading: false,
        unitCreated: true,
      };

    case UPDATE_MEASUREMENT:
      return {
        ...state,
        unitUpdateStatus: false,
      };

    case UPDATE_MEASUREMENT_SUCCESS:
      return {
        ...state,
        unitUpdateStatus: true,
      };

    case DELETE_MEASUREMENT:
      return {
        ...state,
        unitLoading: true,
      };

    case DELETE_MEASUREMENT_SUCCESS:
      return {
        ...state,
        unitLoading: false,
      };

    //  ______________________ brands ______________________

    case GET_BRANDS:
      return {
        ...state,
        brandLoading: true,
      };

    case GET_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        brandLoading: false,
      };

    case SHOW_BRAND:
      return {
        ...state,
        brandLoading: true,
      };

    case SHOW_BRAND_SUCCESS:
      return {
        ...state,
        brandDetails: {
          ...state.brandDetails,
          [action.payload.id]: action.payload,
        },
        brandLoading: false,
      };

    case ADD_BRAND:
      return {
        ...state,
        brandLoading: true,
        brandCreated: false,
      };

    case ADD_BRAND_SUCCESS:
      return {
        ...state,
        brandLoading: false,
        brandCreated: true,
      };

    case UPDATE_BRAND:
      return {
        ...state,
        brandUpdateStatus: false,
      };

    case UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        brandUpdateStatus: true,
      };

    case DELETE_BRAND:
      return {
        ...state,
        brandLoading: true,
      };

    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        brandLoading: false,
      };

    //  ______________________ labels ______________________

    case GET_LABELS:
      return {
        ...state,
        labelLoading: true,
      };

    case GET_LABELS_SUCCESS:
      return {
        ...state,
        labels: action.payload,
        labelLoading: false,
      };

    case SHOW_LABEL:
      return {
        ...state,
        labelLoading: true,
      };

    case SHOW_LABEL_SUCCESS:
      return {
        ...state,
        labelLoading: false,
        labelDetails: {
          ...state.labelDetails,
          [action.payload.id]: action.payload,
        },
      };

    case ADD_LABEL:
      return {
        ...state,
        labelLoading: true,
        labelCreated: false,
      };

    case ADD_LABEL_SUCCESS:
      return {
        ...state,
        labelLoading: false,
        labelCreated: true,
      };

    case UPDATE_LABEL:
      return {
        ...state,
        labelUpdateStatus: false,
      };

    case UPDATE_LABEL_SUCCESS:
      return {
        ...state,
        labelUpdateStatus: true,
      };

    case DELETE_LABEL:
      return {
        ...state,
        labelLoading: true,
      };

    case DELETE_LABEL_SUCCESS:
      return {
        ...state,
        labelLoading: false,
      };

    //  ______________________ products ______________________

    case GET_PRODUCTS:
      return {
        ...state,
        productLoading: true,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          items: action.payload.items,
          pagination: action.payload.pagination || [],
        },
        productLoading: false,
      };

    case SHOW_PRODUCT:
      return {
        ...state,
        singleProductLoading: true,
      };

    case SHOW_PRODUCT_SUCCESS:
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          [action.payload.id]: action.payload,
        },
        singleProductLoading: false,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        productLoading: true,
        productCreated: false,
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        productLoading: false,
        productCreated: true,
        liveEditingProduct: action.payload,
      };

    case RESET_EDITING_PRODUCT:
      return {
        ...state,
        liveEditingProduct: null,
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        productUpdateStatus: false,
        updated: false,
        productLoading: true,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productUpdateStatus: true,
        updated: true,
        productLoading: false,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        productLoading: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productLoading: false,
      };

    case PRODUCT_FILTERS_SUCCESS:
      return {
        ...state,
        productFilters: action.payload,
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        productLoading: false,
        productUpdateStatus: null,
        productCreated: false,
        liveEditingProduct: null,
      };

    // ______________________ attributes ______________________

    case GET_ATTRIBUTES:
      return {
        ...state,
        attributeLoading: true,
      };

    case GET_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        attributes: { items: action.payload.items || [] },
        attributeLoading: false,
      };

    case SHOW_ATTRIBUTE:
      return {
        ...state,
        singleAttributeUpdateStatus: true,
      };

    case SHOW_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributeDetails: {
          ...state.attributeDetails,
          [action.payload.id]: action.payload,
        },
        singleAttributeUpdateStatus: false,
      };

    case ADD_ATTRIBUTE:
      return {
        ...state,
        attributeLoading: true,
        attributeCreated: false,
      };

    case ADD_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributeLoading: false,
        attributeCreated: true,
      };

    case UPDATE_ATTRIBUTE:
      return {
        ...state,
        attributeUpdateStatus: false,
      };

    case UPDATE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributeUpdateStatus: true,
      };

    case DELETE_ATTRIBUTE:
      return {
        ...state,
        attributeLoading: true,
      };

    case DELETE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributeLoading: false,
      };

    //  ______________________ attribute groups ______________________

    case GET_ATTRIBUTE_GROUPS:
      return {
        ...state,
        attributeGroupLoading: true,
      };

    case GET_ATTRIBUTE_GROUPS_SUCCESS:
      return {
        ...state,
        attributeGroups: action.payload,
        attributeGroupLoading: false,
      };

    case SHOW_ATTRIBUTE_GROUP:
      return {
        ...state,
        singleAttributeGroupLoading: true,
      };

    case SHOW_ATTRIBUTE_GROUP_SUCCESS:
      return {
        ...state,
        attributeGroupDetails: {
          ...state.attributeGroupDetails,
          [action.payload.id]: action.payload,
        },
        singleAttributeGroupLoading: false,
      };

    case ADD_ATTRIBUTE_GROUP:
      return {
        ...state,
        attributeGroupLoading: true,
        attributeGroupCreated: false,
      };

    case ADD_ATTRIBUTE_GROUP_SUCCESS:
      return {
        ...state,
        attributeGroupLoading: false,
        attributeGroupCreated: true,
      };

    case UPDATE_ATTRIBUTE_GROUP:
      return {
        ...state,
        updated: updateStatus.pending,
        attributeGroupUpdateStatus: false,
      };

    case UPDATE_ATTRIBUTE_GROUP_SUCCESS:
      return {
        ...state,
        updated: updateStatus.success,
        attributeGroupUpdateStatus: true,
      };

    case DELETE_ATTRIBUTE_GROUP:
      return {
        ...state,
        attributeGroupLoading: true,
      };

    case DELETE_ATTRIBUTE_GROUP_SUCCESS:
      return {
        ...state,
        attributeGroupLoading: false,
      };

    case ATTRIBUTE_GROUP_ERROR:
      return {
        ...state,
        attributeGroupLoading: false,
        error: action.payload,
      };

    // ______________________ attribute-values ______________________

    case GET_ATTRIBUTE_VALUES:
      return {
        ...state,
        attributeValueLoading: true,
      };

    case GET_ATTRIBUTE_VALUES_SUCCESS:
      return {
        ...state,
        attributeValues: { items: action.payload || [] },
        attributeValueLoading: false,
      };

    case SHOW_ATTRIBUTE_VALUE:
      return {
        ...state,
        attributeValueLoading: true,
      };

    case SHOW_ATTRIBUTE_VALUE_SUCCESS:
      return {
        ...state,
        attributeValueDetails: {
          ...state.attributeValueDetails,
          [action.payload.id]: action.payload.data,
        },
        attributeValueLoading: false,
      };

    case ADD_ATTRIBUTE_VALUE:
      return {
        ...state,
        attributeValueLoading: true,
        attributeValueCreated: false,
      };

    case ADD_ATTRIBUTE_VALUE_SUCCESS:
      return {
        ...state,
        attributeValueLoading: false,
        attributeValueCreated: true,
      };

    case UPDATE_ATTRIBUTE_VALUE:
      return {
        ...state,
        updated: updateStatus.pending,
        attributeValueUpdateStatus: false,
      };

    case UPDATE_ATTRIBUTE_VALUE_SUCCESS:
      return {
        ...state,
        updated: updateStatus.success,
        attributeValueUpdateStatus: true,
      };

    case DELETE_ATTRIBUTE_VALUE:
      return {
        ...state,
        attributeValueLoading: true,
      };

    case DELETE_ATTRIBUTE_VALUE_SUCCESS:
      return {
        ...state,
        attributeValueLoading: false,
      };

    case ATTRIBUTE_VALUE_ERROR:
      return {
        ...state,
        attributeValueLoading: false,
        error: action.payload,
      };

    // ______________________ product variants ______________________

    case GET_PRODUCT_VARIANTS:
      return {
        ...state,
        productVariantLoading: true,
      };

    case GET_PRODUCT_VARIANTS_SUCCESS:
      return {
        ...state,
        productVariants: {
          ...state.productVariants,
          [action.payload.id]: action.payload.items,
        },
        productVariantLoading: false,
        productVariantUpdateStatus: false,
        productVariantCreated: false,
      };

    case SHOW_PRODUCT_VARIANT:
      return {
        ...state,
        singleProductVariantLoading: true,
      };

    case SHOW_PRODUCT_VARIANT_SUCCESS:
      return {
        ...state,
        productVariantDetails: {
          ...state.productVariantDetails,
          [action.payload.id]: action.payload.data,
        },
        singleProductVariantLoading: false,
      };

    case ADD_PRODUCT_VARIANT:
      return {
        ...state,
        productVariantLoading: true,
        productVariantCreated: false,
      };

    case ADD_PRODUCT_VARIANT_SUCCESS:
      const productId = action.payload.product.id;
      const existingVariants = state.productVariants[productId]?.items || [];

      return {
        ...state,
        productVariants: {
          ...state.productVariants,
          [productId]: {
            items: [...existingVariants, action.payload],
            pagination: state.productVariants[productId]?.pagination || {},
          },
        },
        currentCreatedVariant: action.payload,
        productVariantLoading: false,
        productVariantCreated: true,
      };

    case UPDATE_PRODUCT_VARIANT:
      return {
        ...state,
        productVariantUpdateStatus: false,
      };

    case UPDATE_PRODUCT_VARIANT_SUCCESS:
      return {
        ...state,
        productVariantUpdateStatus: true,
        productVariantLoading: false,
      };

    case DELETE_PRODUCT_VARIANT:
      return {
        ...state,
        productVariantLoading: true,
      };

    case DELETE_PRODUCT_VARIANT_SUCCESS:
      return {
        ...state,
        productVariantLoading: false,
      };

    // ______________________ settings ______________________

    case GET_SETTINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
      };

    case GET_SETTINGS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_SETTINGS_REQUEST:
      return {
        ...state,
        updating: true,
        updateError: null,
      };

    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        updating: false,
        updateError: null,
      };

    case UPDATE_SETTINGS_FAILURE:
      return {
        ...state,
        updating: false,
        updateError: action.payload,
      };

    // ______________________ city price ______________________

    case GET_SETTINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
      };

    case GET_SETTINGS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_SETTINGS_REQUEST:
      return {
        ...state,
        updating: true,
        updateError: null,
      };

    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        updating: false,
        updateError: null,
      };

    case UPDATE_SETTINGS_FAILURE:
      return {
        ...state,
        updating: false,
        updateError: action.payload,
      };

    // ______________________ discounts ______________________

    case GET_DISCOUNTS:
      return { ...state, loading: true };

    case GET_DISCOUNTS_SUCCESS:
      return {
        ...state,
        discounts: action.payload,
        loading: false,
      };

    case SHOW_DISCOUNT:
      return { ...state, loading: true };

    case SHOW_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        discountDetails: {
          ...state.discountDetails,
          [action.payload.id]: action.payload,
        },
      };

    case ADD_DISCOUNT:
      return { ...state };

    case ADD_DISCOUNT_SUCCESS:
      return {
        ...state,
        discounts: {
          items: [...(state.discounts.items || []), action.payload],
        },
        loading: false,
      };

    case UPDATE_DISCOUNT:
      return { ...state, loading: true };

    case UPDATE_DISCOUNT_SUCCESS:
      return {
        ...state,
        discounts: {
          items: state.discounts.items.map((discount) =>
            discount.id === action.payload.id ? action.payload : discount
          ),
        },
        loading: false,
      };

    case DELETE_DISCOUNT:
      return { ...state, loading: true };

    case DELETE_DISCOUNT_SUCCESS:
      return {
        ...state,
        discounts: {
          ...state.discounts,
          items: state.discounts.items.filter(
            (item) => item.id !== action.payload
          ),
        },
        loading: false,
      };

    // ______________________ coupons ______________________

    case GET_COUPONS:
      return { ...state, loading: true };

    case GET_COUPONS_SUCCESS:
      return {
        ...state,
        coupons: { items: action.payload.items || [] },
        loading: false,
      };

    case SHOW_COUPON:
      return { ...state, loading: true };

    case SHOW_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        couponDetails: {
          ...state.couponDetails,
          [action.payload.id]: action.payload,
        },
      };

    case ADD_COUPON:
      return { ...state };

    case ADD_COUPON_SUCCESS:
      return {
        ...state,
        coupons: {
          items: [...(state.coupons.items || []), action.payload],
        },
        loading: false,
      };

    case UPDATE_COUPON:
      return { ...state, loading: true };

    case UPDATE_COUPON_SUCCESS:
      return {
        ...state,
        coupons: {
          items: state.coupons.items.map((coupon) =>
            coupon.id === action.payload.id ? action.payload : coupon
          ),
        },
        loading: false,
      };

    case DELETE_COUPON:
      return { ...state, loading: true };

    case DELETE_COUPON_SUCCESS:
      return {
        ...state,
        coupons: {
          ...state.coupons,
          items: state.coupons.items.filter(
            (item) => item.id !== action.payload
          ),
        },
        loading: false,
      };

    // ______________________ sliders ______________________

    case GET_SLIDERS:
      return {
        ...state,
        sliderLoading: true,
      };

    case GET_SLIDERS_SUCCESS:
      return {
        ...state,
        sliders: { items: action.payload || [] },
        sliderLoading: false,
        sliderUpdateStatus: false,
        singleSlidersLoading: false,
        sliderCreated: false,
      };

    case SHOW_SLIDER:
      return {
        ...state,
        singleSlidersLoading: true,
      };

    case SHOW_SLIDER_SUCCESS:
      return {
        ...state,
        singleSlidersLoading: false,
        sliderDetails: {
          ...state.sliderDetails,
          [action.payload.id]: action.payload,
        },
      };

    case ADD_SLIDER:
      return {
        ...state,
        sliderLoading: true,
        sliderCreated: false,
      };

    case ADD_SLIDER_SUCCESS:
      return {
        ...state,
        sliderLoading: false,
        sliderCreated: true,
      };

    case UPDATE_SLIDER:
      return {
        ...state,
        sliderUpdateStatus: false,
      };

    case UPDATE_SLIDER_SUCCESS:
      return {
        ...state,
        sliderUpdateStatus: true,
      };

    case DELETE_SLIDER:
      return {
        ...state,
        sliderLoading: true,
      };

    case DELETE_SLIDER_SUCCESS:
      return {
        ...state,
        sliderLoading: false,
      };

    case SLIDER_ERROR:
      return {
        ...state,
        sliderLoading: false,
      };

    // ______________________ users ______________________

    case GET_USERS:
      return {
        ...state,
        userLoading: true,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload || [],
        userLoading: false,
      };

    case SHOW_USER:
      return {
        ...state,
        singleUserLoading: true,
      };

    case SHOW_USER_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.payload.id]: action.payload,
        },
        singleUserLoading: false,
      };

    case ADD_USER:
      return {
        ...state,
        userLoading: true,
        userCreated: false,
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        userCreated: true,
      };

    case UPDATE_USER:
      return {
        ...state,
        userUpdateStatus: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userUpdateStatus: true,
      };

    case DELETE_USER:
      return {
        ...state,
        userLoading: true,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
      };

    case USER_ERROR:
      return {
        ...state,
        userLoading: false,
      };

    // ______________________ product attribute ______________________

    case UPDATE_PRODUCT_ATTRIBUTE:
      return { ...state, productAttributeLoading: true };

    case UPDATE_PRODUCT_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        productAttributeLoading: false,
      };

    case GET_PRODUCT_ATTRIBUTE:
      return { ...state, productAttributeUpdateStatus: true };

    case GET_PRODUCT_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        productAttributes: {
          ...state.productAttributes,
          [action.payload.product.id]: action.payload.attributes,
        },
        productAttributeUpdateStatus: false,
      };

    case PRODUCT_ATTRIBUTE_ERROR:
      return {
        ...state,
        productAttributeUpdateStatus: false,
        productAttributeLoading: false,
        error: action.payload,
      };

    // ______________________ payment method ______________________

    case GET_PAYMENT_METHODS:
      return { ...state, loading: true };

    case GET_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethods: { ...(action.payload || []) },
        loading: false,
      };

    case SHOW_PAYMENT_METHOD:
      return { ...state, loading: true };

    case SHOW_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentMethodDetails: {
          ...state.paymentMethodDetails,
          [action.payload.id]: action.payload,
        },
      };

    case UPDATE_PAYMENT_METHOD:
      return { ...state, loading: true };

    case UPDATE_PAYMENT_METHOD_SUCCESS:
      return { ...state, loading: false };

    case PAYMENT_METHOD_ERROR:
      return { ...state, loading: false };

    // ______________________ delivery method ______________________

    case GET_DELIVERY_METHODS:
      return { ...state, deliveryMethodLoading: true };

    case GET_DELIVERY_METHODS_SUCCESS:
      return {
        ...state,
        deliveryMethods: { items: [...(action.payload || [])] },
        deliveryMethodLoading: false,
      };

    case SHOW_DELIVERY_METHOD:
      return { ...state, singleDeliveryMethodLoading: true };

    case SHOW_DELIVERY_METHOD_SUCCESS:
      return {
        ...state,
        singleDeliveryMethodLoading: false,
        deliveryMethodDetails: {
          ...state.deliveryMethodDetails,
          [action.payload.id]: action.payload,
        },
      };

    case UPDATE_DELIVERY_METHOD:
      return {
        ...state,
        deliveryMethodUpdateStatus: false,
        deliveryMethodLoading: true,
      };

    case UPDATE_DELIVERY_METHOD_SUCCESS:
      return {
        ...state,
        deliveryMethodUpdateStatus: true,
        deliveryMethodLoading: false,
      };

    case DELIVERY_METHOD_ERROR:
      return {
        ...state,
        deliveryMethodLoading: false,
        deliveryMethodUpdateStatus: null,
        deliveryMethodCreated: false,
      };

    // ______________________ delivery method settings ______________________

    case GET_DELIVERY_METHODS_SETTINGS:
      return { ...state, deliveryMethodSettingsLoading: true };

    case GET_DELIVERY_METHODS_SETTINGS_SUCCESS:
      return {
        ...state,
        deliveryMethodSettings: action.payload || [],
        deliveryMethodSettingsLoading: false,
      };

    case SHOW_DELIVERY_METHOD_SETTINGS:
      return { ...state, singleDeliveryMethodSettingsLoading: true };

    case SHOW_DELIVERY_METHOD_SETTINGS_SUCCESS:
      return {
        ...state,
        singleDeliveryMethodSettingsLoading: false,
        deliveryMethodSettingDetails: {
          ...state.deliveryMethodSettingDetails,
          [action.payload.id]: action.payload,
        },
      };

    case UPDATE_DELIVERY_METHOD_SETTINGS:
      return {
        ...state,
        deliveryMethodSettingsUpdateStatus: false,
        deliveryMethodSettingsLoading: true,
      };

    case UPDATE_DELIVERY_METHOD_SETTINGS_SUCCESS:
      return {
        ...state,
        deliveryMethodSettingsUpdateStatus: true,
        deliveryMethodSettingsLoading: false,
      };

    case DELIVERY_METHOD_SETTINGS_ERROR:
      return {
        ...state,
        deliveryMethodSettingsLoading: false,
        deliveryMethodSettingsUpdateStatus: null,
        deliveryMethodSettingsCreated: false,
      };

    //  ______________________ delivery city price ______________________

    case GET_CITY_PRICE:
      return {
        ...state,
        cityPriceLoading: true,
      };

    case GET_CITY_PRICE_SUCCESS:
      return {
        ...state,
        cityPrices: action.payload,
        cityPriceLoading: false,
      };

    case SHOW_CITY_PRICE:
      return {
        ...state,
        cityPriceLoading: true,
      };

    case SHOW_CITY_PRICE_SUCCESS:
      return {
        ...state,
        cityPricesDetails: {
          ...state.cityPricesDetails,
          [action.payload.id]: action.payload,
        },
        cityPriceLoading: false,
      };

    case ADD_CITY_PRICE:
      return {
        ...state,
        cityPriceLoading: true,
        cityPriceCreated: false,
      };

    case ADD_CITY_PRICE_SUCCESS:
      return {
        ...state,
        cityPriceLoading: false,
        cityPriceCreated: true,
      };

    case UPDATE_CITY_PRICE:
      return {
        ...state,
        cityPriceUpdateStatus: false,
      };

    case UPDATE_CITY_PRICE_SUCCESS:
      return {
        ...state,
        cityPriceUpdateStatus: true,
      };

    case DELETE_CITY_PRICE:
      return {
        ...state,
        cityPriceLoading: true,
      };

    case DELETE_CITY_PRICE_SUCCESS:
      return {
        ...state,
        cityPriceLoading: false,
      };

    case CITY_PRICE_ERROR:
      return {
        ...state,
        cityPriceLoading: false,
      };

    // ______________________provinces settings ______________________

    case GET_PROVINCES:
      return { ...state, provincesLoading: true };

    case GET_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: action.payload,
        provincesLoading: false,
      };
    case PROVINCES_ERROR:
      return { ...state, provincesLoading: false };

    default:
      return state;
  }
};

export default Ecommerce;
