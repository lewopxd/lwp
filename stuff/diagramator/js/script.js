const mermaidText = document.getElementById('mermaid').textContent.trim();

document.addEventListener("DOMContentLoaded", function () {

    // Función para actualizar el diagrama con los datos de la URL
    function updateDiagramFromURL() {
        // Obtiene los parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const mermaidContent = urlParams.get('mermaid');
        const title = urlParams.get('title') || 'Diagram_n1';
        const author = urlParams.get('author') || '@author';

        // Obtiene la fecha actual en formato dd/mm/aaaa
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}/${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${currentDate.getFullYear()}`;

        console.log("Url-title: " + title);
        console.log("Url-author: " + author);
        console.log("Url-mermaid: " + mermaidContent);

        // Actualiza los elementos de título, fecha y autor
        document.getElementById('diagram-title').textContent = title;
        document.getElementById('diagram-date').textContent = formattedDate;
        document.getElementById('diagram-author').textContent = author;

        // Si hay contenido 'mermaid' en la URL, actualiza el gráfico
        if (mermaidContent) {
            const diagramContainer = document.getElementById('diagram-container');
            diagramContainer.innerHTML = ''; // Limpia el contenedor del diagrama

            // Crea los elementos de la información del diagrama nuevamente
            const diagramInfoDiv = document.createElement('div');
            diagramInfoDiv.classList.add('diagram-info');
            diagramInfoDiv.innerHTML = `
                <h2 id="diagram-title">${title}</h2>
                <p id="diagram-date">${formattedDate}</p>
                <p id="diagram-author">${author}</p>
            `;
            diagramContainer.appendChild(diagramInfoDiv); // Vuelve a agregar la información al contenedor

            // Crea y agrega el nuevo diagrama Mermaid
            const newMermaidDiagram = document.createElement('div');
            newMermaidDiagram.classList.add('mermaid');
            newMermaidDiagram.innerHTML = mermaidContent; // Inserta el contenido de la URL

            diagramContainer.appendChild(newMermaidDiagram);

            // Inicializa Mermaid para generar el diagrama
            mermaid.init();
            checkAndUpdateTextarea(removeLeadingSpaces(mermaidContent));
        } else {
            // Si no hay contenido mermaid, escribir el mermaid por default del dom
             
            
            checkAndUpdateTextarea(removeLeadingSpaces(mermaidText));

        }
    }


 // Función para actualizar el diagrama desde el contenido del textarea
 function updateDiagramFromTextarea() {
    

      // Obtiene el contenido del textarea
    const mermaidContent = document.getElementById('mermaid-code').value.trim();
     const title =  'Diagram_n1';
     const author =  '@author';

     // Obtiene la fecha actual en formato dd/mm/aaaa
     const currentDate = new Date();
     const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}/${(currentDate.getMonth() + 1)
         .toString()
         .padStart(2, "0")}/${currentDate.getFullYear()}`;

     console.log("area-title: " + title);
     console.log("area-author: " + author);
     console.log("area-mermaid: " + mermaidContent);

     // Actualiza los elementos de título, fecha y autor
     document.getElementById('diagram-title').textContent = title;
     document.getElementById('diagram-date').textContent = formattedDate;
     document.getElementById('diagram-author').textContent = author;

     // Si hay contenido 'mermaid' en la URL, actualiza el gráfico
     if (mermaidContent) {
         const diagramContainer = document.getElementById('diagram-container');
         diagramContainer.innerHTML = ''; // Limpia el contenedor del diagrama

         // Crea los elementos de la información del diagrama nuevamente
         const diagramInfoDiv = document.createElement('div');
         diagramInfoDiv.classList.add('diagram-info');
         diagramInfoDiv.innerHTML = `
             <h2 id="diagram-title">${title}</h2>
             <p id="diagram-date">${formattedDate}</p>
             <p id="diagram-author">${author}</p>
         `;
         diagramContainer.appendChild(diagramInfoDiv); // Vuelve a agregar la información al contenedor

         // Crea y agrega el nuevo diagrama Mermaid
         const newMermaidDiagram = document.createElement('div');
         newMermaidDiagram.classList.add('mermaid');
         newMermaidDiagram.innerHTML = mermaidContent; // Inserta el contenido de la URL

         diagramContainer.appendChild(newMermaidDiagram);

         // Inicializa Mermaid para generar el diagrama
         mermaid.init();
         checkAndUpdateTextarea(removeLeadingSpaces(mermaidContent));
         centerElementById('diagram-container');
     } else {
         // Si no hay contenido mermaid...
          

         

     }
}

//Función para centrar elemento en la pantalla

function centerElementById(id) {
    const element = document.getElementById(id);

    if (element) {
        element.scrollIntoView({
            behavior: 'smooth', // Movimiento suave
            block: 'center',    // Centrar verticalmente
            inline: 'center'    // Centrar horizontalmente, si aplica
        });
    } else {
        console.error(`No se encontró ningún elemento con el ID: ${id}`);
    }
}


     // Función para verificar si el textarea está vacío y actualizarlo si es necesario
     function checkAndUpdateTextarea(content) {
        const textarea = document.getElementById('mermaid-code');
        if (textarea.value.trim() === "") { // Verifica si el textarea está vacío
            textarea.value = content; // Actualiza el textarea con el valor de content"
        }
    }

    //eliminar tabulaciones
    function removeLeadingSpaces(text) {
       let text2 =  text.replace(/^[ \t]+/gm, ''); // Elimina espacios/tabuladores al inicio de cada línea

        return addNewlineAfterGraphTD(text2);
    }
    
    //inserta un salto de linea (solo por estetica :p )
    function addNewlineAfterGraphTD(text) {
        const graphTDIndex = text.indexOf('graph TD');
    
        // Verifica si "graph TD" existe en la cadena
        if (graphTDIndex !== -1) {
            // Verifica si el siguiente carácter después de "graph TD" es un salto de línea
            const afterGraphTD = text.slice(graphTDIndex + 8); // 8 es la longitud de "graph TD"
    
            if (!afterGraphTD.startsWith('\n\n')) {
                // Si no hay salto de línea, agrega uno después de "graph TD"
                return text.slice(0, graphTDIndex + 8) + '\n' + text.slice(graphTDIndex + 8);
            }
        }
    
        // Si ya existe un salto de línea o no se encontró "graph TD", devolvemos el texto original
        return text;
    }
    
    

    // Al hacer clic en el botón de "Regenerar Diagrama", actualiza el gráfico
    document.getElementById('refresh-btn').addEventListener('click', function () {
        updateDiagramFromTextarea(); // Llama a la función que actualiza el diagrama desde le textarea
    });

    // Al cargar la página, también se actualiza el gráfico si hay parámetros en la URL
    window.addEventListener('load', function () {
        updateDiagramFromURL(); // Llama a la función que actualiza el diagrama desde la URL
    });

});
