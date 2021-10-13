import { UserModel } from "../models/UserModel";
import store from "../store/index";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Post } from "../models/PostModel";

export async function getAllPosts(): Promise<Post[]> {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
      
    },
    params: { page: 0, limit: 5 }
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

export async function getMorePosts(page: number): Promise<Post[]> {
  console.log("page ins service", page)
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    params: { page: page, limit: 5 }
  };
  let response: Post[] = await axios
    .get(`http://localhost:3000/api/v1/posts`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
  return response;
}

// localhost:3000/api/v1/posts/
export async function sendPostForm(postForm: Post): Promise<Post[]> {
  let config: AxiosRequestConfig = {
    method: "post",
    url: `http://localhost:3000/api/v1/posts/`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    data: {
      title: postForm.title,
      text: postForm.text,
      image_url: postForm.postImageUrl,
    },
  };
  let response: Post[] | null = await axios(config)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      return null;
    });
  return response;
}
