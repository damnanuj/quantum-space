


# Notifications API Documentation
===============================

This document provides details on the available endpoints for managing notifications within the QuantumsSpace platform. Users can fetch notifications and delete individual or all notifications. Each route is protected by an authentication middleware that verifies the JWT token stored in cookies.

----------------------------------------------------------

## Endpoints
---------

### 1. **Get Notifications**

   - **Endpoint**: GET /api/notifications/
   - **Description**: Fetches all notifications for the authenticated user. Notifications are sorted by the latest and will be marked as "read" upon retrieval.
   - **Middleware**: protectRoute - Requires the user to be authenticated (JWT token is stored in cookies).

   - **Request Example**:
     GET /api/notifications/

   - **Response Example**:
     - Success (Status Code 200):
       {
         "success": true,
         "message": "Fetched notifications successfully.",
         "count": <number_of_notifications>,
         "data": [
           {
             "_id": "notification_id",
             "content": "Notification content",
             "type": "Notification type",
             "status": true,
             "from": {
               "username": "Sender's username",
               "profilePicture": "URL of sender's profile picture"
             },
             "createdAt": "Timestamp"
           },
           ...
         ]
       }
     - Failure (Status Code 500):
       {
         "success": false,
         "error": "Internal server error",
         "message": "Error message here"
       }

----------------------------------------------------------

### 2. **Delete Notifications**

   - **Endpoint**: DELETE /api/notifications/delete/:notificationId
   - **Description**: Deletes a specific notification by ID or, if no ID is provided, deletes all notifications for the user.
   - **Middleware**: protectRoute - Requires the user to be authenticated (JWT token is stored in cookies).

   - **Parameters**:
     - **notificationId** (optional): ID of the notification to delete. If omitted, all notifications will be deleted.

   - **Request Example** (Single Deletion):
     DELETE /api/notifications/delete/notification_id

   - **Response Example**:
     - Success (Single Deletion - Status Code 200):
       {
         "success": true,
         "message": "Notification deleted successfully."
       }

     - Success (Bulk Deletion - Status Code 200):
       {
         "success": true,
         "message": "All notifications deleted successfully."
       }

     - Failure (Notification Not Found - Status Code 404):
       {
         "success": false,
         "error": "Notification Not Found",
         "message": "The specified notification could not be found."
       }

     - Failure (Status Code 500):
       {
         "success": false,
         "error": "Internal server error",
         "message": "Error message here"
       }

----------------------------------------------------------

## Notes
-----

- All responses follow a JSON structure with a success status, message, and relevant data or error information.
- Authentication is required for all routes. The JWT token is stored in cookies, so no Authorization header is necessary.

