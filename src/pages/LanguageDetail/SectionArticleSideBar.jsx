import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLanguageById, saveArticleVisit } from "../../api";
import { getUsername } from "../../sessionManager";
export const SectionArticleSideBar = () => {
  const params = useParams();
  const navigate = useNavigate();
  var username = getUsername();
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
      <div>
        <ul>
          {lang.sections.length > 0 &&
            lang.sections.map((section) => (
              <li key={section.id} className="p-2">
                {section.name}
                <ul>
                  {section.articles.map((article) => (
                    <li key={article.id} className="p-2">
                      <Link
                        to={`/languages/${params.languageId}/articles/${article.id}`}
                        onClick={() => {
                          saveArticleVisit(article.id);
                        }}
                      >
                        {article.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <ul>
          {lang.quizzes.length > 0 && (
            <>
              <h4>Quiz</h4>
              {lang.quizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  to={`/languages/${params.languageId}/quizzes/${quiz.id}`}
                >
                  <li>{quiz.name} </li>
                </Link>
              ))}
            </>
          )}
        </ul>
      </div>
    </Nav>
  );
};
