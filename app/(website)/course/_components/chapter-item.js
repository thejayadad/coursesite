'use client'
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import clsx from 'clsx';
import { FiGrid } from 'react-icons/fi';
import { Badge } from '@nextui-org/react';
import { FaPencilAlt } from 'react-icons/fa';


const ChapterItem = ({ items, onReorder, onEdit }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    if (!isMounted) {
        return null;
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        const updatedChapters = Array.from(chapters);
        const [removed] = updatedChapters.splice(startIndex, 1);
        updatedChapters.splice(endIndex, 0, removed);

        setChapters(updatedChapters);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='chapters'>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable
                                key={chapter.id}
                                draggableId={chapter.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div className='flex'>
                                <div 
    className={clsx(
        'flex items-center gap-x-2 border text-primary rounded-md mb-4 text-sm px-4 py-2 w-full',
        {
            'bg-slate-200 border-slate-200': !chapter.isPublished,
            'bg-green-200 border-green-200': chapter.isPublished,
        }
    )}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
>
    <FiGrid className="mr-4" />
    {chapter.title}
    
    <div className='ml-auto flex items-center gap-x-6'>
        {chapter.isFree && (
            <Badge>
                Free
            </Badge>
        )}

        <div className='flex items-center gap-x-6'>
            <Badge color='primary'>
                {chapter.isPublished ? "Published" : "Draft"}
            </Badge>
            
            <FaPencilAlt
                onClick={() => onEdit(chapter.id)}
                className='w-4 h-4 cursor-pointer hover:opacity-75 transition'
            />
        </div>
    </div>
</div>

                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ChapterItem;
