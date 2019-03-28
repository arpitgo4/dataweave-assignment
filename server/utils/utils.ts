

const UUIDv4_REG_EXP = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const isValidUUIDv4 = (uuidStr: string) => UUIDv4_REG_EXP.test(uuidStr);

export const getUnixTimeStamp = () => Math.floor(new Date().getTime() / 1000);


function test() {

}
