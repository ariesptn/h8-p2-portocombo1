<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Mini Overflow</h1>
        </div>
      </div>
    </div>
    <router-view/>
    <div class="container">
      <div id="googleSigninButton2" class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  </div>
</template>

<style>
</style>
