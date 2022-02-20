import _ from "./methods.js";
import { form, superInput, result } from "./selectors.js";

$(() => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!/^\d+$/.test(superInput.value))
            return console.log("Ingrese solo números por favor");

        $.ajax({
            url: `https://www.superheroapi.com/api.php/3525635500807579/${superInput.value}`,
            type: "GET",
            dataType: "JSON",
            success(data) {
                const resultLength = result.childNodes.length - 1
                
                for (let i = resultLength; i >= 0; i--) {
                    result.removeChild(result.childNodes[i]);
                }

                if (data.response === "error") return this.error("Invalid ID");

                result.appendFullElement("h1", "SuperHero Encontrado!");

                result.appendCard(
                    data.image.url,
                    `${data.id} - ${data.name}`,
                    [
                        `Nombre completo: ${data.biography["full-name"]}`,
                        `Afiliaciones: ${data.connections["group-affiliation"]}`,
                        `Publicante: ${data.biography.publisher}`,
                    ],
                    [
                        `Ocupación: ${data.work.occupation}`,
                        `Primera aparición: ${data.biography["first-appearance"]}`,
                        `Altura: ${data.appearance.height[0]} / ${data.appearance.height[1]}`,
                        `Peso: ${data.appearance.weight[0]} / ${data.appearance.weight[1]}`,
                        `Familiares: ${data.connections.relatives}`,
                    ]
                );

                const options = {
                    title: {
                        text: "Estadísticas de poder: ",
                    },
                    data: [
                        {
                            type: "pie",
                            startAngle: 90,
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabel: "{label} ({y})",
                            yValueFormatString: "#,##0.#" % "",

                            dataPoints: [],
                        },
                    ],
                };
                Object.keys(data.powerstats).forEach((item) => {
                    options.data[0].dataPoints.push({
                        label: item,
                        y: data.powerstats[item],
                    });
                });
                $("#canvas").CanvasJSChart(options);

                superInput.value = "";
            },
            error(err) {
                result.childNodes.forEach((item) => result.removeChild(item));
                result.appendFullElement("h1", err);
                console.error(err);
            },
        });
    });
});
