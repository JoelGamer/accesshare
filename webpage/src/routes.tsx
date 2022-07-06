import { Routes as DomRoutes, Route, BrowserRouter } from 'react-router-dom';
import Accounts from './pages/accounts';
import ListAccounts from './pages/accounts/list';
import NewAccount from './pages/accounts/new';
import GroupUsers from './pages/group_users';
import ListGroupUsers from './pages/group_users/list';
import NewGroupUser from './pages/group_users/new';
import GroupUsersPermissions from './pages/group_users/permissions';
import ListGroupUserPermissions from './pages/group_users/permissions/list';
import NewGroupUserPermission from './pages/group_users/permissions/new';
import Invoices from './pages/invoices';
import Groups from './pages/login/groups';
import ListGroups from './pages/login/groups/list';
import NewGroup from './pages/login/groups/new';
import SignIn from './pages/login/sign-in';
import SignUp from './pages/login/sign-up';
import Profile from './pages/profile';
import Root from './pages/root';
import AuthorizedRoot from './pages/root/authorized';
import UnauthorizedRoot from './pages/root/unauthorized';

const Routes = () => {
  return (
    <BrowserRouter>
      <DomRoutes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<AuthorizedRoot />}>
            <Route path="dashboard" element={<></>} />
            <Route path="accounts" element={<Accounts />}>
              <Route index element={<ListAccounts />} />
              <Route path="new" element={<NewAccount />} />
            </Route>
            <Route path="group-users" element={<GroupUsers />}>
              <Route index element={<ListGroupUsers />} />
              <Route path="new" element={<NewGroupUser />} />
              <Route path=":id/permissions" element={<GroupUsersPermissions />}>
                <Route index element={<ListGroupUserPermissions />} />
                <Route path="new" element={<NewGroupUserPermission />} />
              </Route>
            </Route>
            <Route path="invoices" element={<Invoices />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<UnauthorizedRoot />}>
            <Route index element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="groups" element={<Groups />}>
              <Route index element={<ListGroups />} />
              <Route path="new" element={<NewGroup />} />
            </Route>
          </Route>
        </Route>
      </DomRoutes>
    </BrowserRouter>
  );
}

export default Routes;
