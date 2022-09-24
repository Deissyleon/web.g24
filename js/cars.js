const urlcar = "https://gb2f44ea4f4d4a1-proyectociclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/car/car"

function agregar_car() {
    let idc = document.getElementById("idcar").value;
    let brand = document.getElementById("brand").value;
    let model = document.getElementById("model").value;
    let category_id = document.getElementById("category_car").value;

    const dataSend = {
        id: idc,
        brand: brand,
        model: model,
        category_id: category_id
    }
    const json = JSON.stringify(dataSend);
    $.ajax({
        method: 'POST',
        url: urlcar,
        data: json,
        contentType: "application/json",
        complete: function (response) {
            console.log(response.status)
        }
    });

    mostrar_car();
}

function mostrar_car() {
    document.getElementById('lista_de_car').innerHTML = ""
    $.ajax({
        url: urlcar,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let numreg = data.count
            let car = data.items
            console.log(numreg)
            console.log(car)
            console.log("***************************************");

            for (i = 0; i < numreg; i++) {
                let id_car = car[i].id
                let brand_car = car[i].brand
                let model_car = car[i].model
                let category_id_car = car[i].category_id
                let lista = document.getElementById('lista_de_car').innerHTML

                document.getElementById('lista_de_car').innerHTML = lista +
                    "<tr><td width=\"30px\">" + car[i].id + "</td><td width=\"150px\">" + car[i].brand + "</td><td width=\"200px\">" + car[i].model + "</td><td width=\"60px\">" + car[i].category_id +
                    "</td><td><button   onclick=\ mostrar_actualizar_car(" + id_car + "," + '"' + brand_car + '"' + "," + '"' + model_car + '"' + "," + '"' + category_id_car + '"' + ") \">Editar</button ></td>"
                    + "<td><button   onclick=\"  eliminar_car(" + id_car + ")  \">Eliminar</button ></td></tr>"

                console.log("id " + car[i].id)
                console.log("brand " + car[i].brand)
                console.log("model " + car[i].model)
                console.log("category_id " + car[i].category_id)



            }
        },
        error: function () {

        },
        complete: function () {

        }

    });
}

function modificar_car() {

    let idc = document.getElementById("idcar").value;
    let brand = document.getElementById("brand").value;
    let model = document.getElementById("model").value;
    let category_id = document.getElementById("category_car").value;

    const dataSend = {
        id: idc,
        brand: brand,
        model: model,
        category_id: category_id
    }
    const json = JSON.stringify(dataSend);
    $.ajax({
        method: 'PUT',
        url: urlcar,
        data: json,
        contentType: "application/json",
        complete: function (response) {
            console.log(response.status)
        }
    });

    mostrar_car();
}

function eliminar_car(id) {

    const dataSend = {
        id: id,
    }

    const json = JSON.stringify(dataSend);

    $.ajax({
        method: 'DELETE',
        url: urlcar + '?id=' + id,
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

    mostrar_car();
}

function mostrar_actualizar_car(id_car, brand_car, model_car, category_id_car) {
    $("#idcar").val(id_car)
    $("#brand").val(brand_car)
    $("#model").val(model_car)
    $("#category_car").val(category_id_car)
}