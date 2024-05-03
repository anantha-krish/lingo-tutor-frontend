import { useEffect, useState } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLanguageById } from "../../api";
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
        console.log(res.data);
        navigate(
          `/languages/${params.languageId}/articles/${res.data.sections[0].articles[0].id}`
        );
      }
    };
    fetchMenu();
  }, [params.languageId, navigate]);
  return (
    <Nav className="text-bg-light sidebar">
      {lang.sections.length > 0 && (
        <Accordion
          className="w-100"
          defaultActiveKey={lang.sections[0].id}
          alwaysOpen
        >
          {lang.sections.map((section, index) => (
            <Accordion.Item key={`key_${section.id}`} eventKey={section.id}>
              <Accordion.Header>
                <strong>
                  Section {(index + 1).toString().padStart(2, 0)}:{" "}
                  {section.name}{" "}
                </strong>
              </Accordion.Header>
              <Accordion.Body>
                <ul style={{ listStyle: "none" }}>
                  {section.articles.map((article) => (
                    <li key={article.id} className="p-2">
                      <Link
                        to={`/languages/${params.languageId}/articles/${article.id}`}
                      >
                        {article.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          ))}
          {lang.quizzes.length > 0 && (
            <Accordion.Item eventKey="quiz_section">
              <Accordion.Header>
                <strong>Quiz Section</strong>
              </Accordion.Header>
              <Accordion.Body>
                <ul style={{ listStyle: "none" }}>
                  {lang.quizzes.map((quiz) => (
                    <li key={quiz.id} className="p-2">
                      <Link
                        to={`/languages/${params.languageId}/quizzes/${quiz.id}`}
                      >
                        {quiz.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      )}
    </Nav>
  );
};
