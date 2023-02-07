const BASE_URL = "https://vue3-course-api.hexschool.io";
const api_path = "catboxy";

// 載入全部規則
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

// Activate the locale 啟動設定
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true,
});

const app = {
  data() {
    return {

    };
  },
  // 區域註冊
  components: {
    'VForm': VeeValidate.Form,
    'VField': VeeValidate.Field,
    'ErrorMessage': VeeValidate.ErrorMessage,
  },
  methods: {
    // 取得產品遠端資料
    getProducts() {
      axios({
        method: "get",
        url: `${BASE_URL}/v2/api/${api_path}/products/all`,
      })
        .then((response) => {
          const { products } = response.data;
          this.products = products;
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    checkMobilePhone(value) {
      const mobilePhone = /^09[0-9]{8}$/ // 正規表達式
      return mobilePhone.test(value) ? true : '需要正確的電話號碼'
    },
    handleSubmit(values) {
      console.log(values);
    },
  },
  mounted() {

  },
};

Vue.createApp(app).mount("#app");