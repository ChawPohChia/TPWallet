// AccountBalance.vue
<template>
  <section>
    <div class="row align-items-center jumbotron jumbotron-fluid page-header home full">
      <div class="col-md-12">
        <div class="container">
          <h1 class="display-4">View Account Balance</h1>
          <p class="lead">Check your wallet balance by key in your wallet address and blockchain node that you want to connect.</p>
        </div>
      </div>
    </div>

    <form v-on:submit.prevent="ViewWallet()">
      <p class="lead">Wallet Address:</p>
      <textarea class="form-control" rows="1" cols="100" id="walletAddress" v-model="form.walletAddress"></textarea><br><br>
      <p class="lead">Blockchain Node To Connect:</p>
      <textarea class="form-control" rows="1" cols="100" id="nodeToConnect" v-model="form.nodeToConnect"></textarea><br><br>
      <button type="submit" class="btn btn-primary">Display Balance</button><br><br>      
      <div class="form-group">
        <textarea
          class="form-control"
          rows="20"
          cols="100"         
          id="DisplayedBalance"
          v-model="form.balance"
        ></textarea>
      </div>   
    </form>
  </section>
</template>

<script>
  export default {
  name: 'OpenWallet', 
   data() {
    return {      
      form: {
        walletAddress: "This is wallet address",
        nodeToConnect: "http://12.0.0.1/1234",       
        balance: 100000
      }
    }
   },
   
   methods: {   
    ViewWallet() {
      console.log("Retrieving wallet balance now..");        
      }
   }
  }
</script>
