// assets
import { IconKey } from '@tabler/icons-react';
import { IconList } from '@tabler/icons-react';
// constant
const icons = {
  IconKey,
  IconList
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const Coupons = {
  id: 'Coupons',
  title: 'Coupons',
  type: 'group',
  children: [
    {
      id: 'Coupons Section',
      title: 'Coupons Section',
      type: 'collapse',
      icon: icons.IconList,

      children: [
        {
          id: 'Send Coupons',
          title: 'Send Coupons',
          type: 'item',
          url: '/coupons',
          breadcrumbs: true
        },
        {
          id: 'View Coupons',
          title: 'View Coupons',
          type: 'item',
          url: '/coupons/viewcoupons',
          breadcrumbs: true
        },
        {
          id: 'Expired Coupons',
          title: 'Expired Coupons',
          type: 'item',
          url: '/coupons/expiredCoupons',
          breadcrumbs: true
        }
        // {
        //   id: 'Expired Coupons',
        //   title: 'Expired Coupons',
        //   type: 'item',
        //   url: 'coupons/expiredCoupons',
        //   breadcrumbs: true
        // }
      ]
    }
  ]
};

export default Coupons;
