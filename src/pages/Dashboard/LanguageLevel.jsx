import { useEffect, useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { ClockLoader } from "react-spinners";
import {
  getLanguageById,
  getLanguages,
  getUserScoreByQuizId,
  useAxiosLoader,
} from "../../api";

export const LanguageLevel = () => {
  const [loading] = useAxiosLoader();
  const [languages, setLanguages] = useState([{ id: 0, name: "" }]);
  const [selectedLang, setSelectedLang] = useState(0);
  const [quizList, setQuizList] = useState([]);
  const [attemptedQuizList, setAttemptedQuizList] = useState([]);
  const [consolidatedQuiz, setConsolidatedQuiz] = useState([
    { id: 0, name: "", score: 0, maxScore: 0, status: "" },
  ]);
  useEffect(() => {
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
  }, [attemptedQuizList, quizList]);

  return (
    <div>
      {languages.map((lang) => (
        <Button
          key={`btn-lang${lang.id}`}
          onClick={() => setSelectedLang(lang.id)}
        >
          {lang.name}
        </Button>
      ))}
      {loading ? (
        <Row>
          <br />
          <br />
          <ClockLoader color="orange" />
        </Row>
      ) : (
        consolidatedQuiz.length > 0 && (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th>Quiz Name</th>
                  <th>Quiz Level</th>
                  <th>Score</th>
                  <th>Max Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {consolidatedQuiz.map((quiz) => (
                  <tr key={`row_${quiz.id}`}>
                    <td>{quiz.name}</td>
                    <td>{quiz.level}</td>
                    <td>{quiz.score}</td>
                    <td>{quiz.maxScore}</td>
                    <td>{quiz.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )
      )}
    </div>
  );
};
