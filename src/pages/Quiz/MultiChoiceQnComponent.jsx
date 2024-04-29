import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getMcqById } from "../../api";
import { Card, Col, Row, Form } from "react-bootstrap";

export const MultiChoiceQnComponent = () => {
  const params = useParams();
  const [submittedAns, setSubmittedAns] = useOutletContext();

  const [multiChoiceQn, setMultiChoiceQn] = useState({
    choices: [],
  });

  const [selected, setSelected] = useState("");

  const saveSelection = (event) => {
    // avoid duplicate entry
    var filterSubmittedAns = submittedAns.filter(
      (obj) => obj.mcq != params.mcqId
    );

    setSubmittedAns([
      ...filterSubmittedAns,
      { mcq: params.mcqId, choice: event.target.value },
    ]);
    setSelected(event.target.value);
  };

  useEffect(() => {
    const fetchMcqById = async () => {
      var res = await getMcqById(params.mcqId);
      if (res.status == 200) {
        setMultiChoiceQn(res.data);
      }
    };
    fetchMcqById();
    var getPreSaved = submittedAns.find((obj) => obj.mcq == params.mcqId);
    setSelected(getPreSaved?.choice ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.mcqId]);
  return (
    <section>
      <h2>{multiChoiceQn.question}</h2>
      <Row>
        {(multiChoiceQn.choices.length ?? 0) > 0 &&
          multiChoiceQn.choices.map((choice) => (
            <Col key={choice.id}>
              <Form.Check // prettier-ignore
                type="radio"
                name="choice"
                className="card_radio_btn"
                value={choice.id}
                id={`radio-${choice.id}`}
                onClick={saveSelection}
                label={
                  <Card
                    style={{ width: "18rem", height: "8rem" }}
                    className={`m-4 card_radio ${
                      selected == choice.id ? "selected" : ""
                    }`}
                  >
                    <Card.Body className="d-flex justify-content-center align-items-center">
                      <Card.Title>{choice.label}</Card.Title>
                    </Card.Body>
                  </Card>
                }
              />
            </Col>
          ))}
      </Row>
    </section>
  );
};
