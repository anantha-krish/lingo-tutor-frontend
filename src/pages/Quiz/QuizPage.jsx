import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { getMcqsByQuizId } from "../../api";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

export const QuizPage = () => {
  const [mcqIds, setMcqIds] = useState([]);
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
  return (
    <Container>
      <Row>
        <Col>
          <ul>
            {mcqIds.length > 0 &&
              mcqIds.map((mcqId, index) => (
                <li key={index}>
                  <Link to={`/quizzes/${params.quizId}/mcqs/${mcqId}`}>
                    Q{index + 1}
                  </Link>
                </li>
              ))}
          </ul>
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
