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
      return null;
    });
  return response;
}

export async function getMorePosts(page: number): Promise<Post[]> {
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

// localhost:3000/api/v1/posts/id/1
export async function deletePost(id: Number): Promise<AxiosResponse> {
  let config: AxiosRequestConfig = {
    method: "delete",
    url: `http://localhost:3000/api/v1/posts/id/${id}`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    }
  };
  let response: AxiosResponse = await axios(config)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      return null;
    });
  return response;
}

export async function getAllPostsByAuthorId(id: Number, page: Number): Promise<Post[]> {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
      
    },
    params: { page: page, limit: 5 }
  };
  let response: Post[] = await axios
    .get(`http://localhost:3000/api/v1/posts/author_id/${store.state.user.id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
  return response;
}

export async function updatePost(postForm: Post): Promise<Post[]> {
  let config: AxiosRequestConfig = {
    method: "patch",
    url: `http://localhost:3000/api/v1/posts/id/${postForm.id}`,
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