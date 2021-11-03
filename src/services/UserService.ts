import { UserModel } from "../models/UserModel";
import { BACK_URL } from "./BackUrl";
import store from "../store/index";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export async function getUser(token): Promise<AxiosResponse> {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  let response: AxiosResponse = await axios
    .get(`${BACK_URL}/api/v1/users`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
}

export async function logUser(formData: UserModel) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let response: UserModel = await fetch(
    `${BACK_URL}/api/v1/users/login`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => {});
  store.commit("SET_USER", response);
  localStorage.setItem("USER", JSON.stringify(response));
  return response;
}

export async function signUpUser(formData: UserModel) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let response = await fetch(`${BACK_URL}/api/v1/users`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      username: formData.username,
    }),
  })
    .then(async (response) => {
      if (response.ok) {
        return await logUser(formData);
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {});
  return response;
}

export async function deleteUser(id, token) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  let response: Response = await fetch(`${BACK_URL}/api/v1/users/id/${id}`, {
    method: "DELETE",
    headers: myHeaders,
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        return null
      }
    })
    .catch((error) => {
      console.log(error);
      return error
    });
  return response;
}

// localhost:3000/api/v1/users/id/1
export async function updateUser(formData: UserModel) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${store.state.user.token}`);
  let response: any = await axios.patch(
    `${BACK_URL}/api/v1/users/id/${store.state.user.id}`,
    {
        email: formData.email,
        username: formData.username,
        avatar_url: formData.avatar_url
    }, {
      headers: {
        'Authorization': `Bearer ${store.state.user.token}` 
      }
    }
  )
    .then((response) => {
        let payload = { ...store.state.user}
        payload.username = formData.username
        payload.avatar_url = formData.avatar_url
        payload.email = formData.email
        store.commit("SET_USER", payload);
        localStorage.setItem("USER", JSON.stringify(payload));
        return response;
      
    })
    .catch((error) => {
      let errors = []
      if (error.response.data.status === 409) {
        errors.push({msg: error.response.data.message})
      }
      if (error.response.data.errors) {
        error.response.data.errors.forEach(error => {
          errors.push(error)
        });
      }
      return errors;
    });
  return response;
}