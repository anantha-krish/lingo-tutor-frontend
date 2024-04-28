import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMcqById } from "../../api";

export const MultiChoiceQnComponent = () => {
  const params = useParams();
  const [multiChoiceQn, setMultiChoiceQn] = useState({
    choices: [],
  });
  useEffect(() => {
    const fetchMcqById = async () => {
      var res = await getMcqById(params.mcqId);
      if (res.status == 200) {
        setMultiChoiceQn(res.data);
      }
    };
    fetchMcqById();
  }, [params.mcqId]);

  return (
    <section>
      <h2>{multiChoiceQn.question}</h2>

      {(multiChoiceQn.choices.length ?? 0) > 0 &&
        multiChoiceQn.choices.map((choice) => (
          <div key={choice.id}>
            <input type="radio" value={choice.id} />
            <label>{choice.label}</label>
          </div>
        ))}
    </section>
  );
};
