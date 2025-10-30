import { z } from "zod";

/**
 * Checkout Validation Schema
 * Full multi-step form validation using Zod
 */

// Step 1: Shipping Address
export const shippingAddressSchema = z.object({
  firstName: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(50, "Imię nie może mieć więcej niż 50 znaków"),
  lastName: z
    .string()
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki")
    .max(50, "Nazwisko nie może mieć więcej niż 50 znaków"),
  email: z
    .string()
    .email("Podaj prawidłowy adres email")
    .max(100, "Email nie może mieć więcej niż 100 znaków"),
  phone: z
    .string()
    .regex(/^[0-9\s\-\+\(\)]{9,}$/, "Podaj prawidłowy numer telefonu"),
  street: z
    .string()
    .min(3, "Ulica musi mieć co najmniej 3 znaki")
    .max(100, "Ulica nie może mieć więcej niż 100 znaków"),
  city: z
    .string()
    .min(2, "Miasto musi mieć co najmniej 2 znaki")
    .max(50, "Miasto nie może mieć więcej niż 50 znaków"),
  postalCode: z
    .string()
    .regex(/^[0-9]{2}-[0-9]{3}$/, "Kod pocztowy musi być w formacie XX-XXX"),
  country: z
    .string()
    .min(2, "Zaznacz kraj"),
  companyName: z
    .string()
    .max(100, "Nazwa firmy nie może mieć więcej niż 100 znaków")
    .optional()
    .or(z.literal("")),
  taxId: z
    .string()
    .regex(/^[0-9]{10}$/, "NIP musi mieć 10 cyfr")
    .optional()
    .or(z.literal("")),
});

// Step 2: Shipping Method
export const shippingMethodSchema = z.object({
  method: z.enum(["standard", "express", "overnight"]),
  notesForDriver: z
    .string()
    .max(500, "Notatka nie może mieć więcej niż 500 znaków")
    .optional()
    .or(z.literal("")),
});

// Step 3: Payment Method
export const paymentMethodSchema = z.object({
  method: z.enum(["card", "transfer", "paypal", "klarna"]),
  cardName: z
    .string()
    .min(2, "Wpisz imię i nazwisko z karty")
    .max(100)
    .optional(),
  cardNumber: z
    .string()
    .regex(/^[0-9\s]{13,23}$/, "Numer karty jest nieprawidłowy")
    .optional(),
  cardExpiry: z
    .string()
    .regex(/^[0-9]{2}\/[0-9]{2}$/, "Format: MM/YY")
    .optional(),
  cardCvc: z
    .string()
    .regex(/^[0-9]{3,4}$/, "CVC musi mieć 3 lub 4 cyfry")
    .optional(),
  bankName: z
    .string()
    .min(2, "Wybierz bank")
    .optional(),
  saveCard: z.boolean().default(false),
  billingAddressSame: z.boolean().default(true),
});

// Complete Checkout Form
export const checkoutFormSchema = z.object({
  shippingAddress: shippingAddressSchema,
  shippingMethod: shippingMethodSchema,
  paymentMethod: paymentMethodSchema,
  termsAccepted: z.boolean().default(false),
  newsletterOptIn: z.boolean().default(false),
});

// Export types
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type ShippingMethod = z.infer<typeof shippingMethodSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// Shipping method details
export const SHIPPING_METHODS = {
  standard: {
    id: "standard",
    name: "Dostawa Standardowa",
    description: "Dostawa w 5-7 dni roboczych",
    price: 39.99,
    estimatedDays: "5-7 dni",
    icon: "Truck",
  },
  express: {
    id: "express",
    name: "Dostawa Ekspresowa",
    description: "Dostawa w 2-3 dni roboczych",
    price: 79.99,
    estimatedDays: "2-3 dni",
    icon: "Zap",
  },
  overnight: {
    id: "overnight",
    name: "Dostawa Overnight",
    description: "Dostawa następnego dnia roboczego",
    price: 149.99,
    estimatedDays: "1 dzień",
    icon: "AlertCircle",
  },
};

// Payment method details
export const PAYMENT_METHODS = {
  card: {
    id: "card",
    name: "Karta Kredytowa/Debetowa",
    description: "Visa, Mastercard, American Express",
    icon: "CreditCard",
  },
  transfer: {
    id: "transfer",
    name: "Przelewy24",
    description: "Bezpieczny transfer bankowy",
    icon: "Building2",
  },
  paypal: {
    id: "paypal",
    name: "PayPal",
    description: "Szybka i bezpieczna płatność",
    icon: "DollarSign",
  },
  klarna: {
    id: "klarna",
    name: "Klarna - Płatność Później",
    description: "Podziel płatność na raty",
    icon: "Wallet",
  },
};

// Countries list
export const COUNTRIES = [
  { code: "PL", name: "Polska" },
  { code: "DE", name: "Niemcy" },
  { code: "CZ", name: "Czechy" },
  { code: "SK", name: "Słowacja" },
  { code: "HU", name: "Węgry" },
  { code: "AT", name: "Austria" },
  { code: "FR", name: "Francja" },
  { code: "IT", name: "Włochy" },
  { code: "ES", name: "Hiszpania" },
  { code: "GB", name: "Wielka Brytania" },
];
