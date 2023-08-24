
export default async function fetchPosts(){
    const response = await fetch(`https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A/posts`);
    const {data} = await response.json();
    const P = data.posts;
    return P;

}    