"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "@/components/ui/neo-button";

// Zod schema for email validation
const newsletterSchema = z.object({
  email: z
    .string()
    .email("Proszę podać prawidłowy adres e-mail")
    .min(5, "E-mail musi mieć co najmniej 5 znaków"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterSectionProps {
  variant?: "inline" | "full-width" | "compact";
  onSuccess?: (email: string) => void;
}

export function NewsletterSection({
  variant = "full-width",
  onSuccess,
}: NewsletterSectionProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      setSubmitError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In production, send to your email service
      console.log("Newsletter signup:", data.email);

      setIsSubmitted(true);
      onSuccess?.(data.email);
      reset();

      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Coś poszło nie tak. Spróbuj ponownie."
      );
    }
  };

  // Layout variants
  const containerVariants = {
    inline: "flex flex-col gap-4 sm:flex-row sm:gap-3",
    "full-width": "flex flex-col gap-4 w-full",
    compact: "flex flex-col gap-3 w-full",
  };

  const inputWrapperVariants = {
    inline: "flex-1 relative",
    "full-width": "w-full relative",
    compact: "w-full relative",
  };

  return (
    <section
      className={cn(
        "w-full py-12 sm:py-16 px-4 sm:px-6",
        "bg-brand-cream"
      )}
    >
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-lg font-semibold text-brand-charcoal">
              Pozostań na bieżąco
            </h2>
            <p className="mt-2 text-body-large text-brand-charcoal/70">
              Subskrybuj nasz newsletter, aby otrzymywać ekskluzywne oferty i
              najnowsze kolekcje
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(containerVariants[variant])}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Email Input Container */}
          <div className={cn(inputWrapperVariants[variant])}>
            <div className="relative group">
              {/* Background gradient effect on focus */}
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-lg",
                  "bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-transparent",
                  "opacity-0 blur-xl transition-opacity duration-300"
                )}
                animate={{
                  opacity: isSubmitted ? 0 : 0,
                }}
              />

              {/* Input field */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Twój adres e-mail"
                  disabled={isSubmitted || isSubmitting}
                  {...register("email")}
                  className={cn(
                    "w-full px-6 py-3.5 rounded-lg",
                    "bg-white text-brand-charcoal text-base placeholder-brand-charcoal/40",
                    "border-2 transition-all duration-200",
                    "focus:outline-none",
                    errors.email
                      ? "border-red-500 focus:border-red-600 focus:shadow-neo-light"
                      : "border-brand-charcoal/10 focus:border-brand-gold focus:shadow-neo-light focus:shadow-brand-gold/20",
                    isSubmitted && "border-emerald-600/50",
                    "disabled:opacity-70 disabled:cursor-not-allowed"
                  )}
                />

                {/* Mail icon */}
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-brand-charcoal/40 pointer-events-none" />
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 flex items-start gap-2 text-sm text-red-600"
                >
                  <AlertCircle className="size-4 mt-0.5 flex-shrink-0" />
                  <span>{errors.email.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.div
            className={cn(
              variant === "inline" && "sm:mt-0",
              variant !== "inline" && "w-full sm:w-auto"
            )}
            layout
          >
            <NeoButton
              type="submit"
              variant="primary"
              size={variant === "compact" ? "sm" : "md"}
              disabled={isSubmitted || isSubmitting}
              className={cn(
                "w-full sm:w-auto",
                "relative overflow-hidden",
                "transition-all duration-300"
              )}
            >
              <motion.span
                animate={{
                  opacity: isSubmitting || isSubmitted ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2"
              >
                {isSubmitted ? "Zarejestrowano" : "Subskrybuj"}
              </motion.span>

              {/* Loading spinner */}
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="size-5 border-2 border-brand-cream border-t-brand-charcoal rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success checkmark */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <CheckCircle className="size-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </NeoButton>
          </motion.div>
        </motion.form>

        {/* Submit error message */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-start gap-3 rounded-lg bg-emerald-50 border border-emerald-300 p-4 text-sm text-emerald-700"
            >
              <CheckCircle className="size-5 flex-shrink-0 mt-0.5" />
              <span>
                Dziękujemy za subskrypcję! Sprawdź swoją skrzynkę e-mail.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col items-center gap-2 text-center text-sm text-brand-charcoal/60"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-emerald-600" />
            <span>Bez spamu - tylko najlepsze oferty</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-emerald-600" />
            <span>Niskie ceny na ekskluzywnych kolekcjach</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-emerald-600" />
            <span>Możesz się wypisać w każdej chwili</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Export inline variant for footer integration
export function NewsletterInline() {
  return <NewsletterSection variant="inline" />;
}

// Export compact variant for sidebar/modal
export function NewsletterCompact() {
  return <NewsletterSection variant="compact" />;
}
