/*
const redirect_uri = process.env.NODE_ENV === 'production'
    ? 'http://aztra.inft.kr/auth'
    : 'http://localhost:3000/auth'
*/

const redirect_uri = `${window.location.origin}/auth`

console.log(redirect_uri)

const oauth = {
    discord_oauth2: `https://discord.com/api/oauth2/authorize?client_id=755654751777193996&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=identify%20guilds`,
    api_endpoint: "https://discord.com/api/v8"
};

export default oauth;