// 定義 url & path
const url = "https://vue3-course-api.hexschool.io";
const path = "catboxy";
// 從 cookie 取 hextoken
const hextoken = document.cookie.replace(
  /(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);
// 用 hextoken 授權登入
axios.defaults.headers.common["Authorization"] = hextoken;
// 建立 modal
let productModal = null;
let delProductModal = null;

const app = {
  data() {
    return {
      products: [],
      temp: {},
      status: "new",
    };
  },
  methods: {
    // 確認是否登入，登入失敗則跳轉至 login.html
    checkLogin() {
      axios
        .post(`${url}/v2/api/user/check`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.dir(error);
          location.href = "login.html";
        });
    },
    // 取得遠端產品資料
    getProducts() {
      axios({
        method: "get",
        url: `${url}/v2/api/${path}/admin/products`,
      })
        .then((response) => {
          const { products } = response.data;
          this.products = products;
          this.total = products.length;
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    // 建立新產品
    createNewProduct() {
      this.status = "new";
      this.temp = {};
    },
    // 編輯產品資料
    editProduct(temp){
      this.status = "edit";
      this.temp = JSON.parse(JSON.stringify(temp));
    },
    // 刪除產品資料
    delProductModal(temp){
      this.temp = temp;
    },
    // 新增圖片：若 temp 內沒有 imagesUrl，則新增一個 imagesUrl 欄位，之後 push 一個空字串進去，v-for 才能正常執行。
    addImage(){
      if(!this.temp.imagesUrl){
        this.temp.imagesUrl = [];
      }
      this.temp.imagesUrl.push("");
    },
    // 刪除圖片：用 splice 與 v-for 的 key 搭配，刪除一筆資料。
    removeImage(key){
      this.temp.imagesUrl.splice(key,1);
    },
    confirmProduct() {
      let method = "";
      let apiUrl = "";
      if(this.status == "new") {
        method = "post";
        apiUrl = `${url}/v2/api/${path}/admin/product`;
      } else {
        method = "put";
        apiUrl = `${url}/v2/api/${path}/admin/product/${this.temp.id}`;
      }
      axios[method](apiUrl,{data: this.temp})
      .then(() => {
        productModal.hide();
        this.getProducts();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    },
    // 確認刪除資料
    confirmDelete() {
      axios.delete(`${url}/v2/api/${path}/admin/product/${this.temp.id}`)
        .then(() => {
          delProductModal.hide();
          this.getProducts();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
  // hook
  mounted() {
    // 載入頁面確認登入狀態與拿到遠端資料
    this.checkLogin();
    this.getProducts();
    // 綁定產品 Modal 元件
    productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      { keyboard: false }
    );
    // 綁定刪除產品 Modal 元件
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      { keyboard: false }
    );
  },
};
// 生成 Vue 應用程式，並渲染至畫面上
Vue.createApp(app).mount("#app");
