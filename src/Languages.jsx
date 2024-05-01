import { useState, useEffect } from "react";
import { getLanguages } from "./api";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLanguages = async () => {
      var res = await getLanguages();
      if (res.status == 200) {
        setLanguages(res.data);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <Container>
      {languages.map((language) => (
      <Card key={language.id} style={{ width: '60rem', margin: '70px', height: '20rem', background:'#cce6ff'}} onClick={() => { navigate(`/languages/${language.id}`); }}>
          <Card.Title style={{ fontSize: '7rem', textAlign: 'center', margin: '5rem'}}>{language.name}</Card.Title>
      </Card>
      ))}
    </Container>
    
  );
};

export default Languages;
