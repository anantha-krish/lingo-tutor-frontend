import { useEffect, useState } from "react";
import { Accordion, Col, Nav, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArticleInfoById, getLanguageById } from "../../api";
import toast from "react-hot-toast";
export const SectionArticleSideBar = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = useState({
    sections: [],
    quizzes: [],
  });
  useEffect(() => {
    const fetchMenu = async () => {
      var res = await getLanguageById(params.languageId);
      if (res.status == 200) {
        setLang(res.data);

        if (!params.articleId) {
          if (res.data.sections.length > 0) {
            navigate(
              `/languages/${params.languageId}/articles/${res.data.sections[0].articles[0].id}`
            );
          } else {
            toast.error("Oops!! No Sections found for this language");
          }
        } else {
          const fetchArticleInfo = async () => {
            var resp = await getArticleInfoById(params.articleId);
            if (resp.status === 200) {
              setSelectedSection(resp.data.section.id);
            }
          };
          fetchArticleInfo();
        }
      }
    };
    fetchMenu();
  }, [params.articleId, params.languageId]);

  const [selectedSection, setSelectedSection] = useState();
  return (
    <>
      <Row>
        <Col>
          <Nav className="text-bg-light sidebar w-100 h-100">
            {selectedSection && (
              <Accordion
                className="w-100"
                defaultActiveKey={selectedSection}
                alwaysOpen
              >
                {lang.sections.map((section, index) => (
                  <Accordion.Item
                    key={`key_${section.id}`}
                    eventKey={section.id}
                  >
                    <Accordion.Header>
                      <strong>
                        L{(index + 1).toString().padStart(2, 0)}: {section.name}{" "}
                      </strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        {section.articles.map((article) => (
                          <Link
                            key={article.id}
                            to={`/languages/${params.languageId}/articles/${article.id}`}
                            className={`d-flex mb-2 ${
                              params.articleId == article.id ? "active" : ""
                            }`}
                          >
                            {article.name}
                          </Link>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
                {lang.quizzes.length > 0 && (
                  <Accordion.Item eventKey="quiz_section">
                    <Accordion.Header>
                      <strong>Quiz Section</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        {lang.quizzes.map((quiz) => (
                          <Link
                            className="d-flex mb-2"
                            key={quiz.id}
                            to={`/languages/${params.languageId}/quizzes/${quiz.id}`}
                          >
                            {quiz.name}
                          </Link>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
              </Accordion>
            )}
          </Nav>
        </Col>
      </Row>
    </>
  );
};
