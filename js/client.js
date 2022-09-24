const url = "https://gb2f44ea4f4d4a1-proyectociclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client"

function agregar_client() {
    let ide = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let edad = document.getElementById("edad").value;

    const dataSend = {
        id: ide,
        name: nombre,
        email: email,
        age: edad
    }
    const json = JSON.stringify(dataSend);
    $.ajax({
        method: 'POST',
        url: url,
        data: json,
        contentType: "application/json",
        complete: function (response) {
            console.log(response.status)
        }
    });

    mostrar_client();
}

function mostrar_client() {
    document.getElementById('lista_usuarios').innerHTML = ""
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let numreg = data.count
            let cliente = data.items
            console.log(numreg)
            console.log(client)
            console.log("***************************************");

            for (i = 0; i < numreg; i++) {
                let id_act = client[i].id
                let name_act = client[i].name
                let email_act = client[i].email
                let age_act = client[i].age
                let lista = document.getElementById('lista_usuarios').innerHTML

                document.getElementById('lista_usuarios').innerHTML = lista +
                    "<tr><td width=\"30px\">" + client[i].id + "</td><td width=\"150px\">" + client[i].name + "</td><td width=\"200px\">" + client[i].email + "</td><td width=\"60px\">" + client[i].age +
                    "</td><td><button   onclick=\ mostrar_actualizar(" + id_act + "," + '"' + name_act + '"' + "," + '"' + email_act + '"' + "," + '"' + age_act + '"' + ") \">Editar</button ></td>"
                    + "<td><button   onclick=\"  eliminar_client(" + id_act + ")  \">Eliminar</button ></td></tr>"

                console.log("id " + client[i].id)
                console.log("nombre " + client[i].name)
                console.log("email " + client[i].email)
                console.log("age " + client[i].age)



            }
        },
        error: function () {

        },
        complete: function () {

        }

    });
}

function modificar_client() {

    let ide = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let edad = document.getElementById("edad").value;

    const dataSend = {
        id: ide,
        name: nombre,
        email: email,
        age: edad
    }
    const json = JSON.stringify(dataSend);
    $.ajax({
        method: 'PUT',
        url: url,
        data: json,
        contentType: "application/json",
        complete: function (response) {
            console.log(response.status)
        }
    });

    mostrar_client();
}

function eliminar_client(id) {

    const dataSend = {
        id: id,
    }

    const json = JSON.stringify(dataSend);

    $.ajax({
        method: 'DELETE',
        url: url + '?id=' + id,
        //url: url,
        data: json,
        contentTipe: "application/json",
        complete: function (response) {
            if (response.satatus == 204) {
                alert("Elimino con exito!!")
            }
            console.log(response.status)
        }
    });

    mostrar_client();
}

function mostrar_actualizar(id_act, name_act, email_act, age_act) {
    $("#id").val(id_act)
    $("#nombre").val(name_act)
    $("#email").val(email_act)
    $("#edad").val(age_act)
}