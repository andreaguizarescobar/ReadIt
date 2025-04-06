from mongoengine import Document, StringField, IntField, ListField, EmbeddedDocument, EmbeddedDocumentField

class Lectura(EmbeddedDocument):
    Libro = StringField(required=True)
    Portada = StringField()
    F_Inicio = StringField()
    F_Fin = StringField()

class Evento(EmbeddedDocument):
    Evento = StringField(required=True)
    Portada = StringField()
    Descripcion = StringField()
    Fecha = StringField()
    Hora = StringField()
    Tipo = StringField()

class Clubes(Document):
    NombreClub = StringField(required=True, unique=True)
    Descripcion = StringField()
    Administrador = StringField()
    Genero = StringField()
    Miembros = IntField()
    Portada = StringField()
    Lecturas = ListField(EmbeddedDocumentField(Lectura))
    Eventos = ListField(EmbeddedDocumentField(Evento))
