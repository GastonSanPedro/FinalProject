import axios from 'axios';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const GET_POSTS = 'GET_POSTS';
export const SINGLE_POST = 'SINGLE_POST';
export const CLEAN_SINGLE_POST = 'CLEAN_SINGLE_POST';
export const POST_COMMENT = 'POST_COMMENT';
export const POST_REACTION_POST = 'POST_REACTION_POST';
export const POST_REACTION_COMMENT = 'POST_REACTION_USER';
export const POST_USER = 'POST_USER';
export const CREATE_USER_POST = 'CREATE_USER_POST';
export const CREATE_USER = 'CREATE_USER';
export const SEARCH_USER = 'SEARCH_USER';
export const SEARCH_POST = 'SEARCH_POST';
export const AUTH_USER = 'AUTH_USER';
export const CLEAN_AUTH_USER = 'CLEAN_AUTH_USER';
export const LOG_OUT = 'LOG_OUT';
export const CHANGE_DATA_PROFILE = 'CHANGE_DATA_PROFILE';
export const GET_MY_USER = 'GET_MY_USER';
export const ADD_FRIEND = 'ADD_FRIEND';
export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_FOLLOWERS = 'GET_FOLLOWERS';
export const DELETE_FRIENDS = 'DELETE_FRIENDS';
export const SEARCH_FRIENDS = 'SEARCH_FRIENDS';
export const GET_FRIENDS_POSTS = 'GET_FRIENDS_POSTS';
export const REPORT_POST = 'REPORT_POST';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_PAYMENT = 'CREATE_PAYMENT';
export const SET_PREMIUM = 'SET_PREMIUM';
export const BLOCK_RESTORE_USER = 'BLOCK_RESTORE_USER';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const GET_USERS_DELETED = 'GET_USERS_DELETED';

