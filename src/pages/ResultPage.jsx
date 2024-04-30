import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";
import ResultLogo from "../assets/images/result.png";
import { useEffect, useState } from "react";
import { getUserScoreByQuizId } from "../api";

export const ResultPage = () => {
  const params = useParams();
  const [scoreData, setScoreData] = useState({
    id: 0,
    quizId: 0,
    score: 0,
    maxScore: 0,
    percentage: 0,
  });

  useEffect(() => {
    const fetchQuizScore = async () => {
      var resp = await getUserScoreByQuizId(params.quizId);
      setScoreData({
        ...resp.data,
        percentage: (resp.data.score * 100) / resp.data.maxScore,
      });
    };
    fetchQuizScore();
  }, [params.quizId]);
  const navigate = useNavigate();
  return (
    <section className="h-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <Col />
          <Col lg={6}>
            <div className="text-center">
              <Image
                src={ResultLogo}
                style={{ width: 250, height: "auto", textAlign: "center" }}
              />
              <br />
              Your score for last assesment is
              {scoreData.score > 0 && (
                <h3 className="h2 mb-2" style={{ fontSize: 36 }}>
                  {scoreData.score.toString().padStart(2, 0)} /{" "}
                  {scoreData.maxScore.toString().padStart(2, 0)}
                </h3>
              )}
              <br />
              <span className="text-dark" style={{ fontSize: 24 }}>
                Percentage: {scoreData.percentage.toString().padStart(2, 0)}%
              </span>
              <p className="mb-5">
                Lingo Tutor suggests to you to keep learning.
              </p>
              <Row>
                <Col>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/")}
                  >
                    Back to home
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to dashboard
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
          <Col />
        </div>
      </div>
    </section>
  );
};
