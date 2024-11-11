// import React, { useEffect, useState } from "react";
// import "./Blogs.scss";
// import Loader from "../../Common/Loader/Loader"
// import PostDropMenu from "../PostDropMenu/PostDropMenu";


// export const PostData = [
//   {
//     userProfile: {
//       name: "Shuruti",
//       username: "shrutiqueen",
//       profilePicture:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9-MeiIyc5v6GnRUyZxqT-GMLqOs3KViTHg&s",
//     },
//     post: {
//       postTime: "45 mins ago",
//       postText:
//         "This is an example of a blog post. It's a beautiful day and I'm enjoying every moment!",
//       postImage:
//         "https://i.pinimg.com/736x/48/f6/0b/48f60b661e6e18301672e0b4144b7a84.jpg",
//     },
//   },
//   {
//     userProfile: {
//       name: "Jane Smith",
//       username: "janesmith456",
//       profilePicture:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9-MeiIyc5v6GnRUyZxqT-GMLqOs3KViTHg&s",
//     },
//     post: {
//       postTime: "2 hours ago",
//       postText:
//         "Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! ",
//       postImage: "",
//     },
//   },
//   {
//     userProfile: {
//       name: "Natasha",
//       username: "natasha21",
//       profilePicture:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9-MeiIyc5v6GnRUyZxqT-GMLqOs3KViTHg&s",
//     },
//     post: {
//       postTime: "2 hours ago",
//       postText:
//         "Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! ",
//       postImage: "https://i.pinimg.com/736x/f8/21/99/f82199e51a061b74fd8ea55c89e1139f.jpg",
//     },
//   },
//   {
//     userProfile: {
//       name: "Steve Rogers",
//       username: "steve",
//       profilePicture:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9-MeiIyc5v6GnRUyZxqT-GMLqOs3KViTHg&s",
//     },
//     post: {
//       postTime: "2 hours ago",
//       postText:
//         "Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! ",
//       postImage: "",
//     },
//   },
//   {
//     userProfile: {
//       name: "Nancy Sharma",
//       username: "nancy",
//       profilePicture:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9-MeiIyc5v6GnRUyZxqT-GMLqOs3KViTHg&s",
//     },
//     post: {
//       postTime: "24 hours ago",
//       postText:
//         "Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! ",
//       postImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjXU2efQZnh1cdmF301Ghst4Qv67V-zijJXf5cbBtFRR9BEoXlgncdKQ9FywnSBUIFATs&usqp=CAU",
//     },
//   },
//   {
//     userProfile: {
//       name: "Siddharth Gupta",
//       username: "sid",
//       profilePicture:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQJKyMqYE2AWVU24aoTiGyEbzRxMBHqdND8w&s",
//     },
//     post: {
//       postTime: "24 hours ago",
//       postText:
//         "Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! Had a great time hiking today! The view was absolutely breathtaking! ",
//       postImage: "https://images.pexels.com/photos/868097/pexels-photo-868097.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//   },
// ];

// const Blogs = () => {

//   const [blogs, setBlogs] = useState([]); // State to hold the blogs data
//   const [loading, setLoading] = useState(true); // State to handle loading
//   const [error, setError] = useState(null); // State to handle errors

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const allBlogs = await getAllBlogs();
//         console.log(allBlogs);
//         setBlogs(allBlogs.data); // Set the blogs data
//       } catch (err) {
//         setError(err); // Handle errors
//       } finally {
//         setLoading(false); // Set loading to false after the fetch is complete
//       }
//     };

//     fetchBlogs();
//   }, []);

//   if (loading) return <Loader/>; // Display loading state
//   if (error) return <p>Error loading blogs: {error.message}</p>; // Display error state



//   return (
//     <div>
//       {blogs.map((blog, index) => (
//         <div key={index} className="blog_container commonCard">
//           <div className="blogOwnerInfo">
//            <div className="topFlex">
//            <img
//               src={PostData[0].userProfile.profilePicture}
//               alt="profilePicture"
//             />
//             <div className="nameAndTimeHolder">
//               <h3>{PostData[0].userProfile.name}</h3>
//               <p>{blog.creationDateTime}</p>
//             </div>
//             <span>@{PostData[0].userProfile.username}</span>
//            </div>
            
//           <PostDropMenu/>
//           </div>
//           <div className="blogContent">
//             <p>{blog.textBody}</p>
//             {PostData[0].post.postImage && (
//               <img src={PostData[0].post.postImage} alt="postImage" />
//             )}
//           </div>
          
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Blogs;
