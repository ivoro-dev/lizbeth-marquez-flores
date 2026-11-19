/** Coordinates the preloader and the cover entrance. */
export const INTRO_DONE_EVENT = "intro:done";
export const INTRO_SEEN_KEY = "lmf-intro-seen";

export function isIntroDone() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.dataset.introDone === "true"
  );
}

export function markIntroDone() {
  if (isIntroDone()) return;
  document.documentElement.dataset.introDone = "true";
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

/** Runs cb once the intro has finished (immediately if it already has). */
export function onIntroDone(cb: () => void) {
  if (isIntroDone()) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_DONE_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_DONE_EVENT, cb);
}
