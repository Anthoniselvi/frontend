import NewSidebar from "../Sidebar/NewSidebar";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./Dashboard.css";
import DashboardRows from "./DashboardRows";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
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
