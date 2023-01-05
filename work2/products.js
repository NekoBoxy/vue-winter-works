const url = "https://vue3-course-api.hexschool.io/v2";
const path = "catboxy";
// 從 cookie 取 hextoken
const hextoken = document.cookie.replace(
  /(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);

const app = {
  data() {
    return {
      temp: {},
      products: [],
      total: 0,
    };
  },
  methods: {
    // 確認是否登入
    checkLogin() {
      axios
        .post(`${url}/api/user/check`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          // 登入失敗則跳轉至 login.html
          console.dir(error);
          location.href = "login.html";
        });
    },
    // 取得遠端產品資料
    getProducts() {
      axios({
        method: "get",
        url: `${url}/api/${path}/admin/products`,
      })
        .then((response) => {
          // console.log(response.data.products);
          // const products = response.data.products;
          const { products } = response.data;
          this.products = products;
          this.total = products.length;
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
  },
  // 它是 created hook
  created() {
    axios.defaults.headers.common["Authorization"] = hextoken;
    this.checkLogin();
    this.getProducts();
  },
};
// 生成 Vue 應用程式，並渲染至畫面上
Vue.createApp(app).mount("#app");
