import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv"
config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"],
    synchronize: false,
    logging: true,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;