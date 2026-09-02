/** 看板の書き文字を活字で再構成したロゴタイプ */
export function Logo({
  size = 'md',
  tone = 'sumi',
}: {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'sumi' | 'paper';
}) {
  const scale =
    size === 'sm'
      ? { sub: 'text-[0.52rem]', main: 'text-[1.12rem]' }
      : size === 'lg'
        ? { sub: 'text-[0.72rem]', main: 'text-[2rem]' }
        : { sub: 'text-[0.6rem]', main: 'text-[1.4rem]' };
  const color = tone === 'paper' ? 'text-paper' : 'text-sumi';

  return (
    <span className={`flex flex-col leading-none ${color}`}>
      <span
        className={`font-gothic ${scale.sub} tracking-[0.3em] ${
          tone === 'paper' ? 'text-paper/70' : 'text-sumi-3'
        }`}
      >
        おいしい寄り道
      </span>
      <span className={`font-mincho ${scale.main} mt-1.5 tracking-[0.14em]`}>ヤング軒</span>
    </span>
  );
}
