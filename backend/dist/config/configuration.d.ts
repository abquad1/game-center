import * as Joi from 'joi';
export declare const envValidationSchema: Joi.ObjectSchema<any>;
declare const _default: () => {
    nodeEnv: string | undefined;
    port: number;
    database: {
        uri: string | undefined;
    };
    jwt: {
        secret: string | undefined;
        expiresIn: string | undefined;
    };
    appUrl: string | undefined;
};
export default _default;
