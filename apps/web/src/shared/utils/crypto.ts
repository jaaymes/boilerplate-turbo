"use server";

import { jwtVerify, type JWTPayload } from "jose";

export interface Decrypter {
  decrypt(token: string): Promise<JWTPayload>;
}

function getSecret(): Uint8Array {
  // SSR: process.env, Client: window.NEXT_JWT_SECRET
  const secret =
    typeof window === "undefined"
      ? process.env.NEXT_JWT_SECRET
      : window.process.env.NEXT_JWT_SECRET;
  if (!secret) {
    throw new Error("NEXT_JWT_SECRET não definida.");
  }
  return new TextEncoder().encode(secret);
}

export async function decrypt(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}
