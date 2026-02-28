import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { purchaseTicket } from "@/lib/api";
import { CheckCircle, CreditCard, X, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate, useParams } from "react-router";

type PaymentMethod = "CARD" | "BKASH" | "NAGAD";

const PurchaseTicketPage: React.FC = () => {
  const { eventId, ticketTypeId } = useParams();
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | undefined>();
  const [isPurchaseSuccess, setIsPurchaseASuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");
  const [showMockOverlay, setShowMockOverlay] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (!isPurchaseSuccess) {
      return;
    }
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPurchaseSuccess, navigate]);

  const validateForm = () => {
    if (paymentMethod === "CARD") {
      if (cardNo.length < 16) return "Please enter a valid card number";
      if (!cardName) return "Please enter cardholder name";
    } else {
      if (mobileNo.length < 11) return "Please enter a valid mobile number";
    }
    return null;
  };

  const handlePurchaseClick = () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError(undefined);
    if (paymentMethod === "CARD") {
      handleFinalPurchase("TXN_CARD_" + Math.floor(Math.random() * 1000000));
    } else {
      setShowMockOverlay(true);
    }
  };

  const handleFinalPurchase = async (txnId: string) => {
    if (isLoading || !user?.access_token || !eventId || !ticketTypeId) {
      return;
    }
    setSubmitting(true);
    try {
      await purchaseTicket(user.access_token, eventId, ticketTypeId, {
        paymentMethod,
        transactionId: txnId,
      });
      setIsPurchaseASuccess(true);
      setShowMockOverlay(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isPurchaseSuccess) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-gray-100 shadow-2xl text-black text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-2xl opacity-50"></div>
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto relative z-10 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Purchase Confirmed!</h2>
            <p className="text-gray-500 text-lg">
              A confirmation email has been sent to your inbox.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
            <p>Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white border-0 shadow-2xl rounded-3xl overflow-hidden text-black">
          {/* Header */}
          <div className="bg-purple-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
            <h1 className="text-2xl font-bold relative z-10">Checkout</h1>
            <p className="text-purple-100 text-sm relative z-10">Secure Event Ticketing</p>
          </div>

          <div className="p-8 space-y-6">
            {error && (
              <div className="border border-red-100 rounded-2xl p-4 bg-red-50 flex items-start space-x-3 transition-all">
                <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-red-600 text-sm font-medium">{error}</div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <Label className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Select Payment Method</Label>
              <div className="grid grid-cols-3 gap-3">
                {(["CARD", "BKASH", "NAGAD"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-1 ${paymentMethod === method
                      ? "border-purple-600 bg-purple-50 text-purple-600 ring-4 ring-purple-100"
                      : "border-gray-100 hover:border-purple-200 text-gray-400"
                      }`}
                  >
                    {method === "CARD" && <CreditCard className="h-6 w-6" />}
                    {method === "BKASH" && <span className="font-black text-xs">bKash</span>}
                    {method === "NAGAD" && <span className="font-black text-xs underline">Nagad</span>}
                    <span className="text-[10px] font-bold uppercase">{method}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="transition-all duration-300">
              {paymentMethod === "CARD" ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Card Number</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={cardNo}
                        onChange={(e) => setCardNo(e.target.value.replace(/\D/g, "").slice(0, 16))}
                        className="bg-gray-100 border-none rounded-xl text-black pl-12 h-12 focus:ring-2 focus:ring-purple-200"
                      />
                      <CreditCard className="absolute h-5 w-5 text-gray-400 top-3.5 left-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Cardholder Name</Label>
                    <Input
                      type="text"
                      placeholder="e.g. Rony Ahmed"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="bg-gray-100 border-none rounded-xl text-black h-12 focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">{paymentMethod} Account Number</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="017XXXXXXXX"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, "").slice(0, 11))}
                        className="bg-gray-100 border-none rounded-xl text-black pl-12 h-12 focus:ring-2 focus:ring-purple-200"
                      />
                      <span className="absolute left-4 top-3.5 text-gray-400 font-bold">+88</span>
                    </div>
                    <p className="text-[10px] text-gray-400">Total amount will be deducted from this account.</p>
                  </div>
                </div>
              )}
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl h-14 text-lg font-bold shadow-lg shadow-purple-200 transition-all active:scale-[0.98] disabled:opacity-50"
              onClick={handlePurchaseClick}
              disabled={submitting}
            >
              {submitting ? "Processing..." : `Pay Securely with ${paymentMethod}`}
            </Button>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 font-medium">
              <ShieldCheck className="h-3 w-3 text-green-500" />
              <span>SSL SECURED 256-BIT ENCRYPTION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Payment Gateway Overlay */}
      {showMockOverlay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className={`${paymentMethod === 'BKASH' ? 'bg-[#D12053]' : 'bg-[#F7931E]'} p-6 py-8 text-white text-center space-y-2 relative`}>
              <button
                onClick={() => setShowMockOverlay(false)}
                className="absolute top-4 right-4 hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="bg-white rounded-2xl p-3 w-fit mx-auto shadow-inner text-black font-black text-xl italic tracking-tighter">
                {paymentMethod === 'BKASH' ? 'bKash' : 'Nagad'}
              </div>
              <p className="text-sm font-medium opacity-90 italic">Payment Portal (DEMO)</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center space-y-1">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Merchant: EventTicket Platform</p>
                <p className="text-3xl font-black text-gray-800 tracking-tighter">Enter PIN</p>
              </div>

              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="∗ ∗ ∗ ∗ ∗"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.slice(0, 5))}
                  className="w-full text-center text-3xl tracking-[1em] h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gray-300 focus:outline-none transition-all placeholder:tracking-normal placeholder:text-gray-200"
                />
                <Button
                  className={`w-full ${paymentMethod === 'BKASH' ? 'bg-[#D12053] hover:bg-[#b01a46]' : 'bg-[#F7931E] hover:bg-[#d97e16]'} text-white rounded-2xl h-14 font-black text-xl shadow-xl transition-all active:scale-95`}
                  onClick={() => handleFinalPurchase("TXN_" + paymentMethod + "_" + Math.floor(Math.random() * 1000000))}
                  disabled={submitting || pin.length < 4}
                >
                  {submitting ? "VERIFYING..." : "CONFIRM"}
                </Button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-[10px] text-gray-400 leading-relaxed text-center italic">
                By clicking confirm, you agree to allow this DEMO platform to simulate a payment transaction. No real money will be deducted.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseTicketPage;
