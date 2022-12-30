import { NextPageWithLayout } from "../../@types/nextjs";
import Layout from "./layout";

const Dashboard: NextPageWithLayout = () => {
  return (<></>);
};

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Dashboard;
