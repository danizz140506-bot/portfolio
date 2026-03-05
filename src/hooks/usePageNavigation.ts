"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface PageNavigationOptions {
    upRoute?: string;      // Route when scrolling up at top (previous page)
    downRoute?: string;    // Route when scrolling down at bottom (next page)
    threshold?: number;    // Scroll threshold in pixels
    minSwipe?: number;     // Minimum swipe distance for mobile
}

/**
 * Custom hook for scroll-based page navigation with "scroll through first" requirement.
 * 
 * The user must scroll through the page (reach the opposite end) before they can
 * navigate by scrolling at a boundary. This prevents accidental fast transitions.
 * 
 * For upward navigation: user must have scrolled DOWN to the bottom first.
 * For downward navigation: user must have scrolled UP to the top first.
 * 
 * For single-viewport pages (content fits in one screen), navigation is allowed
 * immediately since there's nothing to scroll through.
 */
export function usePageNavigation({
    upRoute,
    downRoute,
    threshold = 100,
    minSwipe = 80,
}: PageNavigationOptions) {
    const router = useRouter();
    const hasNavigatedUp = useRef(false);
    const hasNavigatedDown = useRef(false);

    // Track whether the user has scrolled through the page
    const hasReachedBottom = useRef(false);
    const hasReachedTop = useRef(true); // starts at top

    const touchStartY = useRef<number | null>(null);
    const touchStartX = useRef<number | null>(null);

    // Check if the page content fits within a single viewport
    const isSingleViewport = useCallback(() => {
        return document.documentElement.scrollHeight <= window.innerHeight + threshold;
    }, [threshold]);

    // Check scroll position boundaries
    const getScrollState = useCallback(() => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const isAtTop = scrollY <= threshold;
        const isAtBottom = windowHeight + scrollY >= documentHeight - threshold;
        return { isAtTop, isAtBottom };
    }, [threshold]);

    // Reset navigation flags on mount
    useEffect(() => {
        hasNavigatedUp.current = false;
        hasNavigatedDown.current = false;
        hasReachedBottom.current = false;
        hasReachedTop.current = true;
    }, []);

    // Track scroll position to know when user has reached top/bottom
    useEffect(() => {
        const handleScroll = () => {
            const { isAtTop, isAtBottom } = getScrollState();

            if (isAtTop) {
                hasReachedTop.current = true;
            }
            if (isAtBottom) {
                hasReachedBottom.current = true;
            }
        };

        // Check initial state (important for single-viewport pages)
        const { isAtTop, isAtBottom } = getScrollState();
        if (isAtTop) hasReachedTop.current = true;
        if (isAtBottom) hasReachedBottom.current = true;

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [getScrollState]);

    // Wheel-based navigation
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const { isAtTop, isAtBottom } = getScrollState();
            const singleViewport = isSingleViewport();

            // Scrolling down at bottom → navigate to next page
            if (e.deltaY > 0 && downRoute && !hasNavigatedDown.current && isAtBottom) {
                // Allow if: single-viewport page OR user has scrolled to top first
                if (singleViewport || hasReachedTop.current) {
                    hasNavigatedDown.current = true;
                    router.push(downRoute);
                    return;
                }
            }

            // Scrolling up at top → navigate to previous page
            if (e.deltaY < 0 && upRoute && !hasNavigatedUp.current && isAtTop) {
                // Allow if: single-viewport page OR user has scrolled to bottom first
                if (singleViewport || hasReachedBottom.current) {
                    hasNavigatedUp.current = true;
                    router.push(upRoute);
                    return;
                }
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [router, upRoute, downRoute, getScrollState, isSingleViewport]);

    // Touch-based navigation (mobile)
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (touchStartY.current === null) return;

            const deltaY = touchStartY.current - e.changedTouches[0].clientY;
            const deltaX = touchStartX.current !== null
                ? e.changedTouches[0].clientX - touchStartX.current
                : 0;

            // Only process vertical swipes (ignore horizontal swipes)
            if (Math.abs(deltaY) < minSwipe || Math.abs(deltaX) > Math.abs(deltaY)) {
                touchStartY.current = null;
                touchStartX.current = null;
                return;
            }

            const { isAtTop, isAtBottom } = getScrollState();

            // Swipe up (scroll down) at bottom → next page
            // No scroll-through requirement for touch — swiping is intentional
            if (deltaY > minSwipe && downRoute && !hasNavigatedDown.current && isAtBottom) {
                hasNavigatedDown.current = true;
                router.push(downRoute);
            }

            // Swipe down (scroll up) at top → previous page
            if (deltaY < -minSwipe && upRoute && !hasNavigatedUp.current && isAtTop) {
                hasNavigatedUp.current = true;
                router.push(upRoute);
            }

            touchStartY.current = null;
            touchStartX.current = null;
        };

        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [router, upRoute, downRoute, minSwipe, getScrollState, isSingleViewport]);

    return {
        touchStartX,
        touchStartY,
        hasReachedTop,
        hasReachedBottom,
    };
}
