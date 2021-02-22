<template>
  <section class="full">
    <div class="row align-items-center jumbotron jumbotron-fluid page-header home full">
      <div class="col-md-12">
        <div class="container">
          <h1 class="display-4" style="color:red;">Press To Logout Your Wallet</h1>
             <form v-on:submit.prevent="Logout()">                      
                   <button type="submit" class="btn btn-primary">Logout Wallet</button><br><br> 
                   <p class="lead">{{message}}</p>    
            </form>                   
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Logout',
   data() {
    return {      
      message:"" 
    }
   },
   
   methods: {   
    Logout() {  
      this.$store.commit("persistPrivateKey",""); 
      this.$store.commit("persistPublicKey","");   
      this.$store.commit("persistPublicAddress","");  
      this.message="THANK YOU FOR USING TEMASEK POLYTECHNIC BLOCKCHAIN WALLET APPLICATION "

      console.log("PublicKey: "+this.$store.state.publicKey);   
      console.log("PublicAddress: "+this.$store.state.publicAddress);  
      console.log("Private Key: "+this.$store.state.privateKey);    
    }
  },
}
</script>

