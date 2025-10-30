"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CheckoutFormData } from "@/lib/validations/checkout";

interface OrderReviewStepProps {
  formData: CheckoutFormData;
  cartItems: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shippingCost: number;
  tax: number;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function OrderReviewStep({
  formData,
  cartItems,
  subtotal,
  shippingCost,
  tax,
  onConfirm,
  isLoading = false,
}: OrderReviewStepProps) {
  const total = subtotal + shippingCost + tax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Step Header */}
      <div className="flex items-start gap-3 mb-8">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-brand-gold" />
        </div>
        <div>
          <h3 className="text-h3 font-bold text-brand-charcoal dark:text-brand-cream">
            Podsumowanie zamówienia
          </h3>
          <p className="text-body-small text-brand-charcoal/60 dark:text-brand-cream/60 mt-1">
            Sprawdź szczegóły przed potwierdzeniem
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        <h4 className="text-h4 font-bold text-brand-charcoal dark:text-brand-cream">
          Zamawiane produkty
        </h4>
        <div className="space-y-3 bg-white dark:bg-brand-charcoal/50 rounded-xl p-6 border border-brand-charcoal/10 dark:border-brand-cream/10">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-brand-charcoal/5 dark:bg-brand-cream/5">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-brand-charcoal dark:text-brand-cream">
                  {item.name}
                </p>
                <p className="text-body-small text-brand-charcoal/60 dark:text-brand-cream/60">
                  Ilość: {item.quantity}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-brand-gold">
                  {(item.price * item.quantity).toFixed(2)} zł
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-4">
        <h4 className="text-h4 font-bold text-brand-charcoal dark:text-brand-cream">
          Adres dostawy
        </h4>
        <div className="bg-white dark:bg-brand-charcoal/50 rounded-xl p-6 border border-brand-charcoal/10 dark:border-brand-cream/10 text-body-small text-brand-charcoal dark:text-brand-cream space-y-2">
          <p>
            <strong>{formData.shippingAddress.firstName}{" "}
              {formData.shippingAddress.lastName}</strong>
          </p>
          <p>{formData.shippingAddress.street}</p>
          <p>
            {formData.shippingAddress.postalCode} {formData.shippingAddress.city}
          </p>
          <p>{formData.shippingAddress.country}</p>
          <p className="text-brand-charcoal/60 dark:text-brand-cream/60">
            {formData.shippingAddress.email} | {formData.shippingAddress.phone}
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-4">
        <h4 className="text-h4 font-bold text-brand-charcoal dark:text-brand-cream">
          Podsumowanie ceny
        </h4>
        <div className="bg-white dark:bg-brand-charcoal/50 rounded-xl p-6 border border-brand-charcoal/10 dark:border-brand-cream/10 space-y-3">
          <div className="flex justify-between text-body-small">
            <span className="text-brand-charcoal/70 dark:text-brand-cream/70">
              Produkty:
            </span>
            <span className="text-brand-charcoal dark:text-brand-cream">
              {subtotal.toFixed(2)} zł
            </span>
          </div>
          <div className="flex justify-between text-body-small">
            <span className="text-brand-charcoal/70 dark:text-brand-cream/70">
              Dostawa:
            </span>
            <span className="text-brand-charcoal dark:text-brand-cream">
              {shippingCost.toFixed(2)} zł
            </span>
          </div>
          <div className="flex justify-between text-body-small">
            <span className="text-brand-charcoal/70 dark:text-brand-cream/70">
              VAT (23%):
            </span>
            <span className="text-brand-charcoal dark:text-brand-cream">
              {tax.toFixed(2)} zł
            </span>
          </div>
          <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-3 flex justify-between">
            <span className="font-bold text-brand-charcoal dark:text-brand-cream">
              Razem:
            </span>
            <span className="text-h3 font-bold text-brand-gold">
              {total.toFixed(2)} zł
            </span>
          </div>
        </div>
      </div>

      {/* Terms & Confirmation */}
      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            disabled
            className="mt-1 w-5 h-5"
          />
          <span className="text-body-small text-brand-charcoal dark:text-brand-cream">
            Zaakceptowałem <strong>warunki zakupu</strong> i{" "}
            <strong>politykę prywatności</strong>
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.newsletterOptIn}
            disabled
            className="mt-1 w-5 h-5"
          />
          <span className="text-body-small text-brand-charcoal dark:text-brand-cream">
            Chcę otrzymywać wiadomości o nowych produktach i promocjach
          </span>
        </label>
      </div>

      {/* Confirm Button */}
      <motion.button
        onClick={onConfirm}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "w-full py-4 rounded-xl font-bold text-lg transition-all duration-300",
          "bg-brand-gold hover:bg-brand-gold/90",
          "text-brand-charcoal",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        {isLoading ? "Przetwarzanie..." : "Potwierdź zamówienie"}
      </motion.button>

      {/* Security Badge */}
      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-center">
        <p className="text-sm text-green-700 dark:text-green-400">
          🔒 <strong>Twoje zamówienie jest bezpieczne</strong>
          <br />
          Szyfrujemy wszystkie dane przy użyciu SSL 256-bit
        </p>
      </div>
    </motion.div>
  );
}

export default OrderReviewStep;
