import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, useLocation } from "react-router-dom";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import { useCallback } from "react";

import "../../styles/global.css";
import { isDev } from "../../utils/env";

const SidebarContent = (props) => {
  const ref = useRef();
  const path = useLocation();

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
         
            <li className="menu-title">{props.t("منو")} </li>   <li>
              <Link to="/dashboard">
                <i className="bx bx-bar-chart-alt-2"></i>
                <span>{props.t("داشبود")}</span>
              </Link>
            </li>
            <li>
              {/* <Link to="/#" className="has-arrow"> */}
              {/* <i className="bx bx-home-circle"></i>
                <span>{props.t("داشبورد")}</span>  */}

              {/* </Link> */}
              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/dashboard-saas">{props.t("Sass")}</Link>
                </li>
                <li>
                  <Link to="/dashboard-crypto">{props.t("رمز ارز")}</Link>
                </li>
                <li>
                  <Link to="/blog">{props.t("وبلاگ")}</Link>
                </li>
                <li>
                  <Link to="/dashboard-job">{props.t("شغل")}</Link>
                </li>
              </ul> */}
            </li>
            <li className="menu-title">{props.t("برنامه ها")}</li>
            {/* <li>
       <Link to='/calendar' className=' '>
        <i className='bx bx-calendar'></i>
        <span>{props.t('تقویم')}</span>
       </Link>
      </li> */}
            {/* 
      <li>
       <Link to='/chat' className=''>
        <i className='bx bx-chat'></i>
        <span>{props.t('گفتگو')}</span>
       </Link>
      </li> */}
            <li>
              <Link to="/apps-filemanager">
                <i className="bx bx-file"></i>
                <span>{props.t("مدیریت فایل ها")}</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("تنظیمات صفحه اصلی")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/content/header-menus">منو هدر</Link>
                </li>
                <li>
                  <Link to="/content/sliders">اسلایدر صفحه اصلی</Link>
                </li>
                <li>
                  <Link to="/content/animated-text">متن متحرک</Link>
                </li>
                <li>
                  <Link to="/content/banners">بنرها</Link>
                </li>
                <li>
                  <Link to="/content/sections">بخش ها</Link>
                </li>
                <li>
                  <Link to="/content/special-products">بخش محصول ویژه</Link>
                </li>
                <li>
                  <Link to="/content/title-settings">تنظیمات عنوان</Link>
                </li>
                <li>
                  <Link to="/shop/admin-panel/management/instagram">
                    اینستاگرام
                  </Link>
                </li>
                <li>
                  <Link to="/admin/content/footer-menus">منو فوتر</Link>
                </li>
                <li>
                  <Link to="/admin/content/faqs">سوالات متداول</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("تجارت الکترونیک")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li className="sub-menu divider-wrapper">
                  <p className="sidebar-divider">
                    <i
                      className="bx bxs-shopping-bag"
                      style={{ fontSize: "18px" }}
                    ></i>
                    <span>فروشگاه</span>
                  </p>
                  <p className="sidebar-divide-line"></p>
                </li>
                <li>
                  <Link to="/ecommerce-products">{props.t("محصولات")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-product">
                    {props.t("افزودن محصول جدید ")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-category">
                    {props.t("دسته بندی ها")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-brands">{props.t("برندها")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-technical">{props.t("مشخصات فنی")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-tags">{props.t("برچسب‌ها")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-labels">{props.t("لیبل محصولات")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-comments">
                    {props.t(" نظرات محصولات")}
                  </Link>
                </li>
                <li className="sub-menu divider-wrapper">
                  <p className="sidebar-divider">
                    <i
                      className="bx bx-cog text-white"
                      style={{ fontSize: "18px" }}
                    ></i>
                    <span> تنظیمات فروشگاه</span>
                  </p>
                  <p className="sidebar-divide-line"></p>
                </li>
                <li>
                  <Link to="/ecommerce-store-information">
                    {props.t("مشخصات فروشگاه ")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-shipping-configuration">
                    {props.t("پیکربندی حمل و نقل")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-payment-configuration">
                    {props.t("پیکربندی پرداخت")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/ecommerce-discount-codes">
                    {props.t("کد تخفیف ")}
                  </Link>
                </li> */}
                <li>
                  <Link to="/ecommerce-transaction-rewards">
                    {props.t("  هدیه تراکنش")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-coupons">{props.t("کوپن ها")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-installment-gateways">
                    {props.t("  درگاه های اقساط")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-return-policy-configuration">
                    {props.t("  پیکربندی مرجوعی کالا")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-measurements">
                    {props.t("واحد اندازه گیری")}
                  </Link>
                </li>
                <li className="sub-menu divider-wrapper">
                  <p className="sidebar-divider">
                    <i
                      className="bx bx-wallet"
                      style={{ fontSize: "18px" }}
                    ></i>
                    <span>سفارشات</span>
                  </p>
                  <p className="sidebar-divide-line"></p>
                </li>
                <li>
                  <Link to="/ecommerce-orders">{props.t("سفارشات")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-installment-requests">
                    {props.t("درخواست های اقساط")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-transactions">
                    {props.t("تراکنش ها")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-product-returns">
                    {props.t("مرجوعی کالا")}
                  </Link>
                </li>
              </ul>
            </li>
            {/* <li>
       <Link to='/#' className='has-arrow '>
        <i className='bx bx-bitcoin'></i>
        <span>{props.t('رمز ارز')}</span>
       </Link>
       <ul className='sub-menu' aria-expanded='false'>
        <li>
         <Link to='/crypto-wallet'>{props.t('کیف پول')}</Link>
        </li>
        <li>
         <Link to='/crypto-buy-sell'>{props.t('خرید/فروش')}</Link>
        </li>
        <li>
         <Link to='/crypto-exchange'>{props.t('تبدیل')}</Link>
        </li>
        <li>
         <Link to='/crypto-lending'>{props.t('امانت دادن')}</Link>
        </li>
        <li>
         <Link to='/crypto-orders'>{props.t('سفارشات')}</Link>
        </li>
        <li>
         <Link to='/crypto-kyc-application'>{props.t('KYC برنامه')}</Link>
        </li>
        <li>
         <Link to='/crypto-ico-landing'>{props.t('ICO لندینگ')}</Link>
        </li>
       </ul>
      </li> */}
            <li>
              <Link to="/email-settings">
                <i className="bx bx-envelope"></i>
                <span>{props.t("تنظیمات ایمیل")}</span>
              </Link>
              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/email-inbox">{props.t("صندوق ورودی")}</Link>
                </li>
                <li>
                  <Link to="/email-read">{props.t("خواندن ایمیل")} </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="t-email-templates">{props.t("قالب ها")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/email-template-basic">پایه</Link>
                    </li>
                    <li>
                      <Link to="/email-template-alert">
                        {props.t("ایمیل هشدار")}{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/email-template-billing">
                        {props.t("ایمیل صورتحساب")}{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul> */}
            </li>
            <li>
              <Link to="/users">
                <i className="bx bx-envelope"></i>
                <span>{props.t("کاربران")}</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-receipt"></i>
                <span>{props.t("فاکتورها")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/invoices-list">{props.t("لیست فاکتورها")}</Link>
                </li>
                <li>
                  <Link to="/invoices-detail">
                    {props.t("جزئیات فاکتورها")}
                  </Link>
                </li>
              </ul>
            </li>
            {/* <li>
       <Link to='/#' className='has-arrow '>
        <i className='bx bx-briefcase-alt-2'></i>
        <span>{props.t('پروژه ها')}</span>
       </Link>
       <ul className='sub-menu' aria-expanded='false'>
        <li>
         <Link to='/projects-grid'>{props.t('شبکه بندی پروژه ها')}</Link>
        </li>
        <li>
         <Link to='/projects-list'>{props.t('لیست پروژه ها')}</Link>
        </li>
        <li>
         <Link to='/projects-overview'>
          {props.t("Project Overview")}
          بررسی اجمالی پروژه
         </Link>
        </li>
        <li>
         <Link to='/projects-create'>{props.t('ایجاد')}</Link>
        </li>
       </ul>
      </li> */}
            {/* <li>
       <Link to='/#' className='has-arrow '>
        <i className='bx bx-task'></i>
        <span>{props.t('وظایف')}</span>
       </Link>
       <ul className='sub-menu' aria-expanded='false'>
        <li>
         <Link to='/tasks-list'>{props.t('لیست وظایف')}</Link>
        </li>
        <li>
         <Link to='/tasks-kanban'>{props.t('وظایف کانبان')}</Link>
        </li>
        <li>
         <Link to='/tasks-create'>{props.t('ایجاد وظیفه')}</Link>
        </li>
       </ul>
      </li> */}
            {/* <li>
       <Link to='/#' className='has-arrow '>
        <i className='bx bxs-user-detail'></i>
        <span>{props.t('مخاطبان')}</span>
       </Link>
       <ul className='sub-menu' aria-expanded='false'>
        <li>
         <Link to='/contacts-grid'>{props.t('شبکه بندی کاربران')}</Link>
        </li>
        <li>
         <Link to='/contacts-list'>{props.t('لیست کاربران')}</Link>
        </li>
        <li>
         <Link to='/contacts-profile'>{props.t('پروفایل')}</Link>
        </li>
       </ul>
      </li> */}
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-detail" />

                <span>{props.t("وبلاگ")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/blog-list">{props.t("لیست وبلاگ")}</Link>
                </li>
                <li>
                  <Link to="/blog-categories">
                    {props.t(" دسته بندی وبلاگ ")}
                  </Link>
                </li>
              </ul>
            </li>
            {isDev && (
              <li>
                <Link to="/#" className="has-arrow ">
                  <i className="bx bxs-detail" />

                  <span>{props.t("صفحه ساز")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/create-page">{props.t("صفحه ساز")}</Link>
                  </li>
                  <li>
                    <Link to="/#">{props.t(" صفحات ")}</Link>
                  </li>
                </ul>
              </li>
            )}
            {isDev && (
              <>
                <li className="menu-title">صفحات</li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-user-circle"></i>
                    <span>{props.t("احراز هویت")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/pages-login">{props.t("ورود")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-login-2">{props.t("ورود 2")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-register">{props.t("ثبت نام")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-register-2">{props.t("ثبت نام 2")}</Link>
                    </li>
                    <li>
                      <Link to="/page-recoverpw">
                        {props.t("بازیابی رمز عبور")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/page-recoverpw-2">
                        {props.t("بازیابی رمز عبور 2")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth-lock-screen">{props.t("صفحه قفل")}</Link>
                    </li>
                    <li>
                      <Link to="/auth-lock-screen-2">
                        {props.t("صفحه قفل 2")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/page-confirm-mail">
                        {props.t("تایید ایمیل")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/page-confirm-mail-2">
                        {props.t("تایید ایمیل 2")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth-email-verification">
                        {props.t("تایید ایمیل")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth-email-verification-2">
                        {props.t("تایید ایمیل 2")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth-two-step-verification">
                        {props.t("احراز هویت دو مرحله ای")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth-two-step-verification-2">
                        {props.t("احراز هویت دو مرحله ای 2")}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-file"></i>
                    <span>{props.t("مفید")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/pages-starter">{props.t("صفحه شروع")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-maintenance">{props.t("نگهداری")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-comingsoon">{props.t("به زودی")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-timeline">{props.t("خط زمانی")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-faqs">{props.t("سوالات متداول")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-pricing">{props.t("قیمت گذاری")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-404">{props.t("ارور 404")}</Link>
                    </li>
                    <li>
                      <Link to="/pages-500">{props.t("ارور 500")}</Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-title">{props.t("اجزاء")}</li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-tone"></i>
                    <span>{props.t("عناصر رابط کاربری")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/ui-alerts">{props.t("هشدار ها")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-buttons">{props.t("دکمه ها")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-cards">{props.t("کارت ها")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-carousel">{props.t("اسلایدر ها")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-dropdowns">{props.t("لیست کشویی")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-grid">{props.t("شبکه بندی")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-images">{props.t("تصاویر")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-lightbox">{props.t("جعبه روشن")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-modals">{props.t("مودال")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-offcanvas">{props.t("OffCanvas منو")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-rangeslider">
                        {props.t("اسلایدر لغزنده")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/ui-session-timeout">
                        {props.t("پایان جلسه")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/ui-progressbars">
                        {props.t("نوارهای پیشرفت")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/ui-placeholders">انواع Placeholders</Link>
                    </li>
                    <li>
                      <Link to="/ui-tabs-accordions">
                        {props.t("Tabs & Accordions")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/ui-typography">{props.t("تایپوگرافی")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-toasts">{props.t("توست ها")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-video">{props.t("ویدیو")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-general">{props.t("عمومی")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-colors">{props.t("رنگ ها")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-rating">{props.t("رتبه بندی")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-notifications">{props.t("اعلانات")}</Link>
                    </li>
                    <li>
                      <Link to="/ui-utilities">{props.t("خدمات رفاهی")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="">
                    <i className="bx bxs-eraser"></i>
                    <span className="badge rounded-pill bg-danger float-end">
                      10
                    </span>
                    <span>{props.t("فرم ها")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/form-elements">{props.t("عناصر فرم")}</Link>
                    </li>
                    <li>
                      <Link to="/form-layouts">
                        {props.t("طرح بندی فرم ها")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/form-validation">
                        {/* {props.t("Form Validation")} */}
                        اعتبارسنجی فرم
                      </Link>
                    </li>
                    <li>
                      <Link to="/form-advanced">
                        {props.t("فرم های پیشرفته")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/form-editors">{props.t("ویرایشگر فرم")}</Link>
                    </li>
                    <li>
                      <Link to="/form-uploads">
                        {props.t("فرم آپلود فایل")}{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/form-repeater">{props.t("تکرار فرم")}</Link>
                    </li>
                    <li>
                      <Link to="/form-wizard">{props.t("فرم ویزارد")}</Link>
                    </li>
                    <li>
                      <Link to="/form-mask">{props.t("فرم ماسک")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-list-ul"></i>
                    <span>{props.t("جدول ها")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/tables-basic">{props.t("جداول پایه")}</Link>
                    </li>
                    <li>
                      <Link to="/tables-datatable">
                        {props.t("جداول داده ای")}
                      </Link>
                    </li>
                    {/* <li>
                  <Link to="/tables-responsive">
                    {props.t("Responsive Table")}
                  </Link>
                </li> */}
                    {/* <li>
                  <Link to="/tables-dragndrop">
                    {props.t("Drag & Drop Table")}
                  </Link>
                </li> */}
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bxs-bar-chart-alt-2"></i>
                    <span>{props.t("نمودار ها")}</span>
                  </Link>

                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/apex-charts">{props.t("Apex نمودار")}</Link>
                    </li>
                    <li>
                      <Link to="/e-charts">{props.t("E نمودار")}</Link>
                    </li>
                    <li>
                      <Link to="/chartjs-charts">
                        {props.t("Chartjs نمودار")}
                      </Link>
                    </li>

                    <li>
                      <Link to="/charts-knob">{props.t("Knob نمودار")}</Link>
                    </li>
                    <li>
                      <Link to="/sparkline-charts">
                        {props.t("Sparkline نمودار")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/re-charts">{props.t("Re نمودار")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-aperture"></i>
                    <span>{props.t("آیکون ها")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/icons-boxicons">{props.t("Boxicons")}</Link>
                    </li>
                    <li>
                      <Link to="/icons-materialdesign">
                        {props.t("Material Design")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                    </li>
                    <li>
                      <Link to="/icons-fontawesome">
                        {props.t("Font awesome")}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-map"></i>
                    <span>{props.t("نقشه ها")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/maps-google">{props.t("نقشه گوگل")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-share-alt"></i>
                    <span>{props.t("چند سطحی")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="/#">{props.t("سطح 1.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#" className="has-arrow">
                        {props.t("سطح 1.2")}
                      </Link>
                      <ul className="sub-menu" aria-expanded="true">
                        <li>
                          <Link to="/#">{props.t("سطح 2.1")}</Link>
                        </li>
                        <li>
                          <Link to="/#">{props.t("سطح 2.2")}</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
