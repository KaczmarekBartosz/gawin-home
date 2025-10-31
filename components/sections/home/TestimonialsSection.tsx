"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Anna Kowalska",
    title: "Architekt wnętrz, Warszawa",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    quote:
      "Jakość wykonania mebli jest wyjątkowa. Sofa, którą kupiłam, zachwyca moich klientów podczas każdej wizyty. Obsługa klienta na najwyższym poziomie.",
  },
  {
    id: 2,
    name: "Michał Nowak",
    title: "Właściciel restauracji, Kraków",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    quote:
      "Zamówiłem meble do mojej restauracji i jestem zachwycony. Nie tylko wyglądają przepięknie, ale są też niezwykle wytrzymałe. Polecam każdemu!",
  },
  {
    id: 3,
    name: "Katarzyna Wiśniewska",
    title: "Interior Designer, Wrocław",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    quote:
      "Gawin-Home to synonim elegancji i klasy. Łóżko, które u nich nabyłam, to najlepsza inwestycja w moim domu. Jakość materiałów premium.",
  },
  {
    id: 4,
    name: "Robert Żinski",
    title: "Projektant architektoniczny, Gdańsk",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 5,
    quote:
      "Współpracuję z Gawin-Home przy projektach komercyjnych. Ich profesjonalizm i atencja do detalu są bezkonkurencyjne. Zawsze polecam ich swoim klientom.",
  },
  {
    id: 5,
    name: "Magdalena Piotrowski",
    title: "Właścicielka butiku, Poznań",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    quote:
      "Od momentu zakupu pierwszego mebla jestem lojalną klientką. Każdy artykuł to połączenie piękna i funkcjonalności. Polecam bez wahania!",
  },
  {
    id: 6,
    name: "Łukasz Kowalski",
    title: "Galeria sztuki, Łódź",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    quote:
      "Meble z Gawin-Home doskonale wpisały się w naszą galerię. Minimalistyczny design i solidna konstrukcja to dokładnie to czego szukaliśmy.",
  },
];

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-copper rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <h2 className="text-h1 text-brand-charcoal mb-6">Opinie klientów</h2>
          <p className="text-body-large text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Czytaj, co mówią nasi zadowoleni klienci o mebli premium Gawin-Home
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full flex flex-col border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white p-8 rounded-xl">
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-brand-gold fill-brand-gold"
                    />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-body text-brand-charcoal mb-8 flex-grow leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 mb-8" />

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body font-semibold text-brand-charcoal truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-caption text-gray-600 truncate">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
          transition={{ delay: 0.4 }}
          className="text-center mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-gray-200"
        >
          <p className="text-body-large text-gray-600 leading-relaxed">
            Ponad <span className="font-bold text-brand-gold">2 500+</span>{" "}
            zadowolonych klientów na całym świecie
          </p>
        </motion.div>
      </div>
    </section>
  );
}
