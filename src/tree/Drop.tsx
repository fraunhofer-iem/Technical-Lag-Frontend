import { FC, ReactNode, useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";

interface IDroppable {
    id: string;
    children: ReactNode;
}

// Used for dropping a component on the website into the dropzone
export const Droppable: FC<IDroppable> = ({ id, children }) => {
    const { isOver, setNodeRef } = useDroppable({ id });

    const style = useMemo(
        () => ({
            opacity: isOver? 0.5 : 1,
        }),
        [isOver]
    );

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
};