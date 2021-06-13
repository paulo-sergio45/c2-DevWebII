# API COVID-19

## Unidade de saude CRUDE
###### consulta todas as unidades de saude:
```
get
```
###### criação da unidade de saude:
``` 
post 
body:{       
        "nome":"paulo",
        "descricao":"eu",
        "endereco":"rua dos bobos",
        "telefone":"123456487",
        "email":"paulo@enois.com",
        "latlong":"46546464"
}
```
###### consulta a unidades de saude por id:
```
get:id
```
###### atualizar unidade de saude:
```
put:id 
body:{
    "nome": "aki",
    "telefone": "3315664646555",
    "email": "paulo@enois.com",
    "latlong": "46546464"
}
```
###### deletar unidade de saude:
```
del:id
```


## Pessoas CRUDE
###### consulta todas as pessoas:
```
get
```
###### criação da pessoa:
``` 
post 
body:{       
        "unisaude_id":"606b69c06a118f3238b036e7",
        "nome":"jairo",
        "cpf":"12346789333",
        "data_nasci":"06/04/1992",
        "telefone":"123456487",
        "grupo_priori":true,
        "endereco":"rua dos bobos",
        "email":"paulo@enois.com"
 
}
```
###### consulta a pessoa por id:
```
get:id
```
###### atualizar pessoa:
```
put:id 
body:{       

        "nome":"paulo",
        "cpf":"12346789333",
        "data_nasci":"06/04/1992",
        "telefone":"123456487",
        "grupo_priori":true,
        "endereco":"rua dos bobos",
        "email":"paulo@enois.com"
 
}
```
###### deletar pessoa:
```
del:id
```

## Agenda CRUDE
###### consulta todas as agendas:
```
get
```
###### criação da agenda:
``` 
post 
body:{       
        "unisaude_id": "606b69c06a118f3238b036e7",
        "pessoa_id": "606d6efbe6f00f2d609b36d0",
        "data_hora": "2021-04-06",
        "necessidades": true,
        "observacoes": "talvez"
 
}
```
###### consulta por id:
```
get:id
```
###### atualizar agenda:
```
put:id 
body:{       

      "unisaude_id": "606b69c06a118f3238b036e7",
        "pessoa_id": "606d6efbe6f00f2d609b36d0",
        "data_hora": "2021-04-08",
        "necessidades": true,
        "observacoes": "sim"
 
}
```
###### deletar agenda:
```
del:id
```