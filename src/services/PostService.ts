import { UserModel } from "../models/UserModel";
import store from "../store/index";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Post } from "../models/PostModel";

export async function getAllPosts(): Promise<Post[]> {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  };
  let response: Post[] = await axios
    .get(`http://localhost:3000/api/v1/posts`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error : ", error);
      return null;
    });
  return response;
}

// localhost:3000/api/v1/posts/id/1
export async function sendPostForm(postForm: Post) {
  let config: AxiosRequestConfig = {
    method: "post",
    url: `http://localhost:3000/api/v1/posts/id/${store.state.user.id}`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    data: {
      title: postForm.title,
      text: postForm.text,
      image_url: postForm.postImageUrl,
    },
  };
  let response: any = await axios(config)
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      return error;
    });
  return response;
}
