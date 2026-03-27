const allStudents = [
    "Alyosha", "Amelie", "Andreas", "Annina", "Anastasia", "Ardita", "Daria", "Dominik", "Gian Reto", "Gianni",
    "Jannis", "Jesse", "Juliana", "Katja", "Lorena", "Loris", "Moritz", "Paula", "Pit", "Ronja",
    "Silvan", "Simon", "Sude", "Tam Gian", "Yannick", "Zahir"
]
const allTeachers = [
    "Anika", "Bosshart", "Castelberger", "Chenevard", "Dirks", "Frei", "Frischknecht", "Fritschi", "Graf", "Hofer (f.)",
    "Hofer (m.)", "Jack", "Kühnis", "Listemann", "Oehler", "Reuteler", "Rothenberger", "Schmidt", "Stronski", "Tscholl",
    "Weber", "Wyss", "Zesiger"
]
const studteach = {
    five: { items: ["ango", "arna", "juma", "suba", "tang"], max: 5 },
    four: { items: ["aler", "gikn", "oehl", "yala"], max: 4 },
    three: { items: ["amla", "jahu", "list", "lori", "pazw", "pisc", "rojä", "zesi"], max: 3 },
    two: { items: ["aner", "anik", "dapf", "dost", "giga", "graf", "kawa", "lowo", "sien", "tsch", "wyss", "zask"], max: 2 },
    one: { items: ["anst", "boss", "cast", "chen", "dirk", "frei", "fris", "frit", "hoff", "hofm", "jack", "jest", "kühn", "mobe", "reut", "roth", "schm", "sivo", "stro", "webe"], max: 1 }
}

function showRules() {
    document.querySelectorAll('.div_regel, .black_overlay').forEach(el => {
        el.hidden = !el.hidden;
    });
}

function darken(element) {
    element.classList.toggle("black_filter");
}

function darkReset() {
    const pics = document.querySelectorAll('[id^="pic_"], .highlight');
    pics.forEach(pic => {
        pic.classList.remove("black_filter", "highlight");
    });
}

function showList() {
    const container = document.querySelector(".div_list");
    const overlay = document.querySelector(".black_overlay");

    container.classList.toggle("hidden");
    overlay?.toggleAttribute("hidden");

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


function randomChar() {
    if (document.querySelector(".highlight")) return;

    const all = [...allStudents, ...allTeachers];
    const randChar = allStudents.concat(allTeachers)[Math.floor(Math.random() * (allStudents.length + allTeachers.length))];

    const target = [...document.querySelectorAll(".list_wrapper li")].find(li => li.textContent === randChar);

    target?.classList.add("highlight");
}

function loadMedia() {
    const cloudName = "dnuk6xewd";
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;
    const screen = document.getElementById("screen");

    Object.values(studteach).forEach(group => {
        group.items.forEach(name => {
            const pic = document.createElement("img");

            const randVer = Math.floor(Math.random() * group.max) + 1;

            pic.id = `pic_${name}`;
            pic.alt = name;
            pic.src = `${baseUrl}${name}${randVer}.png`;

            pic.addEventListener("click", () => pic.classList.toggle("black_filter"));

            screen.appendChild(pic);
        });
    });
}

window.onload = loadMedia;