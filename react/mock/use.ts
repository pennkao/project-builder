// mock/user.ts
import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: '/api/users',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: [
                    { id: 1, name: 'Alice' },
                    { id: 2, name: 'Bob' },
                ],
            };
        },
    },
    {
        url: '/api/user',
        method: 'post',
        response: ({ body }) => {
            return {
                code: 200,
                data: { id: 3, ...body },
            };
        },
    },
] as MockMethod[];
