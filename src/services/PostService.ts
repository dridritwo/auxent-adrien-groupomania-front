import { UserModel } from "../models/UserModel";
import store from "../store/index";
import axios, { AxiosResponse } from 'axios';
import { Post } from "../models/PostModel";


// localhost:3000/api/v1/posts
export async function getAllPosts() {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${store.state.user.token}`);
  let response: Post[] = await axios.get(
    `http://localhost:3000/api/v1/posts`, {
      headers: {
        'Authorization': `Bearer ${store.state.user.token}` 
      }
    }
  )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
      console.log("error : ", error)
      return null;
    });
  return response;
}