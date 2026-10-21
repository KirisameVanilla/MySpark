import assert from 'node:assert/strict'
import test from 'node:test'
import type { Tweet } from '@the-convocation/twitter-scraper'
import { tweetPhotos, coverPhotoInfo, coverPhoto, originalPost, parseCookies } from '../scripts/x-feed.ts'

const original = {
  id: '123', username: 'spark_barry', text: 'My post',
  timeParsed: new Date('2026-10-20T12:00:00Z'),
  photos: [], videos: [],
} as unknown as Tweet

test('publishes own original and quote posts, with canonical link and timestamp', () => {
  assert.equal(originalPost(original, 'SPARK_BARRY')?.url, 'https://x.com/SPARK_BARRY/status/123')
  assert.equal(originalPost({ ...original, isQuoted: true }, 'spark_barry')?.id, 'x-123')
  assert.equal(originalPost(original, 'spark_barry')?.date, '2026-10-20T12:00:00.000Z')
})
test('rejects replies, reposts, different/missing authors and incomplete posts', () => {
  for (const change of [
    { isReply: true }, { inReplyToStatusId: '12' }, { isRetweet: true },
    { retweetedStatusId: '12' }, { username: 'someone_else' },
    { username: undefined }, { id: undefined }, { timeParsed: undefined },
    { timeParsed: new Date('invalid') },
  ]) assert.equal(originalPost({ ...original, ...change }, 'spark_barry'), undefined)
})
test('parses cookie header and browser JSON without exposing their values', () => {
  assert.deepEqual(parseCookies('auth_token=example; ct0=csrf'), ['auth_token=example', 'ct0=csrf'])
  assert.deepEqual(parseCookies('[{"name":"ct0","value":"example"}]'), ['ct0=example; Domain=x.com; Path=/; Secure'])
  assert.throws(() => parseCookies('[invalid'))
})

test('quote cover falls back to the original photo, while preferring attached photos', () => {
  const quoted = { ...original, photos: [{ id: 'photo', url: 'https://pbs.twimg.com/original.jpg' }] } as Tweet
  const quote = { ...original, isQuoted: true, quotedStatus: quoted }
  assert.equal(coverPhoto(quote), 'https://pbs.twimg.com/original.jpg')
  assert.equal(coverPhoto({ ...quote, photos: [{ id: 'own', url: 'https://pbs.twimg.com/own.jpg' }] }), 'https://pbs.twimg.com/own.jpg')
  assert.equal(coverPhoto(original), undefined)
  assert.equal(originalPost(quote, 'spark_barry')?.text, 'My post')
  assert.equal(originalPost({ ...quote, isRetweet: true }, 'spark_barry'), undefined)
})
test('cover lookup handles nested quotes and circular data safely', () => {
  const circular = { ...original }
  circular.quotedStatus = circular
  assert.equal(coverPhoto(circular), undefined)
  assert.equal(coverPhoto({ ...original, quotedStatus: { ...original, quotedStatus: {
    ...original, photos: [{ id: 'nested', url: 'https://pbs.twimg.com/nested.jpg' }],
  } } }), 'https://pbs.twimg.com/nested.jpg')
})

test('marks only borrowed quote photos, including nested quotes', () => {
  const photo = { id: 'p', url: 'https://pbs.twimg.com/photo.jpg' }
  const quoted = { ...original, photos: [photo] }
  assert.deepEqual(coverPhotoInfo(quoted), { url: photo.url, fromQuote: false })
  assert.deepEqual(coverPhotoInfo({ ...original, quotedStatus: quoted }), { url: photo.url, fromQuote: true })
  assert.deepEqual(coverPhotoInfo({ ...quoted, quotedStatus: quoted }), { url: photo.url, fromQuote: false })
  assert.equal(coverPhotoInfo(original), undefined)
})

test('collects every photo with per-image quote attribution and deduplicates URLs', () => {
  const own = { id: 'own', url: 'https://pbs.twimg.com/own.jpg' }
  const photos = Array.from({ length: 4 }, (_, i) => ({ id: String(i), url: `https://pbs.twimg.com/quote-${i}.jpg` }))
  const quote = { ...original, photos: [own], quotedStatus: { ...original, photos: [...photos, own] } }
  assert.deepEqual(tweetPhotos(quote), [
    { url: own.url, fromQuote: false },
    ...photos.map((p) => ({ url: p.url, fromQuote: true })),
  ])
})
