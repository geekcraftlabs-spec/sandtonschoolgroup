import crypto from "crypto";

/**
 * Generates a PayFast MD5 signature.
 * Exactly matches PayFast's official PHP implementation.
 */
export function generatePayFastSignature(
  data: Record<string, string | number>,
  passphrase: string = ""
): string {
  // 1. Sort keys alphabetically
  const keys = Object.keys(data).sort();

  // 2. Build query string with URL-encoded values
  let pfOutput = "";
  for (const key of keys) {
    const value = data[key];
    if (value !== undefined && value !== null && value !== "") {
      pfOutput += `${key}=${encodeURIComponent(value.toString().trim())}&`;
    }
  }
  // 3. Remove trailing '&'
  pfOutput = pfOutput.slice(0, -1);

  // 4. Append passphrase if set (and non-empty)
  if (passphrase && passphrase.trim() !== "") {
    pfOutput += `&passphrase=${encodeURIComponent(passphrase.trim())}`;
  }

  // 5. Debug: log the full signature string (remove in production)
  console.log("🔑 FULL SIGNATURE STRING:", pfOutput);

  // 6. Generate MD5 hash
  return crypto.createHash("md5").update(pfOutput).digest("hex");
}

/**
 * Determines the correct PayFast action URL based on environment.
 */
export function getPayFastActionUrl(): string {
  const testMode = process.env.PAYFAST_TEST_MODE !== "false";

  if (testMode) {
    return process.env.NEXT_PUBLIC_PAYFAST_SANDBOX_URL || "https://sandbox.payfast.co.za/eng/process";
  }

  return process.env.NEXT_PUBLIC_PAYFAST_LIVE_URL || "https://www.payfast.co.za/eng/process";
}

/**
 * Gets the PayFast query URL for server-to-server verification.
 */
export function getPayFastQueryUrl(): string {
  const testMode = process.env.PAYFAST_TEST_MODE !== "false";

  if (testMode) {
    return process.env.PAYFAST_SANDBOX_QUERY_URL || "https://sandbox.payfast.co.za/eng/query";
  }

  return process.env.PAYFAST_LIVE_QUERY_URL || "https://www.payfast.co.za/eng/query";
}