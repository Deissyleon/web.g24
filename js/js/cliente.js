
const url = "https://gb2f44ea4f4d4a1-proyectociclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client"

function agregar_cliente() {
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

    mostrar_cliente();
}

function mostrar_cliente() {
    document.getElementById('lista_usuarios').innerHTML = ""
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let numreg = data.count
            let cliente = data.items
            console.log(numreg)
            console.log(cliente)
            console.log("***************************************");

            for (i = 0; i < numreg; i++) {
                let id_act = cliente[i].id
                let name_act = cliente[i].name
                let email_act = cliente[i].email
                let age_act = cliente[i].age
                let lista = document.getElementById('lista_usuarios').innerHTML

                document.getElementById('lista_usuarios').innerHTML = lista +
                    "<tr><td width=\"30px\">" + cliente[i].id + "</td><td width=\"150px\">" + cliente[i].name + "</td><td width=\"200px\">" + cliente[i].email + "</td><td width=\"60px\">" + cliente[i].age +
                    "</td><td><button   onclick=\ mostrar_actualizar(" + id_act + "," + '"' + name_act + '"' + "," + '"' + email_act + '"' + "," + '"' + age_act + '"' + ") \">Editar</button ></td>"
                    + "<td><button   onclick=\"  eliminar_cliente(" + id_act + ")  \">Eliminar</button ></td></tr>"

                console.log("id " + cliente[i].id)
                console.log("nombre " + cliente[i].name)
                console.log("email " + cliente[i].email)
                console.log("age " + cliente[i].age)



            }
        },
        error: function () {

        },
        complete: function () {

        }

    });
}

function modificar_cliente() {

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

    mostrar_cliente();
}

function eliminar_cliente(id) {

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

    mostrar_cliente();
}

function mostrar_actualizar(id_act, name_act, email_act, age_act) {
    $("#id").val(id_act)
    $("#nombre").val(name_act)
    $("#email").val(email_act)
    $("#edad").val(age_act)
}