import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import SocialIcon from './SocialIcons';
import { Theme } from '@/app/types/portfolio';
import dynamic from 'next/dynamic';
const FloatingParticles = dynamic(() => import('./FloatingParticles'), { ssr: false });

interface HeroSectionProps {
  name: string;
  title: string;
  about: string;
  email: string;
  githubLink: string;
  linkedinLink?: string;
  personalWebsite?: string;
  location: string;
  profileImage: string;
  portfolioType: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
    github?: string;
  };
  theme: Theme;
}

const FuturisticHeroSection = ({
  name,
  title,
  about,
  email,
  githubLink,
  location,
  profileImage,
  socials,
  theme,
}: HeroSectionProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  
  return (
    <section
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundColor: theme.background,
        fontFamily: theme.fontBody,
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Gradient background */}
      {/* <div className="absolute inset-0  overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, ${theme.primary}15, transparent 60%), 
                              radial-gradient(circle at 70% 60%, ${theme.secondary}15, transparent 60%)`,
          }}
        />
      </div>  */}
  
      <div className="absolute inset-0 z-0 opacity-100">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.accent}30 1px, transparent 1px), 
                              linear-gradient(to bottom, ${theme.accent}30 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      {/* Floating particles */}
      <FloatingParticles 
  theme={theme}
  particleCount={5}
  opacity={0.7}
/>


      {/* Animated top border */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.primary})`,
          backgroundSize: "200% 100%",
          animation: "gradient-flow 8s ease infinite",
        }}
      />

      <div className="container max-w-6xl mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Content Side */}
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="space-y-6">
              {/* Name with glowing effect */}
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div
                  className="absolute -inset-1 blur-xl opacity-30 rounded-lg"
                  style={{ background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})` }}
                />
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold relative"
                  style={{
                    fontFamily: theme.fontHeading,
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: `0 0 20px ${theme.primary}20`,
                  }}
                >
                  {name}
                </h1>
              </motion.div>

              {/* Title with underline animation */}
              <motion.h2
                variants={itemVariants}
                className="text-2xl md:text-3xl font-medium mb-4 relative group inline-block"
              >
                <span style={{ color: theme.body }}>{title}</span>
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})` }}
                />
              </motion.h2>

              {/* About text */}
              <motion.p
                variants={itemVariants}
                className="text-lg leading-relaxed"
                style={{ color: theme.body }}
              >
                {about}
              </motion.p>

              {/* Action buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8">
                {email && (
                  <motion.a
                    href={`mailto:${email}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full shadow-lg font-medium flex items-center gap-2 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      color: theme.light,
                      boxShadow: `0 8px 20px ${theme.primary}30`,
                    }}
                  >
                    <FiMail className="h-5 w-5" />
                    <span>Connect</span>
                  </motion.a>
                )}

                {githubLink && (
                  <motion.a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 border group"
                    style={{
                      borderColor: theme.primary,
                      color: theme.primary,
                      background: `${theme.background}90`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <FaGithub className="h-5 w-5" />
                    <span>View Projects</span>
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ background: theme.primary }}
                    />
                  </motion.a>
                )}
              </motion.div>

              {/* Location and socials */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mt-8">
                {location && (
                  <div
                    className="flex items-center gap-2 py-1 px-4 rounded-full"
                    style={{
                      background: `${theme.muted}80`,
                      backdropFilter: "blur(8px)",
                      color: theme.body,
                      border: `1px solid ${theme.primary}20`,
                    }}
                  >
                    <FiMapPin style={{ color: theme.primary }} />
                    <span>{location}</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {Object.entries(socials).map(
                    ([platform, url]) =>
                      url && (
                        <SocialIcon
                          key={platform}
                          type={platform}
                          url={url}
                          theme={theme}
                        />
                      )
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Glowing background */}
              <div
                className="absolute -inset-4 blur-2xl opacity-30 rounded-full"
                style={{ background: `radial-gradient(circle, ${theme.primary}, ${theme.secondary})` }}
              />
              
              {/* Decorative rings */}
              <div className="absolute inset-0 -m-10 rounded-full opacity-20 animate-spin-slow"
                style={{ 
                  border: `1px solid ${theme.primary}`,
                  borderRadius: "100%",
                }} 
              />
              
              <div className="absolute inset-0 -m-16 rounded-full opacity-10 animate-reverse-spin"
                style={{ 
                  border: `1px dashed ${theme.secondary}`,
                  borderRadius: "100%",
                }} 
              />
              
              {/* Hexagon frame */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                      transform: "scale(1.05)",
                      opacity: 0.7,
                    }}
                  />
                </div>
                
                {/* Image container */}
                <div
                  className="relative overflow-hidden transition-all duration-700 group-hover:shadow-2xl"
                  style={{
                    width: "280px",
                    height: "280px",
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-transparent to-black opacity-20" />
                  
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/default-avatar.png';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl font-bold text-light">
                      {name.charAt(0)}
                    </div>
                  )}
                  
                  {/* Shine effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(45deg, transparent, ${theme.light}, transparent)`,
                      backgroundSize: "200% 200%",
                      animation: "shine 1.5s ease forwards",
                    }}
                  />
                </div>
              </div>
              
              {/* Badge */}
              <div
                className="absolute -top-2 -right-2 p-2 rounded-full shadow-lg"
                style={{
                  background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                  boxShadow: `0 4px 12px ${theme.primary}50`,
                }}
              >
                <div className="flex items-center justify-center bg-white rounded-full w-8 h-8">
                  <HiSparkles
                    className="text-lg"
                    style={{ color: theme.primary }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
};

export default FuturisticHeroSection;