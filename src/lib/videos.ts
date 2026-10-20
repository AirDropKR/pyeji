// 공식 유튜브 채널 허용 목록. 영상은 이 목록의 채널만 넣을 수 있다
// 채널이 실제로 맞는지는 `npm run check:videos`(유튜브 oEmbed로 영상의 채널 주소 확인)로 검사한다
import channels from '../data/channels.json';

export interface Video {
  youtubeId: string;
  title: string;
  channel: string;
  startSeconds?: number;
}

export interface Channel {
  id: string;
  name: string;
  url: string;
  games: string[];
}

/** 영상의 채널 정보. 허용 목록에 없거나 다른 게임 채널이면 빌드를 멈춘다 */
export function channelFor(video: Video, gameId: string): Channel {
  const ch = (channels as Channel[]).find((c) => c.id === video.channel);
  if (!ch) throw new Error(`공식 채널 목록(src/data/channels.json)에 없는 채널: ${video.channel} (${video.youtubeId})`);
  if (!ch.games.includes(gameId)) throw new Error(`채널 ${ch.id}는 ${gameId} 공식 채널로 등록되어 있지 않음 (${video.youtubeId})`);
  return ch;
}
