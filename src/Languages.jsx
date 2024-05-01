import { useState, useEffect } from "react";
import { getLanguages } from "./api";
import { Container, Button, Card } from "react-bootstrap";
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
      <Card key={language.id} style={{ width: '18rem', margin: '10px' }} onClick={() => { navigate(`/languages/${language.id}`); }}>
        <Card.Img variant="top" src="./assets/images/404.jpeg" />
        <Card.Body>
          <Card.Title>{language.name}</Card.Title>
        </Card.Body>
      </Card>
      ))}
    </Container>
    
  );
};

export default Languages;
