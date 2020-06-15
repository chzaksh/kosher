async function signIn() {

    const response = await fetch('http://localhost:3000/signin', {
        method: 'get'

    });
    console.log( response )
}

async function signUp() {

    const response = await fetch('http://localhost:3000/signup', {
        method: 'get'
    });
    console.log( response )

}





export {
    signIn,
    signUp
}