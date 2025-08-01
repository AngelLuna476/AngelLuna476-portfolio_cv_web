function mostrarExpYEdu(categoria) {
                let experiencia_edu = document.querySelectorAll('.experiencia_edu');

                // Ocultar todas las categorías antes de mostrar la nueva
                experiencia_edu.forEach(experiencia_edu => {
                    experiencia_edu.classList.remove('mostrar'); 
                    experiencia_edu.style.opacity = '0';
                    experiencia_edu.style.transform = 'translateY(-50px)'; // Mueve hacia arriba para transición
                    setTimeout(() => experiencia_edu.style.display = 'none', 400);
                });

                // Asegurar que la nueva opción esté visible antes de la transición
                setTimeout(() => {
                    let experiencia_eduSeleccionado = document.getElementById(categoria);
                    experiencia_eduSeleccionado.style.display = 'block';
                    experiencia_eduSeleccionado.style.opacity = '0'; // Comienza invisible
                    experiencia_eduSeleccionado.style.transform = 'translateY(-50px)'; // Inicia desde arriba
        
                    setTimeout(() => {
                        experiencia_eduSeleccionado.classList.add('mostrar'); 
                        experiencia_eduSeleccionado.style.opacity = '1'; // Aparece gradualmente
                        experiencia_eduSeleccionado.style.transform = 'translateY(0)'; // Baja suavemente
                    }, 50);
                }, 400);
            }

        document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos todas las tarjetas de certificados
    const cards = document.querySelectorAll('.certificate-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Evitamos que el evento se propague a los botones hijos
            if (e.target.classList.contains('subcategoria-btn')) return;
            
            const categoria = this.getAttribute('data-categoria');
            
            // Si es Data Science, mostramos los botones de subcategoría
            if (categoria === 'datascience') {
                const subcategorias = this.querySelector('.subcategorias');
                subcategorias.style.display = subcategorias.style.display === 'flex' ? 'none' : 'flex';
                
                // Ocultamos otros contenedores de cursos
                document.querySelectorAll('.cursos').forEach(curso => {
                    curso.style.display = 'none';
                });
            } else {
                // Para otras categorías, comportamiento normal
                mostrarCursos(categoria);
                
                // Ocultamos subcategorías si están visibles
                document.querySelectorAll('.subcategorias').forEach(sub => {
                    sub.style.display = 'none';
                });
            }
        });
    });
    
    // Manejador para los botones de subcategoría
    document.querySelectorAll('.subcategoria-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitamos que el evento llegue al article
            
            const subcategoria = this.getAttribute('data-subcategoria');
            mostrarSubcategoria(subcategoria);
        });
    });
});

function mostrarSubcategoria(subcategoria) {
    // Ocultamos todos los cursos primero
    document.querySelectorAll('.cursos').forEach(curso => {
        curso.style.display = 'none';
    });
    
    // Mostramos solo los cursos de la subcategoría seleccionada
    const cursoSeleccionado = document.getElementById('datascience');
    cursoSeleccionado.style.display = 'block';
    
    // Aquí puedes agregar lógica para filtrar qué cursos mostrar
    // basado en la subcategoría seleccionada
    // Por ejemplo:
    const items = cursoSeleccionado.querySelectorAll('li');
    items.forEach(item => {
        const texto = item.textContent.toLowerCase();
        if (subcategoria === 'formacion-modelado' && texto.includes('modelado')) {
            item.style.display = 'list-item';
        } else if (subcategoria === 'formacion-etl' && texto.includes('etl')) {
            item.style.display = 'list-item';
        } else if (subcategoria === 'formacion-desarrollo' && (texto.includes('desarrollo') || texto.includes('personal'))) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Animación
    cursoSeleccionado.classList.add('mostrar');
    setTimeout(() => {
        cursoSeleccionado.style.opacity = '1';
        cursoSeleccionado.style.transform = 'translateY(0)';
    }, 50);
}

// Mantenemos tu función original para otras categorías
function mostrarCursos(categoria) {
    let cursos = document.querySelectorAll('.cursos');
    
    cursos.forEach(curso => {
        curso.classList.remove('mostrar');
        setTimeout(() => {
            curso.style.opacity = '0';
            curso.style.transform = 'translateY(-50px)';
            curso.style.display = 'none';
        }, 400);
    });

    setTimeout(() => {
        let cursoSeleccionado = document.getElementById(categoria);
        cursoSeleccionado.style.display = 'block';
        cursoSeleccionado.classList.add('mostrar');
        
        // Mostramos todos los items para esta categoría
        const items = cursoSeleccionado.querySelectorAll('li');
        items.forEach(item => {
            item.style.display = 'list-item';
        });
        
        setTimeout(() => {
            cursoSeleccionado.style.opacity = '1';
            cursoSeleccionado.style.transform = 'translateY(0)';
        }, 50);
    }, 400);
}