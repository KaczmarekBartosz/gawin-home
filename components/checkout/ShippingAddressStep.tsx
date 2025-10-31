"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShippingAddress } from "@/lib/validations/checkout";
import { COUNTRIES } from "@/lib/validations/checkout";

interface ShippingAddressStepProps {
  data: Partial<ShippingAddress>;
  errors?: Record<string, string>;
  onChange: (field: keyof ShippingAddress, value: string | boolean) => void;
  isCompany?: boolean;
  onCompanyToggle?: (isCompany: boolean) => void;
}

export function ShippingAddressStep({
  data,
  errors = {},
  onChange,
  isCompany = false,
  onCompanyToggle,
}: ShippingAddressStepProps) {
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
          <MapPin className="w-5 h-5 text-[#B7A99D]" />
        </div>
        <div>
          <h3 className="text-h3 font-bold text-brand-charcoal dark:text-brand-cream">
            Adres dostawy
          </h3>
          <p className="text-body-small text-brand-charcoal/60 dark:text-brand-cream/60 mt-1">
            Podaj adres, na który chcesz otrzymać zamówienie
          </p>
        </div>
      </div>

      {/* Company Toggle */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isCompany}
            onChange={(e) => onCompanyToggle?.(e.target.checked)}
            className="w-4 h-4 rounded border border-brand-charcoal/20 dark:border-brand-cream/20"
          />
          <span className="text-body text-brand-charcoal dark:text-brand-cream">
            Dostarczam dla firmy
          </span>
        </label>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
            Imię *
          </label>
          <input
            type="text"
            value={data.firstName || ""}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="Jan"
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
              "bg-white dark:bg-brand-charcoal/50",
              "text-brand-charcoal dark:text-brand-cream",
              "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
              "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]",
              errors.firstName && "border-red-500"
            )}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
            Nazwisko *
          </label>
          <input
            type="text"
            value={data.lastName || ""}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Kowalski"
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
              "bg-white dark:bg-brand-charcoal/50",
              "text-brand-charcoal dark:text-brand-cream",
              "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
              "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]",
              errors.lastName && "border-red-500"
            )}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
            Email *
          </label>
          <input
            type="email"
            value={data.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="jan@example.com"
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
              "bg-white dark:bg-brand-charcoal/50",
              "text-brand-charcoal dark:text-brand-cream",
              "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
              "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]",
              errors.email && "border-red-500"
            )}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
            Telefon *
          </label>
          <input
            type="tel"
            value={data.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+48 123 456 789"
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
              "bg-white dark:bg-brand-charcoal/50",
              "text-brand-charcoal dark:text-brand-cream",
              "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
              "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]",
              errors.phone && "border-red-500"
            )}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Street */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
            Ulica i numer domu *
          </label>
          <input
            type="text"
            value={data.street || ""}
            onChange={(e) => onChange("street", e.target.value)}
            placeholder="ul. Marszałkowska 1"
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
              "bg-white dark:bg-brand-charcoal/50",
              "text-brand-charcoal dark:text-brand-cream",
              "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
              "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]",
              errors.street && "border-red-500"
            )}
          />
          {errors.street && (
            <p className="text-xs text-red-500">{errors.street}</p>
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
            Miasto *
          </label>
          <input
            type="text"
            value={data.city || ""}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Warszawa"
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
              "bg-white dark:bg-brand-charcoal/50",
              "text-brand-charcoal dark:text-brand-cream",
              "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
              "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]",
              errors.city && "border-red-500"
            )}
          />
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city}</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
            Kod pocztowy *
          </label>
          <input
            type="text"
            value={data.postalCode || ""}
            onChange={(e) => onChange("postalCode", e.target.value)}
            placeholder="00-001"
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
              "bg-white dark:bg-brand-charcoal/50",
              "text-brand-charcoal dark:text-brand-cream",
              "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
              "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]",
              errors.postalCode && "border-red-500"
            )}
          />
          {errors.postalCode && (
            <p className="text-xs text-red-500">{errors.postalCode}</p>
          )}
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
            Kraj *
          </label>
          <select
            value={data.country || "Polska"}
            onChange={(e) => onChange("country", e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
              "bg-white dark:bg-brand-charcoal/50",
              "text-brand-charcoal dark:text-brand-cream",
              "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]",
              errors.country && "border-red-500"
            )}
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-xs text-red-500">{errors.country}</p>
          )}
        </div>

        {/* Company Fields (conditional) */}
        {isCompany && (
          <>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
                Nazwa firmy
              </label>
              <input
                type="text"
                value={data.companyName || ""}
                onChange={(e) => onChange("companyName", e.target.value)}
                placeholder="Nazwa Twojej firmy"
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
                  "bg-white dark:bg-brand-charcoal/50",
                  "text-brand-charcoal dark:text-brand-cream",
                  "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
                  "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]"
                )}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
                NIP
              </label>
              <input
                type="text"
                value={data.taxId || ""}
                onChange={(e) => onChange("taxId", e.target.value)}
                placeholder="1234567890"
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-brand-charcoal/20 dark:border-brand-cream/20",
                  "bg-white dark:bg-brand-charcoal/50",
                  "text-brand-charcoal dark:text-brand-cream",
                  "placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40",
                  "focus:outline-none focus:ring-2 focus:ring-[#B7A99D]",
                  errors.taxId && "border-red-500"
                )}
              />
              {errors.taxId && (
                <p className="text-xs text-red-500">{errors.taxId}</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-[#B7A99D]/10 dark:bg-[#B7A99D]/5 border border-[#B7A99D]/20">
        <p className="text-sm text-brand-charcoal dark:text-brand-cream">
          <strong>💡 Wskazówka:</strong> Dane będą używane tylko do dostarczenia
          zamówienia. Nigdy nie udostępniamy Twoich informacji osobistych
          osobom trzecim.
        </p>
      </div>
    </motion.div>
  );
}

export default ShippingAddressStep;
