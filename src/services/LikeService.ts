import store from "../store/index";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BACK_URL } from "./BackUrl";

export async function sendLike(postId, likeStatus): Promise<AxiosResponse> {
  let config: AxiosRequestConfig = {
    method: "post",
    url: `${BACK_URL}/api/v1/likes/id/${postId}`,
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

