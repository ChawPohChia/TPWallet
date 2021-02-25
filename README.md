# tpwallet

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### References:
1) https://medium.com/blockthought/creating-bitcoin-wallets-in-js-69c0773c2954
2) https://www.npmjs.com/package/elliptic-curve
3) https://github.com/cryptocoinjs/bs58 
4) https://www.npmjs.com/package/js-sha256
5) https://github.com/niyas/bitcoin-address-generator //This library generate bitcoin address and random private key
6) https://savjee.be/2018/10/Signing-transactions-blockchain-javascript/ Signing a transaction
7) How to create privatekey/publickey/address/sign and verify message
      // http://cryptocoinjs.com/modules/crypto/ecdsa/
      // https://github.com/cryptocoinjs/coinkey
      // http://cryptocoinjs.com/modules/crypto/ecdsa/#ecdsa 

8) https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
9) REST API Calling: https://www.npmjs.com/package/axios 
10) Using datastore in Vue: https://www.smashingmagazine.com/2020/01/data-components-vue-js/#:~:text=1.-,Using%20Props%20To%20Share%20Data%20From%20Parent%20To%20Child,parent%20to%20a%20child%20component!



### Assignment Presentation:

1. Implementing the Node (Max: 30 Points, Bonus: 8 Points)
()a. Having REST – 5 Points  
()b. Transaction Validations - 5 Points
  c. Multiple Nodes Synchronization – 5 Points
()d. Block Validations – 5 Points
()e. Mining Jobs - 5 Points
()f. Balances (Confirmed/Pending/Available) – 5 Points
  g. (Bonus) Dynamic block difficulty - 3 Points
  h. (Bonus) Merkle Tree storage for transactions - 5 Points


2. Implemented Wallet (Max: 10 Points, Bonus: 4 Points)
()a. Wallet key/address derivation - 4 Points
()b. Wallet transaction sign/send - 3 Points
()c. Secure initial seed derivation – 3 Points
()d. (Bonus) Wallet front-end – 2 Points
  e. (Bonus) Hierarchical Key-Derivation – 2 Points


3. Implemented Faucet (Max: 5 Points, Bonus: 4 points)
()a. Faucet Back-end – 5 Points
()b. (Bonus) Faucet coin request limit – 2 points
()c. (Bonus) Faucet front-end – 2 Points


4. Implemented Miner (Max: 5 Points, Bonus: 8 Points)
()a. Simple Miner – 5 Points
  b. (Bonus) Parallel/Multi-threaded Miner – 3 Points
  c. (Bonus) GPU mining – 5 points


5. Implemented Block Explorer (Max: 10 Points, Bonus: 6 Points)
()a. Displaying home page with latest blocks/transactions – 2 points
()b. Displaying Block information – 2 Points
()c. Displaying Transaction information, Pending/Confirmed – 2 points
()d. Displaying Balance information – 2 points
()e. Displaying Transaction history of address – 2 points
  f. (Bonus) Displaying node connectivity around the world – 2 points
  g. (Bonus) Allow comments on transactions/blocks/addresses – 2 points
  h. (Bonus) Implement address naming service – 2 points


Other Points
(Commit message and History + Gitflow) 1. Documentation – 5 points
(Github- Version controlling- GitFlow) 2. Code-Quality – 5 points
(Miner with UI)                        3. (Bonus) Other Bonus Points – 5 points

### Improvement needed
1) All the above mentioned bonus points - to do
2) Validation of transaction at the server side.
3) Multiple mnodes synchronisation.
4) Better UX/UI


### Questions
1) How multiple nodes do synchronisation?
2) Do nodes use database or purely memory based - data persistence?
3) Validator roles and why they do so? 

