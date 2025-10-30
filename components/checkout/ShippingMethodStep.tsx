"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Truck, Zap, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShippingMethod } from "@/lib/validations/checkout";
import { SHIPPING_METHODS } from "@/lib/validations/checkout";

interface ShippingMethodStepProps {
  data: Partial<ShippingMethod>;
  errors?: Record<string, string>;
  onChange: (field: keyof ShippingMethod, value: string | boolean) => void;
  cartTotal: number;
}

const iconMap = {
  Truck: Truck,
  Zap: Zap,
  AlertCircle: AlertCircle,
};

export function ShippingMethodStep({
  data,
  errors = {},
  onChange,
  cartTotal,
}: ShippingMethodStepProps) {
  const shippingMethods = Object.values(SHIPPING_METHODS);

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
          <Truck className="w-5 h-5 text-brand-gold" />
        </div>
        <div>
          <h3 className="text-h3 font-bold text-brand-charcoal dark:text-brand-cream">
            Metoda dostawy
          </h3>
          <p className="text-body-small text-brand-charcoal/60 dark:text-brand-cream/60 mt-1">
            Wybierz preferowaną metodę dostawy
          </p>
        </div>
      </div>

      {/* Shipping Methods Grid */}
      <div className="space-y-4">
        {shippingMethods.map((method) => {
          const IconComponent =
            iconMap[method.icon as keyof typeof iconMap] || Truck;
          const isSelected = data.method === method.id;

          return (
            <motion.div key={method.id} whileHover={{ scale: 1.01 }}>
              <label
                className={cn(
                  "relative flex items-start gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300",
                  isSelected
                    ? "border-brand-gold bg-brand-gold/5 dark:bg-brand-gold/10"
                    : "border-brand-charcoal/10 dark:border-brand-cream/10 bg-white dark:bg-brand-charcoal/50 hover:border-brand-gold/50"
                )}
              >
                {/* Radio Button */}
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={isSelected}
                  onChange={(e) => onChange("method", e.target.value)}
                  className="mt-1 w-5 h-5 cursor-pointer accent-brand-gold"
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-h4 font-bold text-brand-charcoal dark:text-brand-cream mb-1">
                        {method.name}
                      </h4>
                      <p className="text-body-small text-brand-charcoal/70 dark:text-brand-cream/70">
                        {method.description}
                      </p>
                      <p className="text-xs text-brand-gold font-semibold mt-2">
                        ⏱️ {method.estimatedDays}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-h4 font-bold text-brand-gold">
                        +{method.price.toFixed(2)} zł
                      </div>
                      {method.price === 0 && (
                        <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                          DARMOWA
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Free Shipping Threshold */}
                  {cartTotal < 200 && method.price === 0 && (
                    <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 mt-3">
                      📦 Darmowa dostawa od 200 zł. Brakuje{" "}
                      <strong>{(200 - cartTotal).toFixed(2)} zł</strong>
                    </p>
                  )}
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                    isSelected
                      ? "bg-brand-gold/20"
                      : "bg-brand-charcoal/10 dark:bg-brand-cream/10"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "w-6 h-6",
                      isSelected
                        ? "text-brand-gold"
                        : "text-brand-charcoal/50 dark:text-brand-cream/50"
                    )}
                  />
                </div>
              </label>
            </motion.div>
          );
        })}
      </div>

      {/* Notes for Driver */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
          Notatka dla kierowcy (opcjonalnie)
        </label>
        <textarea
          value={data.notesForDriver || ""}
          onChange={(e) => onChange("notesForDriver", e.target.value)}
          placeholder="np. Proszę pukać głośno, mieszkam na 3 piętrze..."
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
            "bg-white dark:bg-brand-charcoal/50",
            "text-brand-charcoal dark:text-brand-cream",
            "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
            "focus:outline-none focus:ring-2 focus:ring-brand-gold",
            "resize-none",
            "min-h-[100px]"
          )}
        />
        <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60">
          Maksymalnie 500 znaków
        </p>
      </div>

      {/* Error Message */}
      {errors.method && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
          <p className="text-sm text-red-700 dark:text-red-400">
            {errors.method}
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-brand-gold/10 dark:bg-brand-gold/5 border border-brand-gold/20">
        <p className="text-sm text-brand-charcoal dark:text-brand-cream">
          <strong>💡 Wskazówka:</strong> Dostarczamy do całej Polski. W przypadku
          dużych zamówień, skontaktuj się z nami w celu uzyskania rabatu na
          dostawę.
        </p>
      </div>
    </motion.div>
  );
}

export default ShippingMethodStep;
