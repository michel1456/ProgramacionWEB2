import { Component, Input, OnInit } from '@angular/core';
import { ModalUsuarioReservaComponent } from '../modal-usuario-reserva/modal-usuario-reserva.component';
import { ListaDisponibilidadService } from '../servicios/lista-disponibilidad.service';
import { ListaDisponibilidad } from '../entities/lista-disponibilidad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-disponibilida',
  standalone: true,
  imports: [ModalUsuarioReservaComponent, CommonModule, FormsModule],
  templateUrl: './lista-disponibilida.component.html',
  styleUrl: './lista-disponibilida.component.css'
})
export class ListaDisponibilidaComponent implements OnInit {
  viajes: ListaDisponibilidad[] = [];
  viajesFiltrados: ListaDisponibilidad[] = [];
  destinoSeleccionado: string;
  fechaSeleccionada: string;
  viajeSeleccionado: number; // Cambiado a number

  constructor(private listaDisponibilidadServicio: ListaDisponibilidadService) { }
  
  ngOnInit(): void {
    this.verViajes();
  }

  verViajes() {
    this.listaDisponibilidadServicio.obtenerListaViajes().subscribe(
      viajes => {
        console.log(viajes);
        this.viajes = viajes;
        // Al inicio, mostramos todos los viajes sin filtrar
        this.viajesFiltrados = viajes;
      },
      error => {
        console.error('Error al obtener la lista de viajes:', error);
      }
    );
  }

  filtrarViajes() {
    // Verificamos si se ha seleccionado un destino y una fecha
    if (!this.destinoSeleccionado || !this.fechaSeleccionada) {
      alert("Por favor, seleccione un destino y una fecha.");
      return;
    }
  
    // Filtramos los viajes según el destino y la fecha seleccionados
    this.viajesFiltrados = this.viajes.filter(viaje => {
      return viaje.destino.toLowerCase() === this.destinoSeleccionado.toLowerCase() &&
             viaje.fecha === this.fechaSeleccionada;
    });
  
    // Verificamos si se encontraron viajes
    if (this.viajesFiltrados.length === 0) {
      alert("No se encontraron viajes para el destino y la fecha seleccionados.");
    }
  }
  
  abrirReservador(viaje: ListaDisponibilidad) {
    // Guardar solo el ID del viaje seleccionado
    this.viajeSeleccionado = viaje.idListaDisponibilidad;

    // Abrir el modal
    const modal = document.getElementById("reservador");
    if (modal != null) {
      modal.style.display = "block";
    } else {
      alert("Error al abrir el reservador");
    }
  }
}
