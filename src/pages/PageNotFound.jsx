import { useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import NotFoundLogo from "../assets/images/404.jpeg";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <Image src={NotFoundLogo} height={220} />
              <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <span className="display-1 fw-bold">4</span>
                <i className="display-1 text-danger fw-bold">0</i>
                <span className="display-1 fw-bold bsb-flip-h">4</span>
              </h2>
              <h3 className="h2 mb-2">Oops! You seems lost.</h3>
              <p className="mb-5">
                Lingo Tutor did not find your requested page.
              </p>
              <Button variant="outline-secondary" onClick={() => navigate("/")}>
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
