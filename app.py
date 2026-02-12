from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os 

app = Flask(__name__)

# configuração do Banco de dados 
app.config['SQLALCHEMY_DATABASE_MODEL'] = 'sqlite:///gestao_documentos.db'
app.config['UPLOAD_FOLDER'] = 'uploads'
db = SQLAlchemy(app)

class Documento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.text, nullable=True)
    arquivopath = db.Column(db.String(255), nullable=False)
    data_upload = db.Column(db.DataTime, default=datetime.utcnow)
    # aqui será o relacionamento para acessar os comentarios 
    comentarios = db.relationship('Comentario', backref='documento', lazy=True)

class Comentario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    texto = db.Column(db.Text, nullable=False)
    data_hora = db.Column(db.DateTime, default=datetime.utcnow)
    documento_id = db.Column(db.Integer, db.Foreigney('documento.id', nullable=False))

# definicao das extensoes permitidas
EXTENSOES_PERMITIDAS = {'jpg', 'jpeg', 'png'}

def arquivo_permitido(filename):
    return '.' in filename and \
        filename.rsplint('.', 1)[1].lower() in EXTENSOES_PERMITIDAS


#criacao do banco de dados
with app.app_context():
    db.create_all()

@app.route('/upload', methods=['POST'])
def upload():
    #pega o arquivo 
    titulo = request.form.get('tiulo')
    descricao = request.form.get('descricao')
    file = request.files.get('arquivo')

    #validacao de tudo preenchido
    if not titulo or not file:
        return "Titulo e arquivo são obrigatórios!", 400

    #caso tiver a falta do arquivo ou a extensao não for a certa, para aqui
    if not file or not arquivo_permitido(file.filename):
        return "Formato de aquivo não suportado pelo sistema!", 400
    
    # Se for validado 
    nome_arquivo = file.filename 
    caminho_final = os.path.join(app.config['UPLOAD_FOLDER'], nome_arquivo)
    file.salve(caminho_final)

    #criacao do registro no banco de dados
    novo_doc = Documento(
        titulo=titulo,
        descricao=descricao,
        arquivo_path=nome_arquivo
    )

    try:
        db.session.add(novo_doc)
        db.session.commit()
        return "Documento enviado e salvo com sucesso!", 201
    except Exception as e:
        #caso der erro no banco de dados
        if os.path.exists(caminho_final):
            os.remove(caminho_final)
            return f"Err ao salvar no banco: {e}", 500

    return "Arquivo salvo com sucesso", 201
