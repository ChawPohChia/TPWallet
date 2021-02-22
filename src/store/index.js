import { createStore } from 'vuex'
//import { ref } from "vue";

// Create a new store instance.
const store = createStore({
  state () {
    return {
      //publicKey:ref("ahbao44")
      privateKey:"",
      publicKey:"",
      publicAddress:""
    }
  },

  mutations:{
    persistPublicKey(state, pKey){
        state.publicKey = pKey;      
    },

    persistPublicAddress(state, pAddress){        
        state.publicAddress = pAddress;
    },

    persistPrivateKey(state, pKey){        
      state.privateKey = pKey;
    },

  }
})
export default store;


//reference
//https://stackoverflow.com/questions/65327556/vue-use-is-throwing-cannot-read-property-use-of-undefined

//this.$store.commit("changeWallet", this.form.publicKey, this.form.address);   