// OpenWallet.vue
<template>
  <section>
    <div class="row align-items-center jumbotron jumbotron-fluid page-header home full">
      <div class="col-md-12">
        <div class="container">
          <h1 class="display-4">Open an Existing Wallet</h1>
          <p class="lead">Enter your wallet private key (compressed ECDSA key, 65 hex digits):</p>
        </div>
      </div>
    </div>

    <form v-on:submit.prevent="OpenWallet()">      
      <textarea class="form-control" rows="2" cols="100" id="keyedInPrivateKey" v-model="form.privateKey"></textarea><br><br>
      <button type="submit" class="btn btn-primary">Open Wallet</button><br><br>      
      <div class="form-group">
        <textarea
          class="form-control"
          rows="20"
          cols="100"         
          id="GeneratedResult"
          v-model="form.publicKey"
        ></textarea>
      </div>   
    </form>
  </section>
</template>

<script>
  export default {
  name: 'OpemWallet', 
   data() {
    return {      
      form: {
        publicKey: "ABC12345689",       
        privateKey: "privatekeyabc",       
        address:null
      }
    }
   },
   
   methods: {   
    OpenWallet() {
      console.log("Open existing wallet now..");        
      }
   }
  }
</script>
