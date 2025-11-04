import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const PagesStarter = () => {
  //meta title
  document.title = "Stater Page | Avatar web ";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="ابزارهای مفید" breadcrumbItem="جدول زمانی" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PagesStarter;
