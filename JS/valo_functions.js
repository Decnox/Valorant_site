let api_URL_agents = "https://valorant-api.com/v1/agents";
const body = document.querySelector("body")
function get_agents(){
    fetch(api_URL_agents)
    .then(response => response.json())
    .then(data=>{
        const agents = data.data
        const value_select = document.querySelectorAll("option").length
        const select = document.querySelector("select")
        if (value_select<2){
            agents.forEach(agent=>{
                if(agent.isPlayableCharacter === true){
                    const option = document.createElement("option")
                    option.textContent = agent.displayName
                    option.value = agent.uuid
                    select.appendChild(option)
                }
            })
        }
        else{
            console.log("list already done")
        }
    });

}

function get_agent_infos(){
    let agent_uuid = document.querySelector("select").value
    console.log("BIP "+agent_uuid)
    if(agent_uuid === ""){
        console.log("no agent selected showing last selected agent")
    }
    else{
        fetch(api_URL_agents+"/"+agent_uuid)
        .then(response=>response.json())
        .then(data=>{
            const agent = data.data
            if(document.querySelector("#agent") !== null){
                const name_agent = document.querySelector("h1")
                const value_name_agent = agent.displayName
                name_agent.innerHTML = value_name_agent

                const image_agent = document.querySelector("#image_agent")
                const value_image_agent = agent.displayIcon
                image_agent.src = value_image_agent

                const image_role = document.querySelector("#image_role")
                const value_image_role = agent.role.displayIcon
                image_role.src = value_image_role

                const role_name = document.querySelector("h3")
                const value_role_name = agent.role.displayName
                role_name.innerHTML = value_role_name

                const agent_description = document.querySelector("#description_agent")
                const value_agent_description = agent.description
                agent_description.innerHTML = value_agent_description

                const agent_abilities = agent.abilities
                const previous_abilities_div = document.querySelectorAll(".ability")

                for(let i = 0; i<agent_abilities.length; i++){
                    if(i+1 > previous_abilities_div.length){
                        const ability_div = document.querySelector("#abilites_div")
                        create_abilitiy(agent_abilities[i], ability_div)
                    }
                    else{
                        change_abilities(agent_abilities[i], previous_abilities_div[i])
                    }
                }
                console.log("previous="+previous_abilities_div.length+" current="+agent_abilities.length)
                if(previous_abilities_div.length > agent_abilities.length){
                    console.log("BOUH")
                    const abilities_div = document.querySelector("#abilites_div")
                    abilities_div.removeChild(previous_abilities_div[previous_abilities_div.length-1])
                }
            }
            else{
                // Creating main div for agent informations
                const agent_div = document.createElement("div")
                agent_div.setAttribute('id', 'agent')
                const body = document.querySelector("body")
                body.appendChild(agent_div)

                // creating name agent part
                const name_agent = document.createElement("h1")
                const value_name_agent = agent.displayName
                name_agent.innerHTML = value_name_agent
                agent_div.appendChild(name_agent)

                // creating image of agent
                const image_agent = document.createElement("img")
                image_agent.setAttribute('id', 'image_agent')
                const value_image_agent = agent.displayIcon
                image_agent.src = value_image_agent
                agent_div.appendChild(image_agent)

                // Creating role infos part
                const role_div = document.createElement('div')
                role_div.setAttribute('id', 'role_agent_div')
                agent_div.appendChild(role_div)

                const image_role = document.createElement("img")
                image_role.setAttribute('id','image_role')
                const value_image_role = agent.role.displayIcon
                image_role.src = value_image_role
                role_div.appendChild(image_role)

                const role_name = document.createElement("h3")
                const value_role_name = agent.role.displayName
                role_name.innerHTML = value_role_name
                role_div.appendChild(role_name)

                const description = document.createElement("p")
                description.setAttribute("id", "description_agent")
                const value_description = agent.description
                description.innerHTML = value_description
                agent_div.appendChild(description)

                const abilities_div = document.createElement("div")
                abilities_div.setAttribute("id", "abilites_div")
                body.appendChild(abilities_div)

                const abilities = agent.abilities
                abilities.forEach(ability=>{
                    create_abilitiy(ability, abilities_div)
                })
            }
        }
        )
    }
}

function create_abilitiy(ability, abilities_div){
    const ability_div = document.createElement("div")
    ability_div.setAttribute("class", "ability")
    abilities_div.appendChild(ability_div)

    const left_part = document.createElement("div")
    left_part.setAttribute("class", "ability_left")
    ability_div.appendChild(left_part)

    const value_ability_icon = ability.displayIcon
    if(value_ability_icon){
        const ability_icon = document.createElement("img")
        ability_icon.setAttribute("class", "ability_icon")
        ability_icon.src = value_ability_icon
        left_part.appendChild(ability_icon)
    }
    const ability_name = document.createElement("h3")
    const value_ability_name = ability.displayName
    ability_name.innerHTML = value_ability_name
    left_part.appendChild(ability_name)
    
    const right_part = document.createElement("div")
    right_part.setAttribute("class", "ability_rigth")
    ability_div.appendChild(right_part)

    const ability_desc = document.createElement("p")
    ability_desc.setAttribute("class", "ability_desc")
    const value_ability_desc = ability.description
    ability_desc.innerHTML = value_ability_desc
    right_part.appendChild(ability_desc)
}

function change_abilities(agent_ability, previous_ability_div){
    const left_part = previous_ability_div.querySelector(".ability_left")
    let ability_icon = previous_ability_div.querySelector(".ability_icon")
    console.log(ability_icon)
    const value_ability_icon = agent_ability.displayIcon
    if(agent_ability.displayIcon !== null && ability_icon === null){
        ability_icon = document.createElement("img")
        ability_icon.setAttribute("class", "ability_icon")
        ability_icon.src = value_ability_icon
        left_part.insertBefore(ability_icon, left_part.children[0])
    }
    else if(agent_ability.displayIcon === null && ability_icon === null){
        console.log("no image for this ability")
    }
    else{
        ability_icon.src = ""
        ability_icon.src = value_ability_icon
    }

    const ability_name = previous_ability_div.querySelector("h3")
    const value_ability_name = agent_ability.displayName
    ability_name.innerHTML = value_ability_name

    const ability_desc = previous_ability_div.querySelector(".ability_desc")
    const value_ability_desc = agent_ability.description
    ability_desc.innerHTML = value_ability_desc
}

