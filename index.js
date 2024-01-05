let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab-btn")
const ulEl = document.getElementById("ul-el")

if (JSON.parse(localStorage.getItem("myLeads"))) {
    myLeads = JSON.parse(localStorage.getItem("myLeads"))
    renderLinks(myLeads, ulEl)
}

function renderLinks(leads, htmlContainer) {
    htmlContainer.innerHTML = ""
    if (leads) {
        for (let i=0; i<leads.length; i++) {
            htmlContainer.innerHTML += `
                <li>
                    <a target="_blank" href="${leads[i]}">
                        ${leads[i]}
                    </a>
                </li>
            `
        }
    }
    console.log(localStorage)
}

inputBtn.addEventListener("click", function() {
    if (inputEl.value === "") return
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value = ""
    renderLinks(myLeads, ulEl)
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLinks(myLeads, ulEl)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    myLeads = []
    localStorage.clear()
    renderLinks(myLeads, ulEl)
})