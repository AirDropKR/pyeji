// 시즌 상세 페이지의 제목·검색 설명·위쪽 한 줄. 검색어 역할에 맞춰 시즌 단계별로 데이터에서 만든다
// - 진행 중: "종료일" (endsAt 있으면 날짜, 다음 시즌과 함께 끝나면 그 날짜, 없으면 "공식 발표 전". 예상 날짜는 쓰지 않음)
// - 시작 전: "일정" (시작일 + 그 전에 있는 공개 일정. 리그 이름이 발표되면 name에 들어가 제목에도 자동으로 들어감)
// - 종료: 일정 정리
import type { CollectionEntry } from 'astro:content';
import { formatKst } from './time';
import { seasonDay, type Phase } from './seasons';

type Season = CollectionEntry<'seasons'>;

interface Input {
  season: Season;
  game: CollectionEntry<'games'>;
  phase: Phase;
  prev?: Season;
  next?: Season;
  /** 이 시즌에 연결된 이벤트 (시작순) */
  events: CollectionEntry<'events'>[];
  now: number;
}

export interface SeasonHead {
  title: string;
  description: string;
  /** 위쪽에 굵게 보일 한 줄 (진행 중 시즌의 종료일). 없으면 표시하지 않음 */
  lead?: { label: string; value: string; note?: string };
}

/** "11월 7일(토)"에서 요일을 뺀 짧은 날짜 */
const shortDay = (iso: string) => formatKst(iso, 'day').replace(/\(.\)$/, '');

export function seasonHead({ season, game, phase, prev, next, events, now }: Input): SeasonHead {
  const s = season.data;
  const g = game.data;
  const term = g.seasonTerm;
  const full = `${g.name} ${s.name}`;
  // 설명문 첫머리: 게임 이름(약칭) 시즌 이름
  const named = `${g.name}(${g.shortName}) ${s.name}`;
  const startText = formatKst(s.startsAt, s.timePrecision, true);
  const today = formatKst(new Date(now).toISOString(), 'day');

  if (phase === 'current') {
    const since = `한국 시간 ${startText} 시작, ${today} 기준 ${seasonDay(season, now)}일째.`;
    if (s.endsAt) {
      const end = formatKst(s.endsAt, 'exact');
      const nextText = next ? ` 다음 ${term} ${next.data.name} ${formatKst(next.data.startsAt, next.data.timePrecision)} ${next.data.status === 'estimated' ? '시작 예상' : '시작'}.` : '';
      return {
        title: `${full} 종료일: ${end}`,
        description: `${named} 종료일은 한국 시간 ${formatKst(s.endsAt, 'exact', true)}. ${since}${nextText}`,
        lead: { label: '종료', value: `${end} (한국 시간)` },
      };
    }
    if (s.endsWithNext && next && next.data.status === 'confirmed') {
      const day = formatKst(next.data.startsAt, 'day');
      return {
        title: `${full} 종료일: ${day} ${next.data.name} 때`,
        description: `${named} 종료일은 ${next.data.name} 시작일인 한국 시간 ${formatKst(next.data.startsAt, 'day', true)}. 종료 시각은 공식 발표 전. ${since}`,
        lead: { label: '종료', value: `${day} ${next.data.name} 때`, note: s.endNote ?? '종료 시각 공식 발표 전' },
      };
    }
    return {
      title: `${full} 종료일: 공식 발표 전`,
      description: `${named} 종료일은 아직 공식 발표 전. ${since}${s.endNote ? ` ${s.endNote}.` : ''}`,
      lead: { label: '종료일', value: '공식 발표 전', note: s.endNote },
    };
  }

  if (phase === 'upcoming') {
    // 이름에 "출시"가 있으면(정식 출시 (1.0)) "시작"을 붙이지 않는다 (startLabel과 같은 기준)
    const verb = s.name.includes('출시') ? (s.status === 'estimated' ? '예상' : '') : s.status === 'estimated' ? '시작 예상' : '시작';
    // 시작 전에 열리는 공개 일정 중 짧은 이름(label)이 있는 첫 번째
    const reveal = events.find((e) => e.data.label && Date.parse(e.data.startsAt) > now && Date.parse(e.data.startsAt) < Date.parse(s.startsAt));
    const revealText = reveal ? ` ${formatKst(reveal.data.startsAt, reveal.data.timePrecision)} ${reveal.data.title}.` : '';
    const prevEnd = prev?.data.endsAt ? ` 직전 ${term} ${prev.data.name} 종료 ${formatKst(prev.data.endsAt, 'exact')}.` : '';
    return {
      title: `${g.shortName} ${s.name} 일정: ${formatKst(s.startsAt, 'day')}${verb ? ` ${verb}` : ''}${reveal ? `, ${shortDay(reveal.data.startsAt)} ${reveal.data.label}` : ''}`,
      description: `${named} ${term} 시작일은 한국 시간 ${startText}${s.status === 'estimated' ? ' 예상' : ''}${s.timePrecision === 'day' ? ', 시각 발표 전' : ''}.${revealText}${prevEnd} 주요 일정과 공식 출처.`,
    };
  }

  return {
    title: `${g.shortName} ${s.name} ${term === '리그' ? '리그(시즌) ' : ''}일정 · ${g.name}`,
    description: `${full}${s.nameEn ? `(${s.nameEn})` : ''} 한국 시간 ${startText} 시작. ${term} 일정, 주요 일정, 공식 출처.`,
  };
}
