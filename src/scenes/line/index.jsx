import { Box } from "@mui/material";
import Header from "../../components/charts/Header";
import LineChart from "../../components/charts/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;