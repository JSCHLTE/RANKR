"use client"

import React, { useEffect, useState } from 'react'
import { players } from "@/app/top400"
import { check } from '@/app/providers/posRanking/posRanking'
import Image from 'next/image'

import {
    DragDropContext,
    Droppable,
    Draggable,
  } from "@hello-pangea/dnd";

const Players = () => {

    const [playerList, setPlayerList] = useState(players)

    function downloadJSON() {
        const json = JSON.stringify(playerList, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = "myData.json";
        link.click();
        }

    function handleOnDragEnd(result) {
        if(!result.destination) return;

        const items = Array.from(playerList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedPlayers = items.map((player, index ) => ({
            ...player,
            order: index + 1
        }))

        setPlayerList(updatedPlayers);
        }

  return (
    <>
        <button onClick={downloadJSON}>Export</button>
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="players">
            {(provided) => (
            <div className='players-custom-wrapper flex'
            {...provided.droppableProps}
              ref={provided.innerRef}>
        {playerList.map((player, index) => (
            <Draggable
            key={player.full_name}
            draggableId={player.full_name}
            index={index}
            >
                {(provided, snapshot) => (
                <div className='player-item flex'
                ref={provided.innerRef}
                {...provided.draggableProps}
                style={{
                    height: "90px",
                    ...provided.draggableProps.style,
                    zIndex: snapshot.isDragging ? 1000 : 'auto',
                    position: snapshot.isDragging ? 'fixed' : 'static',
                }}
                >
                <div
                className='drag-handle-tab flex-center'
                {...provided.dragHandleProps}
            >
                <div className='lines-wrapper flex-center'>
                    <div className='line-drag'></div>
                    <div className='line-drag'></div>
                    <div className='line-drag'></div>
                </div>
            </div>
            <div className='player-item-all-wrapper flex'>
                <div className='player-item-img-wrapper'>
                        <img src={player.playerImg ? player.playerImg : "/images/player-default.webp"} onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'images/player-default.webp'
                        }}/>
                    </div>
                    <div className='player-item-info-wrapper'>
                        <div className='player-item-info-name'>
                        <p className='player-name'>{player.full_name}</p>
                        </div>
                        <div className='player-item-info-details flex'>
                        <span>Overall: {index + 1}</span>
                        <span className={`player-pos ${player.position}`}>{player.position} {check(playerList, player)}</span>
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
    </>
  )
}

export default Players