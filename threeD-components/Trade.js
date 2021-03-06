import { isTradeReady } from '../components/App.js';
import {inventoryPageLimit, peersPageLimit} from './constants.js';
const InventoryCard = (props) => {
  return `
    <a class="threeD-trade-inventory-card ${props.selected ? 'selected' : ''}" onclick="threeD-trade-inventory-card" name="${props.id}" id="threeD-trade-inventory-card">
      <img class="threeD-trade-inventory-card-preview" src="${props.preview}">
      <h4 class="threeD-trade-inventory-card-name">${props.name}</h4>
    </a>
  `;
}

const PeerCard = (props) => {
  return `
    <a class="threeD-trade-peers-card ${props.selected ? 'selected' : ''}" onclick="threeD-trade-peers-card" name="${props.peerAddress}" id="threeD-trade-peers-card">
      <h1 class="threeD-trade-peers-card-address">${props.peerAddress}</h1>
    </a>
  `;
}

const Trade = (props) => {
  const inventoryItems = props.inventoryItems.slice(inventoryPageLimit * props.trade.inventoryPage, inventoryPageLimit * (props.trade.inventoryPage + 1));
  const peers = props.peers.slice(peersPageLimit * props.trade.peersPage, peersPageLimit * (props.trade.peersPage + 1));
  const toPeer = props.trade.toPeer; 
  const fromPeer = props.trade.fromPeer;
  const selectedItem = props.inventoryItems.find(item => item.id === props.trade.selectedItem);
  const agreement = !!props.trade.agreement;
  const selectedName = selectedItem ? selectedItem.filename : null;
  return `
  <style>
  .threeD-trade {
    color: white;
  }
  
  .threeD-trade-content {
    overflow-y: auto;
    height: 82vh;
  }
  
  .threeD-trade-header {
    width: 100%;
    height: 200px;
    background-color: #00a6ff;
    color: white;
    text-align: center;
    padding-top: 1px;
    font-size: 40px;
  }
  
  .threeD-trade-sectionHeader {
    padding-left: 35px;
    font-size: 60px;
  }
  
  .threeD-trade-inventory {
    height: 350px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 30px;
    border: 4px #d2c1c1 solid;
    overflow: hidden;
  }
  
  .threeD-trade-inventory-card {
    width: 300px;
    height: 310px;
    background-color: black;
    padding: 10px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    border: 8px black solid;
    margin: 15px;
  }
  
  .threeD-trade-inventory-card.selected {
    border: 8px #4faeff solid
  }
  
  .threeD-trade-inventory-card-preview {
    height: 85%;
    width: 100%;
  }
  
  .threeD-trade-inventory-card-name {
    margin-bottom: 9px;
    margin-top: 5px; 
    font-size: 35px;
  }
  
  .threeD-trade-peers {
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 30px;
    border: 4px #d2c1c1 solid;
  }
  
  .threeD-trade-peers-card {
    width: 410px;
    height: 160px;
    background-color: black;
    padding: 10px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
    border: 8px black solid;
    margin: 15px;
    text-align: center;
  }
  
  .threeD-trade-peers-card.selected {
    border: 8px #4faeff solid
  }

  .threeD-trade-peers-card-address {
    font-size: 60px;
  }
  
  .threeD-trade-cancel {
    padding: 25px 35px;
    background-color: #ff0058;
    border: 0;
    color: #FFF;
    font-size: 80px;
    white-space: nowrap;
    text-decoration: none;
    margin-top: 25px;
    margin-bottom: 50px;
    text-align: center;
    margin-right: 100px;
  }
  
  .threeD-trade-accept {
    padding: 25px 35px;
    background-color: #12bd4b;
    border: 0;
    color: #FFF;
    font-size: 80px;
    white-space: nowrap;
    text-decoration: none;
    margin-top: 25px;
    margin-bottom: 50px;
    text-align: center;
  }
  
  .threeD-trade-accept.disabled {
    background-color: #b9b7b7;
    color: #FFF;
  }
  
  .threeD-trade-actions {
    display: flex;
    background-color: #000000b3;
    padding: 25px;
    position: relative;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .threeD-trade-actions-agreement {
    padding-top: 35px;
  }

  .threeD-trade-info {
    width: 50%;
  }
  .threeD-trade-info-detail {
    font-size: 60px;
    color: #00a6ff;
  }
  .threeD-trade-info-header {
    padding-left: 50px;
    font-size: 50px;
  }
  #threeD-trade-agreement {
    height: 100px;
    width: 100px;
    margin-right: 15px;
  }
  #threeD-trade-agreement-label {
    font-size: 70px !important;
  }
  #threeD-trade-header-backBtn {
    margin: 34px;
    font-size: 80px;
    position: absolute;
    left: 20px;
    padding: 25px;
  }
  #threeD-trade-header-backBtn:hover {
    color: #ffae94;
  }
  .threeD-spacer {
    width: 100%;
    height: 100px;
  }
  .threeD-trade-inventory-pagination, .threeD-trade-peers-pagination {
    float: right;
    margin-right: 50px;
    text-align: center;
  }
  #threeD-trade-inventory-back, #threeD-trade-peers-back {
    background-color: black;
    display: inline-block;
    width: 90px;
    height: 90px;
    font-size: 85px;
  }
  #threeD-trade-inventory-forward, #threeD-trade-peers-forward {
    background-color: black;
    display: inline-block;
    width: 90px;
    height: 90px;
    font-size: 85px;
    margin-left: 30px;
  }
  #threeD-trade-inventory-page {
    display: inline;
    font-size: 80px;
  }
  #threeD-trade-peers-page {
    display: inline;
    font-size: 80px;
  }
  </style>
    <div class="threeD-trade">
      <div class="threeD-trade-header">
        <a class="threeD-trade-header-backBtn" id="threeD-trade-header-backBtn" onclick="threeD-trade-header-backBtn">
          < Back
        </a>
        <h1>Trade</h1>
      </div>
      <div class="threeD-trade-content">
        <h1 class="threeD-trade-sectionHeader">
          Select Item:
          <div class="threeD-trade-inventory-pagination">
            <a id="threeD-trade-inventory-back"><</a>
            <p id="threeD-trade-inventory-page">${props.trade.inventoryPage}</p>
            <a id="threeD-trade-inventory-forward">></a>
          </div>
        </h1>
        <div class="threeD-trade-inventory">
          ${
            inventoryItems.map((value, index) => {
              return InventoryCard({
                  id: value.id,
                  name: value.filename,
                  preview: value.preview,
                  selected: selectedItem?.id === value.id,
              })
            }).join('')
          }
        </div>
        <h1 class="threeD-trade-sectionHeader">
          Select Peer:
          <div class="threeD-trade-peers-pagination">
            <a id="threeD-trade-peers-back"><</a>
            <p id="threeD-trade-peers-page">${props.trade.peersPage}</p>
            <a id="threeD-trade-peers-forward">></a>
          </div>
        </h1>
        <div class="threeD-trade-peers">
          ${
            peers.map((value, index) => {
              return PeerCard({
                peerAddress: value.address,
                selected: value.address === toPeer,
              });
            }).join('')
          }
        </div>
        <div class="threeD-trade-actions">  
          <div class="threeD-trade-info">
            <h1 class="threeD-trade-info-header">
              Selected Peer: 
              <p class="threeD-trade-info-detail">${toPeer}</p>
            </h1>
            <h1 class="threeD-trade-info-header">
              Item for Trade: 
              <p class="threeD-trade-info-detail">${selectedName}</p>
            </h1>
          </div>
          <div class="threeD-trade-actions-agreement"> 
            <input type="checkbox" id="threeD-trade-agreement" name="threeD-trade-agreement" ${agreement ? 'checked' : ''} onclick="threeD-trade-agreement">
            <label for="threeD-trade-agreement" id="threeD-trade-agreement-label"> I agree to trade my token.</label><br>
            <div class="threeD-spacer"></div>
            <a class="threeD-trade-cancel" id="threeD-trade-cancel" onclick="threeD-trade-cancel">Cancel</a>
            <a class="threeD-trade-accept ${!isTradeReady() ? 'disabled' : ''}" id="threeD-trade-accept" onclick="threeD-trade-accept">Accept</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
export default Trade;