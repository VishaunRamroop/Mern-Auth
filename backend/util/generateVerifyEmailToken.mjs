

export default function generateEmailVerificationToken(){

  const token = Math.floor(100000+Math.random()*900000)
return token;

}

console.log(generateEmailVerificationToken())