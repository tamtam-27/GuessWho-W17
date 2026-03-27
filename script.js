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
    const pics = document.querySelectorAll('[id^="pic_"]');
    pics.forEach(pic => {
        pic.classList.remove("black_filter");
    });

    const highlighted = document.querySelectorAll(".highlight");
    highlighted.forEach(el => {
        el.classList.remove("highlight");
    });
}

function showList() {
    const container = document.querySelector(".div_list");
    const overlay = document.querySelector(".black_overlay");
    container.classList.toggle("hidden");
    if (overlay) {
        overlay.hidden = !overlay.hidden;
    }

    let wrapper = container.querySelector(".list_wrapper");

    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.className = "list_wrapper";

        const createCol = (title, items, listClass) => {
            const colu = document.createElement("div");
            colu.className = "list_column";

            const header = document.createElement("h3");
            header.textContent = title;
            header.className = "list_header";
            colu.appendChild(header);

            const ul = document.createElement("ul");
            ul.className = listClass;
            items.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                li.onclick = function () {
                    this.classList.toggle("highlight");
                }
                ul.appendChild(li);
            });
            colu.appendChild(ul);
            return colu;
        };

        const colStudent = createCol("Schüler", allStudents, "dynlisti");
        const colTeach = createCol("Lehrperson", allTeachers, "dynlistu");

        wrapper.appendChild(colStudent);
        wrapper.appendChild(colTeach);

        const anchor = container.querySelector(".button_zurück");
        container.insertBefore(wrapper, anchor);
    } else {
        wrapper.hidden = !wrapper.hidden;
    }
}

function randomChar() {
    const highlighted = document.querySelector(".highlight");
    if (highlighted) {
        return;
    }

    const randChar = allStudents.concat(allTeachers)[Math.floor(Math.random() * (allStudents.length + allTeachers.length))];

    const allChars = document.querySelectorAll(".list_wrapper li");
    allChars.forEach(li => {
        if (li.textContent === randChar) {
            li.classList.add("highlight");
        }
    });
}

function loadMedia() {
    const cloudName = "dnuk6xewd";
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;
    const screen = document.getElementById("screen");

    Object.values(studteach).forEach(group => {
        group.items.forEach(name => {
            const pic = document.createElement("img");

            pic.id = `pic_${name}`;
            pic.alt = name;

            const randVer = Math.floor(Math.random() * group.max) + 1;
            pic.src = `${baseUrl}${name}${randVer}.png`;

            pic.addEventListener("click", () => darken(pic));

            screen.appendChild(pic);
        });
    });
}

window.onload = loadMedia;