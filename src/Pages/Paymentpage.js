import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import PaymentForm from "../components/PaymentForm";
import Txstatus from "../components/Txstatus";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Guidelines from "../components/Guidelines";

const MidDayMealPaymentPortal = () => {
  const [account, setAccount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [paymentPurpose, setPaymentPurpose] = useState("meal-funds");
  const [txDetails, setTxDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [web3, setWeb3] = useState(null);

  const paymentPurposes = {
    "meal-funds": "Meal Preparation Funds",
    infrastructure: "Kitchen Infrastructure",
    utensils: "Cooking Utensils & Equipment",
    "gas-fuel": "Cooking Gas/Fuel",
    vegetables: "Fresh Vegetables & Groceries",
    grains: "Rice, Wheat & Grains",
  };

  const checkMetaMaskAvailability = () => {
    if (typeof window.ethereum === "undefined") {
      setError(
        "MetaMask not found! Please install MetaMask extension from metamask.io"
      );
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setError(
        "MetaMask not found! Please install MetaMask extension from metamask.io"
      );
      return;
    }

    try {
      setError("");
      if (!window.Web3) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js";
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      const web3Instance = new window.Web3(window.ethereum);
      setWeb3(web3Instance);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Web3 connection error:", err);
      if (err.code === 4001) {
        setError(
          "Connection rejected. Please accept the MetaMask connection request."
        );
      } else {
        setError("Failed to connect to MetaMask. Please try again.");
      }
    }
  };

  useEffect(() => {
    checkMetaMaskAvailability();
  }, []);

  const sendTransaction = async () => {
    if (!web3) {
      setError("Web3 not initialized");
      return;
    }

    if (!web3.utils.isAddress(toAddress)) {
      setError("Invalid school wallet address");
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    if (!schoolCode.trim()) {
      setError("Please enter school code");
      return;
    }

    if (
      !studentCount ||
      isNaN(Number(studentCount)) ||
      Number(studentCount) <= 0
    ) {
      setError("Please enter valid student count");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const value = web3.utils.toWei(amount, "ether");
      const gasPrice = await web3.eth.getGasPrice();

      const tx = await web3.eth.sendTransaction({
        from: account,
        to: toAddress,
        value: value,
        gas: 300000,
        gasPrice: gasPrice,
      });

      const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
      const explorer = `https://amoy.polygonscan.com/tx/${tx.transactionHash}`;

      const displayReceipt = {
        transactionHash: tx.transactionHash,
        blockNumber: receipt ? receipt.blockNumber : "pending",
        status: receipt ? receipt.status : "pending",
        explorer: explorer,
        schoolCode: schoolCode,
        studentCount: studentCount,
        paymentPurpose: paymentPurpose,
        amount: amount,
      };

      setTxDetails(displayReceipt);
    } catch (err) {
      console.error(err);
      setError(`Transaction failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formProps = {
    account,
    toAddress,
    setToAddress,
    amount,
    setAmount,
    schoolCode,
    setSchoolCode,
    studentCount,
    setStudentCount,
    paymentPurpose,
    setPaymentPurpose,
    paymentPurposes,
    sendTransaction,
    isLoading,
    error,
    connectWallet,
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-orange-500 flex items-center">
          <CreditCard className="w-10 h-10 text-orange-600 mr-4" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Digital Payment Portal
            </h2>
            <p className="text-gray-600">
              Secure blockchain-based payments for Mid Day Meal Scheme
            </p>
            <p className="text-sm text-orange-600 font-medium mt-1">
              Powered by Polygon Network | Transparent • Traceable • Secure
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <PaymentForm {...formProps} />
          <Txstatus txDetails={txDetails} paymentPurposes={paymentPurposes} />
        </div>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Guidelines />
        </main>
      </main>
      <Footer />
    </div>
  );
};

export default MidDayMealPaymentPortal;
