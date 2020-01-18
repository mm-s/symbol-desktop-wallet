import {TransactionType} from 'nem2-sdk'

import {
  FormattedTransfer,
  FormattedRegisterNamespace,
  FormattedAddressAlias,
  FormattedMosaicAlias,
  FormattedMosaicDefinition,
  FormattedMosaicSupplyChange,
  FormattedModifyMultisigAccount,
  FormattedAggregateComplete,
  FormattedAggregateBonded,
  FormattedLock,
  FormattedSecretLock,
  FormattedSecretProof,
  FormattedAccountRestrictionAddress,
  FormattedAccountRestrictionMosaic,
  FormattedAccountRestrictionOperation,
  FormattedLinkAccount,
  FormattedMosaicAddressRestriction,
  FormattedMosaicGlobalRestriction,
  FormattedAccountMetadataTransaction,
  FormattedMosaicMetadataTransaction,
  FormattedNamespaceMetadataTransaction,
} from '@/core/model'

export const transactionTypeToFormattedTransaction = (type: string) => ({
  [TransactionType.TRANSFER]: FormattedTransfer,
  [TransactionType.REGISTER_NAMESPACE]: FormattedRegisterNamespace,
  [TransactionType.ADDRESS_ALIAS]: FormattedAddressAlias,
  [TransactionType.MOSAIC_ALIAS]: FormattedMosaicAlias,
  [TransactionType.MOSAIC_DEFINITION]: FormattedMosaicDefinition,
  [TransactionType.MOSAIC_SUPPLY_CHANGE]: FormattedMosaicSupplyChange,
  [TransactionType.MODIFY_MULTISIG_ACCOUNT]: FormattedModifyMultisigAccount,
  [TransactionType.AGGREGATE_COMPLETE]: FormattedAggregateComplete,
  [TransactionType.AGGREGATE_BONDED]: FormattedAggregateBonded,
  [TransactionType.LOCK]: FormattedLock,
  [TransactionType.SECRET_LOCK]: FormattedSecretLock,
  [TransactionType.SECRET_PROOF]: FormattedSecretProof,
  [TransactionType.ACCOUNT_RESTRICTION_ADDRESS]: FormattedAccountRestrictionAddress,
  [TransactionType.ACCOUNT_RESTRICTION_MOSAIC]: FormattedAccountRestrictionMosaic,
  [TransactionType.ACCOUNT_RESTRICTION_OPERATION]: FormattedAccountRestrictionOperation,
  [TransactionType.LINK_ACCOUNT]: FormattedLinkAccount,
  [TransactionType.MOSAIC_ADDRESS_RESTRICTION]: FormattedMosaicAddressRestriction,
  [TransactionType.MOSAIC_GLOBAL_RESTRICTION]: FormattedMosaicGlobalRestriction,
  [TransactionType.ACCOUNT_METADATA_TRANSACTION]: FormattedAccountMetadataTransaction,
  [TransactionType.MOSAIC_METADATA_TRANSACTION]: FormattedMosaicMetadataTransaction,
  [TransactionType.NAMESPACE_METADATA_TRANSACTION]: FormattedNamespaceMetadataTransaction,
}[type])