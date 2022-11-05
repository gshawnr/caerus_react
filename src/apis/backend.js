import axios from "axios";

const backend = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("investmentsToken")}`,
    "Content-Type": "application/json",
  },
});

export default backend;
