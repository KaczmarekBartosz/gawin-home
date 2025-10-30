"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LookbookCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  overlayImage: string;
  theme: string;
  color: string;
  featured?: boolean;
  className?: string;
}

export function LookbookCard({
  id,
  title,
  subtitle,
  description,
  image,
  overlayImage,
  theme,
  color,
  featured = false,
  className,
}: LookbookCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  };

  // Color theme mappings for gradient overlays
  const colorOverlays: Record<string, string> = {
    slate: "from-slate-900/40 to-slate-700/20",
    amber: "from-amber-900/40 to-amber-700/20",
    zinc: "from-zinc-900/40 to-zinc-700/20",
    neutral: "from-neutral-900/30 to-neutral-700/10",
  };

  const overlayClass = colorOverlays[color] || colorOverlays.slate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        featured ? "col-span-2 row-span-2 min-h-[600px]" : "min-h-[400px]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={
            isHovered && featured
              ? {
                  scale: 1.1,
                  x: (mousePosition.x - 50) * 10,
                  y: (mousePosition.y - 50) * 10,
                }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        />
      </div>

      {/* Overlay Gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          overlayClass,
          "transition-opacity duration-300"
        )}
        style={{
          opacity: isHovered ? 0.6 : 0.5,
        }}
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        {/* Content Background (subtle glass effect) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Text Content */}
        <motion.div
          className="relative z-10 space-y-3"
          animate={{
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Theme Badge */}
          <div className="flex items-center gap-2">
            <motion.div
              className="text-xs font-semibold uppercase tracking-wider text-brand-gold"
              animate={{
                opacity: isHovered ? 1 : 0.8,
              }}
            >
              {theme}
            </motion.div>
            <div className="w-8 h-px bg-gradient-to-r from-brand-gold/50 to-transparent" />
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h3
              className={cn(
                "font-bold text-white leading-tight",
                featured ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
              )}
            >
              {title}
            </h3>
            <p className="text-brand-gold text-lg font-semibold">{subtitle}</p>
          </div>

          {/* Description (hidden on non-featured, shown on hover for featured) */}
          <motion.p
            className="text-white/80 text-sm md:text-base max-w-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered || featured ? 1 : 0,
              height: isHovered || featured ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="pt-2"
            animate={{
              y: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={`/lookbook/${id}`}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                "bg-brand-gold hover:bg-brand-gold/90",
                "text-brand-charcoal font-semibold",
                "transition-all duration-300",
                "group/cta"
              )}
            >
              Przeglądaj kolekcję
              <motion.div
                className="inline-block"
                animate={{
                  x: isHovered ? 4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="size-4" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Hover Border Accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl border border-brand-gold"
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default LookbookCard;
