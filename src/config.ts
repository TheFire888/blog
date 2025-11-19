/**
 * Site Configuration
 *
 * This file contains all the configuration settings for the Bloomfolio template.
 * Update these values to personalize your portfolio site.
 */

import { CodeXml, Send } from "@lucide/astro";
import { Code } from "astro:components";
import profilePic from "./assets/profilepic.jpg";

/**
 * Social media links configuration
 */
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  bluesky?: string;
  instagram?: string;
  youTube?: string;
  codetips?: string;
}

/**
 * Extra link configuration for FAB component
 */
export interface ExtraLink {
  /** URL or path for the link */
  link: string;
  /** Lucide icon component */
  icon: any;
  /** Tooltip label for the link */
  label: string;
}

/**
 * Extra links configuration
 */
export interface ExtraLinks {
  /** Enable or disable the FAB component */
  enable: boolean;
  /** Array of extra links to display */
  links: ExtraLink[];
}

/**
 * Sections visibility configuration
 * Control which sections appear on the index page
 */
export interface SectionsConfig {
  /** Show/hide About section */
  about: boolean;
  /** Show/hide Projects section */
  projects: boolean;
  /** Show/hide Blog section */
  blog: boolean;
  /** Show/hide Work Experience section */
  work: boolean;
  /** Show/hide Education section */
  education: boolean;
  /** Show/hide Hackathons section */
  hackathons: boolean;
  /** Show/hide Contact section */
  contact: boolean;
}

/**
 * Main site configuration interface
 */
export interface SiteConfig {
  /** Site/Portfolio name */
  name: string;
  /** Main title/headline */
  title: string;
  /** Site description for SEO and hero section */
  description: string;
  /** Path to avatar/logo image */
  avatar: ImageMetadata;
  /** Location/City */
  location: string;
  /** Contact email */
  email: string;
  /** Social media profile links */
  socialLinks: SocialLinks;
  /** Enable ThemeSelector (dropdown) instead of ThemeToggle (checkbox) */
  enableThemeSelector: boolean;
  /** Extra links configuration for FAB component */
  extraLinks: ExtraLinks;
  /** Sections visibility configuration (Hero is always visible) */
  sections: SectionsConfig;
}

/**
 * Site configuration object
 * Update these values to customize your portfolio
 */
export const siteConfig: SiteConfig = {
  name: "Luan",
  title: "🧬 Bioinformata & Dev",
  description:
    "Graduando em Ciências Moleculares na USP. Pesquisador em Bioinformática, entusiasta do VIM e desenvolvedor focado em Rust e Python.",
  avatar: profilePic,
  location: "🇧🇷 Brasil",
  email: "luanric888@gmail.com",
  socialLinks: {
    github: "https://github.com/TheFire888",
  },
  enableThemeSelector: true,
  extraLinks: {
    enable: true,
    links: [
      {
        link: "mailto:luanric888@gmail.com?subject=Sobre%20seu%20blog",
        icon: Send,
        label: "Fale comigo",
      },
      {
        link: "https://github.com/TheFire888/blog",
        icon: CodeXml,
        label: "GitHub Repo",
      },
    ],
  },
  sections: {
    about: false,
    projects: false,
    blog: true,
    work: false,
    education: false,
    hackathons: false,
    contact: false,
  },
};
