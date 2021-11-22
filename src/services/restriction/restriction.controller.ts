import { NextFunction, Request, Response } from "express";
import { Exception400, Exception404 } from "../../response/exceptions";
import { CreateRestrictionDTO, UpdateRestrictionDTO } from "./restriction.dto";
import Controller from "../controller";
import ScheduleModel from "../schedule/schedule.model";
import Restriction from "./restriction.entity";
import RestrictionModel from "./restriction.model";
import Schedule from "../schedule/schedule.entity";

class RestrictionController extends Controller {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next, Restriction, RestrictionModel);
    }

    /**
     * Create a new restriction.
     */
    public create = async () => {
        const regData: CreateRestrictionDTO = this.body;

        const data: Restriction = await this.proccessData(regData);

        const restriction = await (this.model as RestrictionModel).create(data);
        if ( !restriction ) throw new Exception400('Restriction not created.');
        
        this.success201(restriction, 'Successfully created.');
    }

    /**
     * Update a existing restriction.
     */
    public update = async () => {
        const { id } = this.params;
        const regData: UpdateRestrictionDTO = this.body;

        const data: Restriction = await this.proccessData(regData);

        // Get restriction record
        const restriction: Restriction = await (this.model as RestrictionModel).getOneRecordById(id) as Restriction;
        if ( !restriction ) throw new Exception404('Restriction not found');

        // Update restriction record
        const updatedRestriction = await (this.model as RestrictionModel).update(restriction, data);
        if ( !updatedRestriction ) throw new Exception400('Update failed.');

        this.success200(updatedRestriction, 'Successfully updated.');
    }
    
    /**
     * Get one restriction details by id.
     */
    public readOne = async () => {
        const { id } = this.params;

        const restriction: Restriction = await (this.model as RestrictionModel).getOneRecordById(id) as Restriction;
        if ( !restriction ) throw new Exception404('Restriction not found.');

        this.success200({ restriction }, 'Successfully fetched.');
    }
    
    /**
     * Get many restriction details with pagination
     */
    public readMany = async () => {
        const { order_by, order, page, size, query } = this.query;

        const result = await (this.model as RestrictionModel).getManyRecordsByPagination(order_by, order, page, size, query);
        if ( !result ) throw new Exception400('Something went wrong.');

        this.success200({ result }, 'Successfully fetched.');
    }

    /**
     * Delete a restriction by id.
     */
    public delete = async () => {
        const { id } = this.params;

        try {
            await (this.model as RestrictionModel).deleteRecordById(id);
        } catch (error) {
            throw new Exception400('Restriction delete failed.');
        }

        this.success200({ id }, 'Successfully deleted.');
    }

    /**
     * Proccess data before insertion || updation
     * @param restriction 
     * @returns 
     */
    private proccessData = async ( restriction: Restriction | CreateRestrictionDTO | UpdateRestrictionDTO | any ) => {
        if ( restriction.schedule_data ) {
            // Get user details
            const schedule: Schedule = await new ScheduleModel().getOneRecordById(restriction.schedule_data) as Schedule;
            if ( !schedule ) throw new Exception400('Cannot verify schedule_data.');

            delete restriction.schedule_data;
            restriction.scheduleId = schedule.id;
        }

        return restriction as Restriction;
    }
}

export default RestrictionController;