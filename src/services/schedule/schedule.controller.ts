import { NextFunction, Request, Response } from "express";
import { Exception400, Exception404 } from "../../response/exceptions";
import Controller from "../controller";
import User from "../users/users.entity";
import UserModel from "../users/users.model";
import { CreateScheduleDTO, UpdateScheduleDTO } from "./schedule.dto";
import Schedule from "./schedule.entity";
import ScheduleModel from "./schedule.model";

class ScheduleController extends Controller {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next, Schedule, ScheduleModel);
    }

    /**
     * Create a new schedule.
     */
    public create = async () => {
        const regData: CreateScheduleDTO = this.body;

        const data: Schedule = await this.proccessData(regData);

        const schedule = await (this.model as ScheduleModel).create(data);
        if ( !schedule ) throw new Exception400('Schedule not created.');
        
        this.success201(schedule, 'Successfully created.');
    }

    /**
     * Update a existing schedule.
     */
    public update = async () => {
        const { id } = this.params;
        const regData: UpdateScheduleDTO = this.body;

        const data: Schedule = await this.proccessData(regData);

        // Get schedule record
        const schedule: Schedule = await (this.model as ScheduleModel).getOneRecordById(id) as Schedule;
        if ( !schedule ) throw new Exception404('Schedule not found');

        // Update schedule record
        const updatedSchedule = await (this.model as ScheduleModel).update(schedule, data);
        if ( !updatedSchedule ) throw new Exception400('Update failed.');

        this.success200(updatedSchedule, 'Successfully updated.');
    }
    
    /**
     * Get one schedule details by id.
     */
    public readOne = async () => {
        const { id } = this.params;

        const schedule: Schedule = await (this.model as ScheduleModel).getOneRecordById(id) as Schedule;
        if ( !schedule ) throw new Exception404('Schedule not found.');

        this.success200({ schedule }, 'Successfully fetched.');
    }
    
    /**
     * Get many schedule details with pagination
     */
    public readMany = async () => {
        const { order_by, order, page, size } = this.query;

        const result = await (this.model as ScheduleModel).getManyRecordsByPagination(order_by, order, page, size);
        if ( !result ) throw new Exception400('Something went wrong.');

        this.success200({ result }, 'Successfully fetched.');
    }

    public readManyForUser = async () => {
        const { uid } = this.params;
        const { order_by, order, page, size } = this.query;

        const result = await (this.model as ScheduleModel).getManyRecordsByPaginationForUser(uid, order_by, order, page, size);
        if ( !result ) throw new Exception400('Something went wrong.');

        this.success200({ result }, 'Successfully fetched.');
    }

    /**
     * Delete a schedule by id.
     */
    public delete = async () => {
        const { id } = this.params;

        try {
            await (this.model as ScheduleModel).deleteRecordById(id);
        } catch (error) {
            throw new Exception400('Schedule delete failed.');
        }

        this.success200({ id }, 'Successfully deleted.');
    }

    /**
     * Proccess data before insertion || updation
     * @param schedule 
     * @returns 
     */
    private proccessData = async ( schedule: Schedule | CreateScheduleDTO | UpdateScheduleDTO | any ) => {

        if ( schedule.start && schedule.end && false ) {
            const scheduleData = await (this.model as ScheduleModel).verifyNoOverlaps(schedule);
            if ( scheduleData ) throw new Exception400('Already has some ');
        }

        if ( schedule.user_data ) {

            // Verify user data
            const user: User = await new UserModel().getOneRecordById(schedule.user_data) as User;
            if ( !user ) throw new Exception400('Cannot verify user_data.');

            schedule.userId = schedule.user_data;
            delete schedule.user_data;
        }

        return schedule as Schedule;
    }
}

export default ScheduleController;