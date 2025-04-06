from bson import ObjectId
from pymongo import MongoClient

client = MongoClient("mongodb+srv://ermorenodu:NVXylkJ98qQwQ2WM@readit.hxog7.mongodb.net/") 
db = client["ReadIt"] 
collection = db["Clubes"] 

# Agregar un documento (POST)
def add_document(data):
    result = collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return {"mensaje": "Documento agregado exitosamente", "data": data}

# Obtener todos los documentos (GET)
def get_documents():
    documents = list(collection.find({}, {"_id": 0}))
    return documents

# Buscar un documento específico (GET)
def get_document(Nombre):
    document = collection.find_one({"NombreClub": Nombre}, {"_id": 0})
    return document

# Actualizar un documento (PUT)
def update_document(Nombre, update_data):

    # Verificar si hay una nueva imagen en Base64
    if "Portada" in update_data and update_data["Portada"].startswith("data:image"):
        portada_base64 = update_data["Portada"]  # Guardamos la imagen en Base64
    else:
        # Si no hay nueva imagen, mantenemos la portada actual
        club = collection.find_one({"NombreClub": Nombre})
        if club:
            portada_base64 = club["Portada"]
        else:
            return {"mensaje": "Club no encontrado"}, 404

    # Construimos el documento actualizado
    update_data["Portada"] = portada_base64

    result = collection.update_one({"NombreClub": Nombre}, {"$set": update_data})
    if result.matched_count > 0:
        return {"mensaje": "Documento actualizado"}
    else:
        return {"mensaje": "Documento no encontrado"}, 404

# Eliminar un documento (DELETE)
def delete_document(Nombre):
    result = collection.delete_one({"NombreClub": Nombre})
    if result.deleted_count > 0:
        return {"mensaje": "Documento eliminado"}
    else:
        return {"mensaje": "Documento no encontrado"}, 404
