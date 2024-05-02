import { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Nav,
  Placeholder,
  ProgressBar,
  Tab,
  Table,
} from "react-bootstrap";
import {
  getLanguageById,
  getLanguages,
  getUserScoreByQuizId,
  useAxiosLoader,
} from "../../api";
import {
  Check2,
  Check2Circle,
  CheckCircleFill,
  Clipboard2Check,
  Clipboard2CheckFill,
  Clipboard2X,
  Clipboard2XFill,
  XCircleFill,
} from "react-bootstrap-icons";

export const LanguageLevel = () => {
  const [loading] = useAxiosLoader();
  const [languages, setLanguages] = useState([{ id: 0, name: "" }]);
  const [selectedLang, setSelectedLang] = useState(0);
  const [quizList, setQuizList] = useState([]);
  const [attemptedQuizList, setAttemptedQuizList] = useState([]);
  const [consolidatedQuiz, setConsolidatedQuiz] = useState([
    { id: 0, name: "", score: 0, maxScore: 0, status: "" },
  ]);
  const [level, setLevel] = useState();
  const [percentage, setPercentage] = useState();
  useLayoutEffect(() => {
    const fetchLanguages = async () => {
      var langListResp = await getLanguages();
      if (langListResp.status === 200) {
        setLanguages(langListResp.data);
        setSelectedLang(langListResp.data[0].id);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (selectedLang === 0) return;
    const fetchAllQuizzesByLang = async () => {
      var langDetailResp = await getLanguageById(selectedLang);

      if (langDetailResp.status === 200) {
        setQuizList(langDetailResp.data.quizzes);
      }
    };
    fetchAllQuizzesByLang();
  }, [selectedLang]);

  useEffect(() => {
    if (quizList.length === 0) return;
    const fetchUserScoreForQuiz = async () => {
      var promiseMap = quizList.map(({ id }) => getUserScoreByQuizId(id));
      Promise.all(promiseMap).then((resp) =>
        setAttemptedQuizList(
          resp.filter(({ status }) => status === 200).map((resp) => resp.data)
        )
      );
    };
    fetchUserScoreForQuiz();
  }, [quizList]);

  useEffect(() => {
    if (quizList.length === 0) return;

    var consolidatedList = [];
    for (var quiz of quizList) {
      var quizAttempt = attemptedQuizList.find(
        (quizItem) => quizItem.quizId === quiz.id
      );
      var score = 0;
      var maxScore = quiz.maxScore;
      var status = "NOT_ATTEMPTED";
      if (quizAttempt != null) {
        score = quizAttempt.score;
        status = "ATTEMPTED";
      }
      consolidatedList = [
        ...consolidatedList,
        { ...quiz, score, maxScore, status },
      ];
    }
    setConsolidatedQuiz(consolidatedList);
  }, [attemptedQuizList, quizList, loading]);

  useEffect(() => {
    if (consolidatedQuiz.length == 0) return;
    var userLevel = [
      "L1 Beginner",
      "L2 Intermediate",
      "L3 Advanced",
      "L4 Expert",
    ];
    var total = consolidatedQuiz.reduce(
      (prev, curr) => ({
        score: prev.score + curr.score,
        maxScore: curr.maxScore + prev.maxScore,
      }),
      { score: 0, maxScore: 0 }
    );

    var percentage = Math.floor((total.score * 100) / total.maxScore);
    setPercentage(percentage);
    var level = 0;
    if (percentage > 80) {
      level = 3;
    } else if (percentage > 60) {
      level = 2;
    } else if (percentage > 30) {
      level = 1;
    }
    setLevel(userLevel[level]);
  }, [consolidatedQuiz]);
  const renderData = (data) =>
    loading ? <Placeholder xs={12} bg="secondary" /> : data;
  const getBarColor = () => {
    if (percentage > 80) {
      return "success";
    } else if (percentage > 60) {
      return "info";
    } else if (percentage > 30) {
      return "warning";
    }
    return "danger";
  };
  return (
    <Tab.Container defaultActiveKey={selectedLang}>
      <Nav variant="pills">
        {languages.map((lang) => (
          <Nav.Item key={`btn-lang${lang.id}`} className="p-1">
            <Nav.Link
              onClick={() => setSelectedLang(lang.id)}
              active={selectedLang == lang.id}
            >
              {lang.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content>
        {consolidatedQuiz.length > 0 && (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th>Quiz Name</th>
                  <th>Difficulty Level</th>
                  <th className="text-center">Score</th>
                  <th className="text-center">Max Score</th>
                  <th className="text-center">Certified</th>
                </tr>
              </thead>
              <tbody>
                {consolidatedQuiz.map((quiz) => (
                  <tr className="align-top" key={`row_${quiz.id}`}>
                    <td>{renderData(quiz.name)}</td>
                    <td>
                      {renderData(
                        quiz.level && (
                          <span
                            className={`badge text-bg-${
                              quiz.level === "EASY" ? "success" : ""
                            }${quiz.level === "MEDIUM" ? "warning" : ""}${
                              quiz.level === "HARD" ||
                              quiz.level === "DIFFICULT"
                                ? "danger"
                                : ""
                            }`}
                            style={{ textTransform: "capitalize" }}
                          >
                            {quiz.level.toLowerCase()}
                          </span>
                        )
                      )}
                    </td>
                    <td className="text-center">{renderData(quiz.score)}</td>
                    <td className="text-center">{renderData(quiz.maxScore)}</td>
                    <td className="text-center">
                      {renderData(
                        <>
                          {quiz.status === "ATTEMPTED" ? (
                            <CheckCircleFill className="text-success" />
                          ) : (
                            <XCircleFill className="text-danger" />
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="text-end" colSpan={5}>
                    {renderData(
                      <>
                        Your language level:
                        <strong> {renderData(level)}</strong>
                        <br />
                      </>
                    )}

                    {renderData(
                      <ProgressBar
                        now={percentage}
                        variant={getBarColor()}
                        min={0}
                        max={100}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Tab.Content>
    </Tab.Container>
  );
};
