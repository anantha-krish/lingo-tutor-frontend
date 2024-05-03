import { useState, useEffect } from "react";
import { getLanguages } from "../api";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const fetchLanguages = async () => {
      var res = await getLanguages();
      if (res.status == 200) {
        setLanguages(res.data);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <Container>
      <Row className="p-2">
        {languages.length > 0 &&
          languages.map((language) => (
            <Col xl={3} lg={4} md sm key={language.id} className="p-4">
              <Card key={language.id} className="w-100">
                <Link className="nav-link" to={`/languages/${language.id}`}>
                  <div style={{ height: 200, width: "100%" }}>
                    <Card.Img
                      variant="top"
                      src={
                        new URL(
                          `../assets/images/${language.id}.png`,
                          import.meta.url
                        ).href
                      }
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                  <Card.Header
                    style={{
                      fontSize: "2rem",
                      textAlign: "center",
                    }}
                    className="text-middle"
                  >
                    {language.name}
                  </Card.Header>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Languages;
