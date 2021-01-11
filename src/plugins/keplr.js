import Keplr from "../lib/keplr";

import Vuex from 'vuex';


export default {
  install(Vue, options) {

    Vue.use(Vuex);
    Vue.prototype.$store.registerModule('$keplr', {
          namespaced: true,
          state: {
            chainInfo: {
              chainId: "",
              chainName: "",
            },
            selectedAccount: null,
            accounts: []
          },
          mutations: {
            setChainInfo: (state, { chainId, chainName }) => {
              state.chainInfo.chainId = chainId;
              state.chainInfo.chainName = chainName;
            },
            selectAccount: (state, address) => {
              state.accounts.forEach(e => {e.selected = false});

              if(address) {
                let account = state.accounts.find(e => e.address == address);
                if(account == undefined) {
                  account = {
                    selected: true,
                    address,
                    balance: null,
                    keys: {}
                  };
  
                  state.accounts.push(account);
                } else {
                  account.selected = true;
                }

                state.selectedAccount = account;
              }
            }
          },
          actions: {
            setChainInfo: ({ commit }, chainInfo) => {
              commit("setChainInfo", chainInfo);
            },
            selectAccount: ({ commit }, address) => {
              commit("selectAccount", address);
            }
          }
        });


    const keplrWallet = new Keplr(
      options.chainId,
      options.chainName,
      options.restUrl,
      options.rpcUrl,
      // On load
      () => {
        options.onLoad();
      },
      // When something goes wrong
      (err) => {
        console.error(err);
      }
    );

    // After initializing the wallet it hooks it up with the store in just two events
    // 1. Sets up the reactive chain info
    Vue.prototype.$store.dispatch('$keplr/setChainInfo', {
      chainId: keplrWallet.chainId, 
      chainName: keplrWallet.chainName
    });
    // 2. Updates the address everything the default address is changed in the wallet
    keplrWallet.onAddressChanged = (newAddress) => {
      Vue.prototype.$store.dispatch('$keplr/selectAccount', newAddress);
    },

    Object.defineProperty(Vue.prototype, "$keplr", { value: keplrWallet });
  },
};
