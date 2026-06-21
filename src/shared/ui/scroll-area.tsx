import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { cn } from '@/shared/lib/utils';

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;

  // --- Стили через className ---
  /** Класс для колонки скроллбара целиком */
  scrollbarClassName?: string;
  /** Класс для дорожки (трека) */
  trackClassName?: string;
  /** Класс для ползунка (thumb) */
  thumbClassName?: string;
  /** Класс для кнопок-стрелок */
  arrowClassName?: string;

  // --- Render-пропсы для полной замены визуала ---
  /**
   * Содержимое кнопки "вверх".
   * Получает scrollProgress [0..1] — можно анимировать.
   */
  renderArrowUp?: (scrollProgress: number) => ReactNode;
  /**
   * Содержимое кнопки "вниз".
   * Получает scrollProgress [0..1].
   */
  renderArrowDown?: (scrollProgress: number) => ReactNode;
  /**
   * Декоративное содержимое внутри трека (рисуется ЗА ползунком).
   * Получает scrollProgress [0..1] — можно анимировать.
   */
  renderTrackDecoration?: (scrollProgress: number) => ReactNode;
  /**
   * Полностью заменяет содержимое ползунка.
   * style с top/height передаётся на обёртку автоматически.
   */
  renderThumb?: () => ReactNode;

  // --- Поведение ---
  /** Показывать кнопки-стрелки (дефолт: true) */
  showArrows?: boolean;
  /** Шаг прокрутки при клике на стрелку (px, дефолт: 48) */
  scrollStep?: number;
}

function DefaultArrowUp() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
      <path d="M4 1L7.5 6.5H0.5L4 1Z" />
    </svg>
  );
}

function DefaultArrowDown() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
      <path d="M4 7L0.5 1.5H7.5L4 7Z" />
    </svg>
  );
}

export function ScrollArea({
  children,
  className,
  scrollbarClassName,
  trackClassName,
  thumbClassName,
  arrowClassName,
  renderArrowUp,
  renderArrowDown,
  renderTrackDecoration,
  renderThumb,
  showArrows = true,
  scrollStep = 48,
}: ScrollAreaProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

  const updateThumb = useCallback(() => {
    const content = contentRef.current;
    const track = trackRef.current;
    if (!content || !track) return;

    const { scrollTop, scrollHeight, clientHeight } = content;
    const trackHeight = track.clientHeight;
    const scrollable = scrollHeight > clientHeight + 1;

    setIsScrollable(scrollable);
    if (!scrollable) return;

    const maxScroll = scrollHeight - clientHeight;
    const newThumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 24);
    const newThumbTop = maxScroll > 0
      ? (scrollTop / maxScroll) * (trackHeight - newThumbHeight)
      : 0;

    setThumbHeight(newThumbHeight);
    setThumbTop(newThumbTop);
    setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    updateThumb();
    content.addEventListener('scroll', updateThumb, { passive: true });

    const ro = new ResizeObserver(updateThumb);
    ro.observe(content);

    return () => {
      content.removeEventListener('scroll', updateThumb);
      ro.disconnect();
    };
  }, [updateThumb]);

  const scrollBy = (delta: number) => {
    contentRef.current?.scrollBy({ top: delta, behavior: 'smooth' });
  };

  const handleTrackClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const content = contentRef.current;
    if (!track || !content) return;
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / track.clientHeight;
    const maxScroll = content.scrollHeight - content.clientHeight;
    content.scrollTo({ top: ratio * maxScroll, behavior: 'smooth' });
  };

  const handleThumbMouseDown = (e: ReactMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragStartScrollTop.current = contentRef.current?.scrollTop ?? 0;

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current || !contentRef.current || !trackRef.current) return;
      const content = contentRef.current;
      const track = trackRef.current;
      const { scrollHeight, clientHeight } = content;
      const maxScroll = scrollHeight - clientHeight;
      const scrollDelta =
        ((ev.clientY - dragStartY.current) / (track.clientHeight - thumbHeight)) * maxScroll;
      content.scrollTop = Math.max(0, Math.min(maxScroll, dragStartScrollTop.current + scrollDelta));
    };

    const onMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const thumbStyle: CSSProperties = { top: thumbTop, height: thumbHeight };

  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      {/* Скроллируемый контент */}
      <div
        ref={contentRef}
        className="min-h-0 flex-1 overflow-y-scroll scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* Скроллбар */}
      <div
        className={cn(
          'flex w-2.5 flex-col transition-opacity',
          isScrollable ? 'opacity-100' : 'pointer-events-none opacity-0',
          scrollbarClassName,
        )}
      >
        {/* Стрелка вверх */}
        {showArrows && (
          <button
            type="button"
            onClick={() => scrollBy(-scrollStep)}
            aria-label="Прокрутить вверх"
            className={cn(
              'flex h-5 shrink-0 items-center justify-center rounded-t-sm',
              'bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              arrowClassName,
            )}
          >
            {renderArrowUp ? renderArrowUp(scrollProgress) : <DefaultArrowUp />}
          </button>
        )}

        {/* Трек */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className={cn('relative flex-1 cursor-pointer bg-secondary', trackClassName)}
        >
          {/* Декорация трека (за ползунком) */}
          {renderTrackDecoration && (
            <div className="pointer-events-none absolute inset-0">
              {renderTrackDecoration(scrollProgress)}
            </div>
          )}

          {/* Ползунок */}
          <div
            onMouseDown={handleThumbMouseDown}
            className={cn(
              'absolute inset-x-0 cursor-grab rounded-sm transition-colors active:cursor-grabbing',
              'bg-muted-foreground hover:bg-primary',
              thumbClassName,
            )}
            style={thumbStyle}
          >
            {renderThumb?.()}
          </div>
        </div>

        {/* Стрелка вниз */}
        {showArrows && (
          <button
            type="button"
            onClick={() => scrollBy(scrollStep)}
            aria-label="Прокрутить вниз"
            className={cn(
              'flex h-5 shrink-0 items-center justify-center rounded-b-sm',
              'bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              arrowClassName,
            )}
          >
            {renderArrowDown ? renderArrowDown(scrollProgress) : <DefaultArrowDown />}
          </button>
        )}
      </div>
    </div>
  );
}
