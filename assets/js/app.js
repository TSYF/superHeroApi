import _ from "./methods.js";
import { form, superInput, result } from "./selectors.js";

$(() => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (/^[0123456789]+/.test(!superInput.value)) return console.log("Ingrese solo números por favor");

        $.ajax({
            url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`,
            type: "GET",
            dataType: "JSON",
            success(data) {
                const inputId = superInput.value;

                result.childNodes.forEach(item => result.removeChild(item))
        
                result.appendCard(
                    data[inputId].images.lg,
                    `${data[inputId].id} - ${data[inputId].name}`,
                    [
                        `Nombre completo: ${data[inputId].biography.fullName}`,
                        `Afiliaciones: ${data[inputId].connections.groupAffiliation}`,
                        `Publicante ${data[inputId].biography.publisher}`,
                    ],
                    [
                        `Ocupación: ${data[inputId].work.occupation}`,
                        `Primera aparición: ${data[inputId].biography.firstAppearance}`,
                        `Altura: ${data[inputId].appearance.height[0]} / ${data[inputId].appearance.height[1]}`,
                        `Peso: ${data[inputId].appearance.weight[0]} / ${data[inputId].appearance.weight[1]}`,
                        `Familiares: ${data[inputId].connections.relatives}`
                    ]
                );
        
                const options = {
                    title: {
                        text: "Estadísticas de poder: "
                    },
                    data: [{
                        type: "pie",
                        startAngle: 90,
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabel: "{label} ({y})",
                        yValueFormatString:"#,##0.#"%"",

                        dataPoints: []
                    }]
                };
                Object.keys(data[inputId].powerstats).forEach(item => {
                    options.data[0].dataPoints.push( { label: item, y: data[inputId].powerstats[item] } )
                })
                $("#canvas").CanvasJSChart(options);

                superInput.value = "";
            },
            error(err) {
                console.log(err);
            },
        });
    });
});
