from ariadne import QueryType, MutationType, make_executable_schema
from pymongo import MongoClient

# Configurar MongoDB
client = MongoClient("mongodb+srv://ermorenodu:NVXylkJ98qQwQ2WM@readit.hxog7.mongodb.net/") 
db = client["ReadIt"] 
collection = db["Clubes"] 

# Definir el esquema GraphQL
type_defs = """
    type Lectura {
        libro: String
        portada: String
        fInicio: String
        fFin: String
    }

    type Evento {
        evento: String
        portada: String
        descripcion: String
        fecha: String
        hora: String
        tipo: String
    }

    type Club {
        nombreClub: String
        descripcion: String
        administrador: String
        genero: String
        miembros: Int
        portada: String
        lecturas: [Lectura]
        eventos: [Evento]
    }

    type Query {
        clubes: [Club]
    }

    type Mutation {
        agregarClub(
            nombreClub: String!
            descripcion: String!
            administrador: String!
            genero: String!
            miembros: Int!
            portada: String!
        ): String
    }
"""

# Resolvers
query = QueryType()

@query.field("clubes")
def resolve_clubes(*_):
    clubes = collection.find({}, {"_id": 0})  # Excluir _id para evitar errores
    return [
        {
            "nombreClub": club.get("NombreClub"),
            "descripcion": club.get("Descripcion"),
            "administrador": club.get("Administrador"),
            "genero": club.get("Genero"),
            "miembros": club.get("Miembros"),
            "portada": club.get("Portada"),
            "lecturas": club.get("Lecturas", []),
            "eventos": club.get("Eventos", [])
        }
        for club in clubes
    ]

mutation = MutationType()

@mutation.field("agregarClub")
def resolve_agregar_club(_, info, nombreClub, descripcion, administrador, genero, miembros, portada):
    collection.insert_one({
        "NombreClub": nombreClub,
        "Descripcion": descripcion,
        "Administrador": administrador,
        "Genero": genero,
        "Miembros": miembros,
        "Portada": portada,
        "Lecturas": [],
        "Eventos": []
    })
    return "Club agregado con éxito"

# Crear esquema ejecutable
schema = make_executable_schema(type_defs, query, mutation)

# Exportar el esquema para ser utilizado en otras partes
def get_schema():
    return schema
