"use strict";

angular
  .module("myApp.inicio", ["ngRoute"])

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/", {
        templateUrl: "inicio/inicio.html",
        controller: "todolist_controller",
      });
    },
  ])

  .controller("todolist_controller", [
    function () {
      // Lista de tareas
      this.mylist = JSON.parse(window.localStorage.getItem("list")) || mylist;
      this.id_tarea_detalle = null;
      this.fecha_detalle = null;
      this.hora_detalle = null;
      this.new_name = null;
      this.new_description = null;
      this.new_due_date = null;
      this.new_due_time = null;

      this.addToList = function () {
        let fecha = null;
        let hora = null;
        if (this.new_due_date != null) {
          fecha =
            "" +
            this.new_due_date.getFullYear() +
            "-" +
            ("0" + (this.new_due_date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + this.new_due_date.getDate()).slice(-2);
        }
        if (this.new_due_time != null) {
          hora =
            "" +
            ("0" + this.new_due_time.getHours()).slice(-2) +
            ":" +
            ("0" + this.new_due_time.getMinutes()).slice(-2) +
            ":" +
            ("0" + this.new_due_time.getSeconds()).slice(-2) +
            "." +
            this.new_due_time.getMilliseconds();
        }
        let tarea_nueva = {
          id: mylist.length,
          nombre: this.new_name,
          descripcion: this.new_description,
          fecha: fecha,
          hora: hora,
        };
        this.mylist.push(tarea_nueva);
        this.new_name = null;
        this.new_description = null;
        this.new_due_date = null;
        this.new_due_time = null;
        this.save();
        this.hideForm();
      };

      this.showTaskDetail = function (index) {
        if (index != null) {
          this.id_tarea_detalle = index;
        } else {
          index = this.id_tarea_detalle;
        }
        if (this.new_name != null) {
          this.new_name = null;
          this.new_description = null;
          this.new_due_date = null;
          this.new_due_time = null;
        }
        document.getElementById("form-editar-tarea").style.display = "none";
        document.getElementById("editar_tarea_titulo").style.display = "none";
        document.getElementById("info-tarea-detalle").style.display = "block";
        let tarea = this.getItem(index);
        document.querySelector("#nombre_tarea_detail").innerHTML = tarea.nombre;
        document.querySelector("#tarea-detail-index").innerHTML = index;
        if (tarea.hora != null) {
          this.hora_detalle = "2005-05-05T" + tarea.hora.split(".")[0];
        }
        this.fecha_detalle = tarea.fecha;
        document.querySelector("#descripcion-tarea-detalle").innerHTML =
          tarea.descripcion;

        document.querySelector(".detalles-tarea-contenedor").style.display =
          "flex";
      };
      this.showEditTask = function () {
        let tarea = this.getItem(this.id_tarea_detalle);
        this.new_name = tarea.nombre;
        this.new_description = tarea.descripcion;
        if (tarea.fecha != null) {
          document.getElementById("date-edit-tarea").value = tarea.fecha;
        }
        if (tarea.hora != null) {
          document.getElementById("time-edit-tarea").value = tarea.hora;
        }

        document.getElementById("info-tarea-detalle").style.display = "none";
        document.getElementById("form-editar-tarea").style.display = "block";
        document.getElementById("editar_tarea_titulo").style.display = "block";
      };
      this.editTask = function () {
        let fecha = null;
        let hora = null;
        if (this.new_due_date != null) {
          fecha =
            "" +
            this.new_due_date.getFullYear() +
            "-" +
            ("0" + (this.new_due_date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + this.new_due_date.getDate()).slice(-2);
        } else {
          fecha = document.getElementById("date-edit-tarea").value;
        }
        if (this.new_due_time != null) {
          hora =
            "" +
            ("0" + this.new_due_time.getHours()).slice(-2) +
            ":" +
            ("0" + this.new_due_time.getMinutes()).slice(-2) +
            ":" +
            ("0" + this.new_due_time.getSeconds()).slice(-2) +
            "." +
            this.new_due_time.getMilliseconds();
        } else {
          hora = document.getElementById("time-edit-tarea").value;
        }
        let tarea_editada = {
          id: this.id_tarea_detalle,
          nombre: this.new_name,
          descripcion: this.new_description,
          fecha: fecha,
          hora: hora,
        };
        this.mylist[this.id_tarea_detalle] = tarea_editada;
        this.new_name = null;
        this.new_description = null;
        this.new_due_date = null;
        this.new_due_time = null;
        this.save();
        this.hideTaskDetail();
      };
      this.hideTaskDetail = function (index) {
        this.id_tarea_detalle = null;
        this.fecha_detalle = null;
        this.hora_detalle = null;
        this.new_name = null;
        this.new_description = null;
        this.new_due_date = null;
        this.new_due_time = null;
        document.querySelector(".detalles-tarea-contenedor").style.display =
          "none";
      };
      this.removeItem = function (index) {
        this.mylist.splice(index, 1);
        this.save();
      };
      this.getItem = function (index) {
        return this.mylist[index];
      };

      this.showForm = function () {
        document.querySelector(".añadir-tarea-div").style.display = "block";
      };
      this.hideForm = function () {
        this.new_name = null;
        this.new_description = null;
        this.new_due_date = null;
        this.new_due_time = null;
        document.querySelector(".añadir-tarea-div").style.display = "none";
      };

      this.save = function () {
        this.mylist.sort(this.orderByDate);
        window.localStorage.setItem("list", JSON.stringify(this.mylist));
        this.formatListForCalendar();
      };

      this.formatListForCalendar = function () {
        myListToCalendar = [];
        let objeto;
        this.mylist.forEach((element) => {
          if (element.fecha != null) {
            var date = new Date(element.fecha);
            date.setDate(date.getDate() + 1);
            var hora =
              element.hora == null
                ? "Sin hora. "
                : "Hora: " + element.hora.split(":00.")[0] + ". ";
            objeto = {
              id: "calendar" + element.id,
              name: element.nombre,
              date: date,
              type: "event",
              description: hora + element.descripcion.slice(0, 35),
              color: "#5a5a5a",
            };
            myListToCalendar.push(objeto);
          }
        });
      };
      this.orderByDate = function (a, b) {
        if (Date.parse(a.fecha) > Date.parse(b.fecha)) return 1;
        if (Date.parse(b.fecha) > Date.parse(a.fecha)) return -1;
        return 0;
      };
      this.formatListForCalendar();
    },
  ]);
