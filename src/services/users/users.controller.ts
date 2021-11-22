import { NextFunction, Request, Response } from "express";
import { Exception400, Exception404 } from "../../response/exceptions";
import Controller from "../controller";
import User from "./users.entity";
import UserModel from "./users.model";

class UserController extends Controller {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next, User, UserModel);
    }

    /**
     * Create a new user.
     */
    public create = async () => {
        const data = this.body;

        const user = await (this.model as UserModel).create(data as User);
        if ( !user ) throw new Exception400('User not created.');
        
        this.success201(user, 'Successfully created.');
    }

    /**
     * Update a existing user.
     */
    public update = async () => {
        const { id } = this.params;
        const data = this.body;
        let updatedUser;

        // Get user record
        const user: User = await (this.model as UserModel).getOneRecordById(id) as User;
        if ( !user ) throw new Exception404('User not found');

        // Update user record
        try {
            updatedUser = await (this.model as UserModel).update(user, data);
        } catch (error) {
            throw new Exception400('Update failed.');
        }

        this.success200(updatedUser, 'Successfully updated.');
    }
    
    /**
     * Get one user details by id.
     */
    public readOne = async () => {
        const { id } = this.params;

        const user: User = await (this.model as UserModel).getOneRecordById(id) as User;
        if ( !user ) throw new Exception404('User not found.');

        this.success200({ user }, 'Successfully fetched.');
    }
    
    /**
     * Get many user details with pagination
     */
    public readMany = async () => {
        const { order_by, order, page, size, query } = this.query;

        const result = await (this.model as UserModel).getManyRecordsByPagination(order_by, order, page, size, query);
        if ( !result ) throw new Exception400('Something went wrong.');

        this.success200({ result }, 'Successfully fetched.');
    }

    /**
     * Delete a user by id.
     */
    public delete = async () => {
        const { id } = this.params;

        try {
            await (this.model as UserModel).deleteRecordById(id);
        } catch (error) {
            throw new Exception400('User delete failed.');
        }

        this.success200({ id }, 'Successfully deleted.');
    }
}

export default UserController;