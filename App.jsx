import { useState, useCallback } from "react";
import Navbar           from "./components/Navbar";
import Toast            from "./components/Toast";
import LandingPage      from "./components/LandingPage";
import AuthPage         from "./components/AuthPage";
import Dashboard        from "./components/Dashboard";
import WalletPage       from "./components/WalletPage";
import TransactionsPage from "./components/TransactionsPage";

import { apiLogin, apiSignup, apiCreateWallet, apiSendTransaction } from "./api";
import { generateAddress, generateSeedPhrase } from "./utils";

export default function App() {
  const [page,         setPage]         = useState("landing");
  const [user,         setUser]         = useState(null);
  const [wallet,       setWallet]       = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [toast,        setToast]        = useState(null);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleAuth = async (mode, username, email, password) => {
    // Calls the placeholder API (swap for real backend later)
    const result = mode === "signup"
      ? await apiSignup(username, email, password)
      : await apiLogin(username, password);

    setUser(result.user);
    setPage("dashboard");
    showToast(`Welcome, ${result.user.username}! 🎉`);
  };

  const handleLogout = () => {
    setUser(null);
    setWallet(null);
    setTransactions([]);
    setPage("landing");
    showToast("Logged out successfully.");
  };

  // ── Wallet ────────────────────────────────────────────────────────────────
  const handleCreateWallet = async () => {
    // Calls placeholder API (swap for real backend later)
    const data = await apiCreateWallet();
    setWallet({
      address:    data.address,
      seedPhrase: data.seedPhrase,
      balance:    data.balance,
      createdAt:  new Date().toLocaleString(),
    });
    showToast("Wallet created successfully! 🔐");
  };

  // ── Transactions ──────────────────────────────────────────────────────────
  const handleSend = async ({ to, amount, note, mode }) => {
    // Calls placeholder API (swap for real backend later)
    const { id, timestamp } = await apiSendTransaction({
      from:      wallet.address,
      to,
      amount,
      note,
      isPrivate: mode === "private",
    });

    const tx = {
      id,
      from:      wallet.address,
      to,
      amount,
      note,
      isPrivate: mode === "private",
      timestamp,
    };

    setTransactions((prev) => [tx, ...prev]);
    setWallet((prev) => ({ ...prev, balance: prev.balance - amount }));
    showToast(tx.isPrivate ? "🟢 Private transaction sent!" : "🔴 Public transaction sent!");
  };

  // ── Navigation helper ─────────────────────────────────────────────────────
  const goTo = (p) => setPage(p);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      <Navbar
        user={user}
        wallet={wallet}
        onHome={() => goTo(user ? "dashboard" : "landing")}
        onLogout={handleLogout}
        onNav={goTo}
      />

      {page === "landing" && (
        <LandingPage onGetStarted={() => goTo("auth")} />
      )}

      {page === "auth" && (
        <AuthPage onAuth={handleAuth} />
      )}

      {page === "dashboard" && user && (
        <Dashboard
          user={user}
          wallet={wallet}
          transactions={transactions}
          onNav={goTo}
          showToast={showToast}
        />
      )}

      {page === "wallet" && user && (
        <WalletPage
          wallet={wallet}
          onCreateWallet={handleCreateWallet}
          onBack={() => goTo("dashboard")}
          onGoTransactions={() => goTo("transactions")}
        />
      )}

      {page === "transactions" && user && wallet && (
        <TransactionsPage
          wallet={wallet}
          transactions={transactions}
          onSend={handleSend}
          onBack={() => goTo("dashboard")}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}
