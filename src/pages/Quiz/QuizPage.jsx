import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getMcqsByQuizId, submitAnswer } from "../../api";

export const QuizPage = () => {
  const [mcqIds, setMcqIds] = useState([]);
  const [submittedAns, setSubmittedAns] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchMcqs = async () => {
      var res = await getMcqsByQuizId(params.quizId);
      setMcqIds(res.data.mcqs ?? []);
      navigate(
        `/languages/${params.languageId}/quizzes/${params.quizId}/mcqs/${res.data.mcqs[pageNum]}`
      );
    };
    fetchMcqs();
  }, [params.quizId, pageNum, navigate, params.languageId]);

  const finishQuiz = async () => {
    var response = await submitAnswer(params.quizId, submittedAns);
    if (response.status == 200) {
      navigate(`/results/quizzes/${params.quizId}`);
    }
  };
  const navigatePage = (pageNumber) => {
    setPageNum(
      pageNumber,
      navigate(
        `/languages/${params.languageId}/quizzes/${params.quizId}/mcqs/${mcqIds[pageNumber]}`
      )
    );
  };

  const isAnswerSaved = (mcqId) =>
    submittedAns.some((entry) => entry.mcq == mcqId);
  return (
    <Container>
      <Row>
        <Col lg={4}>
          <Button
            variant="outline-secondary"
            size="lg"
            className="mb-4 text-center"
            onClick={() => {
              navigate(`/languages/${params.languageId}`);
            }}
          >
            <ArrowLeftCircle />
            <span style={{ marginLeft: 5 }}>Back to Lessons</span>
          </Button>

          <div className="d-grid gap-4 bg-warning-subtle p-4">
            {mcqIds.length > 0 &&
              mcqIds.map((mcqId, index) => (
                <Button
                  key={index}
                  variant={`outline-${
                    isAnswerSaved(mcqId) ? "primary" : "warning"
                  }`}
                  active={mcqId == params.mcqId}
                  size="lg"
                  onClick={() => {
                    setPageNum(index);
                    `/languages/${params.languageId}/quizzes/${params.quizId}/mcqs/${mcqId}`;
                  }}
                >
                  Q{index + 1}
                </Button>
              ))}
          </div>
        </Col>
        <Col>
          <Outlet context={[submittedAns, setSubmittedAns]} />
          <Container fluid>
            <Row className="mt-4 mb-4">
              <Col>
                {pageNum > 0 && (
                  <Button
                    className=" w-100"
                    type="button"
                    variant="secondary"
                    onClick={() => navigatePage(pageNum - 1)}
                  >
                    Previous
                  </Button>
                )}
              </Col>

              <Col>
                {pageNum < mcqIds.length - 1 ? (
                  <Button
                    className="w-100"
                    onClick={() => navigatePage(pageNum + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button className="w-100" onClick={finishQuiz}>
                    Finish
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
