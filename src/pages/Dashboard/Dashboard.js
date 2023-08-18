import Topbar from "../Topbar/Topbar";
import "./Dashboard.css";
import DashboardRows from "./DashboardRows";

const Dashboard = () => {
  return (
    <div>
      <Topbar />
      <div className="widgets">
        <DashboardRows />
      </div>
    </div>
  );
};

export default Dashboard;
