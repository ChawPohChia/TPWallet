<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |    
    <router-link to="/CreateWallet">Create New Wallet</router-link> |
    <router-link to="/OpenWallet">Open Existing Wallet</router-link> |
    <router-link to="/AccountBalance">Account Balance</router-link> |
    <router-link to="/SendTransaction">SendTransactionn</router-link> |
    <router-link to="/Logout">Logout</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
