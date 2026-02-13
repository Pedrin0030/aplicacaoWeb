document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const listaDocumentos = document.getElementById('listaDocumentos');

    //funcao ara carregar os documentos
    const carregarDocumentos = async () => {
        try {
            const response = await fetch('/documentos');
            const documentos = await response.json();

            listaDocumentos.innerHTML = ''; //nessa parte vai fazer um limpa na lista atual

            if (documentos.length === 0) {
                listaDocumentos.innerHTML = '<p> Nenhum documento cadastrado.</p>';
                return;
            }

            documentos.forEach(doc => {

                const card = document.createElement('div');
                card.className = 'doc-card';

                // Gerar o HTML dos comentários já existentes
                let comentariosHTML = '';
                if (doc.comentarios && doc.comentarios.length > 0) {
                    doc.comentarios.forEach(c => {
                        comentariosHTML += `
                            <div class="comment-item">
                                <small>${c.data}</small>
                                <p>${c.texto}</p>
                            </div>
                        `;
                    });
                } else {
                    comentariosHTML = '<p class="no-comments">Sem comentários ainda.</p>';
                }

                card.innerHTML = `
                    <div class="doc-header">
                        <strong>${doc.titulo} </strong>
                        <span class="doc-date">${doc.data_upload}</span>
                    </div>
                    <p>${doc.descricao || 'Sem descrição' } </p>

                    <div class="doc-actions">
                        <a href="/exibir/${doc.arquivo}" target="_blank" class="view-btn">Visualizar</a>
                        <a href="/exibir/${doc.arquivo}" download class="download-btn">Download</a>
                    </div>

                    <div class="comments-section">
                        <h4>Histórico de Comentários</h4>
                        <div id="comments-list-${doc.id}" class="comments-list">
                            ${comentariosHTML}
                        </div>
                        <div class="comment-input-group">
                            <input type="text" id="input-comment-${doc.id}" placeholder="Adicionar comentário...">
                            <button onclick="enviarComentario(${doc.id})" class="btn-comment">Enviar</button>
                        </div>
                    </div> 
                `;
                listaDocumentos.appendChild(card);

            });

        } catch (error) {
            console.error('Erro ao carregar documentos:', error);
        }
    };

    //Aqui teremos a logica para enviar o documento
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(uploadForm);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Documento enviado com sucesso!');
                uploadForm.reset();
                carregarDocumentos();
            } else {
                const erro = await response.text();
                alert('Erro: ' + erro)
            }

        }catch (error) {
            alert('Erro na conexão com o servidor.');
        }
    });

    // fncao para enviar comentario
    window.enviarComentario = async (docId) => {
        const input = document.getElementById(`input-comment-${docId}`);
        const texto = input.value;

        if (!texto.trim()) return alert("O comentário não pode estar vazio!");

        try {
            const response = await fetch(`/documentos/${docId}/comentarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto: texto })
            });

            if (response.ok) {
                input.value = '';
                carregarDocumentos(); // Recarrega a lista para mostrar o novo comentário
            } else {
                alert("Erro ao enviar comentário.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    carregarDocumentos();
    
});

