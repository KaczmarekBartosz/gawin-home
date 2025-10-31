"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CreditCard, Building2, DollarSign, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/validations/checkout";
import { PAYMENT_METHODS } from "@/lib/validations/checkout";

interface PaymentMethodStepProps {
  data: Partial<PaymentMethod>;
  errors?: Record<string, string>;
  onChange: (field: keyof PaymentMethod, value: string | boolean) => void;
}

const iconMap = {
  CreditCard,
  Building2,
  DollarSign,
  Wallet,
};

export function PaymentMethodStep({
  data,
  errors = {},
  onChange,
}: PaymentMethodStepProps) {
  const paymentMethods = Object.values(PAYMENT_METHODS);
  const isCardSelected = data.method === "card";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Step Header */}
      <div className="flex items-start gap-3 mb-8">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#B7A99D]/20 flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-[#B7A99D]" />
        </div>
        <div>
          <h3 className="text-h3 font-bold text-brand-charcoal dark:text-brand-cream">
            Metoda płatności
          </h3>
          <p className="text-body-small text-brand-charcoal/60 dark:text-brand-cream/60 mt-1">
            Wybierz preferowaną metodę płatności
          </p>
        </div>
      </div>

      {/* Payment Methods Grid */}
      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const IconComponent =
            iconMap[method.icon as keyof typeof iconMap] || CreditCard;
          const isSelected = data.method === method.id;

          return (
            <motion.div key={method.id} whileHover={{ scale: 1.01 }}>
              <label
                className={cn(
                  "relative flex items-start gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300",
                  isSelected
                    ? "border-[#B7A99D] bg-[#B7A99D]/5 dark:bg-[#B7A99D]/10"
                    : "border-brand-charcoal/10 dark:border-brand-cream/10 bg-white dark:bg-brand-charcoal/50 hover:border-[#B7A99D]/50"
                )}
              >
                {/* Radio Button */}
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={isSelected}
                  onChange={(e) => onChange("method", e.target.value)}
                  className="mt-1 w-5 h-5 cursor-pointer accent-[#B7A99D]"
                />

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-h4 font-bold text-brand-charcoal dark:text-brand-cream">
                    {method.name}
                  </h4>
                  <p className="text-body-small text-brand-charcoal/70 dark:text-brand-cream/70 mt-1">
                    {method.description}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                    isSelected
                      ? "bg-[#B7A99D]/20"
                      : "bg-brand-charcoal/10 dark:bg-brand-cream/10"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "w-6 h-6",
                      isSelected
                        ? "text-[#B7A99D]"
                        : "text-brand-charcoal/50 dark:text-brand-cream/50"
                    )}
                  />
                </div>
              </label>
            </motion.div>
          );
        })}
      </div>

      {/* Card Details Form (if card selected) */}
      {isCardSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4 p-6 bg-[#B7A99D]/5 dark:bg-[#B7A99D]/10 rounded-xl border border-[#B7A99D]/20"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
              Imię i nazwisko z karty *
            </label>
            <input
              type="text"
              value={data.cardName || ""}
              onChange={(e) => onChange("cardName", e.target.value)}
              placeholder="JAN KOWALSKI"
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
                "bg-white dark:bg-brand-charcoal/50",
                "text-brand-charcoal dark:text-brand-cream",
                "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
                "focus:outline-none focus:ring-2 focus:ring-[#B7A99D] uppercase"
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
                Numer karty *
              </label>
              <input
                type="text"
                value={data.cardNumber || ""}
                onChange={(e) => onChange("cardNumber", e.target.value)}
                placeholder="4532 1234 5678 9010"
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
                  "bg-white dark:bg-brand-charcoal/50",
                  "text-brand-charcoal dark:text-brand-cream",
                  "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
                  "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]"
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
                CVC *
              </label>
              <input
                type="text"
                value={data.cardCvc || ""}
                onChange={(e) => onChange("cardCvc", e.target.value)}
                placeholder="123"
                maxLength={4}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
                  "bg-white dark:bg-brand-charcoal/50",
                  "text-brand-charcoal dark:text-brand-cream",
                  "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
                  "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]"
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
              Data ważności *
            </label>
            <input
              type="text"
              value={data.cardExpiry || ""}
              onChange={(e) => onChange("cardExpiry", e.target.value)}
              placeholder="MM/YY"
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
                "bg-white dark:bg-brand-charcoal/50",
                "text-brand-charcoal dark:text-brand-cream",
                "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
                "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]"
              )}
            />
          </div>

          {/* Save Card Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer mt-4">
            <input
              type="checkbox"
              checked={data.saveCard || false}
              onChange={(e) => onChange("saveCard", e.target.checked)}
              className="w-4 h-4 rounded border border-brand-charcoal/20 dark:border-brand-cream/20"
            />
            <span className="text-body-small text-brand-charcoal dark:text-brand-cream">
              Zapamiętaj kartę na przyszłość
            </span>
          </label>
        </motion.div>
      )}

      {/* Error Message */}
      {errors.method && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
          <p className="text-sm text-red-700 dark:text-red-400">
            {errors.method}
          </p>
        </div>
      )}

      {/* Security Info */}
      <div className="p-4 rounded-lg bg-[#B7A99D]/10 dark:bg-[#B7A99D]/5 border border-[#B7A99D]/20">
        <p className="text-sm text-brand-charcoal dark:text-brand-cream">
          <strong>🔒 Bezpieczeństwo:</strong> Wszystkie płatności kartą są
          szyfrowane i przetwarzane przez zaufanych dostawców (Stripe, PayU).
          Twoje dane nigdy nie są przechowywane na naszych serwerach.
        </p>
      </div>
    </motion.div>
  );
}

export default PaymentMethodStep;
