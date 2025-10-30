/**
 * ANIMATION EXAMPLES
 * Real-world component examples using animation presets and hooks
 *
 * This file is for reference only - copy patterns to your components
 */

import { motion } from "framer-motion";
import {
  fadeIn,
  slideUpFadeIn,
  scaleIn,
  staggerContainer,
  staggerItemSlideUp,
  scrollSlideUp,
  floatAnimation,
  bounceUp,
} from "@/lib/animation-presets";
import {
  useScrollAnimation,
  useScrollStaggerAnimation,
  useHoverAnimation,
} from "@/lib/animation-hooks";

// ============================================================================
// EXAMPLE 1: Simple Hero Section with Fade-In
// ============================================================================

export function SimpleHeroExample() {
  return (
    <section className="hero py-20 text-center">
      <motion.h1 {...fadeIn} className="text-5xl font-bold">
        Welcome to Our Store
      </motion.h1>
      <motion.p {...fadeIn} className="text-xl text-gray-600 mt-4">
        Discover exceptional quality
      </motion.p>
    </section>
  );
}

// ============================================================================
// EXAMPLE 2: Staggered Feature List
// ============================================================================

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureListExample({ features }: { features: Feature[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {features.map((feature) => (
        <motion.div
          key={feature.id}
          variants={staggerItemSlideUp}
          className="p-6 bg-white rounded-lg shadow"
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================================
// EXAMPLE 3: Product Grid with Hover Effects
// ============================================================================

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
}

export function ProductGridExample({ products }: { products: Product[] }) {
  const { containerRef, controls, getDelay } = useScrollStaggerAnimation(
    products.length,
    0.08, // 80ms stagger
  );

  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <ProductCardWithAnimation
          key={product.id}
          product={product}
          delay={getDelay(index)}
        />
      ))}
    </motion.div>
  );
}

function ProductCardWithAnimation({
  product,
  delay,
}: {
  product: Product;
  delay: number;
}) {
  const { whileHover, whileTap } = useHoverAnimation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={whileHover}
      whileTap={whileTap}
      className="bg-white rounded-lg overflow-hidden shadow"
    >
      <div className="overflow-hidden h-64 bg-gray-200">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-xl font-bold text-blue-600">{product.price}</p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// EXAMPLE 4: Scroll-Triggered Section Reveal
// ============================================================================

export function ScrollRevealSectionExample() {
  const { ref, controls } = useScrollAnimation({ threshold: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gradient-to-r from-blue-50 to-purple-50"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Why Choose Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our products are carefully curated to bring the best quality and style
          to your home. We believe in sustainable practices and exceptional
          customer service.
        </p>
      </div>
    </motion.section>
  );
}

// ============================================================================
// EXAMPLE 5: Multi-Element Hero with Sequential Animations
// ============================================================================

export function SequentialHeroExample() {
  return (
    <section className="hero min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Background float element */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"
        {...floatAnimation}
      />

      {/* Main content with stagger */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center"
      >
        {/* Heading */}
        <motion.h1
          variants={staggerItemSlideUp}
          className="text-6xl font-bold mb-4"
        >
          Transform Your Space
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={staggerItemSlideUp}
          className="text-2xl text-gray-300 mb-8"
        >
          Discover curated collections for every room
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={staggerItemSlideUp}>
          <motion.button
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg"
            whileHover={{ scale: 1.05, backgroundColor: "#0066ff" }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 6: Testimonials Carousel with Scroll Animation
// ============================================================================

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export function TestimonialsExample({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-16">
        What Customers Say
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={staggerItemSlideUp}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 7: Pricing Table with Emphasis Animation
// ============================================================================

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export function PricingTableExample({ plans }: { plans: PricingPlan[] }) {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Our Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={plan.highlighted ? { y: -10 } : {}}
            className={`p-8 rounded-lg ${
              plan.highlighted
                ? "bg-blue-600 text-white shadow-2xl ring-2 ring-blue-400"
                : "bg-white shadow-lg border border-gray-200"
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p
              className={`text-4xl font-bold mb-6 ${plan.highlighted ? "text-white" : "text-blue-600"}`}
            >
              {plan.price}
            </p>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xl">✓</span>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-lg font-semibold ${
                plan.highlighted
                  ? "bg-white text-blue-600"
                  : "bg-blue-600 text-white"
              }`}
            >
              Choose Plan
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 8: Newsletter Signup with Spring Animation
// ============================================================================

export function NewsletterSignupExample() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.h2
          variants={staggerItemSlideUp}
          className="text-4xl font-bold mb-4"
        >
          Stay Updated
        </motion.h2>

        <motion.p variants={staggerItemSlideUp} className="text-gray-400 mb-8">
          Subscribe to our newsletter for exclusive offers and design
          inspiration.
        </motion.p>

        <motion.form variants={staggerItemSlideUp} className="flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-black"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 rounded-lg font-semibold"
          >
            Subscribe
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 9: Image Gallery with Staggered Reveal
// ============================================================================

export function ImageGalleryExample({ images }: { images: string[] }) {
  const { containerRef, controls, getDelay } = useScrollStaggerAnimation(
    images.length,
    0.1,
  );

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold mb-12">Gallery</h2>

      <motion.div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: getDelay(index) }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden rounded-lg h-64 cursor-pointer"
          >
            <img
              src={image}
              alt={`Gallery ${index}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 10: Loading Skeleton with Shimmer
// ============================================================================

import { shimmerAnimation } from "@/lib/animation-presets";

export function LoadingSkeletonExample() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg h-48"
          {...shimmerAnimation}
          style={{ backgroundSize: "200% 100%" }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// EXPORT ALL EXAMPLES
// ============================================================================

export const examples = {
  SimpleHero: SimpleHeroExample,
  FeatureList: FeatureListExample,
  ProductGrid: ProductGridExample,
  ScrollRevealSection: ScrollRevealSectionExample,
  SequentialHero: SequentialHeroExample,
  Testimonials: TestimonialsExample,
  PricingTable: PricingTableExample,
  NewsletterSignup: NewsletterSignupExample,
  ImageGallery: ImageGalleryExample,
  LoadingSkeleton: LoadingSkeletonExample,
};
