import React, {useContext, useEffect, useRef, useState} from 'react';
import {NETWORK_ETH, NETWORKS} from "@src/constants";
import {ModalContext} from "@src/context";

export const NetworkSwitcher = ({wallet}) => {
    const [selectedNetwork, setSelectedNetwork] = useState();
    const [dropdownActive, setDropdownActive] = useState();
    const {setWarningOpen} = useContext(ModalContext);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setDropdownActive(false);
            }
        }

        if (dropdownActive) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [dropdownActive]);

    useEffect(async () => {
        const chainId = await wallet.getChainId();
        if (chainId) {
            const network = Object.keys(NETWORKS).find(key => NETWORKS[key].chainId.includes(chainId));

            setSelectedNetwork(network);
        }
    }, [wallet]);

    const switchNetwork = (network) => {
        if (network.isSoon) {
            return false;
        }
        setDropdownActive(false);
        wallet.switchNetwork(network.chainId[0], network.rpcUrl).catch(error => setWarningOpen(error.message));
    }

    return (
        <div className="network-switcher">
            <div className="network-switcher__current" onClick={() => setDropdownActive(!dropdownActive)}>
                <img className="network-switcher__icon" alt="" src={NETWORKS[selectedNetwork]?.icon}/>
                <span className="network-switcher__name hidden-sm">{NETWORKS[selectedNetwork]?.name}</span>
                <img className={`network-switcher__current--arrow ${dropdownActive ? 'active' : ''}`}
                     src="/images/arrow_dropdown.svg"/>
            </div>
            {
                !dropdownActive ||
                <ul className="network-switcher__dropdown" ref={ref}>
                    {
                        Object.keys(NETWORKS)
                            .map(key =>
                                <li key={key} onClick={() => switchNetwork(NETWORKS[key])}
                                    className={`${selectedNetwork === key ? 'visible-sm' : ''}`}>
                                    <img className="network-switcher__icon"
                                         src={NETWORKS[key].icon}/>
                                    <span className="network-switcher__name">
                                        {NETWORKS[key].name}
                                        {
                                            key !== NETWORK_ETH || <i>Only Bridge</i>
                                        }
                                        {
                                            !NETWORKS[key].isSoon || <b>Soon</b>
                                        }
                                    </span>
                                    {
                                        selectedNetwork !== key ||
                                            <img className="network-switcher__checked"
                                                 src="/images/icon_checked.svg"/>
                                    }

                                </li>
                            )
                    }
                </ul>
            }

        </div>
    )
}
