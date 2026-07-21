const crypto=require('crypto');const fs=require('fs');const path=require('path');const config=require('../config');
function resolveKey(key){if(!/^[a-z0-9/_-]+\.(?:wav|vtt)$/.test(key))throw new Error('Invalid object key');const resolved=path.resolve(config.mediaStorageRoot,key);if(!resolved.startsWith(`${config.mediaStorageRoot}${path.sep}`))throw new Error('Object key escaped storage root');return resolved;}
async function ensureRoot(){await fs.promises.mkdir(config.mediaStorageRoot,{recursive:true,mode:0o700});await fs.promises.access(config.mediaStorageRoot,fs.constants.R_OK|fs.constants.W_OK);}
async function atomicWrite(key,data){const target=resolveKey(key);await fs.promises.mkdir(path.dirname(target),{recursive:true,mode:0o700});const temporary=`${target}.${crypto.randomUUID()}.partial`;try{await fs.promises.writeFile(temporary,data,{flag:'wx',mode:0o600});await fs.promises.rename(temporary,target);}catch(error){await fs.promises.rm(temporary,{force:true}).catch(()=>{});throw error;}return target;}
async function read(key){return fs.promises.readFile(resolveKey(key));}
async function remove(key){return fs.promises.rm(resolveKey(key),{force:true});}
function pathFor(key){return resolveKey(key);}
module.exports={atomicWrite,ensureRoot,pathFor,read,remove};
