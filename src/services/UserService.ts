import { FormDataModel } from "../models/FormDataModel";
import { UserModel } from "../models/UserModel";
import store from "../store/index";

export async function getUsersService() {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTYzMTIxODA0MywiZXhwIjoxNjMxMzA0NDQzfQ.662P1jdtvtqLkHIu1XlsQq5dK8wa2OfmOSPYOcPjF0k`
  );
  let result = await fetch("http://localhost:3000/api/v1/users", {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => {
      return response.json();
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}

export async function logUser(formData: FormDataModel) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let response: UserModel = await fetch(
    "http://localhost:3000/api/v1/users/login",
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

export async function signUpUser(formData: FormDataModel) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let response = await fetch("http://localhost:3000/api/v1/users", {
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
  let response = await fetch(`http://localhost:3000/api/v1/users/id/${id}`, {
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
    });
  return response;
}
