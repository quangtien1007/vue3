const admin = [
  {
    path: '/admin',
    component: () => import('../layouts/index.vue'),
    children: [
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('../pages/admin/users/index.vue')
      },
      {
        path: 'users/create',
        name: 'admin-users-create',
        component: () => import('../pages/admin/users/create.vue')
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('../pages/admin/dashboard.vue')
      },
      // {
      //   path: 'settings',
      //   name: 'admin-settings',
      //   component: () => import('../pages/admin/settings/index.vue')
      // },
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/index.vue'),
  }
]

export default admin
