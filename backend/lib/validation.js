const {AppError}=require('./errors');
function text(value,name,{min=1,max=255,optional=false}={}){if(optional&&(value===undefined||value===null||value===''))return null;if(typeof value!=='string')throw new AppError(`${name} is required`,422,'VALIDATION_ERROR');const result=value.trim();if(result.length<min||result.length>max)throw new AppError(`${name} must be ${min}-${max} characters`,422,'VALIDATION_ERROR');return result;}
function email(value){const result=text(value,'email',{min:3,max:255}).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result))throw new AppError('Email is invalid',422,'VALIDATION_ERROR');return result;}
function language(value){const result=text(value,'language',{min:2,max:20});if(!/^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(result))throw new AppError('language must be a BCP-47-style tag',422,'VALIDATION_ERROR');return result;}
function id(value){const result=Number(value);if(!Number.isSafeInteger(result)||result<1)throw new AppError('Resource identifier is invalid',400,'ID_INVALID');return result;}
module.exports={email,id,language,text};
