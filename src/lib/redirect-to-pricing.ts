import { redirect } from "next/navigation";

function queryString(params: Record<string, string | string[] | undefined>): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") qs.set(key, value);
    else if (Array.isArray(value)) {
      for (const item of value) qs.append(key, item);
    }
  }
  const encoded = qs.toString();
  return encoded ? `?${encoded}` : "";
}

export function redirectToPricing(
  params: Record<string, string | string[] | undefined>,
): never {
  redirect(`/${queryString(params)}#pricing`);
}
