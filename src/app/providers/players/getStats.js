import { ref, get } from "firebase/database";
import { db } from "../../firebase";

export const getStats = async (playerId) => {
    const statsRef = ref(db, `stats/${playerId}`);

    try {
        const snapshot = await get(statsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const statsArray = Array.isArray(data)
            ? data
            : Object.values(data);

          console.log(statsArray[0][2023], " look at this one")
          return statsArray;
        } else {
          console.log("No player data available");
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
}