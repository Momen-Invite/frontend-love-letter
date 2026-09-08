import "@testing-library/jest-dom/vitest";

// Mock IntersectionObserver untuk animasi scroll di JSDOM
class MockIntersectionObserver {
  observe = () => null;
  unobserve = () => null;
  disconnect = () => null;
  constructor(callback: IntersectionObserverCallback) {
    setTimeout(() => {
      callback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
          } as unknown as IntersectionObserverEntry,
        ],
        this as unknown as IntersectionObserver
      );
    }, 0);
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});
