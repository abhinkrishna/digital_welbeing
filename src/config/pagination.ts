import dotenv from 'dotenv';
import Pagination from "../types/pagination";

dotenv.config();

const defaultPagination: Pagination = {
    sort_by: process.env.DEFAULT_PAGINATION_COLUMN ?? 'id',
    sort: process.env.DEFAULT_PAGINATION_DIRECTION ?? 'DESC',
    page: 1,
    size: Number(process.env.DEFAULT_PAGINATION_LIMIT),

}

export default defaultPagination;