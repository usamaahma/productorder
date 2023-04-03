import axios from "axios";
const url = "https://trisage-backend.onrender.com";

const users = axios.create({
  baseURL: `${url}users`,
});
users.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { users };
