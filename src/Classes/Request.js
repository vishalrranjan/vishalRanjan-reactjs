import axios from "axios";

  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpc2hhbGtyMjc1QGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS92aXNoYWxycmFuamFuIiwiaWF0IjoxNjYxNTk2MDI3LCJleHAiOjE2NjIwMjgwMjd9.CowtoUaAkguh6zUhdPtSfhEQ4cUbS6ypqUXX0G7ccmg"
  const apiUrl ="https://upayments-studycase-api.herokuapp.com/"

  const get = async (urlpath) => {
    const authAxios = axios.create({
      baseURL: apiUrl,
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    try {
      const response = await authAxios.get(urlpath)
      const data = await response.data
      return data;
    } catch (error) {
      return error
    }
  }

  const post = async (urlpath, formdata) => {
    const authAxios = axios.create({
      baseURL: apiUrl,
      headers: {Authorization: `Bearer ${accessToken}`}
    })

    try {
      const response = await authAxios.post(urlpath, formdata)
      return response;
    } catch (error) {
      return error
    }
  }

  export {get, post}