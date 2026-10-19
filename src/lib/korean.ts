/** 마지막 글자에 받침이 있는지. 한글이 아니면 false */
export function hasBatchim(word: string): boolean {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

/** 단어 + 조사. 예: josa('리그', '과', '와') → '리그와', josa('시즌', '과', '와') → '시즌과' */
export function josa(word: string, withBatchim: string, withoutBatchim: string): string {
  return word + (hasBatchim(word) ? withBatchim : withoutBatchim);
}
