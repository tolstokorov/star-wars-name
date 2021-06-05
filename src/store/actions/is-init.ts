const INIT = 'INIT';

type InitAction = {
    type: typeof INIT
};

const init = (): InitAction => ({
    type: INIT
});
type Init = typeof init; 

export type {
    InitAction,
    Init,
};
export {
    INIT
};
export default init;