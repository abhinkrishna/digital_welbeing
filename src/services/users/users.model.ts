import Model from "../model";
import User from "./users.entity";

class UserModel extends Model {
    constructor() {
        super(User);
    }

    /**
     * Create a new user
     * @param user object with all the required fields of User entity of the application
     * @returns an object with newly created record including ObjectId on success
     */
    public create = async (user: User) => {
        return await this.manager.save(this.manager.create(this.entity, user));
    }

    /**
     * Updates an existing user records by merging new data with existing once.
     * @param user current existing record
     * @param updates updates that needs to be done
     * @returns returns updated user object on success
     */
    public update = async (user: User, updates: User) => {
        return await this.manager.save(this.manager.merge(this.entity, user, { ...updates, updated_at: this.currentTimestamp }));
    }

    /**
     * Get many user records by pagination and search 
     * @param order_by specify the field which should be used for ordering
     * @param order specify the order [ "ASC" | "DESC" ]
     * @param page specify the page number
     * @param size specify the page size
     * @param query specify search query for [ "name", "email" ] field
     * @returns list of user records
     */
    public getManyRecordsByPagination = async (order_by: string, order: string, page: number, size: number, query: string) => {
        const searchQuery = (query) ? { where: this.mongoOr({ name: this.mongoSearchQuery(query) }, { email: this.mongoSearchQuery(query) }) } : {}
        return await this.manager.find(this.entity, {
            ...this.paginationOptions(order_by, order, page, size),
            ...searchQuery
        });
    }

    /**
     * Get one user record by id
     * @param id specify the record id of the user
     * @returns gives the user details with specified id
     */
    public getOneRecordById = async (id: string) => {
        return await this.manager.findOne(this.entity, id);
    }

    /**
     * Delete a user record by id
     * @param id specify the record is of the user
     * @returns delete effected row counts and acknowledgement
     */
    public deleteRecordById = async (id: string) => {
        return await this.manager.delete(this.entity, id);
    }
}

export default UserModel;