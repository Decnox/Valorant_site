

let api_URL_agents = "https://valorant-api.com/v1/agents";
const body = document.querySelector("body")
function get_agents(){
    fetch(api_URL_agents)
    .then(response => response.json())
    .then(data=>{
        const agents = data.data
        agents.forEach(agent=>{
            const option = document.createElement("option")
            option.textContent = agent.displayName
            option.value = agent.uuid
            option.onclick = get_agent_infos()
            const select = document.querySelector("select")
            select.appendChild(option)
        })
    });

}

function get_agent_infos(){
    let agent_uuid = document.querySelector("select").value
    if(agent_uuid === ""){
        console.log("no agent selected")
    }
    else{
        fetch(api_URL_agents+"/"+agent_uuid)
        .then(response=>response.json())
        .then(data=>{
            const agent = data.data
            console.log(api_URL_agents+"/"+agent_uuid)
            const name = agent.displayName
            const agent_name = document.querySelector("#name_agent")
            agent_name.innerHTML = name
            const agent_icon = agent.displayIcon
            const agent_img = document.querySelector("#agent_img")
            agent_img.src = agent_icon
            const img_role = document.getElementById("img_role")
            const role_img_value = agent.role.displayIcon
            img_role.src = role_img_value
        }
        )
    }
}

