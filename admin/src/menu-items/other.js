// assets
import { IconBrandChrome, IconHelp ,IconPhoto } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconPhoto };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'Poster',
      title: 'Poster Section',
      type: 'item',
      url: '/poster',
      icon: icons.IconPhoto,
      breadcrumbs: true
    },
    // {
    //   id: 'sample-page',
    //   title: 'Sample Page',
    //   type: 'item',
    //   url: '/sample-page',
    //   icon: icons.IconBrandChrome,
    //   breadcrumbs: true
    // },
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/berry/',
    //   icon: icons.IconHelp,
    //   external: true,
    //   target: true
    // }
  ]
};

export default other;
