import {WalletMetamask} from "@src/wallets/wallet-metamask";
import {WalletNullish} from "@src/wallets/wallet-nullish";
import {WalletBinance} from "@src/wallets/wallet-binance";
import {WalletConnector} from "@src/wallets/wallet-connector";

export class WalletFactory {
    static getWallet(type) {

        const walletType = type ?? localStorage.getItem('walletType');
        localStorage.setItem('walletType', walletType);

        if (walletType === 'binance') {
            return new WalletBinance();
        } else if (walletType === 'metamask') {
            return new WalletMetamask();
        } else if (walletType === 'walletconnect') {
            return new WalletConnector();
        } else {
            return new WalletNullish();
        }
    }
}
