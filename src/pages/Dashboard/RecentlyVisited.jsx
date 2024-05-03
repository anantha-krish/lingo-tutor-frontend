import { useEffect, useState } from "react";
import { getArticleInfoById, getUserVisitHistory } from "../../api";
import { Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

export const RecentlyVisited = () => {
  var [historyList, setHistory] = useState([]);
  useEffect(() => {
    const fetchUserVisitHistory = async () => {
      var res = await getUserVisitHistory();
      if (res.status === 200) {
        setHistory(res.data.history);
      }
    };
    fetchUserVisitHistory();
  }, []);
  return (
    <ul>
      {historyList.length > 0 &&
        historyList.map((history) => (
          <ArticleInfoItem
            key={history.articleId}
            articleId={history.articleId}
            timeStamp={history.timestamp}
          />
        ))}
    </ul>
  );
};

const ArticleInfoItem = ({ articleId, timeStamp }) => {
  const [articleInfo, setArticleInfo] = useState({
    article: {
      id: 0,
      name: "",
    },
    section: {
      id: 0,
      name: "",
    },
    language: {
      id: 0,
      name: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchArticleInfo = async () => {
      var resp = await getArticleInfoById(articleId);
      if (resp.status === 200) {
        setArticleInfo(resp.data);
        setIsLoading(false);
      }
    };
    fetchArticleInfo();
  }, [articleId]);

  return isLoading ? (
    <li>
      <span>
        <Placeholder />
      </span>
      <span>
        <Placeholder />
      </span>
    </li>
  ) : (
    <li>
      <span>
        <Link
          to={`/languages/${articleInfo.language.id}/articles/${articleInfo.article.id}`}
        >
          {articleInfo.article.name}
        </Link>
      </span>
      <span>{timeStamp.split("T")}</span>
    </li>
  );
};
