import React, { useState, useEffect } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]); // 초기값이 배열인지 확인

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found. Redirect to login page or take other actions.');
          return;
        }

        const response = await fetch('http://localhost:8080/api/boards', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Error fetching posts:', response.status);
          return;
        }

        const responseData = await response.json();

        // 데이터가 배열인지 확인하고 상태 업데이트
        if (Array.isArray(responseData.data)) {
          setPosts(responseData.data);
        } else {
          console.error('Data is not an array:', responseData);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>게시물 목록</h2>
      <ul>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <strong>제목 : {post.title}</strong>
              <p>내용 : {post.content}</p>
              <p>작성자 : {post.writer}</p>
              <p>좋아요 : {post.goods}</p>
            </li>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
};

export default PostList;
