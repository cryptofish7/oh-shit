import React from 'react';
import './App.css';
import web3 from './web3';
import { useWallet } from 'use-wallet';
import Button from "@material-ui/core/Button";
import masterchefv2 from "./masterchefv2";
import bamboov2 from "./bamboov2";

function App() {

  const wallet = useWallet();
  const masterchefv2Address = "0x124737ce6a43A98CAAF095AcCb9A9D6fccBb0E73";

  const onMassUpdatePools = async () => {
    if (wallet.status === 'connected') {
      try {
        console.log("Making transaction...");
        await masterchefv2.methods.massUpdatePools().send({
          from: wallet.account
        })
        console.log("Transaction success!");
      } catch(err) {
        alert(err);
      }
    }
  }

  const onTransferOwnership = async () => {
    if (wallet.status === 'connected') {
      try {
        console.log("Making transaction...");
        await bamboov2.methods.transferOwnership(masterchefv2Address).send({
          from: wallet.account
        })
        console.log("Transaction success!");
      } catch (err) {
        alert(err);
      }
    }
  }

  return (
    <div class="App">
      <h1>BAMBOO-V1 to BAMBOO-V2 Converter</h1>
      <h2>Wallet</h2>
      {wallet.status === 'connected' ? (
        <>
          <Button variant="contained" color="primary" onClick={() => wallet.reset()}>Disconnect</Button>
        <div class="wallet-stats">
          <div>Account: {wallet.account}</div>
          <div>Balance: {web3.utils.fromWei(wallet.balance, 'ether')} AVAX</div>
        </div>
          <Button variant="contained" onClick={onMassUpdatePools}>MASS UPDATE POOLS</Button>
          <Button variant="contained" onClick={onTransferOwnership}>TRANSFER BAMBOO-V2 OWNERSHIP TO MASTERCHEFV2</Button>
        </>
      ) : (
        <div>
          Connect:
          <Button variant="contained" color="primary" onClick={() => wallet.connect()}>MetaMask</Button>
        </div>
      )}
    </div>
  );
}

export default App;
