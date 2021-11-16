import React, {useContext, useEffect, useState} from 'react';
import {WalletContext} from "@src/context";
import Web3 from "web3";
import {bridgeAction} from "@src/actions/bridgeAction";


export const BridgeTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const {wallet} = useContext(WalletContext);

    useEffect(async () => {
        await new bridgeAction(wallet).getTransactions(setTransactions);
    }, [wallet.address]);


    return (
        <div className="card bridge-transactions">
            <header className="flex justify-between mb-40">
                <h3 className="title">Transactions</h3>
                <button className="bridge-transactions__refresh"
                        onClick={() => wallet.getTransactions(setTransactions)}>
                    Refresh <img src="images/icon_refresh.svg"/>
                </button>
            </header>
            <div className="card__table-wrapper">
                <table className="table bridge-transactions__table">
                    <thead>
                    <tr>
                        <th className="col">Amount</th>
                        <th className="col">From</th>
                        <th className="col">To</th>
                        <th className="col">Close time</th>
                        <th className="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        transactions.map((transaction, index) => (
                            <tr key={`trans-${index}`}>
                                <td className="col">{Web3.utils.fromWei(transaction.value.toString())} Ether</td>
                                <td className="col">{`${String(transaction.from).substring(0, 6)}...${String(transaction.from).substring(38)}`}</td>
                                <td className="col">{`${String(transaction.to).substring(0, 6)}...${String(transaction.to).substring(38)}`}</td>
                                <td className="col">{new Date(transaction.timeStamp * 1000).toLocaleDateString("en-US")}</td>
                                <td className="col">{transaction.txreceipt_status ? `success` : `fail`}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
