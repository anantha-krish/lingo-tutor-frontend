import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      This is Dashboard
      <div className="container py-5 px-4 mx-auto  border border-primary">
        <h1>Hello, Bootstrap and Vite!</h1>
        <button className="btn btn-success">Primary button</button>
      </div>
      <Link to="/languages">Check</Link>
    </>
  );
};

export default Dashboard;
