// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconList } from '@tabler/icons-react';
import ApprovalIcon from '@mui/icons-material/Approval';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconList,
  ApprovalIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'pages',
  title: 'Applied Members',
  type: 'group',
  children: [
    {
      // id: 'Applied Members',
      title: 'Applied Members',
      type: 'collapse',
      icon: icons.IconList,

      children: [
        {
          id: 'Life Members',
          title: 'Life Members', // Differentiate the title
          type: 'item',
          url: '/applied-members', // Ensure the correct URL
          icon: icons.ApprovalIcon,
          breadcrumbs: true
        },
        {
          id: 'Fellow Members',
          title: 'Fellow Members', // Differentiate the title
          type: 'item',
          url: '/applied-fellow-members', // Ensure the correct URL
          icon: icons.ApprovalIcon,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default utilities;
