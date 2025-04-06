from flask import Flask, request, jsonify
from flask_cors import CORS
from ariadne import graphql_sync
from esquema import get_schema
from APIRest import add_document, get_documents, get_document, update_document, delete_document

app = Flask(__name__)
CORS(app)

# Ruta para agregar un documento (POST)
@app.route('/ReadIt/clubNuevo', methods=['POST'])
def add_document_route():
    data = request.json  
    response = add_document(data)
    return jsonify(response)

# Ruta para obtener todos los documentos (GET)
@app.route('/ReadIt/club', methods=['GET'])
def get_documents_route():
    documents = get_documents()
    return jsonify(documents)

# Ruta para buscar un documento específico (GET)
@app.route('/ReadIt/club/<Nombre>', methods=['GET'])
def get_document_route(Nombre):
    document = get_document(Nombre)
    if document:
        return jsonify(document)
    else:
        return jsonify({"mensaje": "Documento no encontrado"}), 404

# Ruta para actualizar un documento (PUT)
@app.route('/ReadIt/club/<Nombre>', methods=['PUT'])
def update_document_route(Nombre):
    update_data = request.json
    response, status_code = update_document(Nombre, update_data)
    return jsonify(response), status_code

# Ruta para eliminar un documento (DELETE)
@app.route('/ReadIt/club/<Nombre>', methods=['DELETE'])
def delete_document_route(Nombre):
    response, status_code = delete_document(Nombre)
    return jsonify(response), status_code

# Obtener el esquema GraphQL
schema = get_schema()

@app.route("/graphql", methods=["GET", "POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(schema, data, context_value=request, debug=True)
    status_code = 200 if success else 400
    return jsonify(result), status_code

@app.route("/")
def playground():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>GraphQL Playground</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-playground-react@1.7.20/build/static/css/index.css" />
        <script src="https://cdn.jsdelivr.net/npm/graphql-playground-react@1.7.20/build/static/js/middleware.js"></script>
    </head>
    <body>
        <div id="root"></div>
        <script>window.addEventListener('load', function() {
            GraphQLPlayground.init(document.getElementById('root'), { endpoint: '/graphql' })
        })</script>
    </body>
    </html>
    """
