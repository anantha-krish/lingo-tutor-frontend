import { useState, useEffect } from "react";
import { getLanguages } from "../api";
import { Container, Card, Row, Col } from "react-bootstrap";
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
      <Row>
        {languages.map((language) => (
          <Col key={language.id}>
            <Card key={language.id} style={{ width: '20rem', margin: '20px' }} onClick={() => { navigate(`/languages/${language.id}`); }}>
              <Card.Img variant="top" src="../assets/images/read.jpg"/>
              <Card.Title style={{ fontSize: '2rem', textAlign: 'center', margin: '5rem'}}>{language.name}</Card.Title>
            </Card>  
          </Col> 
        ))}
      </Row>
      
    </Container>
    
  );
};

export default Languages;
