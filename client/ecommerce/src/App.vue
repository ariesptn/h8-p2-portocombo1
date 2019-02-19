<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <h1>E-commerce</h1>
        <div class="container">
          <div v-if="showError" class="alert alert-warning" role="alert" v-html="errorMessage"></div>
        </div>
      </div>
    </div>

    <div class="container" v-if="isLoggedIn">
      <page-navbar :user-name="userName" :user-email="userEmail" :user-role="userRole"></page-navbar>

      <router-view
        :product-data="productData"
        :cart-data="cartData"
        @display-error="displayError($event)"
        @get-products="getProducts($event)"
        @get-carts="getCarts($event)"
      />

      <page-footer></page-footer>
    </div>

    <div class="container" v-if="!isLoggedIn">
      <loginregister></loginregister>
    </div>

    <div class="container">
      <div id="googleSigninButton2" class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  </div>
</template>

<script>
import pageNavbar from "@/pages/page-navbar.vue";
import loginregister from "@/pages/loginregister.vue";
import pageFooter from "@/pages/page-footer.vue";

export default {
  components: {
    pageNavbar,
    loginregister,
    pageFooter
  },
  created() {
    setInterval(() => {
      if (loginStatus !== this.isLoggedIn) {
        this.isLoggedIn = loginStatus;
        if (loginStatus) {
          this.userName = loginResponse.name;
          this.userEmail = loginResponse.email;
          this.userRole = loginResponse.role || "";
        }
      }
    }, 1000);
  },
  data() {
    return {
      isLoggedIn: false,
      showError: false,
      errorMessage: "",
      userName: "",
      userEmail: "",
      userRole: "",
      productData: [],
      cartData: []
    };
  },
  methods: {
    async getProducts() {
      try {
        let productData = await axios({
          baseURL,
          method: "GET",
          url: "/api/products",
          headers: { token }
        });
        this.productData = productData.data;
      } catch (err) {
        this.displayError(err);
      }
    },
    async getCarts() {
      try {
        let cartData = await axios({
          baseURL,
          method: "GET",
          url: "/api/carts",
          headers: { token }
        });
        this.cartData = cartData.data;
      } catch (err) {
        this.displayError(err);
      }
    },
    displayError: function(error) {
      if (error.response) {
        this.errorMessage = error.response.data.message;
      } else if (error.message) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = "<pre>" + JSON.stringify(error, null, 2) + "</pre>";
      }
      this.showError = true;
      setTimeout(() => {
        this.errorMessage = "";
        this.showError = false;
      }, 10000);
    }
  }
};
</script>


<style>
</style>
