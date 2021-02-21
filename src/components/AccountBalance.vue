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

    <form v-on:submit.prevent="GetBalance()">
      <p class="lead">Wallet Address:</p>
      <!--textarea class="form-control" rows="1" cols="100" id="walletAddress" v-model="form.walletAddress"></textarea><br><br-->
      <p class="lead" style="color:red;font-weight:bold;font-size:30px">{{form.walletAddress}}</p> 
      <p class="lead">Blockchain Node To Connect:</p>
      <textarea class="form-control" rows="1" cols="100" id="nodeToConnect" v-model="form.nodeToConnect"></textarea><br><br>
      <button type="submit" class="btn btn-primary">Display Balance</button><br><br>      
      <p class="lead" style="color:red;font-weight:bold;font-size:30px" id="balance"></p>   
    </form>
  </section>
</template>

<script>
  export default {
  name: 'OpenWallet', 
   data() {
    return {      
      form: {       
        walletAddress: "",
        nodeToConnect: "http://12.0.0.1/1234", 
        message:""
      }
    }
   },

  mounted() {
      if (this.$store.state.publicAddress=="")
            this.form.walletAddress="Open an existing wallet first to continue.";
      else
            this.form.walletAddress=this.$store.state.publicAddress;  
  },

     
   methods: {   
    GetBalance() {
      const axios = require("axios").default;
      var accountBalanceApiCall="http://127.0.0.1:1234/address/"+this.$store.state.publicAddress+"/balance"
      console.log(accountBalanceApiCall)
      axios
        .get(accountBalanceApiCall)
        .then(function(response) {
          if(response.data.balance==-1)
              document.getElementById("balance").innerHTML  = response.data.message;              
          else
              document.getElementById("balance").innerHTML  = response.data.balance;  
        });        
      }
   }
  }
</script>
