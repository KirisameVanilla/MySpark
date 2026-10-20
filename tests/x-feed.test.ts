import assert from 'node:assert/strict'
import test from 'node:test'
import type { Tweet } from '@the-convocation/twitter-scraper'
import { originalPost, parseCookies } from '../scripts/x-feed.ts'

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
