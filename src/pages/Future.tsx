import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useCompliments } from "../context/ComplimentContext";
import { useSettings } from "../hooks/useSettings";
import { setupDragAndDrop, setupTouchDrag } from "../utils/dnd";
import { createSparkles, createHearts } from "../utils/sparkles";

const DREAMS = [
  { id: "trip", emoji: "✈️", title: "Dream Trip", description: "Adventure together" },
  { id: "home", emoji: "🏠", title: "Our Home", description: "Building our space" },
  { id: "wedding", emoji: "💍", title: "Forever", description: "Growing old together" },
  { id: "family", emoji: "👨‍👩‍👧", title: "Family", description: "Little ones" },
  { id: "goals", emoji: "🎯", title: "Goals", description: "Achieving dreams" },
  { id: "memories", emoji: "📸", title: "Memories", description: "Capture moments" },
];

export function Future() {
  const [droppedDreams, setDroppedDreams] = useLocalStorage<string[]>("dropped-dreams", []);
  const [animationActive, setAnimationActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { triggerCompliment } = useCompliments();
  const [settings] = useSettings();

  useEffect(() => {
    if (!containerRef.current || !dropZoneRef.current) return;

    const handleDrop = (result: any) => {
      const dreamId = result.item.id;
      if (!droppedDreams.includes(dreamId)) {
        setDroppedDreams([...droppedDreams, dreamId]);
        if (settings.animationsEnabled) {
          createSparkles(result.x + dropZoneRef.current!.offsetLeft, result.y + dropZoneRef.current!.offsetTop);
          createHearts(result.x + dropZoneRef.current!.offsetLeft, result.y + dropZoneRef.current!.offsetTop);
        }
        triggerCompliment();
        setAnimationActive(true);
        setTimeout(() => setAnimationActive(false), 1200);
      }
    };

    const cleanup1 = setupDragAndDrop(".dream-card", ".drop-zone", handleDrop);
    const cleanup2 = setupTouchDrag(".dream-card", ".drop-zone", handleDrop);

    return () => {
      cleanup1();
      cleanup2();
    };
  }, [droppedDreams, triggerCompliment, settings, setDroppedDreams]);

  const remainingDreams = DREAMS.filter(d => !droppedDreams.includes(d.id));

  return (
    <div className="future-page">
      <h1 className="page-title">Our Future Together</h1>
      <p className="page-subtitle">Drag your dreams to our shared vision</p>

      <div className="future-container">
        <div className="dreams-source" ref={containerRef}>
          <h2>Your Dreams</h2>
          <div className="dreams-grid">
            {remainingDreams.map(dream => (
              <div
                key={dream.id}
                className="dream-card"
                data-item={JSON.stringify({ id: dream.id, type: "dream" })}
                role="button"
                tabIndex={0}
                aria-label={`${dream.title}: ${dream.description}`}
              >
                <div className="dream-emoji">{dream.emoji}</div>
                <h3>{dream.title}</h3>
                <p>{dream.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="drop-zone"
          ref={dropZoneRef}
          role="region"
          aria-label="Our shared dreams - drop zone"
          aria-describedby="drop-instructions"
        >
          <div className="drop-zone-inner">
            <h2>Our Vision</h2>
            <div className="dreams-collected">
              {droppedDreams.length === 0 ? (
                <div className="empty-state">
                  <p id="drop-instructions">💭 Drop your dreams here</p>
                </div>
              ) : (
                <div className="collected-dreams">
                  {droppedDreams.map(dreamId => {
                    const dream = DREAMS.find(d => d.id === dreamId);
                    return (
                      <div key={dreamId} className="collected-dream">
                        {dream?.emoji}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <p className="dream-count">
              {droppedDreams.length} of {DREAMS.length} dreams shared
            </p>
          </div>
        </div>
      </div>

      <div className="dream-stats">
        <p className="completion-text">
          {droppedDreams.length === DREAMS.length
            ? "✨ Your future is complete!\n🌟 Keep dreaming together"
            : `🎯 Add ${DREAMS.length - droppedDreams.length} more dreams`}
        </p>
      </div>
    </div>
  );
}

export default Future;
