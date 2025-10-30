"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeNeo } from "@/components/ui/badge-neo";

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful?: number;
  unhelpful?: number;
  verified?: boolean;
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function RatingStars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "size-6" : "size-4";

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(sizeClass, i < Math.round(rating) ? "fill-brand-gold text-brand-gold" : "text-brand-charcoal/20")}
        />
      ))}
    </div>
  );
}

function RatingDistribution({ ratings }: { ratings: Record<number, number> }) {
  const total = Object.values(ratings).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = ratings[stars] || 0;
        const percentage = total > 0 ? (count / total) * 100 : 0;

        return (
          <motion.div
            key={stars}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-1 w-16">
              <span className="text-sm font-medium text-brand-charcoal">{stars}</span>
              <Star className="size-3 fill-brand-gold text-brand-gold" />
            </div>
            <div className="flex-1 h-2 bg-brand-charcoal/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-brand-gold to-brand-copper rounded-full"
              />
            </div>
            <span className="text-sm text-brand-charcoal/60 w-12 text-right">
              {count}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
  className,
}: ReviewsSectionProps) {
  const [sortBy, setSortBy] = React.useState<"helpful" | "recent" | "rating">("helpful");

  // Mock rating distribution
  const ratingDistribution = {
    5: Math.round(totalReviews * 0.45),
    4: Math.round(totalReviews * 0.25),
    3: Math.round(totalReviews * 0.15),
    2: Math.round(totalReviews * 0.1),
    1: Math.round(totalReviews * 0.05),
  };

  const sortedReviews = React.useMemo(() => {
    const arr = [...reviews];
    if (sortBy === "helpful") {
      return arr.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
    } else if (sortBy === "rating") {
      return arr.sort((a, b) => b.rating - a.rating);
    }
    return arr; // recent
  }, [reviews, sortBy]);

  return (
    <section className={cn("w-full py-20 md:py-32 px-4 sm:px-6 bg-white", className)}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-h1 font-bold text-brand-charcoal mb-4">
            Opinie Klientów
          </h2>
          <p className="text-body-large text-brand-charcoal/70 max-w-2xl mx-auto">
            Przeczytaj, co myślą nasi klienci o tym produkcie
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 p-8 rounded-2xl bg-gradient-to-br from-brand-cream to-white border border-brand-charcoal/5">
              {/* Average Rating */}
              <div className="mb-8 text-center">
                <div className="mb-4">
                  <div className="text-6xl font-black text-brand-gold mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-3">
                    <RatingStars rating={averageRating} size="lg" />
                  </div>
                  <p className="text-body-small text-brand-charcoal/60">
                    na podstawie {totalReviews} opinii
                  </p>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="border-t border-brand-charcoal/10 pt-8">
                <h3 className="text-h4 font-semibold text-brand-charcoal mb-6">
                  Rozkład ocen
                </h3>
                <RatingDistribution ratings={ratingDistribution} />
              </div>
            </div>
          </motion.div>

          {/* Reviews List */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* Sort Options */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {(["helpful", "recent", "rating"] as const).map((option) => (
                <motion.button
                  key={option}
                  onClick={() => setSortBy(option)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200",
                    sortBy === option
                      ? "bg-brand-gold text-white shadow-lg shadow-brand-gold/30"
                      : "bg-brand-cream border border-brand-charcoal/10 text-brand-charcoal hover:border-brand-gold/50"
                  )}
                >
                  {option === "helpful" && "Najbardziej pomocne"}
                  {option === "recent" && "Najnowsze"}
                  {option === "rating" && "Najwyższe oceny"}
                </motion.button>
              ))}
            </div>

            {/* Individual Reviews */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              {sortedReviews.map((review) => (
                <motion.article
                  key={review.id}
                  variants={itemVariants}
                  className="p-6 rounded-xl border border-brand-charcoal/10 hover:border-brand-gold/30 transition-colors duration-200 bg-white hover:shadow-lg hover:shadow-brand-gold/10"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-copper flex items-center justify-center text-white">
                          <User className="size-5" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-body-large font-semibold text-brand-charcoal">
                            {review.author}
                          </h3>
                          {review.verified && (
                            <BadgeNeo variant="success" className="text-xs">
                              Zweryfikowany
                            </BadgeNeo>
                          )}
                        </div>
                        <p className="text-caption text-brand-charcoal/50">
                          {new Date(review.date).toLocaleDateString("pl-PL", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <RatingStars rating={review.rating} />
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <h4 className="text-body-large font-semibold text-brand-charcoal mb-2">
                      {review.title}
                    </h4>
                    <p className="text-body-small text-brand-charcoal/70 leading-relaxed">
                      {review.content}
                    </p>
                  </div>

                  {/* Helpful Buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-brand-charcoal/10">
                    <span className="text-caption text-brand-charcoal/60">Była pomocna?</span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-brand-cream transition-colors"
                      >
                        <ThumbsUp className="size-4 text-brand-charcoal/60 hover:text-brand-gold" />
                        <span className="text-xs text-brand-charcoal/60">
                          {review.helpful || 0}
                        </span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-brand-cream transition-colors"
                      >
                        <ThumbsDown className="size-4 text-brand-charcoal/60 hover:text-red-500" />
                        <span className="text-xs text-brand-charcoal/60">
                          {review.unhelpful || 0}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* Load More Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <button className="px-6 py-3 rounded-lg border border-brand-charcoal/20 hover:border-brand-gold text-brand-charcoal hover:text-brand-gold font-medium transition-colors">
                Załaduj więcej opinii
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
