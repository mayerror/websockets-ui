import createAnswer from "../utils/createAnswer";
import type Room from "../utils/room";

function updateRoom(roomes: Room[]): string {
  if (roomes.length > 0) {
    const availableRoomes = roomes
      .filter((room) => room.players.length < 2)
      .map((room) => {
        return {
          roomId: room.id,
          roomUsers: room.players.map((player) => {
            return {
              name: player.name,
              index: player.id
            };
          })
        };
      });
    return createAnswer("update_room", availableRoomes);
  }
  return "";
}

export default updateRoom;
