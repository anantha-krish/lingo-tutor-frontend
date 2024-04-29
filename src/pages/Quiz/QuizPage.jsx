import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getMcqsByQuizId } from "../../api";

export const QuizPage = () => {
  const [mcqIds, setMcqIds] = useState([]);
  const [submittedAns, setSubmittedAns] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchMcqs = async () => {
      var res = await getMcqsByQuizId(params.quizId);
      setMcqIds(res.data.mcqs ?? []);
      navigate(`/quizzes/${params.quizId}/mcqs/${res.data.mcqs[0]}`);
    };
    fetchMcqs();
  }, [params.quizId]);

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
                  active={isAnswerSaved(mcqId) || mcqId == params.mcqId}
                  size="lg"
                  onClick={() =>
                    navigate(`/quizzes/${params.quizId}/mcqs/${mcqId}`)
                  }
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
                <Button className=" w-100" type="button" variant="secondary">
                  Previous
                </Button>
              </Col>

              <Col>
                <Button className=" w-100" type="submit">
                  Next
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
