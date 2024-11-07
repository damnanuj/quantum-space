
# Posts API

## 1. Create Post
- **URL**: `/api/posts/create`
- **Method**: POST
- **Description**: Create a new post.
- **Request Body**:
  - `caption`: string (required)
  - `image`: string (Image URL optional)
- **Response**:
  - 201 Created: `{"success": true, "message": "Post created successfully", "data": {postData} }`
  - 400 Bad Request: `{"success": false, "message": "Validation error message" }`

## 2. Delete Post
- **URL**: `/api/posts/delete/:postId`
- **Method**: DELETE
- **Description**: Delete a post by its ID.
- **Response**:
  - 200 OK: `{"success": true, "message": "Post deleted successfully" }`
  - 404 Not Found: `{"success": false, "message": "Post not found" }`

<!-- This functionality is not available at this moment will add it later -->
<!-- ## 3. Edit Post
- **URL**: `/api/posts/edit/:postId`
- **Method**: PATCH
- **Description**: Edit an existing post by its ID.
- **Request Body**:
  - `caption`: string (optional)
  - `imageUrl`: string (optional)
- **Response**:
  - 200 OK: `{ "message": "Post updated successfully", "post": {updatedPostData} }`
  - 404 Not Found: `{ "error": "Post not found" }` -->
## 3. Like or Unlike Post
- **URL**: `/api/posts/like-unlike/:postId`
- **Method**: POST
- **Description**: Toggles Like and Unlike of the post 
- **Response**:
  - 200 OK: `{"success": true, "message": "Post Liked!", "likesCount" : <number_of_likes> }`
  - 404 Not Found: `{"success": false,  "error": "Invalid post ID", "message": "The provided post ID is not valid." }`