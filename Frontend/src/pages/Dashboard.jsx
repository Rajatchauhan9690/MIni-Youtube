import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <p>Your ID is: {id}</p>
    </div>
  );
};

export default Dashboard;
