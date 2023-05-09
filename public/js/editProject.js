const params = new URLSearchParams(window.location.search);
const globalUid = params.get('uid');
console.log(globalUid);

async function getProjects(uid) {
    let url = 'http://localhost:3001/api/projects';
    
    if (uid) {
        url += `/${uid}`;
    }
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-expediente': '732931'      
        }
    });

    const data = await response.json();
    return data;
}

async function getProjectInfo(uid){
    const data = await getProjects(uid);
    let title = document.getElementById('title');
    let language = document.getElementById('language');
    let description = document.getElementById('description');
    let endDate = document.getElementById('end_date');
    let difficulty = document.getElementById('difficulty');

    title.value = data.title;
    language.value = data.language;
    description.value = data.description;
    endDate.value = data.endDate;
    difficulty.value = data.difficulty;

}

getProjectInfo(globalUid)