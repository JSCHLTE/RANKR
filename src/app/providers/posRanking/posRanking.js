export const check = (players, player) => {
    if (player?.position) {
      const truth = players.filter(i => i.position === player.position).findIndex(item => item.full_name === player.full_name)
      return truth + 1
    }
    return null;
  };