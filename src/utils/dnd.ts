/**
 * Drag-and-drop utilities for dream cards and interactive elements
 */

export interface DragItem {
  id: string;
  type: string;
  data: Record<string, any>;
}

export interface DropResult {
  x: number;
  y: number;
  item: DragItem;
}

export function setupDragAndDrop(
  draggableSelector: string,
  dropZoneSelector: string,
  onDrop: (result: DropResult) => void
): () => void {
  let draggedItem: DragItem | null = null;
  let dragSource: HTMLElement | null = null;

  const draggables = document.querySelectorAll(draggableSelector);
  const dropZones = document.querySelectorAll(dropZoneSelector);

  // Setup drag start on all draggable elements
  draggables.forEach((el) => {
    const element = el as HTMLElement;
    element.draggable = true;

    element.addEventListener("dragstart", (e) => {
      dragSource = element;
      const dragEvent = e as DragEvent;
      const itemData = element.dataset.item;
      if (itemData) {
        draggedItem = JSON.parse(itemData);
        if (dragEvent.dataTransfer) {
          dragEvent.dataTransfer.effectAllowed = "move";
          dragEvent.dataTransfer.setData("text/plain", itemData);
        }
      }
      element.style.opacity = "0.5";
    });

    element.addEventListener("dragend", () => {
      element.style.opacity = "1";
      draggedItem = null;
      dragSource = null;
    });
  });

  // Setup drop zones
  dropZones.forEach((zone) => {
    const dropZone = zone as HTMLElement;

    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      const dragEvent = e as DragEvent;
      if (dragEvent.dataTransfer) {
        dragEvent.dataTransfer.dropEffect = "move";
      }
      dropZone.style.borderColor = "#ff4b8b";
      dropZone.style.backgroundColor = "rgba(255, 182, 193, 0.1)";
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.style.borderColor = "transparent";
      dropZone.style.backgroundColor = "transparent";
    });

    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.style.borderColor = "transparent";
      dropZone.style.backgroundColor = "transparent";

      if (draggedItem) {
        const rect = dropZone.getBoundingClientRect();
        const dropEvent = e as DragEvent;
        const result: DropResult = {
          x: dropEvent.clientX - rect.left,
          y: dropEvent.clientY - rect.top,
          item: draggedItem,
        };
        onDrop(result);
      }
    });
  });

  // Cleanup function
  return () => {
    draggables.forEach((el) => {
      (el as HTMLElement).removeEventListener("dragstart", () => {});
      (el as HTMLElement).removeEventListener("dragend", () => {});
    });
    dropZones.forEach((zone) => {
      (zone as HTMLElement).removeEventListener("dragover", () => {});
      (zone as HTMLElement).removeEventListener("dragleave", () => {});
      (zone as HTMLElement).removeEventListener("drop", () => {});
    });
  };
}

// Touch-based drag for mobile
export function setupTouchDrag(
  draggableSelector: string,
  dropZoneSelector: string,
  onDrop: (result: DropResult) => void
): () => void {
  let draggedItem: DragItem | null = null;
  let dragSource: HTMLElement | null = null;
  let offsetX = 0;
  let offsetY = 0;

  const draggables = document.querySelectorAll(draggableSelector);
  const dropZones = document.querySelectorAll(dropZoneSelector);

  draggables.forEach((el) => {
    const element = el as HTMLElement;
    element.addEventListener("touchstart", (e) => {
      dragSource = element;
      const touch = e.touches[0];
      const rect = element.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;

      const itemData = element.dataset.item;
      if (itemData) {
        draggedItem = JSON.parse(itemData);
      }
      element.style.opacity = "0.5";
    });

    element.addEventListener("touchend", () => {
      if (dragSource) dragSource.style.opacity = "1";
      draggedItem = null;
      dragSource = null;
    });
  });

  dropZones.forEach((zone) => {
    const dropZone = zone as HTMLElement;
    dropZone.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });

    dropZone.addEventListener("touchend", (e) => {
      if (draggedItem) {
        const touch = e.changedTouches[0];
        const rect = dropZone.getBoundingClientRect();
        const result: DropResult = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
          item: draggedItem,
        };
        onDrop(result);
      }
    });
  });

  return () => {
    draggables.forEach((el) => {
      (el as HTMLElement).removeEventListener("touchstart", () => {});
      (el as HTMLElement).removeEventListener("touchend", () => {});
    });
    dropZones.forEach((zone) => {
      (zone as HTMLElement).removeEventListener("touchmove", () => {});
      (zone as HTMLElement).removeEventListener("touchend", () => {});
    });
  };
}
