import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";

const COMPLIMENTS = [
  "She deserves this much effort and more.",
  "You just made her future self smile.",
  "Her heart just got an extra warm hug.",
  "You're writing the cutest love story.",
  "This is the kind of love people dream of.",
  "She's lucky to have someone this thoughtful.",
  "Every moment with her is a gift.",
];

type Compliment = {
  id: number;
  text: string;
};

interface ComplimentContextValue {
  active: Compliment | null;
  triggerCompliment: () => void;
}

const ComplimentContext = createContext<ComplimentContextValue | null>(
  null
);

export function useCompliments() {
  const ctx = useContext(ComplimentContext);
  if (!ctx) throw new Error("ComplimentProvider missing");
  return ctx;
}

export function ComplimentProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Compliment | null>(null);
  const lastIndexRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const triggerCompliment = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    let idx = Math.floor(Math.random() * COMPLIMENTS.length);
    if (lastIndexRef.current !== null && COMPLIMENTS.length > 1) {
      if (idx === lastIndexRef.current) {
        idx = (idx + 1) % COMPLIMENTS.length;
      }
    }
    lastIndexRef.current = idx;
    const compliment: Compliment = {
      id: Date.now(),
      text: COMPLIMENTS[idx],
    };
    setActive(compliment);
    timeoutRef.current = window.setTimeout(() => {
      setActive(null);
    }, 3500);
  }, []);

  return (
    <ComplimentContext.Provider value={{ active, triggerCompliment }}>
      {children}
      <ComplimentToast compliment={active} />
    </ComplimentContext.Provider>
  );
}

function ComplimentToast({ compliment }: { compliment: Compliment | null }) {
  if (!compliment) return null;
  return (
    <div
      aria-live="polite"
      role="status"
      className="compliment-toast"
    >
      {compliment.text}
    </div>
  );
}
