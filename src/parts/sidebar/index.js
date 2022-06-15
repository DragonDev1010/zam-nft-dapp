import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter, useLocation } from "react-router-dom";

import { RateContext } from "@src/context";
import { Modal } from "@src/components/modal/modal";
import { ModalSidebarMenu } from "@src/components/modal/sidebar-menu";

import {
  IconAppApple,
  IconAppGoogle,
  IconAudits,
  IconBridge,
  IconDashboard,
  IconExchange,
  IconFarming,
  IconHelp,
  IconStacking,
  IconNft,
  IconMore,
  IconHome,
  IconCalendar
} from "@src/icons/icons.js";


const Sidebar = (props) => {
  const { rate } = useContext(RateContext);
  const [modalIsOpen, setModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setModalOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={() => setModalOpen(false)}>
        <ModalSidebarMenu {...props} />
      </Modal>

      <aside className="sidebar">
        <div className="sidebar__container">
          <div className="sidebar__bottom">
            <nav className="sidebar__nav">
              <ul className="sidebar__nav-list custom-scroll">
                <li className="sidebar__nav-box">
                  <Link to="/zam-pad" className={`sidebar__nav-item ${location.pathname === "/" | location.pathname === "/zam-pad" ? `active` : ""}`}>
                    <div className="sidebar__nav-icon">
                      <IconHome />
                    </div>
                    <span>Main</span>
                  </Link>
                </li>
                <li className="sidebar__nav-box">
                  <Link
                    to="/calendar" 
                    className={`sidebar__nav-item ${location.pathname === "/calendar" ? `active` : ""}`}
                  >
                    <div className="sidebar__nav-icon">
                      <IconCalendar />
                    </div>
                    <span className="hidden-sm">Projects</span>
                    <span>&nbsp;Calendar</span>
                  </Link>
                </li>
                <li className="sidebar__nav-title">Products</li>
                <li className="sidebar__nav-box">
                  <Link
                    to="/z-meta-board"
                    className={`sidebar__nav-item ${location.pathname === "/z-meta-board" ? `active` : ""}`}
                  >
                    <div className="sidebar__nav-icon">
                      <IconDashboard />
                    </div>
                    <span>zMetaBoard</span>
                  </Link>
                </li>
                <li className="sidebar__nav-box hidden-sm">
                  <Link to="/swap" className={`sidebar__nav-item ${location.pathname === "/swap" ? `active` : ""}`}>
                    <div className="sidebar__nav-icon">
                      <IconExchange />
                    </div>
                    <span>DeFi Swap</span>
                  </Link>
                </li>
                <li className="sidebar__nav-box hidden-sm">
                  <Link
                    to="/bridge"
                    className={`sidebar__nav-item ${location.pathname === "/bridge" ? `active` : ""}`}
                  >
                    <div className="sidebar__nav-icon">
                      <IconBridge />
                    </div>
                    <span>Zamio Bridge</span>
                  </Link>
                </li>
                <li className="sidebar__nav-box">
                  <Link
                    to="/staking"
                    className={`sidebar__nav-item ${location.pathname === "/staking" ? `active` : ""}`}
                  >
                    <div className="sidebar__nav-icon">
                      <IconStacking />
                    </div>
                    <span>Staking</span>
                  </Link>
                </li>
                <li className="sidebar__nav-box hidden-sm">
                  <Link
                    to="/farming"
                    className={`sidebar__nav-item ${location.pathname === "/farming" ? `active` : ""}`}
                  >
                    <div className="sidebar__nav-icon">
                      <IconFarming />
                    </div>
                    <span>Farming</span>
                  </Link>
                </li>
                <li className="sidebar__nav-box">
                  <Link to="/nft" className={`sidebar__nav-item ${location.pathname === "/nft" ? `active` : ""}`}>
                    <div className="sidebar__nav-icon">
                      <IconNft />
                    </div>
                    <span className="hidden-sm">Nft mint 🔥🔥🔥</span>
                    <span className="visible-sm">Nft</span>
                  </Link>
                </li>
                <li className="sidebar__nav-title">More</li>
                <li className="sidebar__nav-box hidden-sm">
                  <Link
                    to="/audits"
                    className={`sidebar__nav-item ${location.pathname === "/audits" ? `active` : ""}`}
                  >
                    <div className="sidebar__nav-icon">
                      <IconAudits />
                    </div>
                    <span>Audits</span>
                  </Link>
                </li>
                <li className="sidebar__nav-box hidden-sm">
                  <a target="_blank" href="https://zam.io/faq" className="sidebar__nav-item">
                    <div className="sidebar__nav-icon">
                      <IconHelp />
                    </div>
                    <span>FAQ</span>
                  </a>
                </li>
                <li className="sidebar__nav-box sidebar__nav-more">
                  <a onClick={() => setModalOpen(true)} className={`sidebar__nav-item active`}>
                    <div className="sidebar__nav-icon">
                      <IconMore />
                    </div>
                    <span>More</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="sidebar__footer">
            <div className="sidebar__zamwallet">
              <img
                className="sidebar__zamwallet-image"
                src="./images/icon_app_big.png"
                srcSet="./images/icon_app_big.png 1x, ./images/icon_app_big_2x.png 2x"
              />
              <div className="sidebar__zamwallet-text">
                <b>Get ZamWallet</b>
                <div className="sidebar__zamwallet-apps">
                  <a
                    href="https://apps.apple.com/ru/app/zam-wallet/id1436344249"
                    target="_blank"
                    className="sidebar__zamwallet-app sidebar__zamwallet-app-apple"
                  >
                    <IconAppApple />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=zam.wallet"
                    target="_blank"
                    className="sidebar__zamwallet-app"
                  >
                    <IconAppGoogle />
                  </a>
                </div>
              </div>
            </div>
            <a href="/staking" className="sidebar__balance">
              <div className="sidebar__balance-token">
                <img src="./images/tokens/icon_token_zam.svg" height="30px" width="30px" />
                ZAM
              </div>
              <div className="sidebar__balance-price">{Number(rate).toFixed(4)}</div>
            </a>
            <div className="sidebar__icons">
              <a className="sidebar__icons-icon" href="https://github.com/Zamzam-Technology" target="_blank">
                <img src="./images/icon_github.svg" height="31px" width="31px" />
              </a>
              <a className="sidebar__icons-icon" href="https://coinmarketcap.com/currencies/zamio/" target="_blank">
                <img src="./images/icon_coinmarketcap.svg" height="31px" width="31px" />
              </a>
              <a className="sidebar__icons-icon" href="https://t.me/zam_io" target="_blank">
                <img src="./images/icon_telegram.svg" height="31px" width="31px" />
              </a>
              <a className="sidebar__icons-icon" href="https://twitter.com/zam_io" target="_blank">
                <img src="./images/icon_twitter.svg" height="31px" width="31px" />
              </a>
            </div>
            <div className="sidebar__links">
              <a href="https://zam.io/docs/5e7b377cde8403176232a4cff7b679b4.pdf" className="gray-link" target="_blank">
                Privacy Policy
              </a>
              <a href="https://zam.io/docs/debe5b38c66e212ac7afddf8293af433.pdf" className="gray-link" target="_blank">
                Terms of Conditions
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default withRouter(Sidebar);
