import React from "react";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Toolbox from "./Toolbox";
import SettingsPanel from "./SettingsPanel";
import PageConfigPanel from "./PageConfigPanel";
import LayoutToolbox from "./LayoutToolbox";

const Sidebar = (props) => {
  const { activeTab, setActiveTab } = props;
  return (
    <Card>
      <CardBody>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => setActiveTab("1")}
            >
              طرح‌بندی
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => setActiveTab("2")}
            >
              اجزاء
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => setActiveTab("3")}
            >
              تنظیمات المان
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => setActiveTab("4")}
            >
              تنظیمات صفحه
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="pt-3">
          <TabPane tabId="1">
            <LayoutToolbox />
          </TabPane>
          <TabPane tabId="2">
            <Toolbox />
          </TabPane>
          <TabPane tabId="3">
            <SettingsPanel {...props} />
          </TabPane>
          <TabPane tabId="4">
            <PageConfigPanel {...props} />
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
