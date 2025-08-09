const materias = [
    // Nivel 1
    { id: "algebra", nombre: "Álgebra para ingenieros", nivel: 1, area: "matematicas", requisitos: [] },
    { id: "habilidades", nombre: "Habilidades computacionales", nivel: 1, area: "informatica", requisitos: [] },
    { id: "intro", nombre: "Introducción al desarrollo de software", nivel: 1, area: "software", requisitos: [] },
    { id: "etica", nombre: "Ética y responsabilidad social", nivel: 1, area: "humanidades", requisitos: [] },
    { id: "idioma1", nombre: "Idioma extranjero I", nivel: 1, area: "idiomas", requisitos: [] },
    { id: "lectura", nombre: "Taller de lectura y redacción", nivel: 1, area: "idiomas", requisitos: [] },

    // Nivel 2
    { id: "discretas", nombre: "Matemáticas discretas", nivel: 2, area: "matematicas", requisitos: ["algebra"] },
    { id: "bd", nombre: "Fundamentos de base de datos", nivel: 2, area: "informatica", requisitos: ["habilidades"] },
    { id: "sustentable", nombre: "Desarrollo sustentable TIC", nivel: 2, area: "humanidades", requisitos: ["habilidades"] },
    { id: "idioma2", nombre: "Idioma extranjero II", nivel: 2, area: "idiomas", requisitos: ["idioma1"] },
    { id: "prog", nombre: "Fundamentos de programación", nivel: 2, area: "software", requisitos: ["habilidades"] },
    { id: "ingenieria", nombre: "Ingeniería de software", nivel: 2, area: "software", requisitos: ["bd", "prog"] },

    // Nivel 3
    { id: "calculo", nombre: "Cálculo para ingenieros", nivel: 3, area: "matematicas", requisitos: ["discretas"] },
    { id: "tallerbd", nombre: "Taller de base de datos", nivel: 3, area: "informatica", requisitos: ["bd"] },
    { id: "admin", nombre: "Administración de proyectos de software", nivel: 3, area: "software", requisitos: ["etica"] },
    { id: "idioma3", nombre: "Idioma extranjero III", nivel: 3, area: "idiomas", requisitos: ["idioma1", "idioma2"] },
    { id: "opt1", nombre: "Optativa sello I", nivel: 3, area: "optativa", requisitos: [] },
    { id: "poo", nombre: "Programación orientada a objetos", nivel: 3, area: "software", requisitos: ["prog"] },

    // Nivel 4
    { id: "estadistica", nombre: "Estadística para los negocios", nivel: 4, area: "matematicas", requisitos: ["calculo"] },
    { id: "topicos", nombre: "Tópicos avanzados de programación", nivel: 4, area: "software", requisitos: ["poo"] },
    { id: "agil", nombre: "Desarrollo ágil y colaborativo", nivel: 4, area: "software", requisitos: ["admin"] },
    { id: "emprendimiento", nombre: "Emprendimiento", nivel: 4, area: "humanidades", requisitos: [] },
    { id: "idioma4", nombre: "Idioma extranjero IV", nivel: 4, area: "idiomas", requisitos: ["idioma1", "idioma2", "idioma3"] },
    { id: "bdav", nombre: "Bases de datos avanzados", nivel: 4, area: "informatica", requisitos: ["tallerbd"] },

    // Nivel 5
    { id: "formulacion", nombre: "Formulación y valuación de proyectos", nivel: 5, area: "software", requisitos: ["topicos", "agil"] },
    { id: "direccion", nombre: "Dirección de equipos", nivel: 5, area: "humanidades", requisitos: ["agil", "emprendimiento"] },
    { id: "webcliente", nombre: "Programación web cliente", nivel: 5, area: "software", requisitos: ["bdav", "topicos"] },
    { id: "calidad", nombre: "Calidad y pruebas de software", nivel: 5, area: "software", requisitos: ["formulacion"] },

    // Nivel 6
    { id: "android", nombre: "Apps móviles en Android", nivel: 6, area: "software", requisitos: ["formulacion", "webcliente", "calidad"] },
    { id: "arquitecturas", nombre: "Arquitecturas de software", nivel: 6, area: "software", requisitos: ["webcliente", "calidad"] },
    { id: "gerenciales", nombre: "Habilidades gerenciales", nivel: 6, area: "humanidades", requisitos: ["direccion"] },
    { id: "webservidor", nombre: "Programación web servidor", nivel: 6, area: "software", requisitos: ["webcliente"] },

    // Nivel 7
    { id: "ios", nombre: "Apps móviles en iOS", nivel: 7, area: "software", requisitos: ["android"] },
    { id: "videojuegos1", nombre: "Fundamentos y diseño de videojuegos", nivel: 7, area: "software", requisitos: ["arquitecturas"] },
    { id: "webmulti", nombre: "Programación web multiplataforma", nivel: 7, area: "software", requisitos: ["webservidor"] },
    { id: "nube", nombre: "Cómputo y servicios en la nube", nivel: 7, area: "software", requisitos: ["webservidor"] },

    // Nivel 8
    { id: "videojuegos2", nombre: "Programación de videojuegos", nivel: 8, area: "software", requisitos: ["videojuegos1"] },
    { id: "ia", nombre: "Inteligencia artificial", nivel: 8, area: "ia", requisitos: ["webmulti", "nube"] },
    { id: "vrar", nombre: "Realidad virtual y aumentada", nivel: 8, area: "software", requisitos: ["videojuegos2", "ia"] },
    { id: "despliegue", nombre: "Despliegue de apps web y móviles", nivel: 8, area: "software", requisitos: ["nube", "webmulti", "ios"] },
    { id: "estadia", nombre: "Estadía profesional", nivel: 8, area: "humanidades", requisitos: [] },
];

