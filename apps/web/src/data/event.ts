import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import axios from "axios";

export const getEventById = async (id:number) =>{
    try {
        let url = NEXT_PUBLIC_BASE_API_URL + `/events/${id}`;
        const response = await axios.get(url);
        console.log(response.data.result[0]);
        return(response.data.result[0]);
      } catch (err) {
        console.log("Error fetching event data:", err);
      }
}
