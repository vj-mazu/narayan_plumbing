import { useCallback, useRef } from 'react';

/**
 * Reusable horizontal scroll behaviour for service rows.
 * - Exposes `scrollBy(direction)` for prev/next scroll buttons.
 * - Supports drag-to-scroll with pointer events.
 * - Tracks whether a drag happened so card clicks are not triggered
 *   after a user finished dragging.
 */
export function useHorizontalScroll() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const scrollBy = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>('.quick-help-photo-card')?.offsetWidth ?? 240;
    const amount = Math.max(cardWidth + 24, el.clientWidth * 0.8);
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    const state = dragState.current;
    if (!el || !state.dragging) return;
    const dx = e.clientX - state.startX;
    if (Math.abs(dx) > 6) state.moved = true;
    el.scrollLeft = state.startScrollLeft - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (el && dragState.current.dragging) {
      el.releasePointerCapture?.(e.pointerId);
    }
    dragState.current.dragging = false;
  };

  /** Call inside card onClick: returns true when the click was actually a drag. */
  const wasDragged = () => dragState.current.moved;

  return { trackRef, scrollBy, onPointerDown, onPointerMove, endDrag, wasDragged };
}
