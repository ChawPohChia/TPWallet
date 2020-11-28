//SendTransaction.vue
<template>
  <section>
    <div class="row align-items-center jumbotron jumbotron-fluid page-header home full">
      <div class="col-md-12">
        <div class="container">
          <h1 class="display-4">Send Transaction</h1>
          <p
            class="lead"
          >Sending coin to your peer by key in yours and your peer's wallet address and value to send.</p>
        </div>
      </div>
    </div>

    <form v-on:submit.prevent="SignTransaction()">
      <p class="lead">Sender Wallet Address:</p>
      <textarea
        class="form-control"
        rows="1"
        cols="100"
        id="senderAddress"
        v-model="form.senderAddress"
      ></textarea>
      <br />
      <br />
      <p class="lead">Recipient Wallet Address:</p>
      <textarea
        class="form-control"
        rows="1"
        cols="100"
        id="recipientAddress"
        v-model="form.recipientAddress"
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
        from: null, // from opened wallet
        to: "This is recipient address", // user fill-in
        value: 100000, //user fill-in
        fee: 100, // system fix
        dateCreated: null, // system derives while signing
        data: null, // system compiles (from stringify of gather data)
        senderPubKey: null, // from opened wallet
        transactionDataHash: null, // system derives from data while signing
        SenderSignature: null, // system derives from data while signing
        coinKey: null, //wip :Need to remove this
        ec: null //wip :Need to remove this
      }
    };
  },

  methods: {
    SignTransaction() {
      console.log("Constructing transaction for signing transactions..");

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

      // This random generation key need to be replaced by open wallet
      //wip: to be removed
      var sr = require("secure-random"); //npm install --save secure-random@1.x
      var CoinKey = require("coinkey"); //npm install --save coinkey@0.1.0
      var privKey = sr.randomBuffer(32);
      this.form.coinKey = new CoinKey(privKey, true);
      this.form.from = this.form.coinKey.publicAddress;

      //Getting transaction data and transaction data hash
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
        this.form.coinKey.privateKey,
        "hex",
        { canonical: true }
      );
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

      /*
      console.log("Generating wallet now..");

      //The following refers to: http://cryptocoinjs.com/modules/crypto/ecdsa/
      // and https://github.com/cryptocoinjs/coinkey
      // and http://cryptocoinjs.com/modules/crypto/ecdsa/#ecdsa 
      var crypto = require("crypto"); //Node.js or Browserify (browser)    
      var sr = require("secure-random"); //npm install --save secure-random@1.x
      var CoinKey = require("coinkey"); //npm install --save coinkey@0.1.0
       
      var privateKey = sr.randomBuffer(32);    
      var ck = new CoinKey(privateKey, true); // true => compressed public key / addresses      
      console.log("coinkey private key: "+ck.privateKey); //true
      console.log("coinkey public key: "+ck.publicKey); //true
      console.log("coinkey public address: "+ck.publicAddress); //true
      
      let elliptic = require('elliptic');
      let ec = new elliptic.ec('secp256k1');

      var msg = new Buffer("hello world!", "utf8");
      var shaMsg = crypto.createHash("sha256").update(msg).digest();
      let signature = ec.sign(shaMsg, privateKey, "hex", {canonical: true});

      var isValid = ec.verify(shaMsg, signature, ck.publicKey);     
      console.log("isvalid: "+isValid);
      */
    },

    SendTransaction() {
      console.log("Constructing transaction for Axios Sending transactions..");
      const axios = require("axios").default;

      //Gather data in form for REST-POST to node
      const formData = new FormData();

      formData.append("data", this.form.data);
      formData.append("senderPubKey", "This is sender PubKey"); // ?? WIP
      formData.append("transactionDataHash", this.form.transactionDataHash); //system created after user sign
      formData.append(
        "senderSignature",
        "senderSignature(txDataHash, signature, Pubkey)"
      ); // ?? WIP

      // Verifying signature before REST-POST
      // WIP: so far this verification fails.
      var isValid = this.form.ec.verify(
        this.form.transactionDataHash,
        this.form.SenderSignature,
        this.form.coinKey.publicKey
      );
      console.log("Signature verified correctly? :" + isValid);

      axios
        .post("http://127.0.0.1:1234/transactions/send", formData, {})
        .then(function(response) {
          if(response.data==200){
              document.getElementById("SendedTransaction").value = "Transaction successfully sent.";
              document.getElementById("SendedTransaction").value += "\nTransaction Hash: "+response.data;
          }
          else{
              document.getElementById("SendedTransaction").value = "Transaction return code: "+response.data; 
              document.getElementById("SendedTransaction").value += "\nPlease check is it correct?";
          }
        });

      
    }
  }
};
</script>
