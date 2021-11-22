import Route from "../types/route";
import restrictionRoutes from "./restriction/restriction.routes";
import scheduleRoutes from "./schedule/schedule.routes";
import userRoutes from "./users/users.routes";

const allRotes: Route[] = [
    ...userRoutes,
    ...scheduleRoutes,
    ...restrictionRoutes,
]

export default allRotes;