export default ({ app, redirect }) => {
  const hasToken = !!app.$apolloHelpers.getToken();
  if (!hasToken) {
    return redirect('/admin/login');
  }
};
