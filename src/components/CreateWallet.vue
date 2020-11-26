// CreateWallet.vue
<template>
  <section>
    <div class="row align-items-center jumbotron jumbotron-fluid page-header home full">
      <div class="col-md-12">
        <div class="container">
          <h1 class="display-4">Create a New Wallet</h1>
          <p class="lead">Generate a new wallet: random private key -> public key -> address.</p>
        </div>
      </div>
    </div>

    <form v-on:submit.prevent="GenerateWallet()">
      <button type="submit" class="btn btn-primary">Generate Now</button>
      <br />
      <br />
      <div class="form-group">
          <h3 class="lead">PRIVATE KEY</h3>
          <textarea
          class="form-control"
          rows="2"
          cols="100"
          id="GeneratedResult"
          v-model="form.privateKey"></textarea><br>

          <h3 class="lead">PUBLIC KEY</h3>
          <textarea
          class="form-control"
          rows="2"
          cols="100"
          id="GeneratedResult"
          v-model="form.publicKey"></textarea><br>

          <h3 class="lead">PUBLIC ADDRESS</h3>
          <textarea
          class="form-control"
          rows="2"
          cols="100"
          id="GeneratedResult"
          v-model="form.address"></textarea><br>

      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "GenerateWallet",
  data() {
    return {
      form: {
        privateKey: null,
        publicKey: null,        
        address: null
      }
    };
  },

  methods: {
    GenerateWallet() {
      console.log("Generating wallet now..");

      //The following refers to: http://cryptocoinjs.com/modules/crypto/ecdsa/
      // and https://github.com/cryptocoinjs/coinkey
      // and http://cryptocoinjs.com/modules/crypto/ecdsa/#ecdsa      
      var sr = require("secure-random"); //npm install --save secure-random@1.x
      var CoinKey = require("coinkey"); //npm install --save coinkey@0.1.0
       
      var privateKey = sr.randomBuffer(32);    
      var ck = new CoinKey(privateKey, true); // true => compressed public key / addresses      
      console.log("coinkey private key: "+ck.privateKey); //true
      console.log("coinkey public key: "+ck.publicKey); //true
      console.log("coinkey public address: "+ck.publicAddress); //true

      this.form.privateKey=ck.privateKey.toString('hex');   
      this.form.publicKey=ck.publicKey.toString('hex');        
      this.form.address=ck.publicAddress.toString('hex');      
    }
  }
};
</script>
