import React, { useEffect } from 'react';
import './AnimationPlayer.css';

/**
 * Props for the AnimationPlayer component.
 * @type {Object}
 * @property {'challenge'|'success'} type - Type of animation to display.
 * @property {string} asset - Filename of the SVG asset located in /assets/animations.
 * @property {string} [moduleName] - Name of the module.
 * @property {string} [levelName] - Name of the level.
 * @property {string} [storySegment] - Narrative/story text of the challenge.
 * @property {() => void} [onEnd] - Optional callback invoked after the animation duration.
 */
export const AnimationPlayer: React.FC<{
  type: 'challenge' | 'success';
  asset: string;
  moduleName?: string;
  levelName?: string;
  storySegment?: string;
  onEnd?: () => void;
}> = ({ type, asset, moduleName, levelName, storySegment, onEnd }) => {
  
  // Trigger callback after 9.5s for challenge (to allow reading), 5s for success
  useEffect(() => {
    const duration = type === 'challenge' ? 9500 : 6000;
    const timer = setTimeout(() => {
      if (onEnd) onEnd();
    }, duration);
    return () => clearTimeout(timer);
  }, [onEnd, type]);

  const hasStory = !!storySegment;

  return (
    <div className={`anim-player ${type}`}>
      <div className={`anim-container ${hasStory ? 'with-story' : ''}`}>
        
        {/* Animated Icon Block */}
        <div className="anim-media-block">
          <img
            src={`/assets/animations/${asset}`}
            alt={`${type} animation`}
            className="anim-svg"
            loading="eager"
          />
        </div>

        {/* 3D Star Wars Style Crawl Text Block */}
        {hasStory && (
          <div className="anim-story-block animate-slideIn">
            <div className="crawl-container">
              <div className="crawl-content">
                <div className="crawl-module-header">{moduleName}</div>
                <div className="crawl-level-title">{levelName}</div>
                <div className="crawl-separator">========================</div>
                <p className="crawl-narrative">{storySegment}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button className="anim-skip-btn animate-fadeIn" onClick={onEnd}>
        PULAR INTERLÚDIO ➔
      </button>
    </div>
  );
};
