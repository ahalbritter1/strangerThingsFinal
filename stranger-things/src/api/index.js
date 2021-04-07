import Posts from "../Posts";

const BASE_URL = "https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt";


export const fetchPosts = async (loginToken, postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId ? postId : ""}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  // console.log("PostList", data.data.posts)
  return data;

}

export const createPost = async ({
  loginToken,
  createPostTitle,
  createPostDescription,
  createPostPrice,
  createPostLocation
}) => {
  fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginToken}`
    },
    body: JSON.stringify({
      post: {
        title: `${createPostTitle}`,
        description: `${createPostDescription}`,
        price: `${createPostPrice}`,
        location: `${createPostLocation}`,
        willDeliver: true
      }
    })
  }).then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(console.error);
}


export const editPost = async ({
  loginToken,
  postId,
  editTitle,
  editDescription,
  editPrice,
  editLocation
}) => {
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginToken}`
    },
    body: JSON.stringify({
      post: {
        title: `${editTitle}`,
        description: `${editDescription}`,
        price: `${editPrice}`,
        location: `${editLocation}`,
        willDeliver: true
      }
    })
  }).then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(console.error);
}

export const deletePost = async (loginToken, postId) => {
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginToken}`
    }
  }).then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(console.error);
}



export const fetchLogin = async (username, password) => {

  await fetch('https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt/users/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: `${username}`,
        password: `${password}`
      }
    })
  }
  )
}

export const fetchProfile = async (loginToken) => {

  const resp = await fetch('https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt/users/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginToken}`
    },
  })
  const data = await resp.json();
  return data;
}


// use promise.all when you have two separate fetches 
//   .then(response => response.json())
//     .then(result => {
//       console.log(result);
//     })
//     .catch(console.error);

export async function createMessage(postId, loginToken, message) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt/posts/${postId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify({
          message: {
            content: `${message}`,
          },
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
