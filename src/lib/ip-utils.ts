// ip-utils.ts
import { IP2Location } from "ip2location-nodejs";

const ip2location = new IP2Location();
ip2location.open("./DB26.BIN");

export function getCountryFromIP(ip: string): string | null {
  try {
    const result = ip2location.getAll(ip);
    return result.countryLong || null;
  } catch (err) {
    console.error("IP2Location lookup failed:", err);
    return null;
  }
}
