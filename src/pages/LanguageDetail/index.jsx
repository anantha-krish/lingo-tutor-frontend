import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { SectionArticleSideBar } from "./SectionArticleSideBar";

export const LanguageDetail = () => {
  return (
    <Row style={{ minHeight: "86vh" }}>
      <Col xl={3} md={3} sm={4}>
        <SectionArticleSideBar />
      </Col>
      <Col>
        <Outlet />
      </Col>
    </Row>
  );
};
