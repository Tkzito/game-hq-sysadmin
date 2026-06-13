import React, { useEffect } from 'react';
import './AnimationPlayer.css';

/**
 * Props for the AnimationPlayer component.
 * @type {Object}
 * @property {'challenge'|'success'} type - Type of animation to display.
 * @property {string} asset - Filename of the SVG asset located in /assets/animations.
 * @property {() => void} [onEnd] - Optional callback invoked after the animation duration.
 */
export const AnimationPlayer: React.FC<{type: 'challenge' | 'success'; asset: string; onEnd?: () => void}> = ({type, asset, onEnd}) => {
  // Trigger callback after 2 seconds (duration matches CSS animation length)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onEnd) onEnd();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <div className={`anim-player ${type}`}>
      <img
        src={`/assets/animations/${asset}`}
        alt={`${type} animation`}
        className="anim-svg"
        loading="eager"
      />
    </div>
  );
};
