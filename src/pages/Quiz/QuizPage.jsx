import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getMcqsByQuizId, submitAnswer } from "../../api";
import toast from "react-hot-toast";

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
      navigate(`/quizzes/${params.quizId}/mcqs/${res.data.mcqs[pageNum]}`);
    };
    fetchMcqs();
  }, [params.quizId]);

  const finishQuiz = async () => {
    var response = await submitAnswer(params.quizId, submittedAns);
    if (response.status == 200) {
      toast.success(
        `You scored ${response.data.score} out of ${response.data.maxScore}`
      );
    }
  };
  const navigatePage = (pageNumber) => {
    setPageNum(
      pageNumber,
      navigate(`/quizzes/${params.quizId}/mcqs/${mcqIds[pageNumber]}`)
    );
  };

  const isAnswerSaved = (mcqId) =>
    submittedAns.some((entry) => entry.mcq == mcqId);
  return (
    <Container>
      <Row>
        <Col lg={4}>
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
                    navigate(`/quizzes/${params.quizId}/mcqs/${mcqId}`);
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
                    className=" w-100"
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
