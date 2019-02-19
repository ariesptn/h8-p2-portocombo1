<template>
  <div class="row">
    <div class="col">
      <h1>Admin Product</h1>
      <div class="row">
        <div class="col">name</div>
        <div class="col">description</div>
        <div class="col">price</div>
        <div class="col">action</div>
      </div>
      <div v-for="(product,index) in productData" :key="index">
        <div class="row" v-if="!productShowEditPanel[index]">
          <div class="col">{{product.name}}</div>
          <div class="col">{{product.description}}</div>
          <div class="col">{{product.price}}</div>
          <div class="col">
            <button class="btn btn-primary" @click="showHideEditPanel(index,true)">Edit</button>
          </div>
        </div>
        <div class="row" v-if="productShowEditPanel[index]">
          <div class="col">
            <input type="text" v-model="productNames[index]">
          </div>
          <div class="col">
            <input type="text" v-model="productDescriptions[index]">
          </div>
          <div class="col">
            <input type="number" v-model="productPrices[index]">
          </div>
          <div class="col">
            <button class="btn btn-success">Save</button>
            <button class="btn btn-warning" @click="showHideEditPanel(index,false)">Cancel</button>
            <button class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["productData"],
  created() {
    this.$emit("get-products", null);
    this.productNames = this.productData.map(e => e.name);
    this.productDescriptions = this.productData.map(e => e.description);
    this.productPrices = this.productData.map(e => e.price);
    this.productShowEditPanel = this.productData.map(e => false);
  },
  data() {
    return {
      productNames: [],
      productDescriptions: [],
      productPrices: [],
      productShowEditPanel: []
    };
  },
  methods: {
    showHideEditPanel(index, condition) {
      Vue.set(this.productShowEditPanel, index, condition);
    }
  }
};
</script>

