const urlmsn = "https://gb2f44ea4f4d4a1-proyectociclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message"
function agregar_mensaje() {
    let idmsn = document.getElementById("idmns").value;
    let mensaje = document.getElementById("mensaje").value;


    const dataSend = {
        id: idmsn,
        messagetext: mensaje
    }
        const json = JSON.stringify(dataSend);
        $.ajax({
            method: 'POST',
            url: urlmsn,
            data: json,
            contentType: "application/json",
            complete: function (response) {
                console.log(response.status)
            }
        });

        mostrar_mensaje();
    }

    function mostrar_mensaje() {
        document.getElementById('lista_mensajes').innerHTML = ""
        $.ajax({
            url: urlmsn,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let numreg = data.count
                let message = data.items

                for (i = 0; i < numreg; i++) {
                    let idmsn = message[i].id
                    let mensaje = message[i].messagetext
                    let lista = document.getElementById('lista_mensajes').innerHTML
                    let mensaje_corto=""
                    let mensajecomp=mensaje.replace(" ","h")

                    if (mensaje.length >= 20){
                        mensaje_corto=mensaje.substr(0,15)+"..."
                    }else {
                        mensaje_corto=mensaje
                    }

                    document.getElementById('lista_mensajes').innerHTML = lista +
                        "<tr><td width=\"30px\">" + idmsn+ "</td><td width=\"200px\">" + mensaje_corto+ 
                        "</td><td><button   onclick=\ leer_mensaje(" + idmsn + "," + '"' + mensajecomp +'"'+ ") \">Leer</button ></td>"
                        + "<td><button   onclick=\"  eliminar_mensaje(" + idmsn + ")  \">Eliminar</button ></td></tr>"



                }
            },
            error: function () {

            },
            complete: function () {

            }

        });
    }



    function eliminar_mensaje(id) {

        const dataSend = {
            id: id,
        }

        const json = JSON.stringify(dataSend);

        $.ajax({
            method: 'DELETE',
            url: urlmsn + '?id=' + id,
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

        mostrar_mensaje();
    }

    function leer_mensaje(idmsn, mensaje) {
        $("#leer_idmsn").val(idmsn)
        $("#leer_mensaje").val(mensaje)
    }