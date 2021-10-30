import store from "../store/index";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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

