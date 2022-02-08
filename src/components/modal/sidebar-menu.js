import React, { useEffect, useState, useContext } from "react";
import { WalletContext } from "@src/context";
import {
  IconAudits,
  IconBridge,
  IconCheckMark,
  IconDashboard,
  IconExchange,
  IconFarming,
  IconHelp,
  IconHome,
  IconMore,
  IconStacking,
  IconWallet,
  IconNft,
} from "@src/icons/icons";
import { WalletFactory } from "@src/wallets/wallet-factory";
import { Link } from "react-router-dom";

export const ModalSidebarMenu = (props) => {
  const { wallet } = useContext(WalletContext);
  const [agreement, setAgreement] = useState(wallet?.address !== "");

  return (
    <ul className="sidebar__mobile">
      <li className="sidebar__nav-box">
        <Link to="/" className={`sidebar__nav-item ${props.location?.pathname === "/" ? `active` : ""}`}>
          <div className="sidebar__nav-icon">
            <IconHome />
          </div>
          <span>Main</span>
        </Link>
      </li>
      <li className="sidebar__nav-box">
        <Link
          to="/z-meta-board"
          className={`sidebar__nav-item ${props.location?.pathname === "/z-meta-board" ? `active` : ""}`}
        >
          <div className="sidebar__nav-icon">
            <IconDashboard />
          </div>
          <span>zMetaBoard</span>
        </Link>
      </li>
      <li className="sidebar__nav-box">
        <a className="sidebar__nav-item disabled">
          <div className="sidebar__nav-icon">
            <IconWallet />
          </div>
          <span>Invest Portfolios</span>
        </a>
      </li>
      <li className="sidebar__nav-box">
        <Link to="/swap" className={`sidebar__nav-item ${props.location?.pathname === "/swap" ? `active` : ""}`}>
          <div className="sidebar__nav-icon">
            <IconExchange />
          </div>
          <span>Swap</span>
        </Link>
      </li>
      <li className="sidebar__nav-box">
        <Link to="/bridge" className={`sidebar__nav-item ${props.location?.pathname === "/bridge" ? `active` : ""}`}>
          <div className="sidebar__nav-icon">
            <IconBridge />
          </div>
          <span>
            <b>Zamio</b> Bridge
          </span>
        </Link>
      </li>

      <li className="sidebar__nav-box">
        <Link to="/staking" className={`sidebar__nav-item ${props.location?.pathname === "/staking" ? `active` : ""}`}>
          <div className="sidebar__nav-icon">
            <IconStacking />
          </div>
          <span>Staking</span>
        </Link>
      </li>
      <li className="sidebar__nav-box">
        <Link to="/nft" className={`sidebar__nav-item ${props.location?.pathname === "/nft" ? `active` : ""}`}>
          <div className="sidebar__nav-icon">
            <IconNft />
          </div>
          <span>Nft</span>
        </Link>
      </li>
      <li className="sidebar__nav-box">
        <Link to="/farming" className={`sidebar__nav-item ${props.location?.pathname === "/farming" ? `active` : ""}`}>
          <div className="sidebar__nav-icon">
            <IconFarming />
          </div>
          <span>Farming</span>
        </Link>
      </li>
      <li className="sidebar__nav-box">
        <Link to="/audits" className={`sidebar__nav-item ${props.location?.pathname === "/audits" ? `active` : ""}`}>
          <div className="sidebar__nav-icon">
            <IconAudits />
          </div>
          <span>Audits</span>
        </Link>
      </li>
      <li className="sidebar__nav-box">
        <a target="_blank" href="https://zam.io/faq" className="sidebar__nav-item">
          <div className="sidebar__nav-icon">
            <IconHelp />
          </div>
          <span>FAQ</span>
        </a>
      </li>
    </ul>
  );
};
