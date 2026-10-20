# 공유 미리보기 이미지(og:image)용 폰트 서브셋 생성
# 한글 2,350자(KS X 1001 완성형) + 영문·숫자·기본 기호만 남긴다. 결과는 src/assets/fonts/ 에 저장소로 넣는다
#
# 사용: python scripts/subset-fonts.py
# 필요: pip install fonttools  (사이트 빌드에는 필요 없음. 서브셋을 다시 만들 때만)
# 원본은 구글 폰트 공식 저장소(OFL)에서 받아 .cache/fonts/ 에 둔다 (저장소에 넣지 않음)
import urllib.request
from pathlib import Path
from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / '.cache' / 'fonts'
OUT = ROOT / 'src' / 'assets' / 'fonts'
BASE = 'https://raw.githubusercontent.com/google/fonts/main/ofl/'
FONTS = {
    'BlackHanSans-Regular.ttf': 'blackhansans/BlackHanSans-Regular.ttf',
    'IBMPlexSansKR-Regular.ttf': 'ibmplexsanskr/IBMPlexSansKR-Regular.ttf',
    'IBMPlexSansKR-Bold.ttf': 'ibmplexsanskr/IBMPlexSansKR-Bold.ttf',
}
LICENSES = {'OFL-BlackHanSans.txt': 'blackhansans/OFL.txt', 'OFL-IBMPlexSansKR.txt': 'ibmplexsanskr/OFL.txt'}

# 기본 기호: 날짜·시즌 이름·제목에 쓰이는 것
SYMBOLS = '·•‧–—―…‘’“”「」『』【】〈〉《》→←↑↓★☆○●◆◇□■△▲▽▼※~〜×÷°℃％％：；！？（）［］'


def charset() -> str:
    # EUC-KR로 인코딩되는 완성형 한글 = KS X 1001의 2,350자
    hangul = ''.join(chr(c) for c in range(0xAC00, 0xD7A4) if _euc(chr(c)))
    ascii_ = ''.join(chr(c) for c in range(0x20, 0x7F))
    return ascii_ + hangul + SYMBOLS


def _euc(ch: str) -> bool:
    # 완성형 한글 영역: 2바이트, 첫 바이트 0xB0~0xC8 (조합형 8바이트 표현은 제외)
    try:
        b = ch.encode('euc_kr')
    except UnicodeEncodeError:
        return False
    return len(b) == 2 and 0xB0 <= b[0] <= 0xC8


def fetch(name: str, rel: str, folder: Path) -> Path:
    folder.mkdir(parents=True, exist_ok=True)
    p = folder / name
    if not p.exists():
        urllib.request.urlretrieve(BASE + rel, p)
    return p


def main():
    chars = charset()
    hangul_count = sum(1 for c in chars if '가' <= c <= '힣')
    assert hangul_count == 2350, hangul_count
    OUT.mkdir(parents=True, exist_ok=True)
    for name, rel in FONTS.items():
        src = fetch(name, rel, CACHE)
        opts = subset.Options()
        opts.layout_features = ['*']
        opts.name_IDs = ['*']
        opts.notdef_outline = True
        opts.drop_tables += ['DSIG']
        font = subset.load_font(str(src), opts)
        sub = subset.Subsetter(opts)
        sub.populate(text=chars)
        sub.subset(font)
        out = OUT / name.replace('.ttf', '-subset.ttf')
        subset.save_font(font, str(out), opts)
        print(f'{out.relative_to(ROOT)}  {src.stat().st_size // 1024}KB -> {out.stat().st_size // 1024}KB')
    for name, rel in LICENSES.items():
        fetch(name, rel, OUT)
    (OUT / 'charset.txt').write_text(chars, encoding='utf-8')
    print(f'글자 {len(chars)}개 (한글 {hangul_count}자)')


if __name__ == '__main__':
    main()
