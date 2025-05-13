import { Lato } from "next/font/google";
import { Roboto } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Poppins } from "next/font/google";
import { Nunito } from "next/font/google";
import { Oswald } from "next/font/google";
import { Merriweather } from "next/font/google";
import { Inter } from "next/font/google";
import { Outfit } from "next/font/google";
import { Source_Sans_3 } from "next/font/google";
import { Open_Sans } from "next/font/google";

const lato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: "400" });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: "400" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: "400" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", weight: "400" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: "400" });
const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-merriweather", weight: "400" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: "400" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: "400" });
const sourceSansPro = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans-pro", weight: "400" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", weight: "400" });

export const FONT_MAP = {
  "Lato": lato,
  "Roboto": roboto,
  "Montserrat": montserrat,
  "Poppins": poppins,
  "Nunito": nunito,
  "Oswald": oswald,
  "Merriweather": merriweather,
  "Inter": inter,
  "Outfit": outfit,
  "Source Sans Pro": sourceSansPro,
  "Open Sans": openSans,
};
