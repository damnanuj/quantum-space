const baseUrl = "https://quantum-space.onrender.com/api";

export const authEndpoints = {
  signup: `${baseUrl}/auth/signup`,
  logout: `${baseUrl}/auth/logout`,
  login: `${baseUrl}/auth/login`,
  validate_token: `${baseUrl}/auth/validate-token`,
};

export const userEndpoints = {
  getUser: (username) => `${baseUrl}/users/profile/${username}`,
  getSuggestions: `${baseUrl}/users/suggestions`,
  followUnfollow: (userId) => `${baseUrl}/users/followUnfollow/${userId}`,
  updateProfileDetails: `${baseUrl}/users/update-profile`,
};

export const postsEnpoints = {
  createPost: `${baseUrl}/posts`,
  deletePost: `${baseUrl}/posts`,
  likeUnlikePost: `${baseUrl}/posts`,
  getLikedPosts: `${baseUrl}/posts`,
  getFollowingPosts: `${baseUrl}/posts`,
  getUserPosts: `${baseUrl}/posts`,
  getAllPosts: `${baseUrl}/posts`,
  getOnePostById: `${baseUrl}/posts`,
};

export const notificationEndpoints = {
  getAll: `${baseUrl}/notifications`,
  deleteOne: `${baseUrl}/notifications/delete`,
  deleteAll: (notificationId) => `${baseUrl}/notifications/${notificationId}`,
};
