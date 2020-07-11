import { RouteInfo } from './sidebar.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'ft-home',
    class: '',
    badge: '',
    badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
    isExternalLink: false,
    submenu: []
  },
  {
    path: '/customers',
    title: 'Customers',
    icon: 'ft-users',
    class: 'has-sub',
    badge: '',
    badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
    isExternalLink: false,
    submenu: [
      { path: '/customer/customers', title: 'Customers', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/customer/customer-groups', title: 'Customer Groups', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
     ]}, 
     {
      path: '/sellers',
      title: 'Sellers',
      icon: 'ft-users',
      class: 'has-sub',
      badge: '',
      badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
      isExternalLink: false,
      submenu: [
        { path: '/seller/sellers', title: 'Sellers', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/seller/seller-activities', title: 'Seller Activities', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/seller/seller-payout', title: 'Seller Payout', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
       ]},
       {
        path: '/catalogues',
        title: 'Catalogue',
        icon: 'ft-users',
        class: 'has-sub',
        badge: '',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
        isExternalLink: false,
        submenu: [
          { path: '/catalogues/manufacturing-brand', title: 'Manufacturer / Brands', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/catalogues/categories', title: 'Categories', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/catalogues/parent-categories', title: 'Parent Categories', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        
         ]},
         {
          path: '/systemsetting',
          title: 'System Settings',
          icon: 'ft-users',
          class: 'has-sub',
          badge: '',
          badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
          isExternalLink: false,
          submenu: [
            { path: '/systemsetting/supplytype', title:'Supply Type', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/systemsetting/country', title: 'Country', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          
           ]},
     { 
      path: '/users',
      title: 'User & Permission',
      icon: 'ft-user-check',
      class: 'has-sub',
      badge: '',
      badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
      isExternalLink: false,
      submenu: [
        { path: '/user-permissions/users', title: 'Users', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/user-permissions/user-permissions', title: 'Permissions', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
       ]},

  // {
  //   path: '/users',
  //   title: 'Users',
  //   icon: 'ft-users',
  //   class: 'has-sub',
  //   badge: '',
  //   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //   isExternalLink: false,
  //   submenu: [
  //     {
  //       path: '/users/expert-listing',
  //       title: 'Expert Listing',
  //       icon: '',
  //       class: '',
  //       badge: '',
  //       badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //       isExternalLink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/users/professional-listing',
  //       title: 'Professional Listing',
  //       icon: '',
  //       class: '',
  //       badge: '',
  //       badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //       isExternalLink: false,
  //       submenu: []
  //     },

  //   ]
  // },
  // {
  //   path: '/companies',
  //   title: 'Companies',
  //   icon: 'fa fa-building-o',
  //   class: '',
  //   badge: '',
  //   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //   isExternalLink: false,
  //   submenu: []
  // },
  // {
  //   path: '/experience',
  //   title: 'Experience',
  //   icon: 'fa fa-tasks',
  //   class: '',
  //   badge: '',
  //   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //   isExternalLink: false,
  //   submenu: []
  // },
  // {
  //   path: '/categories',
  //   title: 'Categories',
  //   icon: 'fa fa-tasks',
  //   class: '',
  //   badge: '',
  //   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //   isExternalLink: false,
  //   submenu: []
  // },
  // {
  //   path: '/skill',
  //   title: 'Skills',
  //   icon: 'fa fa-tasks',
  //   class: '',
  //   badge: '',
  //   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //   isExternalLink: false,
  //   submenu: []
  // },
  // {
  //   path: '/event',
  //   title: 'Events',
  //   icon: 'fa fa-tasks',
  //   class: '',
  //   badge: '',
  //   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //   isExternalLink: false,
  //   submenu: []
  // },
  // {
  //   path: '/questions',
  //   title: 'Questions',
  //   icon: 'fa fa-tasks',
  //   class: '',
  //   badge: '',
  //   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //   isExternalLink: false,
  //   submenu: []
  // }
];
