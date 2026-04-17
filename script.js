// student list (26) for showList
const allStudents = [
    "Alyosha", "Amelie", "Andreas", "Annina", "Anastasia", "Ardita", "Daria", "Dominik", "Gian Reto", "Gianni",
    "Jannis", "Jesse", "Juliana", "Katja", "Lorena", "Loris", "Moritz", "Paula", "Pit", "Ronja",
    "Silvan", "Simon", "Sude", "Tam Gian", "Yannick", "Zahir"
]

// teacher list (23) for showList
const allTeachers = [
    "Anika", "Bosshart", "Castelberger", "Chenevard", "Dirks", "Frei", "Frischknecht", "Fritschi", "Graf", "Hofer (f.)",
    "Hofer (m.)", "Jack", "Kühnis", "Listemann", "Oehler", "Reuteler", "Rothenberger", "Schmidt", "Stronski", "Tscholl",
    "Weber", "Wyss", "Zesiger"
]

// student/teacher list (49) for loadMedia
const studteach = {
    five: { items: ["ango", "arna", "juma", "suba", "tang"], max: 5 },
    four: { items: ["aler", "amla", "giga", "gikn", "list", "oehl", "rojä", "tsch", "yala"], max: 4 },
    three: { items: ["aner", "anst", "dost", "jahu", "kawa", "lori", "pazw", "pisc", "sien", "sivo", "zask", "zesi"], max: 3 },
    two: { items: ["anik", "boss", "chen", "dapf", "frit", "graf", "hoff", "jest", "kühn", "lowo", "mobe", "reut", "schm", "webe", "wyss"], max: 2 },
    one: { items: ["cast", "dirk", "frei", "fris", "hofm", "jack", "roth", "stro"], max: 1 }
}

// bringing studteach items into one array and sort alphabetically
const allNames = Object.values(studteach).flatMap(g => g.items).sort();
const nameMax = {}
Object.values(studteach).forEach(group => {
    group.items.forEach(name => {
        nameMax[name] = group.max;
    });
});

// show/hide introduction text / rules (pop-up)
function showRules() {
    const container = document.querySelector(".div_regel");
    const overlay = document.querySelector(".black_overlay");
    container.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}

// darken one picture on click
function darken(element) {
    element.classList.toggle("black_filter");
}

// removes all dark filter over each pic and each highlight over each name
function darkReset() {
    const pics = document.querySelectorAll('[id^="pic_"], .highlight');
    pics.forEach(pic => {
        pic.classList.remove("black_filter", "highlight");
    });
}

// show/hide list of characters (pop-up)
function showList() {
    const container = document.querySelector(".div_list");
    const overlay = document.querySelector(".black_overlay");
    container.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    let wrapper = container.querySelector(".list_wrapper");
    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.className = "list_wrapper";
        wrapper.appendChild(createCol("Schüler", allStudents, "dynlisti"));
        wrapper.appendChild(createCol("Lehrperson", allTeachers, "dynlistu"));
        wrapper.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                e.target.classList.toggle("highlight");
            }
        })
        const anchor = container.querySelector(".button_zurück");
        container.insertBefore(wrapper, anchor);
    } else {
        wrapper.hidden = !wrapper.hidden;
    }
}

// helper function to create columns to fill with charachter names (showList)
function createCol(title, items, listClass) {
    const colu = document.createElement("div");
    colu.className = "list_column";
    const header = document.createElement("h3");
    header.textContent = title;
    header.className = "list_header";
    const ul = document.createElement("ul");
    ul.className = listClass;
    ul.innerHTML = items.map(item => `<li>${item}</li>`).join("");
    colu.append(header, ul);
    return colu;
};

// select one name and highlight that name
function randomChar() {
    if (document.querySelector(".highlight")) return;
    const randChar = allStudents.concat(allTeachers)[Math.floor(Math.random() * (allStudents.length + allTeachers.length))];
    const target = [...document.querySelectorAll(".list_wrapper li")].find(li => li.textContent === randChar);
    target?.classList.add("highlight");
}

// take picture from Cloudinary
function loadMedia() {
    const cloudName = "dnuk6xewd";
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;
    const screen = document.getElementById("screen");
    const fragment = document.createDocumentFragment();
    allNames.forEach(name => {
        const randVer = Math.floor(Math.random() * nameMax[name]) + 1;
        const pic = document.createElement("img");
        pic.id = `pic_${name}`;
        pic.alt = "¿Picture?";
        pic.src = `${baseUrl}${name}${randVer}.png`;
        pic.loading = "lazy";
        fragment.appendChild(pic);
    });
    screen.appendChild(fragment);
    screen.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            e.target.classList.toggle("black_filter");
        }
    });
};

window.onload = loadMedia;