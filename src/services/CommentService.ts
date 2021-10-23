import store from "../store/index";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Comment } from "../models/CommentModel";

export async function sendLike(postId, likeStatus): Promise<AxiosResponse> {
  let config: AxiosRequestConfig = {
    method: "post",
    url: `http://localhost:3000/api/v1/likes/id/${postId}`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    data: {
      like: likeStatus
    }
  };
  let response: AxiosResponse = await axios(config)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
}

export async function getComments(postId): Promise<Comment[]> {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
      
    }
  };
  let response: Comment[] = await axios
    .get(`http://localhost:3000/api/v1/comments/post_id/${postId}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
  return response;
}
