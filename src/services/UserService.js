
export async function getUsersService() {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTYzMTIxODA0MywiZXhwIjoxNjMxMzA0NDQzfQ.662P1jdtvtqLkHIu1XlsQq5dK8wa2OfmOSPYOcPjF0k`);
  let result = await fetch("http://localhost:3000/api/v1/users", {
    method: "GET",
    headers: myHeaders,
  }).then((response) => {
    return response.json()
  })
  return result
}