"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface PageNavigationOptions {
    upRoute?: string;      // Route when scrolling up at top (previous page)
    downRoute?: string;    // Route when scrolling down at bottom (next page)
    threshold?: number;    // Scroll threshold in pixels
}

/**
 * Custom hook for scroll-based page navigation (desktop only).
 * 
 * Uses mouse wheel for page navigation with "scroll through first" requirement.
 * Touch/swipe navigation is disabled — mobile/tablet users navigate via the navbar.
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
}: PageNavigationOptions) {
    const router = useRouter();
    const hasNavigatedUp = useRef(false);
    const hasNavigatedDown = useRef(false);

    // Track whether the user has scrolled through the page
    const hasReachedBottom = useRef(false);
    const hasReachedTop = useRef(true); // starts at top

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

    // Wheel-based navigation (desktop only)
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const { isAtTop, isAtBottom } = getScrollState();
            const singleViewport = isSingleViewport();

            // Scrolling down at bottom → navigate to next page
            if (e.deltaY > 0 && downRoute && !hasNavigatedDown.current && isAtBottom) {
                if (singleViewport || hasReachedTop.current) {
                    hasNavigatedDown.current = true;
                    router.push(downRoute);
                    return;
                }
            }

            // Scrolling up at top → navigate to previous page
            if (e.deltaY < 0 && upRoute && !hasNavigatedUp.current && isAtTop) {
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
}
