import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Pages Component
import Chat from "../pages/Chat/Chat";

// // File Manager
import FileManager from "../pages/FileManager/index";

// // Profile
import UserProfile from "../pages/Authentication/user-profile";

// Pages Calendar
import Calendar from "../pages/Calendar/index";

// // //Tasks
import TasksCreate from "../pages/Tasks/tasks-create";
import TasksKanban from "../pages/Tasks/tasks-kanban";
import TasksList from "../pages/Tasks/tasks-list";

// // //Projects
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview";
import ProjectsCreate from "../pages/Projects/projects-create";
import ProjectsGrid from "../pages/Projects/projects-grid";
import ProjectsList from "../pages/Projects/projects-list";

// // //Ecommerce Pages
const EcommerceProducts = lazy(() =>
  import("../pages/Ecommerce/EcommerceProducts/index")
);

const EcommerceProductImageGallery = lazy(() =>
  import("../pages/Ecommerce/EcommerceProductImageGallery/ProductImageGallery")
);
const EcommerceProductDetail = lazy(() =>
  import("../pages/Ecommerce/EcommerceProductCommetns/index")
);
const EcommerceOrders = lazy(() =>
  import("../pages/Ecommerce/EcommerceOrders/index")
);
const EcommerenceAddProduct = lazy(() =>
  import("../pages/Ecommerce/EcommerceAddProduct/index")
);
const EcommerenceAddCategory = lazy(() =>
  import("../pages/Ecommerce/EcommerceCategories/index")
);
const EcommerceMeasurements = lazy(() =>
  import("../pages/Ecommerce/EcommerceUnit/index")
);
const EcommerceBrands = lazy(() =>
  import("../pages/Ecommerce/EcommerceBrands/index")
);
const EcommerceCategories = lazy(() =>
  import("../pages/Ecommerce/EcommerceCategories/index")
);
const EcommerceTechnical = lazy(() =>
  import("../pages/Ecommerce/EcommerceTechnical/index")
);
const EcommerceLabels = lazy(() =>
  import("../pages/Ecommerce/EcommerceLabels/index")
);

const EcommerceAttributeValues = lazy(() =>
  import("../pages/Ecommerce/EcommerceAttributeValues/index")
);

const EcommerceProductAttirbute = lazy(() =>
  import("../pages/Ecommerce/EcommerceProductAttibute/index")
);

const EcommerceProductVariant = lazy(() =>
  import("../pages/Ecommerce/EcommerceProductVariant/index")
);

const EcommerceSettings = lazy(() =>
  import("../pages/Ecommerce/EcommerceSettings/index")
);

const EcommerceDiscounts = lazy(() =>
  import("../pages/Ecommerce/EcommerceDiscounts/index")
);

const EcommerceCoupons = lazy(() =>
  import("../pages/Ecommerce/EcommerceCoupons/index")
);

const EcommerceAttributeGroups = lazy(() =>
  import("../pages/Ecommerce/EcommerceAttributeGroups/index")
);

const PaymentMethods = lazy(() =>
  import("../pages/Ecommerce/EcommercePaymentMethods/index")
);

const Users = lazy(() => import("../pages/Ecommerce/EcommerceUsers/index"));

const ShippingConfig = lazy(() =>
  import("../pages/Ecommerce/EcommerceShippingConfig/index")
);
const AlopeykConfig = lazy(() =>
  import("../pages/Ecommerce/EcommerceShippingConfig/ShippingAlopeyk")
);
const CityShippingFee = lazy(() =>
  import("../pages/Ecommerce/EcommerceShippingConfig/CityShippingFee")
);
const FreightConfig = lazy(() =>
  import("../pages/Ecommerce/EcommerceShippingConfig/Freight")
);

// mian page settings

const HomeSliders = lazy(() =>
  import("../pages/MainPageSettings/SliderSettings/index")
);

const HeaderMenus = lazy(() =>
  import("../pages/MainPageSettings/HeaderMenus/index")
);

const FooterMenus = lazy(() =>
  import("../pages/MainPageSettings/FooterMenus/index")
);

const AnimatedText = lazy(() =>
  import("../pages/MainPageSettings/AnimatedTexts/index")
);

const Banners = lazy(() => import("../pages/MainPageSettings/Banners/index"));

const FAQs = lazy(() => import("../pages/MainPageSettings/FAQs/index"));

