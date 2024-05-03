import { useEffect, useState } from "react";
import {
  Col,
  Dropdown,
  Image,
  Pagination,
  Placeholder,
  Row,
  Table,
} from "react-bootstrap";
import { Calendar, Clock } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { getArticleInfoById, getUserVisitHistory } from "../../api";

export const RecentlyVisited = () => {
  var [historyList, setHistory] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    const fetchUserVisitHistory = async () => {
      var res = await getUserVisitHistory(pageNum, pageSize);
      if (res.status === 200) {
        setHistory(res.data.history);
      }
    };
    fetchUserVisitHistory();
  }, [pageNum, pageSize]);

  return (
    <>
      <Row className="history-pagination">
        <Col>
          <Dropdown onSelect={(eventKey) => setPageSize(parseInt(eventKey))}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {pageSize} Rows
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={2}>2</Dropdown.Item>
              <Dropdown.Item eventKey={5}>5 </Dropdown.Item>
              <Dropdown.Item eventKey={10}>10</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="p-1">Page {pageNum + 1}</Col>
        <Col className="justify-end">
          <Pagination>
            {pageNum > 0 && (
              <Pagination.Prev onClick={() => setPageNum(pageNum - 1)}>
                Prev
              </Pagination.Prev>
            )}
            <Pagination.Next onClick={() => setPageNum(pageNum + 1)}>
              Next
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
      <Table hover responsive borderless>
        <thead>
          <tr>
            <th width="20%"></th>
            <th width="40%"></th>
            <th width="30%"></th>
          </tr>
          <tr>
            <th colSpan={3}>Visit History </th>
          </tr>
        </thead>
        <tbody>
          {historyList.length > 0 ? (
            historyList.map((history) => (
              <ArticleInfoItem
                key={history.articleId}
                articleId={history.articleId}
                timeStamp={history.timestamp}
              />
            ))
          ) : (
            <tr>
              <td colSpan={3}> No results to show</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
  const dateTime = timeStamp.split("T");
  const date = dateTime[0];
  const time = dateTime[1].split(".")[0];
  return isLoading ? (
    <tr>
      <td colSpan={3}>
        <Placeholder />
      </td>
    </tr>
  ) : (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() =>
        navigate(
          `/languages/${articleInfo.language.id}/articles/${articleInfo.article.id}`
        )
      }
    >
      <td>
        {" "}
        <div style={{ height: 50, width: 50 }}>
          <Image
            variant="top"
            src={
              new URL(
                `../../assets/images/${articleInfo.language.id}.png`,
                import.meta.url
              ).href
            }
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        {articleInfo.language.name}
      </td>
      <td>
        <strong className="text-body-secondary">
          {articleInfo.section.name}
        </strong>
        <div>{articleInfo.article.name}</div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <Calendar className="m-1" />
          {date}
        </div>

        <div className="d-flex align-items-center">
          <Clock className="m-1" />
          {time}
        </div>
      </td>
    </tr>
  );
};
