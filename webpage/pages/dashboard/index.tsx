import Grid from '@mui/material/Unstable_Grid2';
import { NextPageWithLayout } from "../../@types/nextjs";
import Layout from "./layout";

const Dashboard: NextPageWithLayout = () => {
  return (
    <Grid container>
      <Grid xs={6}>
      </Grid>
    </Grid>
  );
};

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Dashboard;
