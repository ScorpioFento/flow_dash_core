import * as bcrypt from 'bcrypt';

function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

function comparePassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

async function passwordRemover(data : any) : Promise<any> {
  console.log("data....", data)
  const {password , ...res} = data;
  return res;
}

export { hashPassword, comparePassword, passwordRemover };