const Sections = lazy(() => import("../pages/MainPageSettings/Sections/index"));

const TitleSettings = lazy(() =>
  import("../pages/MainPageSettings/TitleSettings/index")
);

const SpecialProducts = lazy(() =>
  import("../pages/MainPageSettings/SpecialProducts/index")
);

const PageBuilder = lazy(() => import("../pages/PageMaker/index"));

const BlogList = lazy(() => import("../pages/Blog/BlogList/index"));
const BlogCategory = lazy(() => import("../pages/Blog/BlogCategories/index"));

// //Email
import EmailSettings from "../pages/Email/email-index";

import Invoice from "../pages/Invoices/index";
import PageMaker from "../pages/PageMaker/index";

// // Authentication related pages
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// //  // Inner Authentication
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2";
import Login1 from "../pages/AuthenticationInner/Login";
import Login2 from "../pages/AuthenticationInner/Login2";
import Recoverpw from "../pages/AuthenticationInner/Recoverpw";
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2";
import Register1 from "../pages/AuthenticationInner/Register";
import Register2 from "../pages/AuthenticationInner/Register2";
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification";
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2";
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification";
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2";
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail";
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2";

// // Dashboard
import Blog from "../pages/Dashboard-Blog/index";
import DashboardCrypto from "../pages/Dashboard-crypto/index";
import DashboardSaas from "../pages/Dashboard-saas/index";
import Dashboard from "../pages/Dashboard/index";
import DashboardJob from "../pages/DashboardJob/index";

import Pages404 from "../pages/Utility/pages-404";

// //Crypto
import CryptoIcoLanding from "../pages/Crypto/CryptoIcoLanding/index";
import CryptoOrders from "../pages/Crypto/CryptoOrders";
import CryptoWallet from "../pages/Crypto/CryptoWallet/crypto-wallet";
import CryptoBuySell from "../pages/Crypto/crypto-buy-sell";
import CryptoExchange from "../pages/Crypto/crypto-exchange";
import CryptoKYCApplication from "../pages/Crypto/crypto-kyc-application";
import CryptoLending from "../pages/Crypto/crypto-lending";

// // Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import ReCharts from "../pages/Charts/ReCharts";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/charts-knob";

// //Icons
import IconBoxicons from "../pages/Icons/IconBoxicons";
import IconDripicons from "../pages/Icons/IconDripicons";
import IconFontawesome from "../pages/Icons/IconFontawesome";
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";

// //Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";

//Job
import ApplyJobs from "../pages/JobPages/ApplyJobs/index";
import CandidateList from "../pages/JobPages/CandidateList";
import CandidateOverview from "../pages/JobPages/CandidateOverview";
import JobCategories from "../pages/JobPages/JobCategories";
import JobDetails from "../pages/JobPages/JobDetails";
import JobGrid from "../pages/JobPages/JobGrid/index";
import JobList from "../pages/JobPages/JobList/index";

// // Forms
import FormAdvanced from "../pages/Forms/FormAdvanced/index";
import FormEditors from "../pages/Forms/FormEditors";
import FormElements from "../pages/Forms/FormElements";
import FormLayouts from "../pages/Forms/FormLayouts";
import FormMask from "../pages/Forms/FormMask";
import FormRepeater from "../pages/Forms/FormRepeater";
import FormUpload from "../pages/Forms/FormUpload";
import FormValidations from "../pages/Forms/FormValidations";
import FormWizard from "../pages/Forms/FormWizard";
import DualListbox from "../pages/Tables/DualListbox";

// //Ui
import UiAlert from "../pages/Ui/UiAlerts/index";
import UiButtons from "../pages/Ui/UiButtons/index";
import UiCards from "../pages/Ui/UiCard/index";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiColors from "../pages/Ui/UiColors";
import UiDropdown from "../pages/Ui/UiDropdown/index";
import UiOffCanvas from "../pages/Ui/UiOffCanvas";

import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal/index";

import UiNotifications from "../pages/Ui/UINotifications";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiRating from "../pages/Ui/UiRating";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";

import UiPlaceholders from "../pages/Ui/UiPlaceholders";
import UiToasts from "../pages/Ui/UiToast";
import UiUtilities from "../pages/Ui/UiUtilities";

// //Pages
import Pages500 from "../pages/Utility/pages-500";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesPricing from "../pages/Utility/pages-pricing";
import PagesStarter from "../pages/Utility/pages-starter";
import PagesTimeline from "../pages/Utility/pages-timeline";

