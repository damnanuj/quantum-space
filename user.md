# User API

## 1. View Profile

- **URL**: `/api/user/profile/:username`
- **Method**: GET
- **Description**: View a user's profile by their username.
- **Response**:

  - 200 OK: `{"success": true, "message": "User profile fetched successfully", "data": {userProfileData} }`

  - 404 Not Found: `{"success": false, "message": "User not found", "data": null}`

## 2. Follow/Unfollow User

- **URL**: `/api/user/followUnfollow/:targetUserId`
- **Method**: POST
- **Description**: Toggle follow/unfollow by their userId.
- **Response**:

  - 200 OK: `{"success": true, "message": "User unfollowed successfully", "data": { "user": <user_id>, "targetUser": <target_user_id>, "isFollowing": false}}`

  - 200 OK: `{"success": true,"message": "User followed successfully", "data": {"user": <user_id>, "targetUser": <target_user_id>, "isFollowing": true}}`

  - 404 Not Found: `{"success": false, "message": "The person you are trying to follow doesn't exist!"}`

  - 400 Bad Request: `{"success": false, "message": "You cannot follow/unfollow yourself"}`

  - 400 Bad Request: `{"success": false, "message": "The provided user ID is not valid. Please check the ID and try again."}`

## 3. Update Profile

- **URL**: `/api/user/update-profile`
- **Method**: POST
- **Description**: Update the profile of the current user.
- **Request Body**:
  - `username`: string (optional)
  - `bio`: string (optional)
  - `profilePictureUrl`: string (optional)
  - `name` : string (optional)
  - `username` : string (optional)
  - `email` : string (optional)
  - `gender` : string (optional)
  - `city` : string (optional)
  - `state` : string (optional)
  - `country` : string (optional)
  - `about` : string (optional)
  - `education` : string (optional)
  - `profilePicture` : string (optional)
  - `coverPicture` : string (optional)
  - `website` : string (optional)
  - `currentPassword` : string (required)
  - `newPassword` : string (required)
- **Response**:

  - 200 OK: `{"success": true, "message": "User profile updated successfully.", "data":{userProfileData}`

  - 400 Bad Request: `{"success": false, "error": "Invalid Credentials", "message": "Both current password and new password are required to update the password."}`

## 4. Get user Suggestions

- **URL**: `/api/user/suggestions`
- **Method**: GET
- **Description**: Get other user Suggestions
- **Response**:

  - 200 OK: `{"success": true, "count": <suggestions_count>, "data": [{user1},{user2}]}`
