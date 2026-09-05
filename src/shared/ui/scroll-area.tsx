import {
  useEffect,
  useId,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib/cn';

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
  /** Содержимое кнопки "вверх". Получает scrollProgress [0..1]. */
  renderArrowUp?: (scrollProgress: number) => ReactNode;
  /** Содержимое кнопки "вниз". Получает scrollProgress [0..1]. */
  renderArrowDown?: (scrollProgress: number) => ReactNode;
  /** Декоративное содержимое внутри трека (рисуется ЗА ползунком). */
  renderTrackDecoration?: (scrollProgress: number) => ReactNode;
  /** Полностью заменяет содержимое ползунка. */
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
  const { t } = useTranslation();
  const contentId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);
  const dragCleanup = useRef<(() => void) | null>(null);

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
    const newThumbTop =
      maxScroll > 0 ? (scrollTop / maxScroll) * (trackHeight - newThumbHeight) : 0;

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

  // Снять слушатели перетаскивания, если компонент размонтируется во время drag.
  useEffect(() => () => dragCleanup.current?.(), []);

  const scrollBy = (delta: number) => {
    contentRef.current?.scrollBy({ top: delta, behavior: 'smooth' });
  };

  const scrollToRatio = (ratio: number) => {
    const content = contentRef.current;
    if (!content) return;
    const maxScroll = content.scrollHeight - content.clientHeight;
    content.scrollTo({ top: ratio * maxScroll, behavior: 'smooth' });
  };

  const handleTrackClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    scrollToRatio((e.clientY - rect.top) / track.clientHeight);
  };

  const handleTrackKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const content = contentRef.current;
    if (!content) return;
    const page = content.clientHeight * 0.9;
    switch (e.key) {
      case 'ArrowDown':
        scrollBy(scrollStep);
        break;
      case 'ArrowUp':
        scrollBy(-scrollStep);
        break;
      case 'PageDown':
        scrollBy(page);
        break;
      case 'PageUp':
        scrollBy(-page);
        break;
      case 'Home':
        scrollToRatio(0);
        break;
      case 'End':
        scrollToRatio(1);
        break;
      default:
        return;
    }
    e.preventDefault();
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
      content.scrollTop = Math.max(
        0,
        Math.min(maxScroll, dragStartScrollTop.current + scrollDelta)
      );
    };

    const cleanup = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', cleanup);
      dragCleanup.current = null;
    };

    dragCleanup.current = cleanup;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', cleanup);
  };

  const thumbStyle: CSSProperties = { top: thumbTop, height: thumbHeight };
  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      {/* Скроллируемый контент */}
      <div
        id={contentId}
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
          scrollbarClassName
        )}
      >
        {/* Стрелка вверх */}
        {showArrows && (
          <button
            type="button"
            onClick={() => scrollBy(-scrollStep)}
            aria-label={t('common.scrollUp')}
            tabIndex={-1}
            className={cn(
              'flex h-5 shrink-0 items-center justify-center rounded-t-sm',
              'bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              arrowClassName
            )}
          >
            {renderArrowUp ? renderArrowUp(scrollProgress) : <DefaultArrowUp />}
          </button>
        )}

        {/* Трек = scrollbar */}
        <div
          ref={trackRef}
          role="scrollbar"
          aria-orientation="vertical"
          aria-controls={contentId}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          aria-label={t('common.scrollbar')}
          tabIndex={isScrollable ? 0 : -1}
          onClick={handleTrackClick}
          onKeyDown={handleTrackKeyDown}
          className={cn(
            'relative flex-1 cursor-pointer bg-secondary focus-visible:outline-2 focus-visible:outline-primary',
            trackClassName
          )}
        >
          {/* Декорация трека (за ползунком) */}
          {renderTrackDecoration && (
            <div className="pointer-events-none absolute inset-0">
              {renderTrackDecoration(scrollProgress)}
            </div>
          )}

          {/* Ползунок */}
          <div
            aria-hidden="true"
            onMouseDown={handleThumbMouseDown}
            className={cn(
              'absolute inset-x-0 cursor-grab rounded-sm transition-colors active:cursor-grabbing',
              'bg-muted-foreground hover:bg-primary',
              thumbClassName
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
            aria-label={t('common.scrollDown')}
            tabIndex={-1}
            className={cn(
              'flex h-5 shrink-0 items-center justify-center rounded-b-sm',
              'bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              arrowClassName
            )}
          >
            {renderArrowDown ? renderArrowDown(scrollProgress) : <DefaultArrowDown />}
          </button>
        )}
      </div>
    </div>
  );
}
