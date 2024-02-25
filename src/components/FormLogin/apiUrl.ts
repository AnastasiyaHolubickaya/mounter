const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://mounter-app.netlify.app'
    : 'http://localhost:3000';

export default apiUrl;