// //Contacts
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import ContactsProfile from "../pages/Contacts/ContactsProfile/index";
import ContactsGrid from "../pages/Contacts/contacts-grid";
import UiProgressbar from "../pages/Ui/UiProgressbar";

// import UiProgressbar from "../../src/pages/Ui/UiProgressbar"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/dashboard-saas", component: <DashboardSaas /> },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },
  { path: "/blog", component: <Blog /> },
  { path: "/dashboard-job", component: <DashboardJob /> },

  //   // //profile
  { path: "/profile", component: <UserProfile /> },

  //   // //Invoice
  { path: "/invoice", component: <Invoice /> },

  //   // //PageMaker
  { path: "/page-maker", component: <PageMaker /> },

  // Main page settings
  { path: "/content/sliders", component: <HomeSliders /> },
  { path: "/content/header-menus", component: <HeaderMenus /> },
  { path: "/content/footer-menus", component: <FooterMenus /> },
  { path: "/content/animated-text", component: <AnimatedText /> },
  { path: "/content/banners", component: <Banners /> },
  { path: "/content/faqs", component: <FAQs /> },
  { path: "/content/sections", component: <Sections /> },
  { path: "/content/title-settings", component: <TitleSettings /> },
  { path: "/content/special-products", component: <SpecialProducts /> },

  //   //Ecommerce
  {
    path: "/ecommerce-product-detail/:id",
    component: <EcommerceProductDetail />,
  },
  //   //   //shop
  { path: "/ecommerce-add-product", component: <EcommerenceAddProduct /> },
  { path: "/ecommerce-products", component: <EcommerceProducts /> },
  {
    path: "/ecommerce-products/gallery/:id",
    component: <EcommerceProductImageGallery />,
  },
  {
    path: "/ecommerce-products/attributes/:id",
    component: <EcommerceProductAttirbute />,
  },
  {
    path: "/ecommerce-products/variants/:id",
    component: <EcommerceProductVariant />,
  },
  { path: "/ecommerce-category", component: <EcommerceCategories /> },
  { path: "/ecommerce-brands", component: <EcommerceBrands /> },
  { path: "/ecommerce-technical", component: <EcommerceTechnical /> },
  {
    path: "/ecommerce-technical-group",
    component: <EcommerceAttributeGroups />,
  },
  {
    path: "/ecommerce-technical/:id",
    component: <EcommerceAttributeValues />,
  },
  { path: "/ecommerce-labels", component: <EcommerceLabels /> },
  { path: "/ecommerce-tags", component: <EcommerenceAddCategory /> },
  {
    path: "/ecommerce-comments",
    component: <EcommerceProductDetail />,
  },

  //   //   //shop settings
  { path: "/ecommerce-store-information", component: <EcommerceSettings /> },
  { path: "/ecommerce-shipping-configuration", component: <ShippingConfig /> },
  {
    path: "/ecommerce-shipping-configuration/alopeyk",
    component: <AlopeykConfig />,
  },
  {
    path: "/ecommerce-shipping-configuration/city-config/:id",
    component: <CityShippingFee />,
  },
  {
    path: "/ecommerce-shipping-configuration/freight",
    component: <FreightConfig />,
  },
  { path: "/ecommerce-payment-configuration", component: <PaymentMethods /> },
  { path: "/ecommerce-discount-codes", component: <EcommerceDiscounts /> },
  { path: "/ecommerce-coupons", component: <EcommerceCoupons /> },
  { path: "/ecommerce-transaction-rewards", component: <EcommerceOrders /> },
  { path: "/ecommerce-installment-gateways", component: <EcommerceOrders /> },
  { path: "/ecommerce-measurements", component: <EcommerceMeasurements /> },
  {
    path: "/ecommerce-return-policy-configuration",
    component: <EcommerceOrders />,
  },
  //   //   //orders

  { path: "/ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/ecommerce-installment-requests", component: <EcommerceOrders /> },
  { path: "/ecommerce-transactions", component: <EcommerceOrders /> },
  { path: "/ecommerce-product-returns", component: <EcommerceOrders /> },

  //   //   //mail
  { path: "/email-settings", component: <EmailSettings /> },

  //users
  { path: "/users", component: <Users /> },

  //create-page
  { path: "/create-page", component: <PageBuilder /> },

  //   //Blog
  { path: "/blog-list", component: <BlogList /> },
  { path: "/blog-categories", component: <BlogCategory /> },

  { path: "/*", component: <Pages404 /> },

  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-500", component: <Pages500 /> },
  { path: "/crypto-ico-landing", component: <CryptoIcoLanding /> },

  //   // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  { path: "/pages-login-2", component: <Login2 /> },
  { path: "/pages-register", component: <Register1 /> },
  { path: "/pages-register-2", component: <Register2 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  { path: "/pages-forgot-pwd", component: <ForgetPwd1 /> },
  { path: "/pages-forgot-pwd-2", component: <ForgetPwd2 /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
  { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  { path: "/page-confirm-mail", component: <ConfirmMail /> },
  { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  {
    path: "/auth-two-step-verification-2",
    component: <TwostepVerification2 />,
  },
];

const devRoutes = [
  //   //Crypto
  { path: "/crypto-wallet", component: <CryptoWallet /> },
  { path: "/crypto-buy-sell", component: <CryptoBuySell /> },
  { path: "/crypto-exchange", component: <CryptoExchange /> },
  { path: "/crypto-lending", component: <CryptoLending /> },
  { path: "/crypto-orders", component: <CryptoOrders /> },
  { path: "/crypto-kyc-application", component: <CryptoKYCApplication /> },

  //chat
  { path: "/chat", component: <Chat /> },

  //File Manager
  { path: "/apps-filemanager", component: <FileManager /> },

  // //calendar
  { path: "/calendar", component: <Calendar /> },

  //   // Tasks
  { path: "/tasks-list", component: <TasksList /> },
  { path: "/tasks-create", component: <TasksCreate /> },
  { path: "/tasks-kanban", component: <TasksKanban /> },

  //   //Projects
  { path: "/projects-grid", component: <ProjectsGrid /> },
  { path: "/projects-list", component: <ProjectsList /> },
  { path: "/projects-overview", component: <ProjectsOverview /> },
  { path: "/projects-overview/:id", component: <ProjectsOverview /> },
  { path: "/projects-create", component: <ProjectsCreate /> },

  { path: "/job-grid", component: <JobGrid /> },
  { path: "/job-details", component: <JobDetails /> },
  { path: "/job-categories", component: <JobCategories /> },
  { path: "/job-list", component: <JobList /> },
  { path: "/job-apply", component: <ApplyJobs /> },
  { path: "/candidate-list", component: <CandidateList /> },
  { path: "/candidate-overview", component: <CandidateOverview /> },

  // Contacts
  { path: "/contacts-grid", component: <ContactsGrid /> },
  { path: "/contacts-list", component: <ContactsList /> },
  { path: "/contacts-profile", component: <ContactsProfile /> },

  //   //Charts
  { path: "/apex-charts", component: <ChartApex /> },
  { path: "/chartjs-charts", component: <ChartjsChart /> },
  { path: "/e-charts", component: <EChart /> },
  { path: "/sparkline-charts", component: <SparklineChart /> },
  { path: "/charts-knob", component: <ChartsKnob /> },
  { path: "/re-charts", component: <ReCharts /> },

  //   // Icons
  { path: "/icons-boxicons", component: <IconBoxicons /> },
  { path: "/icons-dripicons", component: <IconDripicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },

  //   // Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-datatable", component: <DatatableTables /> },

  //   // Forms
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-layouts", component: <FormLayouts /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editors", component: <FormEditors /> },
  { path: "/form-mask", component: <FormMask /> },
  { path: "/form-repeater", component: <FormRepeater /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-wizard", component: <FormWizard /> },
  { path: "/form-validation", component: <FormValidations /> },
  { path: "/dual-listbox", component: <DualListbox /> },

  //   // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-offcanvas", component: <UiOffCanvas /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  { path: "/ui-rating", component: <UiRating /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-notifications", component: <UiNotifications /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-toasts", component: <UiToasts /> },
  { path: "/ui-utilities", component: <UiUtilities /> },

  //   //Utility
  { path: "/pages-starter", component: <PagesStarter /> },
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-faqs", component: <PagesFaqs /> },
  { path: "/pages-pricing", component: <PagesPricing /> },
];

// export { authProtectedRoutes, publicRoutes };
export { authProtectedRoutes, publicRoutes, devRoutes };
