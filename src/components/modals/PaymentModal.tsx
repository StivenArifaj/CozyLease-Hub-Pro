
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, DollarSign, ShieldCheck, Calendar, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
}

export const PaymentModal = ({ isOpen, onClose, amount }: PaymentModalProps) => {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setStep(2);
            toast.success("Payment successful!");
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <DollarSign className="h-6 w-6" />
                            </div>
                            {step === 1 ? "Make a Payment" : "Payment Confirmed"}
                        </DialogTitle>
                        <DialogDescription className="text-emerald-100 text-base mt-2">
                            {step === 1
                                ? "Securely pay your rent online using your preferred method."
                                : "Your payment has been processed successfully."}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-8 bg-white">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handlePayment}
                                className="space-y-6"
                            >
                                <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount</p>
                                        <p className="text-2xl font-bold text-slate-900">${amount.toLocaleString()}</p>
                                    </div>
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <ShieldCheck className="h-6 w-6 text-emerald-600" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cardholder Name</Label>
                                        <Input placeholder="John Doe" className="rounded-xl h-11 border-slate-200" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Number</Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input placeholder="**** **** **** ****" className="pl-10 rounded-xl h-11 border-slate-200" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input placeholder="MM/YY" className="pl-10 rounded-xl h-11 border-slate-200" required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">CVV</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input placeholder="***" className="pl-10 rounded-xl h-11 border-slate-200" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full rounded-xl h-14 font-bold bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all"
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </div>
                                    ) : (
                                        `Pay $${amount.toLocaleString()}`
                                    )}
                                </Button>

                                <p className="text-[10px] text-center text-slate-400 font-medium">
                                    Your payment is encrypted and secure. By clicking pay, you agree to our terms of service.
                                </p>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShieldCheck className="h-10 w-10 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                                <p className="text-slate-500 mb-8">Your rent for December 2024 has been paid. A receipt has been sent to your email.</p>
                                <Button
                                    onClick={onClose}
                                    className="w-full rounded-xl h-12 font-bold bg-slate-900 hover:bg-slate-800"
                                >
                                    Back to Dashboard
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
};
