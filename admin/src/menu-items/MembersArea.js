// assets

import { NavLink } from 'react-router-dom';
import { IconKey } from '@tabler/icons-react';

import { IconList } from '@tabler/icons-react';
// constant
const icons = {
  IconKey,
  IconList
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const MembersArea = {
  id: 'pages',
  title: 'Cutomer Area',
  type: 'group',
  children: [
    {
      id: 'Customer',
      title: 'Customer Members',
      type: 'collapse',
      icon: icons.IconList,

      children: [
        // {
        //   id: 'Add New Member',
        //   title: 'Add New Member',
        //   type: 'item',
        //   url: '/add-member',
        //   breadcrumbs: true
        //   // target: true
        // },
        {
          id: 'View Customers',
          title: 'View Customers',
          type: 'item',
          url: '/customer/viewcustomers',
          breadcrumbs: true,
          external: false,
          target: false
        }
        // {
        //   id: 'View Members',
        //   title: ' View Members',
        //   type: 'item',
        //   url: 'customer/viewcustomers',
        //   breadcrumbs: true
        // }

        // {
        //   id: 'Add Member Form',
        //   title: 'Add Member Form',
        //   type: 'item',
        //   url: '/add-member-form',
        //   breadcrumbs: true
        // },
      ]
    }
  ]
};

export default MembersArea;
