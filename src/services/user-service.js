const BASE_URL = 'https://reqres.in/api/'

export const userService = {
  fetchUsers
};

function fetchUsers(pageNo, pageSize) {
  const api_endpoint = `${BASE_URL}users?page=${pageNo}&per_page=${pageSize}`
  return fetch(
    api_endpoint
  )
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
    .then(user => {
      return user;
    })
    .catch(e => {
      alert("Something went wrong!!");
    });
}
