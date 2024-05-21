import { FC, ReactNode, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";

interface IDraggable {
    id: string;
    children: ReactNode;
}

// Used for dragging a component on the website into the dropzone
export const Draggable: FC<IDraggable> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style = useMemo(() => {
        if (transform) {
            return {
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            };
        }
        return undefined;
    }, [transform]);

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
};