import Model from "../model";
import Restriction from "./restriction.entity";

class RestrictionModel extends Model {
    constructor() {
        super(Restriction);
    }

    /**
     * Create a new restriction
     * @param restriction object with all the required fields of Restriction entity of the application 
     * @returns an object with newly created record including ObjectId on success
     */
    public create = async (restriction: Restriction) => {
        return await this.manager.save(this.manager.create(this.entity, restriction));
    }

    /**
     * Updates an existing restriction records by merging new data with existing once.
     * @param restriction current existing record
     * @param updates updates that needs to be done
     * @returns returns updated restriction object on success
     */
    public update = async (restriction: Restriction, updates: Restriction) => {
        return await this.manager.save(this.manager.merge(this.entity, restriction, { ...updates, updated_at: this.currentTimestamp }));
    }

    /**
     * Get many restrictions by pagination and search
     * @param order_by specify the field which should be used for ordering
     * @param order specify the order [ "ASC" | "DESC" ]
     * @param page specify the page number
     * @param size specify the page size
     * @param query specify search query for [ "name", "email"] field
     * @returns list of restriction records
     */
    public getManyRecordsByPagination = async (order_by: string, order: string, page: number, size: number, query: string) => {
        const searchQuery = (query) ? { where: { name: {'$regex' : `${query}`, '$options' : 'i'}}} : {}
        return await this.manager.find(this.entity, {
            ...this.paginationOptions(order_by, order, page, size),
            ...searchQuery
        });
    }

    /**
     * Get one restriction record by id 
     * @param id specify the record id of the restriction
     * @returns gives the user details with specified id
     */
    public getOneRecordById = async (id: string) => {
        return await this.manager.findOne(this.entity, id);
    }
    
    /**
     * Delete a restriction record by id
     * @param id specify the record is of the restriction
     * @returns delete effected row counts and acknowledgement
     */
    public deleteRecordById = async (id: string) => {
        return await this.manager.delete(this.entity, id);
    }
}

export default RestrictionModel;