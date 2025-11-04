const memberData = "wdd231/wdd231/data/members.json";
const cards = document.querySelector('#cards');

async function getMemberData() {
    const response = await fetch(memberData);
    const data = await response.json();
    console.table(data.members);

}

getMemberData();