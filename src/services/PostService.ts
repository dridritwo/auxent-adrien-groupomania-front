import store from "../store/index";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Post } from "../models/PostModel";
import { BACK_URL } from "./BackUrl";

export async function getAllPosts(): Promise<Post[]> {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    params: { page: 0, limit: 5 },
  };
  let response: Post[] = await axios
    .get(`${BACK_URL}/api/v1/posts`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
  return response;
}

export async function getHotPosts(): Promise<Post[]> {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    params: { page: 0, limit: 5 },
  };
  let response: Post[] = await axios
    .get(`${BACK_URL}/api/v1/posts/hottest`, config)
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
    params: { page: page, limit: 5 },
  };
  let response: Post[] = await axios
    .get(`${BACK_URL}/api/v1/posts`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
  return response;
}

export async function getMoreHotPosts(page: number): Promise<Post[]> {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    params: { page: page, limit: 5 },
  };
  let response: Post[] = await axios
    .get(`${BACK_URL}/api/v1/posts/hottest`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
  return response;
}

export async function sendPostForm(
  postForm: Post,
  file: File
): Promise<Post[]> {
  let imgUrl = postForm.postImageUrl;
  if (file) {
    const imageForm = new FormData();
    imageForm.append("image", file);
    let imgurResponse = await axios
      .post(`${BACK_URL}/api/v1/upload`, imageForm, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${store.state.user.token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return null;
      });
    if (imgurResponse) {
      imgUrl = imgurResponse.imgUrl;
    } else {
      return null;
    }
  }
  let config: AxiosRequestConfig = {
    method: "post",
    url: `${BACK_URL}/api/v1/posts/`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    data: {
      title: postForm.title,
      text: postForm.text,
      image_url: imgUrl,
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

export async function deletePost(id: Number): Promise<AxiosResponse> {
  let config: AxiosRequestConfig = {
    method: "delete",
    url: `${BACK_URL}/api/v1/posts/id/${id}`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
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

export async function getAllPostsByAuthorId(
  id: Number,
  page: Number
): Promise<Post[]> {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    params: { page: page, limit: 5 },
  };
  let response: Post[] = await axios
    .get(`${BACK_URL}/api/v1/posts/author_id/${store.state.user.id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
  return response;
}

export async function updatePost(postForm: Post, file: File): Promise<Post[]> {
  let imgUrl = postForm.postImageUrl;
  if (file) {
    const imageForm = new FormData();
    imageForm.append("image", file);
    let imgurResponse = await axios
      .post(`${BACK_URL}/api/v1/upload`, imageForm, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${store.state.user.token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return null;
      });
    if (imgurResponse) {
      imgUrl = imgurResponse.imgUrl;
    } else {
      return null;
    }
  }
  let config: AxiosRequestConfig = {
    method: "patch",
    url: `${BACK_URL}/api/v1/posts/id/${postForm.id}`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
    data: {
      title: postForm.title,
      text: postForm.text,
      image_url: imgUrl,
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
