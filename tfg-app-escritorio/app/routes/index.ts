import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Index extends Route {
  @service store: any;

  async model() {
    const responsePartidos = await fetch('http://localhost:3000/partidos');
    const partidos = await responsePartidos.json();

    // Obtener la imagen para cada partido
    // const partidosConImagenes = await Promise.all(
    //   partidos.map(async (partido: any) => {
    //     const responseImagen = await fetch(
    //       `http://localhost:3000/escudos?name=Sevilla`
    //     ); // Cambia la ruta de la API según corresponda
    //     const blob = await responseImagen.blob();
    //     partido.imageUrl = URL.createObjectURL(blob);
    //     return partido;
    //   })
    // );

    return partidos;
  }
}
