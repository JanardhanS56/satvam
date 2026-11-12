import { gsap } from 'gsap';

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const safeGsap = {
  to(target, vars) {
    if (isReducedMotion()) {
      if (vars.onComplete) vars.onComplete();
      return gsap.set(target, { ...vars, duration: 0 });
    }
    return gsap.to(target, vars);
  },
  fromTo(target, fromVars, toVars) {
    if (isReducedMotion()) {
      if (toVars.onComplete) toVars.onComplete();
      return gsap.set(target, { ...toVars, duration: 0 });
    }
    return gsap.fromTo(target, fromVars, toVars);
  },
  timeline(vars = {}) {
    const tl = gsap.timeline(vars);
    if (isReducedMotion()) {
      tl.timeScale(100);
    }
    return tl;
  }
};

export { gsap };
export default gsap;