const container = document.getElementById("malla");

for (let i = 1; i <= 8; i++) {
    const col = document.createElement("div");
    col.classList.add("column");

    const header = document.createElement("div");
    header.classList.add("nivel-header");
    header.textContent = `Nivel ${i}`;
    col.appendChild(header);

    materias.filter(m => m.nivel === i).forEach(mat => {
        const div = document.createElement("div");
        div.classList.add("materia");
        div.textContent = mat.nombre;
        div.dataset.id = mat.id;
        div.dataset.area = mat.area;
        div.dataset.status = mat.requisitos.length === 0 ? "available" : "locked";
        col.appendChild(div);
    });

    container.appendChild(col);
}

function actualizarDisponibilidad() {
    document.querySelectorAll(".materia").forEach(m => {
        const id = m.dataset.id;
        const mat = materias.find(mm => mm.id === id);
        if (m.dataset.status !== "completed") {
            const cumplidos = mat.requisitos.every(r => {
                const prereq = document.querySelector(`[data-id='${r}']`);
                return prereq && prereq.dataset.status === "completed";
            });
            m.dataset.status = cumplidos ? "available" : "locked";
        }
    });
}

document.querySelectorAll(".materia").forEach(m => {
    m.addEventListener("click", () => {
        if (m.dataset.status === "available") {
            m.dataset.status = "completed";
            actualizarDisponibilidad();
        } else if (m.dataset.status === "completed") {
            m.dataset.status = "available";
            actualizarDisponibilidad();
            materias.forEach(mat => {
                if (mat.requisitos.includes(m.dataset.id)) {
                    const dep = document.querySelector(`[data-id='${mat.id}']`);
                    const cumplidos = mat.requisitos.every(r => {
                        const prereq = document.querySelector(`[data-id='${r}']`);
                        return prereq && prereq.dataset.status === "completed";
                    });
                    dep.dataset.status = cumplidos ? dep.dataset.status : "locked";
                }
            });
        }
    });
});
