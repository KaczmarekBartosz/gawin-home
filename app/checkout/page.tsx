"use client";

import * as React from "react";
import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to extract error messages from form errors
const getFieldErrors = (errors: Record<string, FieldError | undefined>): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(errors).map(([key, error]) => [
      key,
      error?.message || "",
    ])
  );
};
import {
  checkoutFormSchema,
  SHIPPING_METHODS,
  PAYMENT_METHODS,
  type CheckoutFormData,
} from "@/lib/validations/checkout";
import { ShippingAddressStep } from "@/components/checkout/ShippingAddressStep";
import { ShippingMethodStep } from "@/components/checkout/ShippingMethodStep";
import { PaymentMethodStep } from "@/components/checkout/PaymentMethodStep";
import { OrderReviewStep } from "@/components/checkout/OrderReviewStep";

// Mock cart items
const MOCK_CART_ITEMS = [
  {
    id: "1",
    name: "Nowoczesna sofa szara",
    price: 2499.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Stolik kawowy drewniany",
    price: 599.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop",
  },
];

const STEPS = ["address", "shipping", "payment", "review"] as const;
type Step = (typeof STEPS)[number];

const STEP_LABELS = {
  address: "Adres",
  shipping: "Dostawa",
  payment: "Płatność",
  review: "Przegląd",
};

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>("address");
  const [isCompanyBilling, setIsCompanyBilling] = useState(false);

  // React Hook Form setup
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onChange",
    defaultValues: {
      shippingAddress: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        postalCode: "",
        country: "Polska",
        companyName: "",
        taxId: "",
      },
      shippingMethod: {
        method: "standard",
        notesForDriver: "",
      },
      paymentMethod: {
        method: "card",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
        bankName: "",
        saveCard: false,
        billingAddressSame: true,
      },
      termsAccepted: false,
      newsletterOptIn: false,
    },
  });

  const { formState, watch, handleSubmit } = form;
  const watchedValues = watch();

  // Calculate order totals
  const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = SHIPPING_METHODS[
    watchedValues.shippingMethod?.method as keyof typeof SHIPPING_METHODS
  ]?.price || 39.99;
  const tax = (subtotal + shippingCost) * 0.23; // 23% VAT
  const total = subtotal + shippingCost + tax;

  // Validate current step
  const validateStep = async (): Promise<boolean> => {
    if (currentStep === "address") {
      const result = await form.trigger("shippingAddress");
      return result;
    } else if (currentStep === "shipping") {
      const result = await form.trigger("shippingMethod");
      return result;
    } else if (currentStep === "payment") {
      const result = await form.trigger("paymentMethod");
      return result;
    } else if (currentStep === "review") {
      const result = await form.trigger(["termsAccepted", "newsletterOptIn"]);
      return result;
    }
    return true;
  };

  // Navigate to next step
  const handleNextStep = async () => {
    const isValid = await validateStep();
    if (!isValid) return;

    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1];
      if (nextStep) {
        setCurrentStep(nextStep);
      }
    }
  };

  // Navigate to previous step
  const handlePrevStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = STEPS[currentIndex - 1];
      if (prevStep) {
        setCurrentStep(prevStep);
      }
    }
  };

  // Handle form submission
  const onSubmit = (data: CheckoutFormData) => {
    console.log("Order submitted:", {
      ...data,
      cartItems: MOCK_CART_ITEMS,
      subtotal,
      shippingCost,
      tax,
      total,
    });
    // TODO: Send to API
    alert("Zamówienie złożone! (Demo)");
  };

  const isFirstStep = currentStep === "address";
  const isLastStep = currentStep === "review";

  return (
    <div className="min-h-screen bg-white dark:bg-brand-charcoal pt-8 pb-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-display-lg font-bold text-brand-charcoal dark:text-brand-cream mb-2">
            Finalizuj zamówienie
          </h1>
          <p className="text-body-large text-brand-charcoal/60 dark:text-brand-cream/60">
            Wszechstronny proces checkout z pełnym bezpieczeństwem
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center gap-2 sm:gap-4">
            {STEPS.map((step, index) => {
              const isActive = STEPS.indexOf(currentStep) === index;
              const isCompleted = STEPS.indexOf(currentStep) > index;

              return (
                <React.Fragment key={step}>
                  {index > 0 && (
                    <div
                      className={cn(
                        "flex-1 h-1 rounded-full transition-colors",
                        isCompleted
                          ? "bg-brand-gold"
                          : "bg-brand-charcoal/10 dark:bg-brand-cream/10"
                      )}
                    />
                  )}
                  <motion.button
                    onClick={() => {
                      if (STEPS.indexOf(step) < STEPS.indexOf(currentStep)) {
                        setCurrentStep(step);
                      }
                    }}
                    whileHover={STEPS.indexOf(step) < STEPS.indexOf(currentStep) ? { scale: 1.05 } : {}}
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                      isActive
                        ? "bg-brand-gold text-brand-charcoal"
                        : isCompleted
                          ? "bg-brand-gold text-white"
                          : "bg-brand-charcoal/10 dark:bg-brand-cream/10 text-brand-charcoal dark:text-brand-cream"
                    )}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </motion.button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Step labels */}
          <div className="flex justify-between mt-4 text-xs sm:text-sm font-medium text-brand-charcoal dark:text-brand-cream">
            {STEPS.map((step) => (
              <span key={step} className="text-center flex-1">
                {STEP_LABELS[step]}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content - 2/3 form + 1/3 sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* Step 1: Shipping Address */}
                {currentStep === "address" && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ShippingAddressStep
                      data={watchedValues.shippingAddress}
                      errors={
                        formState.errors.shippingAddress
                          ? getFieldErrors(formState.errors.shippingAddress as any)
                          : {}
                      }
                      onChange={(field, value) => {
                        form.setValue(`shippingAddress.${field}`, value as any);
                      }}
                      isCompany={isCompanyBilling}
                      onCompanyToggle={setIsCompanyBilling}
                    />
                  </motion.div>
                )}

                {/* Step 2: Shipping Method */}
                {currentStep === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ShippingMethodStep
                      data={watchedValues.shippingMethod}
                      errors={
                        formState.errors.shippingMethod
                          ? getFieldErrors(formState.errors.shippingMethod as any)
                          : {}
                      }
                      onChange={(field, value) => {
                        form.setValue(`shippingMethod.${field}`, value as any);
                      }}
                      cartTotal={subtotal}
                    />
                  </motion.div>
                )}

                {/* Step 3: Payment Method */}
                {currentStep === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PaymentMethodStep
                      data={watchedValues.paymentMethod}
                      errors={
                        formState.errors.paymentMethod
                          ? getFieldErrors(formState.errors.paymentMethod as any)
                          : {}
                      }
                      onChange={(field, value) => {
                        form.setValue(`paymentMethod.${field}`, value as any);
                      }}
                    />
                  </motion.div>
                )}

                {/* Step 4: Order Review */}
                {currentStep === "review" && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OrderReviewStep
                      formData={watchedValues}
                      cartItems={MOCK_CART_ITEMS}
                      subtotal={subtotal}
                      shippingCost={shippingCost}
                      tax={tax}
                      onConfirm={() => {}}
                      isLoading={formState.isSubmitting}
                    />

                    {/* Terms & Newsletter */}
                    <div className="mt-8 space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={watchedValues.termsAccepted || false}
                          onChange={(e) => form.setValue("termsAccepted", e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border border-brand-charcoal/20 dark:border-brand-cream/20 accent-brand-gold"
                        />
                        <span className="text-body-small text-brand-charcoal dark:text-brand-cream">
                          Akceptuję warunki umowy i politykę prywatności *
                        </span>
                      </label>
                      {formState.errors.termsAccepted && (
                        <p className="text-xs text-red-500">{formState.errors.termsAccepted.message}</p>
                      )}

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={watchedValues.newsletterOptIn || false}
                          onChange={(e) => form.setValue("newsletterOptIn", e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border border-brand-charcoal/20 dark:border-brand-cream/20 accent-brand-gold"
                        />
                        <span className="text-body-small text-brand-charcoal dark:text-brand-cream">
                          Chciałbym otrzymywać wiadomości o specjalnych ofertach
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-12 flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isFirstStep}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
                    isFirstStep
                      ? "opacity-50 cursor-not-allowed bg-brand-charcoal/10 dark:bg-brand-cream/10 text-brand-charcoal dark:text-brand-cream"
                      : "bg-brand-charcoal/10 dark:bg-brand-cream/10 text-brand-charcoal dark:text-brand-cream hover:bg-brand-charcoal/20 dark:hover:bg-brand-cream/20"
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Wstecz
                </button>

                {!isLastStep && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all bg-brand-gold hover:bg-brand-gold/90 text-brand-charcoal ml-auto"
                  >
                    Dalej
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {isLastStep && (
                  <button
                    type="submit"
                    disabled={formState.isSubmitting || !watchedValues.termsAccepted}
                    className={cn(
                      "flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ml-auto",
                      watchedValues.termsAccepted
                        ? "bg-brand-gold hover:bg-brand-gold/90 text-brand-charcoal"
                        : "opacity-50 cursor-not-allowed bg-brand-gold text-brand-charcoal"
                    )}
                  >
                    <Lock className="w-5 h-5" />
                    {formState.isSubmitting ? "Przetwarzam..." : "Potwierdź zamówienie"}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Sidebar - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1 h-fit sticky top-8"
          >
            <div className="bg-white dark:bg-brand-charcoal/50 rounded-xl border border-brand-charcoal/10 dark:border-brand-cream/10 p-6 space-y-6">
              {/* Header */}
              <div>
                <h3 className="text-h3 font-bold text-brand-charcoal dark:text-brand-cream mb-1">
                  Podsumowanie
                </h3>
                <p className="text-body-small text-brand-charcoal/60 dark:text-brand-cream/60">
                  Zamówienie #{Math.random().toString(36).substring(7).toUpperCase()}
                </p>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 pb-6 border-b border-brand-charcoal/10 dark:border-brand-cream/10">
                {MOCK_CART_ITEMS.map((item) => (
                  <div key={item.id} className="flex justify-between text-body-small">
                    <span className="text-brand-charcoal dark:text-brand-cream">
                      {item.name}
                      {item.quantity > 1 && ` x${item.quantity}`}
                    </span>
                    <span className="font-semibold text-brand-charcoal dark:text-brand-cream">
                      {(item.price * item.quantity).toFixed(2)} zł
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-body-small text-brand-charcoal/70 dark:text-brand-cream/70">
                    Subtotal
                  </span>
                  <span className="font-semibold text-brand-charcoal dark:text-brand-cream">
                    {subtotal.toFixed(2)} zł
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-body-small text-brand-charcoal/70 dark:text-brand-cream/70">
                    Dostawa{" "}
                    {watchedValues.shippingMethod?.method && (
                      <span className="text-xs text-brand-gold">
                        ({SHIPPING_METHODS[
                          watchedValues.shippingMethod?.method as keyof typeof SHIPPING_METHODS
                        ]?.name || "Standardowa"})
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-brand-charcoal dark:text-brand-cream">
                    {shippingCost.toFixed(2)} zł
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-body-small text-brand-charcoal/70 dark:text-brand-cream/70">
                    VAT (23%)
                  </span>
                  <span className="font-semibold text-brand-charcoal dark:text-brand-cream">
                    {tax.toFixed(2)} zł
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-brand-charcoal/10 dark:border-brand-cream/10">
                <div className="flex justify-between items-baseline">
                  <span className="text-h4 font-bold text-brand-charcoal dark:text-brand-cream">
                    Razem
                  </span>
                  <span className="text-h3 font-bold text-brand-gold">
                    {total.toFixed(2)} zł
                  </span>
                </div>
              </div>

              {/* Security Info */}
              <div className="p-4 rounded-lg bg-brand-gold/10 dark:bg-brand-gold/5 border border-brand-gold/20 flex gap-3">
                <Lock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-brand-charcoal dark:text-brand-cream">
                    Bezpieczna transakcja
                  </p>
                  <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 mt-1">
                    Twoje dane są szyfrowane i bezpieczne
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
