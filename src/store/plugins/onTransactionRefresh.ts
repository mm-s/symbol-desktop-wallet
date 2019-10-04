import {TransactionType, Address} from 'nem2-sdk'
import {mosaicsAmountViewFromAddress} from '@/core/services'
import {AppMosaic, AppWallet, AppState} from '@/core/model'
import {getNamespacesFromAddress} from '@/core/services'
import {Store} from 'vuex'

const txTypeToGetNamespaces = [
  TransactionType.REGISTER_NAMESPACE,
  TransactionType.MOSAIC_ALIAS,
  TransactionType.ADDRESS_ALIAS,
]

/**
 * This module reacts to confirmed transactions
 * By default, the mosaic balances are checked everyTime
 */
export const onTransactionRefreshModule = (store: any) => { // @TODO: check how to type it
  store.registerModule('onTransactionRefresh', onTransactionRefreshModule)

  store.subscribe(async (mutation, state: AppState) => {
    /**
     * Extracts all hexIds from transactions,
     * Add them to store.account.mosaics
     */
    if (mutation.type === 'ADD_CONFIRMED_TRANSACTION') {
     try {
        const {node, networkCurrency} = state.account
        const {address} = state.account.wallet
        const accountAddress = Address.createFromRawAddress(address)
        const mosaicAmountViews = await mosaicsAmountViewFromAddress(node, accountAddress)
        const appMosaics = mosaicAmountViews.map(x => AppMosaic.fromMosaicAmountView(x))
        const ownedNetworkCurrency = appMosaics.find(({hex}) => hex === networkCurrency.hex)
        const balance = ownedNetworkCurrency === undefined ? 0 : ownedNetworkCurrency.balance
        new AppWallet(state.account.wallet).updateAccountBalance(balance, store)
        store.commit('UPDATE_MOSAICS', appMosaics)
        const txType = mutation.payload[0].rawTx.type

        if (txTypeToGetNamespaces.includes(txType)) {
          const namespaces = await getNamespacesFromAddress(address, node)
          store.commit('SET_NAMESPACES', namespaces)
        }  
     } catch (error) {
        console.error(error)
     }
    }

    if (mutation.type === 'ADD_CONFIRMED_MULTISIG_ACCOUNT_TRANSACTION') {
      try {
         const {node} = state.account
         const {address, transaction} = mutation.payload[0]
         const accountAddress = Address.createFromRawAddress(address)
         const mosaicAmountViews = await mosaicsAmountViewFromAddress(node, accountAddress)
         const appMosaics = mosaicAmountViews.map(x => AppMosaic.fromMosaicAmountView(x))
         store.commit('UPDATE_MULTISIG_ACCOUNT_MOSAICS', appMosaics)
         const txType = transaction.type
 
         if (txTypeToGetNamespaces.includes(txType)) {
            const namespaces = await getNamespacesFromAddress(address, node)
            store.commit('SET_MULTISIG_ACCOUNT_NAMESPACES', namespaces)
         }  
      } catch (error) {
       console.error(error)
      }
     }
  })
}