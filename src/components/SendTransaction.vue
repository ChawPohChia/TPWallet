//SendTransaction.vue
<template>
  <section>
    <div class="row align-items-center jumbotron jumbotron-fluid page-header home full">
      <div class="col-md-12">
        <div class="container">
          <h1 class="display-4">Send Transaction</h1>
          <p class="lead">Sending coin to your peer by key in yours and your peer's wallet address and value to send.</p>
        </div>
      </div>
    </div>

    <form v-on:submit.prevent="SignTransaction()">
      <p class="lead">Sender Wallet Address:</p>
      <textarea class="form-control" rows="1" cols="100" id="senderAddress" v-model="form.senderAddress"></textarea><br><br>
      <p class="lead">Recipient Wallet Address:</p>
      <textarea class="form-control" rows="1" cols="100" id="recipientAddress" v-model="form.recipientAddress"></textarea><br><br>
      <p class="lead">Value To Send:</p>
      <textarea class="form-control" rows="1" cols="100" id="value" v-model="form.value"></textarea><br><br>
      <button type="submit" class="btn btn-primary">Sign Transaction</button><br><br>      
      <div class="form-group">
        <textarea
          class="form-control"
          rows="20"
          cols="100"         
          id="SignedTransaction"
          v-model="form.SignedTransaction"
        ></textarea>
      </div>      
    </form>

    <form v-on:submit.prevent="SendTransaction()">
       <p class="lead">Blockchain Node:</p>
       <textarea class="form-control" rows="1" cols="100" id="value" v-model="form.nodeToConnect"></textarea><br><br>       
       <button type="submit" class="btn btn-primary">Send Transaction</button><br><br> 
      <div class="form-group">
        <textarea
          class="form-control"
          rows="20"
          cols="100"         
          id="SendedTransaction"
          v-model="form.SendedTransaction"
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
        senderAddress: "This is sender address",
        recipientAddress: "This is recipient address",      
        value: 100000,
        nodeToConnect:"http://127.0.0.1/8888",
        SignedTransaction:null,
        SendedTransaction:null
      }
    }
   },
   
   methods: {   
    Signransaction() {
      console.log("Signing transaction now..");        
      },

    Sendransaction() {
      console.log("Sending transaction now..");        
      },
   }
  }
</script>
