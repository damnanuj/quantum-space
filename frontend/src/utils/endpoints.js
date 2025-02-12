const baseUrl = "https://quantum-space.onrender.com/api";
// const baseUrl = "http://localhost:8000/api";

// >>=============authentication endpoints===================>>
export const authEndpoints = {
  signup: `${baseUrl}/auth/signup`,
  logout: `${baseUrl}/auth/logout`,
  login: `${baseUrl}/auth/login`,
  validate_token: `${baseUrl}/auth/validate-token`,
};

// >>=============user endpoints===================>>
export const userEndpoints = {
  getUser: (username) => `${baseUrl}/users/profile/${username}`,
  getSuggestions: `${baseUrl}/users/suggestions`,
  fetchSearchQuery: (searchQuery) =>
    `${baseUrl}/users/suggestions?search=${searchQuery}`,
  followUnfollow: (userId) => `${baseUrl}/users/followUnfollow/${userId}`,
  updateProfileDetails: `${baseUrl}/users/update-profile`,
};

// >>=============posts endpoints===================>>
export const postsEnpoints = {
  createPost: `${baseUrl}/posts/create`,
  deletePost: (postId) => `${baseUrl}/posts/delete/${postId}`,
  likeUnlikePost: (postId) => `${baseUrl}/posts/like-unlike/${postId}`,
  getLikedPosts: `${baseUrl}/posts`,
  getFollowingPosts: `${baseUrl}/posts`,
  getUserPosts: `${baseUrl}/posts`,
  getAllPosts: `${baseUrl}/posts/get-all?limit=10`,
  getOnePostById: `${baseUrl}/posts`,
};
// >>=============notification endpoints===================>>
export const notificationEndpoints = {
  getAll: `${baseUrl}/notifications`,
  deleteOne: `${baseUrl}/notifications/delete`,
  deleteAll: (notificationId) => `${baseUrl}/notifications/${notificationId}`,
};
