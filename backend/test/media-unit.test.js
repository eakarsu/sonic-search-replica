const assert = require('node:assert/strict');
const test = require('node:test');
const { parseCanonicalWav } = require('../lib/wav');
const { generateVtt, timestamp } = require('../lib/captions');

function wav({ seconds = 1, sampleRate = 8000, channels = 1, bits = 16, audioFormat = 1, declaredDataBytes, trailing = 0 } = {}) {
  const blockAlign = channels * (bits / 8);
  const dataBytes = declaredDataBytes ?? Math.floor(seconds * sampleRate * blockAlign);
  const buffer = Buffer.alloc(44 + dataBytes + trailing);
  buffer.write('RIFF', 0); buffer.writeUInt32LE(buffer.length - 8, 4); buffer.write('WAVE', 8);
  buffer.write('fmt ', 12); buffer.writeUInt32LE(16, 16); buffer.writeUInt16LE(audioFormat, 20);
  buffer.writeUInt16LE(channels, 22); buffer.writeUInt32LE(sampleRate, 24); buffer.writeUInt32LE(sampleRate * blockAlign, 28);
  buffer.writeUInt16LE(blockAlign, 32); buffer.writeUInt16LE(bits, 34); buffer.write('data', 36); buffer.writeUInt32LE(dataBytes, 40);
  return buffer;
}

const limits = { maxBytes: 200000, maxDurationSeconds: 10 };

test('canonical PCM WAV metadata is derived from bounded bytes', () => {
  assert.deepEqual(parseCanonicalWav(wav(), limits), { sampleRateHz: 8000, channelCount: 1, bitDepth: 16, durationMs: 1000, dataBytes: 16000 });
});

test('malformed, misleading, and unsupported WAV files fail closed', () => {
  const wrongSignature = wav(); wrongSignature.write('NOPE', 0);
  const wrongRiffLength = wav(); wrongRiffLength.writeUInt32LE(20, 4);
  const overflowChunk = wav(); overflowChunk.writeUInt32LE(999999, 40);
  const missingData = wav(); missingData.write('JUNK', 36);
  for (const input of [Buffer.alloc(10), wrongSignature, wrongRiffLength, overflowChunk, missingData, wav({ bits: 24 }), wav({ audioFormat: 3 }), wav({ channels: 3 }), wav({ sampleRate: 96000 }), wav({ declaredDataBytes: 3 })]) {
    assert.throws(() => parseCanonicalWav(input, limits), (error) => error.status === 422 && /^MEDIA_/.test(error.code));
  }
});

test('WAV byte and duration limits are enforced', () => {
  assert.throws(() => parseCanonicalWav(wav(), { ...limits, maxBytes: 1000 }), (error) => error.status === 413 && error.code === 'MEDIA_TOO_LARGE');
  assert.throws(() => parseCanonicalWav(wav({ seconds: 0.05 }), limits), (error) => error.code === 'MEDIA_DURATION_INVALID');
  assert.throws(() => parseCanonicalWav(wav({ seconds: 2 }), { ...limits, maxDurationSeconds: 1 }), (error) => error.code === 'MEDIA_DURATION_INVALID');
});

test('WebVTT captions are bounded, escaped, and cover the media duration', () => {
  const output = generateVtt(`First cue --> ${'word '.repeat(40)}\u0001final`, 3000).toString('utf8');
  assert.match(output, /^WEBVTT\n/); assert.match(output, /Transcript provenance: HUMAN_SUPPLIED/);
  assert.doesNotMatch(output, /\u0001|First cue -->/); assert.match(output, /00:00:03\.000/);
  const cueLines = output.split('\n').filter((line) => line && !line.includes('-->') && !/^\d+$/.test(line) && line !== 'WEBVTT' && !line.startsWith('NOTE'));
  assert.ok(cueLines.every((line) => line.length <= 84));
  assert.equal(timestamp(3723004), '01:02:03.004');
});

module.exports = { wav };
