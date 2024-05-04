import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Image,
  Pagination,
  Placeholder,
  Row,
  Table,
} from "react-bootstrap";
import { Calendar, Clock, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import {
  deleteUserVisitHistory,
  getArticleInfoById,
  getUserVisitHistory,
} from "../../api";
import { LazyCell } from "../../components";
import toast from "react-hot-toast";

export const RecentlyVisited = () => {
  var [historyList, setHistory] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [syncReqNum, setSyncReqNum] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    const fetchUserVisitHistory = async () => {
      var res = await getUserVisitHistory(pageNum, pageSize);
      if (res.status === 200) {
        setHistory(res.data.history);
      }
    };
    fetchUserVisitHistory();
  }, [pageNum, pageSize, syncReqNum]);
  const handleDelete = async (articleId, articleName) => {
    var resp = await deleteUserVisitHistory(articleId);
    if (resp.status === 204) {
      toast.success(`${resp.status} Removed ${articleName} from visit history`);
      refresh();
    }
  };
  const refresh = () => setSyncReqNum(Math.random());
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
        <Col>
          <Button onClick={refresh}>Refresh</Button>
        </Col>

        <Col className="justify-end">
          <Pagination>
            {pageNum > 0 && (
              <Pagination.Prev onClick={() => setPageNum(pageNum - 1)}>
                Prev
              </Pagination.Prev>
            )}
          </Pagination>
        </Col>
        <Col className="p-1">
          <strong>Page {pageNum + 1}</strong>
        </Col>
        <Col>
          <Pagination>
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
            <th width="30%"></th>
            <th width="30%"></th>
            <th width="10%"></th>
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
                handleDelete={handleDelete}
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

const ArticleInfoItem = ({ articleId, timeStamp, handleDelete }) => {
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
    active: false,
  });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchArticleInfo = async () => {
      var resp = await getArticleInfoById(articleId);
      if (resp.status === 200) {
        setArticleInfo(resp.data);
      }
    };
    fetchArticleInfo();
  }, [articleId]);

  const dateTime = timeStamp.split("T");
  const date = dateTime[0];
  const time = dateTime[1].split(".")[0];
  const isDeleted = articleInfo.article.id > 0 && !articleInfo.active;
  return (
    <tr>
      {isDeleted ? (
        <>
          {" "}
          <td>
            <Placeholder
              as={Image}
              xs={12}
              style={{ height: 50, width: 50 }}
              bg="secondary"
            ></Placeholder>
          </td>
          <td style={{ verticalAlign: "middle" }}>
            <div className="text-body-tertiary">Deleted or moved</div>
          </td>
        </>
      ) : (
        <>
          <td
            {...(!isDeleted && {
              style: { cursor: "pointer" },
              onClick: () =>
                navigate(
                  `/languages/${articleInfo.language.id}/articles/${articleInfo.article.id}`
                ),
            })}
          >
            <LazyCell>
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
            </LazyCell>
            <LazyCell>{articleInfo.language.name}</LazyCell>
          </td>
          <td
            {...(!isDeleted && {
              style: { cursor: "pointer" },
              onClick: () =>
                navigate(
                  `/languages/${articleInfo.language.id}/articles/${articleInfo.article.id}`
                ),
            })}
          >
            <LazyCell>
              <strong className="text-body-secondary">
                {articleInfo.section.name}
              </strong>
            </LazyCell>
            <div>
              <LazyCell>{articleInfo.article.name}</LazyCell>
            </div>
          </td>
        </>
      )}
      <td>
        <div className="d-flex align-items-center">
          <Calendar className="m-1" />
          <LazyCell>{date}</LazyCell>
        </div>

        <div className="d-flex align-items-center">
          <Clock className="m-1" />
          <LazyCell>{time}</LazyCell>
        </div>
      </td>
      <td>
        <LazyCell>
          <Button
            size="sm"
            variant="outline-danger mt-2"
            onClick={() =>
              handleDelete(articleInfo.article.id, articleInfo.article.name)
            }
          >
            <Trash />
          </Button>
        </LazyCell>
      </td>
    </tr>
  );
};
