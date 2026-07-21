const {AppError}=require('./errors');

function parseCanonicalWav(buffer,{maxBytes,maxDurationSeconds}){
  if(!Buffer.isBuffer(buffer)||buffer.length<44)throw new AppError('WAV file is truncated',422,'MEDIA_TRUNCATED');
  if(buffer.length>maxBytes)throw new AppError('Media file exceeds the configured size limit',413,'MEDIA_TOO_LARGE');
  if(buffer.toString('ascii',0,4)!=='RIFF'||buffer.toString('ascii',8,12)!=='WAVE')throw new AppError('Only RIFF/WAVE media is accepted',422,'MEDIA_FORMAT_UNSUPPORTED');
  if(buffer.readUInt32LE(4)+8!==buffer.length)throw new AppError('RIFF length does not match the uploaded object',422,'MEDIA_LENGTH_INVALID');
  let offset=12;let format;let data;
  while(offset+8<=buffer.length){
    const type=buffer.toString('ascii',offset,offset+4);const size=buffer.readUInt32LE(offset+4);const start=offset+8;const end=start+size;
    if(end>buffer.length)throw new AppError('WAV chunk exceeds the object boundary',422,'MEDIA_CHUNK_INVALID');
    if(type==='fmt '&&!format){if(size<16)throw new AppError('WAV format chunk is incomplete',422,'MEDIA_FORMAT_INVALID');format={audioFormat:buffer.readUInt16LE(start),channels:buffer.readUInt16LE(start+2),sampleRate:buffer.readUInt32LE(start+4),byteRate:buffer.readUInt32LE(start+8),blockAlign:buffer.readUInt16LE(start+12),bitDepth:buffer.readUInt16LE(start+14)};}
    if(type==='data'&&!data)data={start,size};
    offset=end+(size%2);
  }
  if(offset!==buffer.length||!format||!data)throw new AppError('WAV requires exactly bounded format and data chunks',422,'MEDIA_CHUNK_INVALID');
  if(format.audioFormat!==1||![1,2].includes(format.channels)||format.sampleRate<8000||format.sampleRate>48000||format.bitDepth!==16)throw new AppError('Only mono/stereo 16-bit PCM at 8-48 kHz is accepted',422,'MEDIA_ENCODING_UNSUPPORTED');
  const expectedBlock=format.channels*(format.bitDepth/8);const expectedRate=format.sampleRate*expectedBlock;
  if(format.blockAlign!==expectedBlock||format.byteRate!==expectedRate||data.size%expectedBlock!==0)throw new AppError('WAV PCM alignment metadata is inconsistent',422,'MEDIA_ALIGNMENT_INVALID');
  const durationMs=Math.round((data.size/expectedBlock/format.sampleRate)*1000);
  if(durationMs<100||durationMs>maxDurationSeconds*1000)throw new AppError(`Media duration must be 0.1-${maxDurationSeconds} seconds`,422,'MEDIA_DURATION_INVALID');
  return{sampleRateHz:format.sampleRate,channelCount:format.channels,bitDepth:format.bitDepth,durationMs,dataBytes:data.size};
}
module.exports={parseCanonicalWav};
