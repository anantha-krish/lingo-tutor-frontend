import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, saveUserVisitHistory } from "../../api";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import ReactPlayer from "react-player/youtube";
const RenderMedia = ({ mediaLink, mediaType }) => {
  if (mediaType == "image") {
    return <Image height="100%" width="100%" src={mediaLink} />;
  } else if (mediaType == "video") {
    return <ReactPlayer height={300} url={mediaLink} />;
  }
  return <></>;
};
export const ArticleDetailComponent = () => {
  const params = useParams();
  const [article, setArticle] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchArticle = async () => {
      var res = await getArticleById(params.articleId);
      await saveUserVisitHistory(params.articleId);
      if (res.status == 200) {
        setArticle(res.data);
      }
    };
    fetchArticle();
  }, [params.articleId]);

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Button variant="secondary" size="md" onClick={() => navigate("/")}>
            <ArrowLeftCircle style={{ marginRight: 4 }} />
            Back to Languages
          </Button>
        </Col>
      </Row>
      {article && (
        <Row>
          <section>
            <h1>{article.title}</h1>
            <article>
              <p>{article.shortDescription}</p>
              <Container>
                <Row>
                  <Col style={{ maxHeight: 300 }}>
                    <RenderMedia
                      mediaLink={article.mediaLink}
                      mediaType={article.mediaType}
                    />
                  </Col>
                </Row>
              </Container>
              <Row>
                <p>{article.description}</p>
              </Row>
            </article>
          </section>
        </Row>
      )}
    </>
  );
};
