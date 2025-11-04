import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";

const DEFAULT_TITLE = "لایکو";
const TITLE_SEPARATOR = " | ";
const BASE_URL = "/";

const withBase = (path) => `${BASE_URL}${path}`;

const routeTitles = {
  // Main page settings
  [withBase("/content/sliders")]: "تنظیمات - اسلایدر صفحه اصلی",

  // Authentication
  [withBase("login")]: "ورود به حساب کاربری",
  [withBase("register")]: "ثبت نام",
  [withBase("forgot-password")]: "بازیابی رمز عبور",
  [withBase("logout")]: "خروج از سیستم",

  // Dashboard
  [withBase("dashboard")]: "داشبورد",
  [withBase("dashboard-saas")]: "داشبورد SaaS",
  [withBase("dashboard-crypto")]: "داشبورد ارز دیجیتال",
  [withBase("dashboard-job")]: "داشبورد شغلی",

  // Profile
  [withBase("profile")]: "پروفایل کاربری",

  // Ecommerce
  [withBase("ecommerce-products")]: ` محصولات`,
  [withBase("ecommerce-product-detail/:id")]: (params) =>
    `جزئیات محصول ${params.id}`,
  [withBase("ecommerce-add-product")]: "افزودن محصول جدید",
  [withBase("ecommerce-products/variants/:id")]: "تنوع محصول",
  [withBase("ecommerce-products/attributes/:id")]: "مشخصات فنی",
  [withBase("ecommerce-category")]: "دسته بندی محصولات",
  [withBase("ecommerce-brands")]: "برندها",
  [withBase("ecommerce-technical")]: "ویژگی های فنی",
  [withBase("ecommerce-technical-group")]: "گروه ویژگی های فنی",
  [withBase("ecommerce-technical/:id")]: (params) =>
    `مقادیر ویژگی ${params.id}`,
  [withBase("ecommerce-labels")]: "برچسب ها",
  [withBase("ecommerce-tags")]: "تگ ها",
  [withBase("ecommerce-comments")]: "نظرات",
  [withBase("ecommerce-orders")]: "سفارشات",
  [withBase("ecommerce-installment-requests")]: "درخواست های اقساط",
  [withBase("ecommerce-transactions")]: "تراکنش ها",
  [withBase("ecommerce-product-returns")]: "مرجوعی محصولات",
  [withBase("ecommerce-home-sliders")]: "تنظیمات اسلایدر صفحه اصلی",
  [withBase("ecommerce-store-information")]: "اطلاعات فروشگاه",
  [withBase("ecommerce-shipping-configuration")]: "تنظیمات حمل و نقل",
  [withBase("ecommerce-payment-configuration")]: "تنظیمات پرداخت",
  [withBase("ecommerce-shipping-configuration/city-config/:id")]:
    "تنظیمات شهر ها",
  [withBase("ecommerce-discount-codes")]: "کدهای تخفیف",
  [withBase("ecommerce-transaction-rewards")]: "پاداش های تراکنش",
  [withBase("ecommerce-installment-gateways")]: "درگاه های اقساط",
  [withBase("ecommerce-measurements")]: "واحدهای اندازه گیری",
  [withBase("ecommerce-return-policy-configuration")]: "سیاست مرجوعی",

  // Users
  [withBase("users")]: "مدیریت کاربران",

  // Invoices
  [withBase("invoices-list")]: "لیست فاکتورها",
  [withBase("invoices-detail/:id?")]: (params) =>
    `جزئیات فاکتور ${params.id || ""}`,

  // Email
  [withBase("email-settings")]: "تنظیمات ایمیل",
  [withBase("email-inbox")]: "صندوق ورودی",
  [withBase("email-read/:id?")]: (params) => `خواندن ایمیل ${params.id || ""}`,
  [withBase("email-template-basic")]: "قالب ایمیل پایه",
  [withBase("email-template-alert")]: "قالب ایمیل هشدار",
  [withBase("email-template-billing")]: "قالب ایمیل صورتحساب",

  // Tasks
  [withBase("tasks-list")]: "لیست وظایف",
  [withBase("tasks-create")]: "ایجاد وظیفه جدید",
  [withBase("tasks-kanban")]: "کانبان وظایف",

  // Projects
  [withBase("projects-grid")]: "پروژه ها (گرید)",
  [withBase("projects-list")]: "پروژه ها (لیست)",
  [withBase("projects-overview/:id")]: (params) =>
    `نمای کلی پروژه ${params.id}`,
  [withBase("projects-create")]: "ایجاد پروژه جدید",

  // Blog
  [withBase("blog")]: "بلاگ",
  [withBase("blog-list")]: "لیست مقالات",
  [withBase("blog-grid")]: "مقالات (گرید)",
  [withBase("blog-details")]: "جزئیات مقاله",

  // Job
  [withBase("job-grid")]: "فرصت های شغلی (گرید)",
  [withBase("job-details")]: "جزئیات شغل",
  [withBase("job-categories")]: "دسته بندی مشاغل",
  [withBase("job-list")]: "لیست مشاغل",
  [withBase("job-apply")]: "درخواست شغل",
  [withBase("candidate-list")]: "لیست کاندیدها",
  [withBase("candidate-overview")]: "نمای کلی کاندید",

  // Contacts
  [withBase("contacts-grid")]: "مخاطبین (گرید)",
  [withBase("contacts-list")]: "لیست مخاطبین",
  [withBase("contacts-profile")]: "پروفایل مخاطب",

  // Charts
  [withBase("apex-charts")]: "نمودارهای Apex",
  [withBase("chartjs-charts")]: "نمودارهای Chart.js",
  [withBase("e-charts")]: "نمودارهای ECharts",
  [withBase("sparkline-charts")]: "نمودارهای Sparkline",
  [withBase("charts-knob")]: "نمودارهای Knob",
  [withBase("re-charts")]: "نمودارهای Recharts",

  // Icons
  [withBase("icons-boxicons")]: "آیکون های Boxicons",
  [withBase("icons-dripicons")]: "آیکون های Dripicons",
  [withBase("icons-materialdesign")]: "آیکون های Material Design",
  [withBase("icons-fontawesome")]: "آیکون های Font Awesome",

  // Tables
  [withBase("tables-basic")]: "جداول پایه",
  [withBase("tables-datatable")]: "جداول داده",

  // Maps
  [withBase("maps-google")]: "نقشه گوگل",

  // Forms
  [withBase("form-elements")]: "عناصر فرم",
  [withBase("form-layouts")]: "چیدمان فرم",
  [withBase("form-advanced")]: "فرم پیشرفته",
  [withBase("form-editors")]: "ویرایشگرهای فرم",
  [withBase("form-mask")]: "ماسک فرم",
  [withBase("form-repeater")]: "تکرارکننده فرم",
  [withBase("form-uploads")]: "آپلود فرم",
  [withBase("form-wizard")]: "ویزارد فرم",
  [withBase("form-validation")]: "اعتبارسنجی فرم",
  [withBase("dual-listbox")]: "لیست دوگانه",

  // UI
  [withBase("ui-alerts")]: "هشدارها",
  [withBase("ui-buttons")]: "دکمه ها",
  [withBase("ui-cards")]: "کارت ها",
  [withBase("ui-carousel")]: "کاروسل",
  [withBase("ui-colors")]: "رنگ ها",
  [withBase("ui-dropdowns")]: "منوهای کشویی",
  [withBase("ui-offcanvas")]: "آف کانوس",
  [withBase("ui-general")]: "عمومی",
  [withBase("ui-grid")]: "گرید",
  [withBase("ui-images")]: "تصاویر",
  [withBase("ui-lightbox")]: "لایت باکس",
  [withBase("ui-modals")]: "مودال ها",
  [withBase("ui-progressbars")]: "نوارهای پیشرفت",
  [withBase("ui-tabs-accordions")]: "تب ها و آکاردئون ها",
  [withBase("ui-typography")]: "تایپوگرافی",
  [withBase("ui-video")]: "ویدئو",
  [withBase("ui-session-timeout")]: "اتمام نشست",
  [withBase("ui-rating")]: "امتیازدهی",
  [withBase("ui-rangeslider")]: "اسلایدر محدوده",
  [withBase("ui-notifications")]: "اعلان ها",
  [withBase("ui-placeholders")]: "پلیس هولدرها",
  [withBase("ui-toasts")]: "توست ها",
  [withBase("ui-utilities")]: "ابزارها",

  // Utility
  [withBase("pages-starter")]: "صفحه شروع",
  [withBase("pages-timeline")]: "خط زمانی",
  [withBase("pages-faqs")]: "سوالات متداول",
  [withBase("pages-pricing")]: "قیمت گذاری",
  [withBase("pages-maintenance")]: "حالت تعمیرات",
  [withBase("pages-comingsoon")]: "به زودی",
  [withBase("pages-500")]: "خطای سرور",
  [withBase("pages-404")]: "صفحه یافت نشد",

  // Crypto
  [withBase("crypto-wallet")]: "کیف پول ارز دیجیتال",
  [withBase("crypto-buy-sell")]: "خرید و فروش ارز",
  [withBase("crypto-exchange")]: "صرافی ارز",
  [withBase("crypto-lending")]: "استقراض ارز",
  [withBase("crypto-orders")]: "سفارشات ارز",
  [withBase("crypto-kyc-application")]: "احراز هویت",
  [withBase("crypto-ico-landing")]: "صفحه اول ICO",

  // Authentication Inner
  [withBase("pages-login")]: "ورود",
  [withBase("pages-login-2")]: "ورود ۲",
  [withBase("pages-register")]: "ثبت نام",
  [withBase("pages-register-2")]: "ثبت نام ۲",
  [withBase("page-recoverpw")]: "بازیابی رمز",
  [withBase("page-recoverpw-2")]: "بازیابی رمز ۲",
  [withBase("pages-forgot-pwd")]: "فراموشی رمز",
  [withBase("pages-forgot-pwd-2")]: "فراموشی رمز ۲",
  [withBase("auth-lock-screen")]: "صفحه قفل",
  [withBase("auth-lock-screen-2")]: "صفحه قفل ۲",
  [withBase("page-confirm-mail")]: "تایید ایمیل",
  [withBase("page-confirm-mail-2")]: "تایید ایمیل ۲",
  [withBase("auth-email-verification")]: "تایید ایمیل",
  [withBase("auth-email-verification-2")]: "تایید ایمیل ۲",
  [withBase("auth-two-step-verification")]: "احراز هویت دو مرحله ای",
  [withBase("auth-two-step-verification-2")]: "احراز هویت دو مرحله ای ۲",

  [withBase("create-page")]: "صفحه ساز",

  // Default
  [withBase("")]: "صفحه اصلی",
  [withBase("*")]: "صفحه مورد نظر یافت نشد",
};

export default function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "fa";

    const matchedRoute = Object.entries(routeTitles).find(([path]) =>
      matchPath(path, location.pathname)
    );

    let title = DEFAULT_TITLE;

    if (matchedRoute) {
      const [path, titleConfig] = matchedRoute;
      const match = matchPath(path, location.pathname);

      if (typeof titleConfig === "function") {
        title = titleConfig(match.params);
      } else {
        title = titleConfig;
      }
    }

    document.title = `${title}${TITLE_SEPARATOR}${DEFAULT_TITLE}`;

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [location.pathname]);

  return null;
}
