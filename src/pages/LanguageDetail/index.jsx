import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { SectionArticleSideBar } from "./SectionArticleSideBar";

export const LanguageDetail = () => {
  return (
    <Row>
      <Col xl={3} md={3} sm={4}>
        <SectionArticleSideBar />
      </Col>
      <Col>
        <Outlet />
      </Col>
    </Row>
  );
};
