import { useState, useEffect } from 'react';
import { magic } from './magic';
import { provider } from './ethers';
import { isAddress, parseUnits, formatEther } from 'ethers/lib/utils';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleLogin = async () => {
    try {
      const accounts = await magic.wallet.connectWithUI();
      console.log(accounts);
      if (accounts) {
        getUserData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getUserData = async () => {
    try {
      const userData = await magic.user.getInfo();
      setUser(userData);
      console.log(userData);
    } catch (err) {
      console.error(err);
  }
};

const getBalance = async () => {
  try {
    const balance = await provider.getBalance(user.publicAddress);
    console.log(formatEther(balance));
  } catch (err) {
    console.error(err);
  }
}

const handleLogout = async () => {
  try {
    magic.user.logout();
    setUser(null);
  } catch (err) {
    console.error(err);
  }
};

const handleSignMessage = async () => {
  try {
    const message = 'Are you sure you want to sign this message?';
    const signedMessage = await provider.getSigner().signMessage(message);
    console.log(signedMessage);
  } catch (err) {
    console.log(err);
  }
};

const handleSendTransaction = async () => {
  try {
    if (!isAddress(recipient)) {
      console.log('Invalid address');
    }
    if (isNaN(Number(amount))) {
      console.log('Invalid amount');
    }
    const txParams = {
      from: user.publicAddress,
      to: recipient,
      value: parseUnits(amount)
    };
    const txResponse = await provider.getSigner().sendTransaction(txParams);
    console.log(txResponse);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  getUserData();
}, [])

useEffect(() => {
  if (user) {
    getBalance();
  }
}, [user]);

  return (
    <main>
      { user 
        ? (
          <>
            <input
              type='text'
              placeholder='Recipient Address'
              value={recipient}
              onChange={(event) => {setRecipient(event.target.value)}}
            />
            <input 
              type='text'
              placeholder='Amount'
              value={amount}
              onChange={(event) => {setAmount(event.target.value)}}
              />
            <button
              onClick={handleSendTransaction}
              >
              Send Transaction
            </button>

            <button
              onClick={handleSignMessage}
            >
              Sign Message
            </button>
            <button
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
          ) : (
            <button
              onClick={handleLogin}
            >
              Login
            </button>
          )
      }
    </main>
  );
}

export default App;
