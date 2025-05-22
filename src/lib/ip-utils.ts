import { IP2Location } from "ip2location-nodejs";
import path from "path";
import fs from "fs";

const ip2location = new IP2Location();
const dbPath = path.join(process.cwd(), 'public', 'IP2LOCATION-LITE-DB1.IPV6.BIN');
ip2location.open(dbPath);

export function getCountryFromIP(ip: string): string | null {
  try {
    const result = ip2location.getAll(ip);
    return result.countryLong;
  } catch (err) {
    console.error("IP2Location lookup failed:", err);
    return null;
  }
}
