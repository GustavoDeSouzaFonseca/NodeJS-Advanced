import Evento from '../models/evento.js';
import unleash from '../services/unleash.js';

const liberaAcessoEventos = () => unleash.isEnabled('eventos');

class EventosController {
  static async listarEventos(req, res) {
    if (liberaAcessoEventos()) {
      try {
        const eventoRecebido = await Evento.pegarEventos();
        return res.status(200).json(eventoRecebido);
      } catch (err) {
        return res.status(500).json(err.message);
      }
    } else {
      return res.status(404).send();
    }
  }
}

export default EventosController;
