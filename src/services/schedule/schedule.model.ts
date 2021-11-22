import Model from "../model";
import Schedule from "./schedule.entity";

class ScheduleModel extends Model {
    constructor() {
        super(Schedule);
    }

    /**
     * Create a new schedule
     * @param schedule object with all the required fields of Schedule entity of the application 
     * @returns an object with newly created record including ObjectId on success
     */
    public create = async (schedule: Schedule) => {
        return await this.manager.save(this.manager.create(this.entity, schedule));
    }

    /**
     * Updates an existing schedule records by merging new data with existing once.
     * @param schedule current existing record
     * @param updates updates that needs to be done
     * @returns returns updated schedule object on success
     */
    public update = async (schedule: Schedule, updates: Schedule) => {
        return await this.manager.save(this.manager.merge(this.entity, schedule, { ...updates, updated_at: this.currentTimestamp }));
    }

    /**
     * Get many schedule records by pagination and search
     * @param order_by specify the field which should be used for ordering
     * @param order specify the order [ "ASC" | "DESC" ]
     * @param page specify the page number
     * @param size specify the page size
     * @param query specify search query for [ "name", "email" ] field
     * @returns list of schedule records
     */
    public getManyRecordsByPagination = async (order_by: string, order: string, page: number, size: number, query: string) => {
        const searchQuery = (query) ? { where: { name: {'$regex' : `${query}`, '$options' : 'i'}}} : {}
        return await this.manager.find(this.entity, {
            ...this.paginationOptions(order_by, order, page, size),
            ...searchQuery
        });
    }

    /**
     * Get one schedule record by id
     * @param id specify the record id of the schedule
     * @returns gives the user details with specified id
     */
    public getOneRecordById = async (id: string) => {
        return await this.manager.findOne(this.entity, id);
    }

    /**
     * Delete a schedule record by id
     * @param id specify the record is of the schedule
     * @returns delete effected row counts and acknowledgement
     */
    public deleteRecordById = async (id: string) => {
        return await this.manager.delete(this.entity, id);
    }
}

export default ScheduleModel;