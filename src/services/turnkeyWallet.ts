/* eslint-disable @typescript-eslint/no-explicit-any */
import { VersionedTransaction } from '../vendor/solana-web3.js';

const BASE='https://mqaukdsnpfdetwhaguyu.supabase.co/functions/v1/turnkey-wallet';
let tokenGetter:(()=>Promise<string|null>)|null=null;
export function setTurnkeyAccessTokenGetter(getter:()=>Promise<string|null>){tokenGetter=getter}
async function call(path:string,body:Record<string,unknown>={},method='POST'){const token=await tokenGetter?.();if(!token)throw new Error('Passkey session unavailable');const r=await fetch(`${BASE}/${path.replace(/^\//,'')}`,{method,headers:{'content-type':'application/json',authorization:`Bearer ${token}`},body:method==='GET'?undefined:JSON.stringify(body)});const d=await r.json().catch(()=>({}));if(!r.ok||d.ok===false)throw new Error(d.error||d.message||`Wallet request failed (${r.status})`);return d}
export async function getTurnkeyWallet(){const d=await call('api/turnkey/wallet');return d.wallet?.address&&d.wallet?.privateKeyId?d.wallet:null}
export async function createTurnkeyWallet(){const d=await call('api/turnkey/create-embedded-wallet');return d.wallet?.address&&d.wallet?.privateKeyId?d.wallet:null}
export async function signTurnkeyTransaction(tx:VersionedTransaction,privateKeyId:string){const d=await call('api/turnkey/sign-transaction',{signWith:privateKeyId,unsignedTransaction:Buffer.from(tx.serialize()).toString('hex')});const raw=String(d.signedTransaction||'').replace(/^0x/,'');const bytes=/^[0-9a-f]+$/i.test(raw)?Uint8Array.from(Buffer.from(raw,'hex')):Uint8Array.from(atob(raw),c=>c.charCodeAt(0));return VersionedTransaction.deserialize(bytes)}
export async function exportTurnkeyWallet(address:string){// @ts-expect-error Browser-only remote ESM is resolved by Vite at runtime.
const crypto=await import(/* @vite-ignore */'https://esm.sh/@turnkey/crypto@2.3.1?bundle') as any;const keys=crypto.generateP256KeyPair();const d=await call('api/turnkey/export-wallet-account',{address,targetPublicKey:keys.publicKeyUncompressed});return crypto.decryptExportBundle({exportBundle:d.exportBundle,embeddedKey:keys.privateKey,organizationId:d.organizationId,keyFormat:'SOLANA',returnMnemonic:false})}
export function addressOf(wallet:any){return String(wallet?.address||'')}
