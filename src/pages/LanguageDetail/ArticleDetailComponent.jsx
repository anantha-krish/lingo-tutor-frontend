import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";

export const ArticleDetailComponent = () => {
  const params = useParams();
  const [article, setArticle] = useState({
    sections: [],
  });
  useEffect(() => {
    const fetchArticle = async () => {
      var res = await getArticleById(params.articleId);
      if (res.status == 200) {
        setArticle(res.data);
      }
    };
    fetchArticle();
  }, [params.articleId]);

  return (
    <section>
      <h1>{article.title}</h1>
      <article>
        <p>{article.shortDescription}</p>
        <p>{article.mediaLink}</p>
        <p>{article.description}</p>
      </article>
    </section>
  );
};