export function getUsers() {
  return async function (dispatch) {
    try {
      let info = await axios.get('/users', {});

      dispatch({
        type: GET_USERS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error, 'Error');
    }
  };
}
export function getUser(email) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/users/${email}`);
      dispatch({
        type: GET_USER,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getMyUser(email) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/users/${email}`);
      //console.log(info.data);
      dispatch({
        type: GET_MY_USER,
        payload: info.data,
      });
    } catch (error) {
      console.log(error, 'Error al llamar a la api');
    }
  };
}
export function getPosts() {
  return async function (dispatch) {
    try {
      let { data } = await axios.get(`/posts/`);
      let filtrado = data.filter((el) => el.author !== null);
      dispatch({
        type: GET_POSTS,
        payload: filtrado,
      });
    } catch (error) {
      console.log(error, 'Error al llamar a la api');
    }
  };
}
export function getSinglePosts(id) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/posts/id/${id}`);
      // let data = info.data.comments.map(async (comment) => {
      //   //console.log(comment);
      //   let user = await axios.get(`/users/${comment.idUser}`);
      //   comment.fullName = user.data.fullName;
      // });
      //console.log(data);
      dispatch({
        type: SINGLE_POST,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function cleanSinglePost(id) {
  return async function (dispatch) {
    const info = await axios.get(`/users/${id}`);
    console.log(info.data);
    try {
      dispatch({
        type: SINGLE_POST,
        payload: [],
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postComment(payload, id) {
  return async function (dispatch) {
    try {
      const info = await axios.post(`/comments`, payload);
      let data = await axios.get(`/posts/id/${id}`);
      console.log(info.data);
      return dispatch({
        type: POST_COMMENT,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postReaction(payload, idPost, idComment, idUser) {
  return async function (dispatch) {
    try {
      if (idComment) {
        const info = await axios.post(`/comments/${idComment}`, payload);
        let data = await axios.get(`/posts/id/${idPost}`);
        return dispatch({
          type: POST_REACTION_COMMENT,
          payload: data.data,
        });
      } else if (idPost && idComment === null) {
        const info = await axios.patch(`/posts/${idPost}`, payload);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function createUserPost(inputPost) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post('/posts', inputPost);
      return dispatch({
        type: CREATE_USER_POST,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function createUser(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post('/users', payload);
      return dispatch({
        type: CREATE_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function searchUser(myId, searcher) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/users/name/${searcher}`);
      let filtered = json.data.filter((user) => user._id !== myId);
      return dispatch({
        type: SEARCH_USER,
        payload: filtered,
      });
    } catch (error) {
      return dispatch({
        type: SEARCH_USER,
        payload: [],
      });
    }
  };
}
export function searchPost(searcher) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SEARCH_POST,
        payload: searcher,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const authUser = (mail, password, google) => {
  return async function (dispatch) {
    try {
      if (google === undefined) {
        var user = await axios.get(`/users/${mail}`);
        let formatUser = await user.data;
        if (formatUser.password !== password) {
          return dispatch({
            type: AUTH_USER,
            payload: { auth: false, reason: 'Usuario o contraseña no válidos' },
          });
        } else {
          return dispatch({
            type: AUTH_USER,
            payload: { auth: true, user: formatUser },
          });
        }
      } else if (google) {
        var user = await axios.get(`/users/${mail}`);
        if (user) {
          console.log(google);
          let formatUser = user.data;
          return dispatch({
            type: AUTH_USER,
            payload: { auth: true, user: formatUser },
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode === 404) {
        if (!google) {
          console.log(error);
          return dispatch({
            type: AUTH_USER,
            payload: { auth: false, reason: 'Usuario o contraseña no válidos' },
          });
        } else {
          console.log(google);
          return dispatch({
            type: AUTH_USER,
            payload: { auth: 'unregistered', user: google },
          });
        }
      }
    }
  };
};
export function cleanAuthUser() {
  return async function (dispatch) {
    return dispatch({
      type: CLEAN_AUTH_USER,
      payload: { auth: '' },
    });
  };
}
export function changeDataProfile(payload, email) {
  return async function (dispatch) {
    try {
      var user = await axios.patch(`/users/${email}`, payload);
      let info = await axios.get(`/users/${email}`);
      return dispatch({
        type: CHANGE_DATA_PROFILE,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function logOut() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: LOG_OUT,
        payload: { auth: false },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const addFriend = (myUserid, anyUserId) => {
  const ids = {
    idFriend: anyUserId,
    idUser: myUserid,
  };
  return async function (dispatch) {
    try {
      let info = await axios.post(`/friends/`, ids);
      let { data } = await axios.get(`/friends/${myUserid}`);

      return dispatch({
        type: ADD_FRIEND,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getFriends = (myId) => {
  return async function (dispatch) {
    let { data } = await axios.get(`/friends/${myId}`);
    return dispatch({
      type: GET_FRIENDS,
      payload: data,
    });
  };
};
export const getFollowers = (id) => {
  return async function (dispatch) {
    let { data } = await axios.get(`/friends/followers/${id}`);
    return dispatch({
      type: GET_FOLLOWERS,
      payload: data,
    });
  };
};
export const searchFriends = (id, input) => {
  return async function (dispatch) {
    let json = await axios.get('/friends/' + id);
    let filterFriends = json.data.filter((friend) => {
      return friend.idFriend.fullName.includes(input);
    });
    return dispatch({
      type: SEARCH_FRIENDS,
      payload: filterFriends,
    });
  };
};
export const deleteFriend = (myUserid, idFriend) => {
  // const ids = {
  //   idFriend: anyUserId,
  //   };

  return async function (dispatch) {
    try {
      let info = await axios.delete(`/friends/${myUserid}/${idFriend}`);
      let { data } = await axios.get(`/friends/${myUserid}`);

      return dispatch({
        type: DELETE_FRIENDS,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getFriendsPosts = (myId) => {
  return async function (dispatch) {
    const { data } = await axios.get(`/friends/posts/${myId}`);
    return dispatch({
      type: GET_FRIENDS_POSTS,
      payload: data,
    });
  };
};
export function reportPost(id) {
  return async function (dispatch) {
    try {
      await axios.patch(`/posts/${id}`, { reported: true });
      return dispatch({
        type: REPORT_POST,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function deletePost(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.delete(`/posts/${id}`);
      return dispatch({
        type: DELETE_POST,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createPayment(id, info) {
  return async function (dispatch) {
    try {
      console.log(info);
      const data = await axios.post(`/mercadoPago/${id}`, info);
      console.log(data.data);
      return dispatch({
        type: CREATE_PAYMENT,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function setPremium(input) {
  return async function (dispatch) {
    try {
      const change = input.map(async (item) => {
        //console.log(item);
        const data = await axios.patch(`/posts/${item.id}`, {
          premium: true,
          rating: item.rating + item.value,
        });
        return data.data;
      });
      console.log(change);
    } catch (error) {
      console.log(error);
    }
  };
}

export function blockRestoreUser(userId) {
  return async function (dispatch) {
    try {
      const { data } = await axios.delete(`/users/${userId}`);
      return dispatch({
        type: BLOCK_RESTORE_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteAccountUser(userId) {
  return async function (dispatch) {
    try {
      const { data } = await axios.delete(`/users/${userId}`);
      return dispatch({
        type: DELETE_ACCOUNT,
        payload: { auth: false },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDeletedUsers() {
  return async function (dispatch) {
    try {
      let { data } = await axios.get('/users/deleted');
      dispatch({
        type: GET_USERS_DELETED,
        payload: data,
      });
    } catch (error) {
      console.log(error, 'Error');
    }
  };
}
