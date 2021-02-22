// OpenWallet.vue
<template>
  <section>
    <div class="row align-items-center jumbotron jumbotron-fluid page-header home full">
      <div class="col-md-12">
        <div class="container">
          <h1 class="display-4">Open an Existing Wallet</h1>          
          <p class="lead">Enter your private key to retrieve your wallet:</p>
        </div>
      </div>
    </div>

    <form v-on:submit.prevent="OpenWallet()">      
      <textarea class="form-control" rows="2" cols="100" id="keyedInPrivateKey" v-model="form.privateKey"></textarea><br><br>
      <button type="submit" class="btn btn-primary">Open Wallet</button><br><br>      
      <div class="form-group">    
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
  import { ref } from "vue";
  export default {
  name: 'OpenWallet', 
  
   data() {
    return {      
      form: {
        publicKey: ref(""),       
        privateKey: ref(""),       
        address: ref("")
      }
    }
   },
   
   methods: {   
    OpenWallet() {
      var CoinKey = require('coinkey')      
 
      var key = new CoinKey(new Buffer(this.form.privateKey, 'hex'))   
      this.form.publicKey= key.publicKey.toString('hex');       this.form.address= key.publicAddress.toString('hex');     
      
      this.$store.commit("persistPrivateKey",this.form.privateKey);   
      this.$store.commit("persistPublicKey",this.form.publicKey);   
      this.$store.commit("persistPublicAddress",this.form.address); 
      
      console.log(this.$store.state.privateKey);
      console.log(this.$store.state.publicKey);
      console.log(this.$store.state.publicAddress);
    }
  },
}
  
</script>

