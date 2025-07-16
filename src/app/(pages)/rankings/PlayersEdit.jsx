"use client";

import { check } from "@/app/providers/posRanking/posRanking"; // If needed elsewhere
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PlayerItem from "./PlayerItem"; // Adjust path as needed
import Loading from "@/app/components/loading/Loading";

const PlayersEdit = ({ playerList, setPlayerList }) => {
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(playerList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedPlayers = items.map((player, index) => ({
      ...player,
      order: index + 1
    }));

    setPlayerList(updatedPlayers);
  }

  if(!playerList) return <Loading />

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="players">
        {(provided) => (
          <div 
            className="players-custom-wrapper flex"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {playerList.map((player, index) => (
              <Draggable
                key={player.full_name}
                draggableId={player.full_name}
                index={index}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <PlayerItem
                      player={player}
                      overallRank={index + 1}
                      dragHandleProps={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      playerList={playerList}
                    />
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

export default PlayersEdit;