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
      <button type="submit" class="btn btn-primary">Generate Now</button><br><br>      
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
  name: 'GenerateWallet', 
   data() {
    return {      
      form: {
        publicKey: "ABC12345689",       
        privateKey: null,       
        address:null
      }
    }
   },
   
   methods: {   
    GenerateWallet() {
      console.log("Generating wallet now..");        
      }
   }
  }
</script>
