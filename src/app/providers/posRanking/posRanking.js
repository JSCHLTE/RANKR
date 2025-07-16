export const check = (playerList, player) => {
  console.log(playerList)
    if (player?.position) {
      const truth = playerList?.filter(i => i.position === player.position).findIndex(item => item.full_name === player.full_name)
      return truth + 1
    }
    return null;
  };