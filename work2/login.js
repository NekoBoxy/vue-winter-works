// 遠端伺服器位址與 API path
const url = "https://vue3-course-api.hexschool.io/v2";
const path = "catboxy";

const app = {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    // 登入
    handleLogin() {
      axios({
        method: "post",
        url: `${url}/admin/signin`,
        data: {
          username: this.username,
          password: this.password,
        },
      })
        .then((response) => {
          // 登入成功取 token & expired
          // const token = response.data.token;
          // const expired = response.data.expired;
          const { token, expired } = response.data;
          // console.log("token:", token);
          // console.log("expired:", expired);
          console.log(response.data.message);
          // 將取得的 token & expired 存入 cookie
          document.cookie = `hextoken=${token}; expires=${new Date(expired)}`;

          location.href = "products.html";
        })
        .catch((error) => {
          // 登入失敗取錯誤訊息
          // console.dir(error);
          const errorMessage = error.data.message;
          console.log("message:", errorMessage);
        });
    },
  },
};
Vue.createApp(app).mount("#app");
