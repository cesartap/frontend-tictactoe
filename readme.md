PARA LEVANTAR EL FRONT END SOLO SE HACE CON 

NG SERVE 

Y LEVANTARA LA URL LOCALHOST:4200

Y PARA LEVANTAR EL BACKEND 

NODE SERVER.JS

EL BACKEND TIENE UNA PRUEBA UNITARIA CON MOCHA Y PARA EJECUTARLA

NPM RUN TEST

EL SERVICIO QUE SE ENCARGA DE ACTUALIZAR LA INFORMACION DE LAS REGLAS ES

POST http://localhost:5000/conditions/add

Y SE ENVIA ESTE MENSAJE

[
	{
	"move": "a",
	"kills": "b"
	},
	{
	"move": "b",
	"kills": "c"
	},
	{
	"move": "c",
	"kills": "a"
	}
]

ESTE SERVICIO RESPONDERA UN MENSAJE '"Condiciones Actualizadas"'. CADA VEZ QUE SE ENVIE
UNA ACTUALIZACION SE ELIMINARA LA INFORMACION ANTERIOR PARA CARGAR LAS NUEVAS REGLAS.
EL SISTEMA DEBE REFRESCAR LA PAGINA PARA QUE TOME LAS NUEVAS REGLAS.