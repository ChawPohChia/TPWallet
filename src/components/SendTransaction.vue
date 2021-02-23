//SendTransaction.vue
<template>
  <section>
    <div class="row align-items-center jumbotron jumbotron-fluid page-header home full">
      <div class="col-md-12">
        <div class="container">
          <h1 class="display-4">Send Transaction From</h1>        
          <p class="lead" style="color:red;font-weight:bold;font-size:30px">{{form.from}}</p>         
        </div>
      </div>
    </div>

    <form v-on:submit.prevent="SignTransaction()">    
      <p class="lead">Recipient Wallet Address:</p>
      <textarea
        class="form-control"
        rows="1"
        cols="100"
        id="recipientAddress"
        v-model="form.to"
      ></textarea>
      <br />
      <br />
      <p class="lead">Value To Send:</p>
      <textarea class="form-control" rows="1" cols="100" id="value" v-model="form.value"></textarea>
      <br />
      <br />
      <button type="submit" class="btn btn-primary">Sign Transaction</button>
      <br />
      <br />
      <div class="form-group">
        <textarea
          class="form-control"
          rows="10"
          cols="100"
          id="SignedTransaction"
          v-model="form.SignedTransaction"
        ></textarea>
      </div>
    </form>

    <form v-on:submit.prevent="SendTransaction()">
      <p class="lead">Blockchain Node:</p>
      <textarea class="form-control" rows="1" cols="100" id="value" v-model="form.nodeToConnect"></textarea>
      <br />
      <br />
      <button type="submit" class="btn btn-primary">Send Transaction</button>
      <br />
      <br />
      <div class="form-group">
        <textarea
          class="form-control"
          rows="10"
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
  name: "OpenWallet",
  data() {
    return {
      form: {
        from: this.$store.state.publicAddress, // from opened wallet
        to: null, // user fill-in
        value: null, //user fill-in
        fee: 0.001, // system fix
        dateCreated: null, // system derives while signing
        data: null, // system compiles (from stringify of gather data)
        senderPubKey: this.$store.state.publicKey, // from opened wallet
        transactionDataHash: null, // system derives from data while signing
        SenderSignature: null, // system derives from data while signing
        nodeToConnect:"http://127.0.0.1:1234/",
        ec:null
      }
    };
  },

  mounted() {
      if (this.$store.state.publicAddress=="")
            this.form.from="Open an existing wallet first to continue.";
      else
            this.form.from=this.$store.state.publicAddress;  
  },

  methods: {
    SignTransaction() {
      console.log("Constructing transaction for signing transactions..");
      console.log(this.form);

      //Get current system time:
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var currentDateTime = date + " " + time;
      this.form.dateCreated = currentDateTime;

      var data = {
        from: this.form.from,
        to: this.form.to,
        value: this.form.value,
        fee: this.form.fee,
        dateCreated: this.form.dateCreated
      };
      var dataInJSON = JSON.stringify(data);
      this.form.data = dataInJSON;
      console.log("TX data in JSON: " + dataInJSON);

      //Getting transaction data hash for data integrity protection
      //The following refers to: http://cryptocoinjs.com/modules/crypto/ecdsa/
      // and https://github.com/cryptocoinjs/coinkey
      // and http://cryptocoinjs.com/modules/crypto/ecdsa/#ecdsa
      var crypto = require("crypto"); //Node.js or Browserify (browser)
      var transactionDataHash = crypto
        .createHash("sha256")
        .update(dataInJSON)
        .digest();
      console.log("SHA256 of TX data in JSON: " + transactionDataHash);
      this.form.transactionDataHash = transactionDataHash;

      //Deriving Signature
      let elliptic = require("elliptic");
      this.form.ec = new elliptic.ec("secp256k1");
      this.form.SenderSignature = this.form.ec.sign(
        this.form.transactionDataHash,
        this.$store.state.privateKey,
        "hex",
        { canonical: true }
      ).toDER();
      console.log("Signature:" + this.form.SenderSignature);

      var signedTXInfo = {
        from: this.form.from,
        to: this.form.to,
        value: this.form.value,
        fee: this.form.fee,
        dateCreated: this.form.dateCreated,
        senderPubKey: this.form.senderPubKey,
        transactionDataHash: this.form.transactionDataHash,
        SenderSignature: this.form.SenderSignature
      };

      var signedTXInfoInJSON = JSON.stringify(signedTXInfo);
      document.getElementById("SignedTransaction").value = signedTXInfoInJSON;

    },

    SendTransaction() {
      console.log("Constructing transaction for Axios Sending transactions..");
      const axios = require("axios").default;

      //Gather data in form for REST-POST to node
      const formData = new FormData();

      formData.append("data", this.form.data);
      formData.append("senderPubKey", "This is sender PubKey"); // ?? WIP
      formData.append("transactionDataHash", this.form.transactionDataHash); //system created after user sign
      formData.append("senderSignature",this.form.SenderSignature); // 

      const isValid=this.form.ec.keyFromPublic(this.$store.state.publicKey,'hex')
       .verify(this.form.transactionDataHash,this.form.SenderSignature);

      document.getElementById("SendedTransaction").value = "Signature is verified successfully: "+ isValid;
      
      if(isValid){
      axios
        .post("http://127.0.0.1:1234/transactions/send", formData, {})
        .then(function(response) {
          if(response.data==200){
              document.getElementById("SendedTransaction").value += "\nTransaction successfully sent.";
              document.getElementById("SendedTransaction").value += "\nTransaction Hash: "+response.data;
          }
          else{
              document.getElementById("SendedTransaction").value = "\nTransaction return code: "+response.data; 
              document.getElementById("SendedTransaction").value += "\nPlease check is it correct?";
          }
         });
        }     
    }
  }
};
</script>
