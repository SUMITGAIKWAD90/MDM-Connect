import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';
import PageLayout from '../components/PageLayout';
import PaymentHero from '../components/paymentPortal/PaymentHero';
import { initialForm, purposeOptions } from '../components/paymentPortal/constants';
import { savePublicTransaction } from '../components/publicPortal/constants';
import TransactionStatusCard from '../components/paymentPortal/TransactionStatusCard';
import TransferFundsCard from '../components/paymentPortal/TransferFundsCard';

const CHAIN_CONFIG = {
  '0x89': { name: 'Polygon Mainnet', explorerTxBase: 'https://polygonscan.com/tx/' },
  '0x13882': { name: 'Polygon Amoy', explorerTxBase: 'https://amoy.polygonscan.com/tx/' },
  '0x80001': { name: 'Polygon Mumbai', explorerTxBase: 'https://mumbai.polygonscan.com/tx/' },
};

const POLYGON_CHAIN_IDS = new Set(Object.keys(CHAIN_CONFIG));
const POL_PRICE_ENDPOINT = 'https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=inr';
const FALLBACK_INR_PER_POL = 20;
const AMOY_MIN_PRIORITY_FEE_GWEI = '30';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Paymentpage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState(initialForm);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [sourceRequestId, setSourceRequestId] = useState('');
  const [inrPerPol, setInrPerPol] = useState(FALLBACK_INR_PER_POL);
  const [isRateLoading, setIsRateLoading] = useState(true);

  const purposeLabel = useMemo(
    () => purposeOptions.find((item) => item.value === formData.purpose)?.label || '-',
    [formData.purpose]
  );

  const estimatedPol = useMemo(() => {
    const inrValue = Number(formData.amount);
    if (!Number.isFinite(inrValue) || inrValue <= 0 || !Number.isFinite(inrPerPol) || inrPerPol <= 0) {
      return '';
    }

    const converted = inrValue / inrPerPol;
    return converted.toFixed(8).replace(/\.?0+$/, '');
  }, [formData.amount, inrPerPol]);

  useEffect(() => {
    let isMounted = true;

    const loadPolRate = async () => {
      try {
        const response = await fetch(POL_PRICE_ENDPOINT);
        if (!response.ok) {
          throw new Error('Failed to fetch POL price');
        }

        const data = await response.json();
        const latestRate = Number(data?.['polygon-ecosystem-token']?.inr);
        if (isMounted && Number.isFinite(latestRate) && latestRate > 0) {
          setInrPerPol(latestRate);
        }
      } catch (rateError) {
        // Keep fallback INR/POL rate if API is unavailable.
      } finally {
        if (isMounted) {
          setIsRateLoading(false);
        }
      }
    };

    loadPolRate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const prefill = location.state?.prefill;
    if (!prefill) return;

    setFormData((prev) => ({
      ...prev,
      schoolCode: prefill.schoolCode || prev.schoolCode,
      studentCount: prefill.studentCount || prev.studentCount,
      purpose: prefill.purpose || prev.purpose,
      toAddress: prefill.toAddress || prev.toAddress,
      amount: prefill.amount || prev.amount,
    }));

    setSourceRequestId(location.state?.sourceRequestId || '');
  }, [location.state]);

  const connectWallet = async () => {
    setError('');
    setIsConnecting(true);

    try {
      if (!window.ethereum) {
        setError('MetaMask not detected. Install MetaMask to continue.');
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts?.[0]) {
        setWalletAddress(accounts[0]);
      } else {
        setError('No wallet account available. Unlock MetaMask and retry.');
      }
    } catch (walletError) {
      setError('Unable to connect wallet. Please check wallet permissions and retry.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleTransfer = async (event) => {
    event.preventDefault();
    setError('');

    if (!walletAddress) {
      setError('Connect your wallet before initiating transfer.');
      return;
    }

    if (!formData.schoolCode.trim() || !formData.studentCount || !formData.toAddress.trim() || !formData.amount) {
      setError('Fill all required fields to initiate transfer.');
      return;
    }

    if (!window.ethereum) {
      setError('MetaMask not detected. Install MetaMask to continue.');
      return;
    }

    if (!Web3.utils.isAddress(formData.toAddress.trim())) {
      setError('Enter a valid destination wallet address.');
      return;
    }

    if (Number(formData.amount) <= 0 || Number.isNaN(Number(formData.amount))) {
      setError('Amount in rupees should be greater than zero.');
      return;
    }

    const transferInr = String(formData.amount).trim();
    const destinationAddress = formData.toAddress.trim();

    setIsTransferring(true);

    try {
      const [activeAccount] = await window.ethereum.request({ method: 'eth_accounts' });
      const fromAddress = activeAccount || walletAddress;

      if (!fromAddress) {
        setError('Connect your wallet before initiating transfer.');
        return;
      }

      if (activeAccount && activeAccount.toLowerCase() !== walletAddress.toLowerCase()) {
        setWalletAddress(activeAccount);
      }

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (!POLYGON_CHAIN_IDS.has(chainId)) {
        setError('Switch MetaMask network to Polygon Mainnet or Polygon Amoy and retry.');
        return;
      }

      const chainInfo = CHAIN_CONFIG[chainId];
      const inrAmount = Number(transferInr);
      const polAmount = inrAmount / inrPerPol;
      if (!Number.isFinite(polAmount) || polAmount <= 0) {
        setError('Unable to convert INR to POL. Check entered amount and retry.');
        return;
      }

      const polAmountText = polAmount.toFixed(18).replace(/\.?0+$/, '');
      const valueWei = Web3.utils.toWei(polAmountText, 'ether');
      if (valueWei === '0') {
        setError('Converted POL amount is too small. Increase INR amount and retry.');
        return;
      }
      const valueHex = Web3.utils.numberToHex(valueWei);

      const txParams = {
        from: fromAddress,
        to: destinationAddress,
        value: valueHex,
      };

      try {
        const estimatedGas = await window.ethereum.request({
          method: 'eth_estimateGas',
          params: [txParams],
        });
        if (estimatedGas) {
          txParams.gas = estimatedGas;
        }

        const [gasPriceHex, priorityFeeHex] = await Promise.all([
          window.ethereum.request({ method: 'eth_gasPrice' }),
          window.ethereum.request({ method: 'eth_maxPriorityFeePerGas' }).catch(() => null),
        ]);

        if (chainId === '0x13882') {
          const amoyMinPriorityWei = window.BigInt(Web3.utils.toWei(AMOY_MIN_PRIORITY_FEE_GWEI, 'gwei'));
          const networkPriorityWei = priorityFeeHex ? window.BigInt(priorityFeeHex) : 0n;
          const resolvedPriorityWei = networkPriorityWei > amoyMinPriorityWei ? networkPriorityWei : amoyMinPriorityWei;
          const gasPriceWei = gasPriceHex ? window.BigInt(gasPriceHex) : resolvedPriorityWei;
          const resolvedMaxFeeWei = gasPriceWei > resolvedPriorityWei ? gasPriceWei : resolvedPriorityWei * 2n;

          txParams.maxPriorityFeePerGas = Web3.utils.numberToHex(resolvedPriorityWei.toString());
          txParams.maxFeePerGas = Web3.utils.numberToHex(resolvedMaxFeeWei.toString());
        } else if (priorityFeeHex && gasPriceHex) {
          txParams.maxPriorityFeePerGas = priorityFeeHex;
          txParams.maxFeePerGas = gasPriceHex;
        } else if (gasPriceHex) {
          txParams.gasPrice = gasPriceHex;
        }
      } catch (feeError) {
        // If fee estimation fails, MetaMask will estimate fees automatically.
      }

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txParams],
      });

      let txReceipt = null;
      for (let attempt = 0; attempt < 30; attempt += 1) {
        txReceipt = await window.ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash],
        });
        if (txReceipt) {
          break;
        }
        await delay(2000);
      }

      const isSuccess = txReceipt?.status === '0x1' || txReceipt?.status === true;
      const blockNumber =
        txReceipt?.blockNumber && typeof txReceipt.blockNumber === 'string'
          ? Number.parseInt(txReceipt.blockNumber, 16).toString()
          : '-';
      const transferTimestampIso = new Date().toISOString();
      const transferTimestampLocal = new Date(transferTimestampIso).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const nextReceipt = {
        txHash,
        blockNumber,
        status: txReceipt ? (isSuccess ? 'Confirmed' : 'Failed') : 'Pending',
        schoolCode: formData.schoolCode,
        students: formData.studentCount,
        purpose: purposeLabel,
        amountInr: transferInr,
        amountPol: polAmountText,
        from: fromAddress,
        to: destinationAddress,
        explorer: `${chainInfo.explorerTxBase}${txHash}`,
        timestamp: transferTimestampLocal,
      };

      setReceipt(nextReceipt);

      savePublicTransaction({
        schoolId: formData.schoolCode,
        schoolName: `School ${formData.schoolCode}`,
        txId: txHash,
        purpose: purposeLabel,
        amountInr: transferInr,
        amountPol: polAmountText,
        date: transferTimestampIso.slice(0, 10),
        status: nextReceipt.status,
        block: blockNumber,
        explorer: nextReceipt.explorer,
        timestamp: transferTimestampIso,
      });
    } catch (transferError) {
      if (transferError?.code === 4001) {
        setError('Transaction was rejected in MetaMask.');
      } else if (/gas tip cap below minimum/i.test(transferError?.message || '')) {
        const minTipMatch = (transferError?.message || '').match(/minimum needed\s+(\d+)/i);
        if (minTipMatch?.[1]) {
          const minTipGwei = (Number(minTipMatch[1]) / 1e9).toFixed(2);
          setError(`Amoy network requires at least ${minTipGwei} gwei priority fee. Retry the transaction now.`);
        } else {
          setError('Gas tip is below Amoy minimum. Retry now; app fee floor was increased.');
        }
      } else {
        setError(transferError?.message || 'Transaction failed. Please retry.');
      }
    } finally {
      setIsTransferring(false);
    }

  };

  return (
    <PageLayout>
      <PaymentHero />

      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'start' }}>
          <TransferFundsCard
            formData={formData}
            setFormData={setFormData}
            walletAddress={walletAddress}
            isConnecting={isConnecting}
            isTransferring={isTransferring}
            prefillNote={sourceRequestId ? `Prefilled from approved request ${sourceRequestId}.` : ''}
            error={error}
            estimatedPol={estimatedPol}
            inrPerPol={inrPerPol}
            isRateLoading={isRateLoading}
            onConnect={connectWallet}
            onTransfer={handleTransfer}
          />
          <TransactionStatusCard receipt={receipt} />
        </div>
      </section>
    </PageLayout>
  );
};

export default Paymentpage;
