import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import ViewMemberDetails from 'views/view-membersDetails';
// import EditMemberDetails from 'views/edit-members';
import { element } from 'prop-types';
// import AddMember from 'views/add-member';
import ViewCoupons from 'views/coupons/ViewCoupons';
// import ExpiredCoupons from 'views/coupons/ExpiredCoupons';
import Coupons from 'views/coupons/Coupons';
import ViewCustomers from 'views/customer/ViewCustomers';
import ExpiredCopCustomers from 'views/customer/ExpiredCopCustomers';
// import AppliedFellowMembers from 'views/life-members-applied';
// import ViewMemberDetails from 'views/view-members-form';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing

// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
// sample page routing
// const AddMember = Loadable(lazy(() => import('views/add-member')));
// const ViewMembers = Loadable(lazy(() => import('views/view-members')));

// const AppliedMembers = Loadable(lazy(() => import('views/members-applied')));
// // const EditMembers = Loadable(lazy(() => import('views/edit-members')));
// const StateViewBranches = Loadable(lazy(() => import('views/state/state-view-branches')));
// const StateEditMembers = Loadable(lazy(() => import('views/state/state-edit-members')));
// const CreateStateBranch = Loadable(lazy(() => import('views/state/create-state-branch')));
// const LocalViewBranches = Loadable(lazy(() => import('views/Local/local-view-branches')));
// const LocalEditMembers = Loadable(lazy(() => import('views/Local/local-edit-members')));
// const CreateLocalBranch = Loadable(lazy(() => import('views/Local/create-local-branch')));
// // const MemberApplication = Loadable(lazy(() => import('views/view-membersDetails')));
// const AppliedMemberDetails = Loadable(lazy(() => import('views/applied-membersDetails')));
// const Approvals = Loadable(lazy(() => import('views/approvals')));
// const ViewHero = Loadable(lazy(() => import('views/hero')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },



    {
      path: 'coupons',
      // element: <Coupons />
      // element: <><h1>Coupons</h1></>
      element: <Coupons />
    },
    {
      path: 'coupons/viewcoupons',
      // element: <Coupons />
      // element: <><h1>View Coupons</h1></>
      element: <ViewCoupons />
    },
    {
      path: 'coupons/expiredCoupons',
      // element: <Coupons />
      // element: <><h1>Expired Coupons</h1></>
      element: <ExpiredCopCustomers />
      // element: <ExpiredCoupons />
    },
    {
      path: 'customer/viewcustomers',
      // element: <Coupons />
      // element: <><h1>View customers</h1></>
      element: <ViewCustomers />
    },
  ]
};

export default MainRoutes;
