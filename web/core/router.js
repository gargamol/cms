const router = (routes, resolve) => {
  routes.push({
    name: 'Content_Redirect',
    path: '/:id([0-9]{8})',
    component: resolve(__dirname, '../pages/redirects/content.vue'),
  });
  routes.push({
    name: 'Content',
    path: '/*/:id([0-9]{8})/*',
    component: resolve(__dirname, '../pages/content.vue'),
  });
  routes.push({
    name: 'Content2',
    path: '/*/*/:id([0-9]{8})/*',
    component: resolve(__dirname, '../pages/content.vue'),
  });
  routes.push({
    name: 'Section',
    path: '*',
    component: resolve(__dirname, '../pages/section.vue'),
  });

  return routes;
};

module.exports = router;
